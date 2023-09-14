// SPDX-License-Identifier:MIT
pragma solidity ^0.8.19;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./rif-relay-contracts/interfaces/IWalletFactory.sol";
import "./rif-relay-contracts/interfaces/IRelayVerifier.sol";
import "./rif-relay-contracts/interfaces/EnvelopingTypes.sol";
import "./rif-relay-contracts/TokenHandler.sol";

contract IndividualAccountRelayVerifier is IRelayVerifier, TokenHandler {
    using SafeMath for uint256;

    address private _individualAccountFactory;

    constructor(address individualAccountFactoryAddress) {
        _individualAccountFactory = individualAccountFactoryAddress;
    }

    function versionVerifier()
        external
        view
        virtual
        override
        returns (string memory)
    {
        return "rif.enveloping.token.iverifier@2.0.1";
    }

    /* solhint-disable no-unused-vars */
    function verifyRelayedCall(
        EnvelopingTypes.RelayRequest calldata relayRequest,
        bytes calldata signature
    ) external virtual override returns (bytes memory context) {
        require(
            tokens[relayRequest.request.tokenContract],
            "IndividualAccountRelayVerifier: Token contract not allowed"
        );

        address payer = relayRequest.relayData.callForwarder;
        if (relayRequest.request.tokenContract != address(0)) {
            require(
                relayRequest.request.tokenAmount <=
                    IERC20(relayRequest.request.tokenContract).balanceOf(payer),
                "IndividualAccountRelayVerifier: balance too low"
            );
        }

        // Check for the codehash of the smart wallet sent
        bytes32 smartWalletCodeHash;
        assembly {
            smartWalletCodeHash := extcodehash(payer)
        }

        require(
            IWalletFactory(_individualAccountFactory).runtimeCodeHash() == smartWalletCodeHash,
            "IndividualAccountRelayVerifier: SW different to template"
        );

        return (
            abi.encode(
                payer,
                relayRequest.request.tokenAmount,
                relayRequest.request.tokenContract
            )
        );
    }
}
