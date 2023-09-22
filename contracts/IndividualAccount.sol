// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.19;
pragma experimental ABIEncoderV2;

import '@openzeppelin/contracts/utils/cryptography/ECDSA.sol';
import '@openzeppelin/contracts/utils/cryptography/EIP712.sol';
import 'hardhat/console.sol';
import './rif-relay-contracts/utils/RSKAddrValidator.sol';
import './rif-relay-contracts/interfaces/IForwarder.sol';

// dev IndividualAccount
// smart contract wallet
// acocunt abstraction
// account template

contract IndividualAccount is EIP712, IForwarder {
    //storage slot for owner = bytes32(uint256(keccak256('eip1967.proxy.owner')) - 1) = a7b53796fd2d99cb1f5ae019b54f9e024446c3d12b483f733ccc62ed04eb126a
    bytes32 private constant _OWNER_SLOT =
        0xa7b53796fd2d99cb1f5ae019b54f9e024446c3d12b483f733ccc62ed04eb126a;
    using ECDSA for bytes32;

    uint256 public override nonce;

    // bytes32 public domainSeparator;

    constructor() EIP712('RSK Enveloping Transaction', '2') {
        _setOwner(msg.sender);
    }
    
    // /**
    //  * This Proxy will first charge for the deployment and then it will pass the
    //  * initialization scope to the wallet logic.
    //  * This function can only be called once, and it is called by the Factory during deployment
    //  * @param owner - The EOA that will own the individualAccount
    //  * @param tokenAddr - The Token used for payment of the deploy
    //  * @param tokenRecipient - Recipient of payment
    //  * @param tokenAmount - Amount to pay
    //  */

    function initialize(
        address owner,
        address tokenAddr,
        address tokenRecipient,
        uint256 tokenAmount,
        uint256 tokenGas
    ) external {
        // console.log('initialize...');
        require(getOwner() == bytes32(0), 'already initialized');

        _setOwner(owner);

        //we need to initialize the contract
        // console.log('tokenAmount');
        // console.log(tokenAmount);
        // console.log('tokenGas');
        // console.log(tokenGas);
        if (tokenAmount > 0) {
            // bytes32 TRANSFER_FUNCTION_HASH = keccak256(
            //     'transfer(address,uint256)'
            // );
            // (bool isTokenTransferSuccess, bytes memory ret) = tokenAddr.call{
            //     gas: tokenGas
            // }(
            //     console.logBytes32(TRANSFER_FUNCTION_HASH);
            //     abi.encodeWithSelector(
            //         // hex'a9059cbb', //transfer(address,uint256)
            //         tokenRecipient,
            //         tokenAmount
            //     )
            // );
            //
            // check token balance
            // (bool isCheckTokenBalanceSuccess, bytes memory tokenBalanceData) = tokenAddr.call(
            //     abi.encodeWithSignature(
            //         'callBalanceOf(address)',
            //         address(this)
            //     )
            // );
            // console.log('isCheckTokenBalanceSuccess');
            // console.log(isCheckTokenBalanceSuccess);
            //     console.log('tokenBalanceData');
            // console.logBytes(tokenBalanceData);
            // console.log(uint256(bytes32(tokenBalanceData)));
            // require (uint256(bytes32(tokenBalanceData)) >= tokenAmount, 'IndividualAccount: insufficient token balance');
            // tansfer gas fee back to relay system
            (bool isTokenTransferSuccess, bytes memory data) = tokenAddr.call{
                gas: tokenGas
            }(
                abi.encodeWithSignature(
                    'transfer(address,uint256)',
                    tokenRecipient,
                    tokenAmount
                )
            );

            console.log('isTokenTransferSuccess');
            console.log(isTokenTransferSuccess);
            console.log('data');
            console.logBytes(data);
            require(
                isTokenTransferSuccess &&
                    (data.length == 0 || abi.decode(data, (bool))),
                'IndividualAccount: unable to pay for deployment'
            );
        }
    }

    function isInitialized() external view returns (bool) {
        if (getOwner() == bytes32(0)) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * verify the transaction would execute.
     * validate the signature and the nonce of the request.
     * revert if either signature or nonce are incorrect.
     */
    function verify(
        ForwardRequest memory forwardRequest,
        bytes32 suffixData,
        bytes calldata signature
    ) external view {
        _verifyForwardRequestSignature(forwardRequest, suffixData, signature);
    }

    /**
     * returns the encrypted owner that deployed smart wallet.
     */
    function getOwner() public view override returns (bytes32 owner) {
        assembly {
            owner := sload(_OWNER_SLOT)
        }
    }

    function recover(
        address owner,
        address factory,
        address swTemplate,
        address destinationContract,
        uint256 index,
        bytes calldata data
    ) external payable returns (bool success, bytes memory ret) {
        address wallet = address(
            uint160(
                uint256(
                    keccak256(
                        abi.encodePacked(
                            bytes1(0xff),
                            factory,
                            keccak256(
                                abi.encodePacked(owner, msg.sender, index)
                            ), //salt
                            keccak256(
                                abi.encodePacked(
                                    hex'602D3D8160093D39F3363D3D373D3D3D3D363D73',
                                    swTemplate,
                                    hex'5AF43D923D90803E602B57FD5BF3'
                                )
                            )
                        )
                    )
                )
            )
        );

        require(wallet == address(this), 'Invalid recoverer');

        if (destinationContract != address(0)) {
            (success, ret) = destinationContract.call{value: msg.value}(data);
        }

        //If any balance has been added then trasfer it to the owner EOA
        if (address(this).balance > 0) {
            //sent any value left to the recoverer account
            payable(msg.sender).transfer(address(this).balance);
        }
    }

    function directExecute(
        address to,
        bytes calldata data
    ) external payable override returns (bool success, bytes memory ret) {
        //Verify Owner
        require(
            getOwner() == keccak256(abi.encodePacked(msg.sender)),
            'IndividualAccount: Not the owner of the IndividualAccount'
        );

        (success, ret) = to.call{value: msg.value}(data);
    }

    function directExecute(
        address to,
        uint256 value,
        bytes calldata data
    ) external payable returns (bool success, bytes memory ret) {
        //Verify Owner
        require(
            getOwner() == keccak256(abi.encodePacked(msg.sender)),
            'ndividualAccount: Not the owner of the IndividualAccount'
        );

        (success, ret) = to.call{value: value}(data);
    }

    function execute(
        bytes32 suffixData,
        ForwardRequest memory forwardRequset,
        address feesReceiver,
        bytes calldata sig
    )
        external
        payable
        virtual
        override
        returns (bool success, bytes memory ret)
    {
        (sig);
        require(
            msg.sender == forwardRequset.relayHub,
            'IndividualAccount: expect relayHub to be caller'
        );

        require(
            nonce == forwardRequset.nonce,
            'IndividualAccount: nonce mismatch'
        );
        require(
            forwardRequset.validUntilTime == 0 ||
                forwardRequset.validUntilTime > block.timestamp,
            'IndividualAccount: request expired'
        );

        require(
            _verifyForwardRequestSignature(forwardRequset, suffixData, sig),
            'IndividualAccount: invalid signature'
        );

        nonce++;

        if (forwardRequset.tokenAmount > 0) {
            (success, ret) = forwardRequset.tokenContract.call{
                gas: forwardRequset.tokenGas
            }(
                abi.encodeWithSelector(
                    hex'a9059cbb', //transfer(address,uint256)
                    feesReceiver,
                    forwardRequset.tokenAmount
                )
            );

            require(
                success && (ret.length == 0 || abi.decode(ret, (bool))),
                'IndividualAccount: unable to pay for relay'
            );
        }

        //Why this require is not needed: in the case that the EVM implementation
        //sends gasleft() as req.gas  if gasleft() < req.gas (see EIP-1930),  which would end in the call reverting
        //If the relayer made this on purpose in order to collect the payment, since all gasLeft()
        //was sent to this call, then the next line would give an out of gas, and, as a consequence, will
        //revert the whole transaction, and the payment will not happen
        //But it could happen that the destination call makes a gasleft() check and decides to revert if it is
        //not enough, in that case there might be enough gas to complete the relay and the token payment would be collected
        //For that reason, the next require line must be left uncommented, to avoid malicious relayer attacks to destination contract
        //methods that revert if the gasleft() is not enough to execute whatever logic they have.

        require(gasleft() > forwardRequset.gas, 'Not enough gas left');
        (success, ret) = forwardRequset.to.call{
            gas: forwardRequset.gas,
            value: forwardRequset.value
        }(forwardRequset.data);
    }

    function _getChainId() private view returns (uint256 id) {
        assembly {
            id := chainid()
        }
    }

    function _setOwner(address owner) private {
        //  To avoid re-entrancy attacks by external contracts, the first thing we do is set
        //  the variable that controls "is initialized"
        //  We set this instance as initialized, by
        //  storing the logic address
        //  Set the owner of this Smart Wallet
        //  slot for owner = bytes32(uint256(keccak256('eip1967.proxy.owner')) - 1) = a7b53796fd2d99cb1f5ae019b54f9e024446c3d12b483f733ccc62ed04eb126a
        bytes32 ownerCell = keccak256(abi.encodePacked(owner));

        assembly {
            sstore(_OWNER_SLOT, ownerCell)
        }
    }

    function _getForwardRequestStructHash(
        IForwarder.ForwardRequest memory forwardRequest,
        bytes32 suffixData
    ) internal pure returns (bytes32) {
        bytes32 FORWARD_REQUEST_TYPEHASH = keccak256(
            'RelayRequest(address relayHub,address from,address to,address tokenContract,uint256 value,uint256 gas,uint256 nonce,uint256 tokenAmount,uint256 tokenGas,uint256 validUntilTime,bytes data,RelayData relayData)RelayData(uint256 gasPrice,address feesReceiver,address callForwarder,address callVerifier)'
        );

        return
            keccak256(
                abi.encodePacked(
                    FORWARD_REQUEST_TYPEHASH,
                    abi.encode(
                        forwardRequest.relayHub,
                        forwardRequest.from,
                        forwardRequest.to,
                        forwardRequest.tokenContract,
                        forwardRequest.value,
                        forwardRequest.gas,
                        forwardRequest.nonce,
                        forwardRequest.tokenAmount,
                        forwardRequest.tokenGas,
                        forwardRequest.validUntilTime,
                        keccak256(forwardRequest.data)
                    ),
                    suffixData
                )
            );
    }

    function _verifyForwardRequestSignature(
        IForwarder.ForwardRequest memory forwardRequest,
        bytes32 suffixData,
        bytes memory signature
    ) internal view returns (bool) {
        require(
            getOwner() == keccak256(abi.encodePacked(forwardRequest.from)),
            'IndividualAccount: Not from owner of the account'
        );
        bytes32 structHash = _getForwardRequestStructHash(
            forwardRequest,
            suffixData
        );
        bytes32 digest = _hashTypedDataV4(structHash);
        address recoveredAddress = digest.recover(signature);

        return
            RSKAddrValidator.safeEquals(recoveredAddress, forwardRequest.from);
    }

    /* solhint-disable no-empty-blocks */
    receive() external payable {}


    function verify(
        bytes32 suffixData,
        ForwardRequest calldata forwardRequest,
        bytes calldata signature
    ) external view override {}
}
