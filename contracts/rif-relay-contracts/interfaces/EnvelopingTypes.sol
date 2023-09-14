// SPDX-License-Identifier:MIT
pragma solidity ^0.8.19;

import "./IForwarder.sol";

interface EnvelopingTypes {
    struct RelayData {
        uint256 gasPrice;
        address feesReceiver;
        address callForwarder;
        address callVerifier;
    }

    struct RelayRequest {
        IForwarder.ForwardRequest request;
        RelayData relayData;
    }

    struct DeployRequest {
        IForwarder.DeployRequest request;
        RelayData relayData;
    }
}
