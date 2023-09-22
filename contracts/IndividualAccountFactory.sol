// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.19;
pragma experimental ABIEncoderV2;

import '@openzeppelin/contracts/utils/cryptography/ECDSA.sol';
import '@openzeppelin/contracts/utils/cryptography/EIP712.sol';

import 'hardhat/console.sol';
import 'sovryn-mynt/contracts/meta-asset-token/DLLR.sol';
import './rif-relay-contracts/interfaces/ISmartWalletFactory.sol';
import './IndividualAccount.sol';

contract IndividualAccountFactory is EIP712, ISmartWalletFactory {
    using ECDSA for bytes32;

    bytes11 private constant _RUNTIME_START = hex'363D3D373D3D3D3D363D73';
    bytes14 private constant _RUNTIME_END = hex'5AF43D923D90803E602B57FD5BF3';
    address public masterCopy; // this is the ForwarderProxy contract that will be proxied

    IndividualAccount public immutable individualAccountImplementation;

    // nonces of addresses, used for replay protection of signatures
    mapping(address => uint256) private nonces;

    constructor() EIP712('RSK Enveloping Transaction', '2') {
        individualAccountImplementation = new IndividualAccount();
        masterCopy = address(individualAccountImplementation);
    }

    /**
     * returns nonce of an address
     */
    function nonce(address anAddress) public view override returns (uint256) {
        return nonces[anAddress];
    }

    function runtimeCodeHash() external view override returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(_RUNTIME_START, masterCopy, _RUNTIME_END)
            );
    }

    function getCreationBytecode() public view override returns (bytes memory) {
        return
            abi.encodePacked(
                hex'602D3D8160093D39F3',
                _RUNTIME_START,
                masterCopy,
                _RUNTIME_END
            );
    }

    /**
     * calculate the counterfactual address of an individual account.
     * @param owner - the EOA of the account's owner
     * @param recoverer - Address of that can be used by some contracts to give specific roles to the caller (e.g, a recoverer)
     * @param index - index of acconut for given owner
     */

    function getSmartWalletAddress(
        address owner,
        address recoverer,
        uint256 index
    ) public view override returns (address) {
        bytes32 salt = keccak256(abi.encodePacked(owner, recoverer, index));

        return
            address(
                uint160(
                    uint256(
                        keccak256(
                            abi.encodePacked(
                                bytes1(0xff),
                                address(this),
                                salt,
                                keccak256(getCreationBytecode())
                            )
                        )
                    )
                )
            );
    }

    /**
     * @param owner the EOA of the account's owner
     * @param recoverer - Address of that can be used by some contracts to give specific roles to the caller (e.g, a recoverer)
     * @param index - index of acconut for given owner
     * @param signature - signature of the owner
     */
    function createUserSmartWallet(
        address owner,
        address recoverer,
        uint256 index,
        bytes calldata signature
    ) external override {
        address factoryAddress = address(this);
        require(
            _verifySignatureDeployRequest(
                factoryAddress,
                owner,
                recoverer,
                index,
                signature
            ),
            'IndividualAccountFactory: Invalid Signature'
        );
        // deploy the individual account with creation bytecode, a pinch of salt and initdata
        //  a6b63eb8  =>  initialize(address owner,address tokenAddr,address tokenRecipient,uint256 tokenAmount,uint256 tokenGas)
        bytes memory initData = abi.encodeWithSelector(
            hex'a6b63eb8',
            owner,
            address(0), // This "gas-funded" call does not pay with tokens
            address(0),
            0,
            0 //No token transfer
        );
        bytes32 salt = keccak256(abi.encodePacked(owner, recoverer, index));
        address individualAccountAddress = _deployIndividualAccount(
            getCreationBytecode(),
            salt,
            initData
        );
        // No info is returned, an event is emitted to inform the new deployment
        emit Deployed(individualAccountAddress, uint256(salt));
    }

    // function verify(
    //     bytes memory signature,
    //     address mailTo,
    //     string memory mailContents
    // ) external view {
    //     bytes32 digest = _hashTypedDataV4(
    //         keccak256(
    //             abi.encode(
    //                 keccak256('Mail(address to,string contents)'),
    //                 mailTo,
    //                 keccak256(bytes(mailContents))
    //             )
    //         )
    //     );
    //     address recoveredSigner = ECDSA.recover(digest, signature);
    //     require(recoveredSigner == msg.sender, 'invalid signature');
    // }

    function relayedUserSmartWalletCreation(
        IForwarder.DeployRequest memory deployRequest,
        bytes32 suffixData,
        address feesReceiver,
        bytes calldata sig
    ) external override {
        require(
            msg.sender == deployRequest.relayHub,
            'IndividualAccountFactory: expect relayHub to be caller'
        );
        require(
            nonces[deployRequest.from] == deployRequest.nonce,
            'IndividualAccountFactory: nonce mismatch'
        );
        require(
            deployRequest.validUntilTime == 0 ||
                deployRequest.validUntilTime > block.timestamp,
            'IndividualAccountFactory: request expired'
        );
        require(
            _verifySignatureRelayedDeployRequest(
                deployRequest,
                suffixData,
                sig
            ),
            'IndividualAccountFactory: invalid signature'
        );

        // increment nonce
        nonces[deployRequest.from]++;
        // console.log(nonces[deployRequest.from]);

        // deploy the individual account with creation bytecode, a pinch of salt and initdata
        //  a6b63eb8  =>  initialize(address owner,address tokenAddr,address tokenRecipient,uint256 tokenAmount,uint256 tokenGas)
        bytes memory initData = abi.encodeWithSelector(
            hex'a6b63eb8',
            deployRequest.from,
            deployRequest.tokenContract,
            feesReceiver,
            deployRequest.tokenAmount,
            deployRequest.tokenGas
        );
        bytes32 salt = keccak256(
            abi.encodePacked(
                deployRequest.from,
                deployRequest.recoverer,
                deployRequest.index
            )
        );
        address individualAccountAddress = _deployIndividualAccount(
            getCreationBytecode(),
            salt,
            initData
        );
        // console.log('individualAccountAddress');
        // console.logAddress(individualAccountAddress);
        // No info is returned, an event is emitted to inform the new deployment
        emit Deployed(individualAccountAddress, uint256(salt));
    }

    function _getChainId() internal view returns (uint256 id) {
        assembly {
            id := chainid()
        }
    }

    function _getMessageHashDeployRequest(
        address factoryAddress,
        address owner,
        address recoverer,
        uint256 index
    ) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(factoryAddress, owner, recoverer, index)
            );
    }

    function _getRelayedDeployRequestStructHash(
        IForwarder.DeployRequest memory deployRequest,
        bytes32 suffixData
    ) internal pure returns (bytes32) {
        bytes32 DEPLOY_REQUEST_TYPEHASH = keccak256(
            'RelayRequest(address relayHub,address from,address to,address tokenContract,address recoverer,uint256 value,uint256 nonce,uint256 tokenAmount,uint256 tokenGas,uint256 validUntilTime,uint256 index,bytes data,RelayData relayData)RelayData(uint256 gasPrice,address feesReceiver,address callForwarder,address callVerifier)'
        );
        return
            keccak256(
                abi.encodePacked(
                    DEPLOY_REQUEST_TYPEHASH,
                    abi.encode(
                        deployRequest.relayHub,
                        deployRequest.from,
                        deployRequest.to,
                        deployRequest.tokenContract,
                        deployRequest.recoverer,
                        deployRequest.value,
                        deployRequest.nonce,
                        deployRequest.tokenAmount,
                        deployRequest.tokenGas,
                        deployRequest.validUntilTime,
                        deployRequest.index,
                        keccak256(deployRequest.data)
                    ),
                    suffixData
                )
            );
    }

    function _verifySignatureDeployRequest(
        address factoryAddress,
        address owner,
        address recoverer,
        uint256 index,
        bytes memory signature
    ) internal pure returns (bool) {
        bytes32 messageHash = _getMessageHashDeployRequest(
            factoryAddress,
            owner,
            recoverer,
            index
        );
        address recoveredAddress = messageHash.toEthSignedMessageHash().recover(
            signature
        );
        return RSKAddrValidator.safeEquals(recoveredAddress, owner);
    }

    function _verifySignatureRelayedDeployRequest(
        IForwarder.DeployRequest memory deployRequest,
        bytes32 suffixData,
        bytes memory signature
    ) internal view returns (bool) {
        bytes32 structHash = _getRelayedDeployRequestStructHash(
            deployRequest,
            suffixData
        );
        bytes32 digest = _hashTypedDataV4(structHash);
        // console.log('digest');
        // console.logBytes32(digest);
        address recoveredAddress = digest.recover(signature);
        // console.log('recoveredAddress');
        // console.logAddress(recoveredAddress);
        return
            RSKAddrValidator.safeEquals(recoveredAddress, deployRequest.from);
    }

    function _deployIndividualAccount(
        bytes memory bytecode,
        bytes32 salt,
        bytes memory initdata
    ) internal returns (address) {
        // console.log('_deployIndividualAccount');
        // Deployment of the Individual Account (Smart Wallet design patt)
        address addr = _deployWithCreate2(bytecode, salt);
        // console.log('assembly create2... done');

        //Since the init code determines the address of the Individual Account, any initialization
        //required is done via the runtime code, to avoid the parameters impacting on the resulting address
        console.log('addr.call(initdata)...');
        (bool success, ) = addr.call(initdata);

        require(
            success,
            'IndividualAccountFactory: failed to initialize IndividualAccount'
        );

        return addr;
    }

    function _deployWithCreate2(bytes memory bytecode, bytes32 salt)
        internal
        returns (address addr)
    {
        assembly {
            addr := create2(0, add(bytecode, 0x20), mload(bytecode), salt)
            if iszero(extcodesize(addr)) {
                revert(0, 0)
            }
        }
        require(addr != address(0), '_deployWithCreate2: Failed on deploy');
    }
}
