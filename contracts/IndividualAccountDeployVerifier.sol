// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.19;
pragma experimental ABIEncoderV2;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

import './rif-relay-contracts/TokenHandler.sol';
import './rif-relay-contracts/interfaces/IDeployVerifier.sol';
import './rif-relay-contracts/interfaces/EnvelopingTypes.sol';

import './IndividualAccountFactory.sol';

contract IndividualAccountDeployVerifier is IDeployVerifier, TokenHandler {
    address private _individualAccountFactoryAddress;

    constructor(address individualAccountFactoryAddress) {
        _individualAccountFactoryAddress = individualAccountFactoryAddress;
    }

    function versionVerifier()
        external
        view
        virtual
        override
        returns (string memory)
    {
        return 'rif.enveloping.token.iverifier@2.0.1';
    }

    // dev: remove unused variable signature;
    function verifyRelayedCall(
        EnvelopingTypes.DeployRequest calldata relayRequest,
        bytes calldata signature
    ) external virtual override returns (bytes memory context) {
        require(
            tokens[relayRequest.request.tokenContract],
            'IndiviaualAccountDeployVerifier: token contract not allowed'
        );
        require(
            relayRequest.relayData.callForwarder == _individualAccountFactoryAddress,
            'IndividualAccountDeployVerifier: invalid IndividualAccountFactory address'
        );

        address contractAddr = IndividualAccountFactory(
            relayRequest.relayData.callForwarder
        ).getSmartWalletAddress(
                relayRequest.request.from,
                relayRequest.request.recoverer,
                relayRequest.request.index
            );

        require(!_isContract(contractAddr), 'IndividualAccountDeployVerifier: account already deployed');

        if (relayRequest.request.tokenContract != address(0)) {
            require(
                relayRequest.request.tokenAmount <=
                    IERC20(relayRequest.request.tokenContract).balanceOf(
                        contractAddr
                    ),
                'IndividualAccountDeployVerifier: balance too low'
            );
        }

        return (
            abi.encode(
                contractAddr,
                relayRequest.request.tokenAmount,
                relayRequest.request.tokenContract
            )
        );
    }

    /**
     * Check if a contract has code in it
     * Should NOT be used in a contructor, it fails
     * See: https://stackoverflow.com/a/54056854
     */
    function _isContract(address _addr) internal view returns (bool) {
        uint32 size;
        assembly {
            size := extcodesize(_addr)
        }
        return (size > 0);
    }
}
