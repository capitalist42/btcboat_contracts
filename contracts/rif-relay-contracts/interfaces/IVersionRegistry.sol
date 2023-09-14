// SPDX-License-Identifier:MIT
pragma solidity ^0.8.19;

interface IVersionRegistry {
    //event emitted whenever a version is added
    event VersionAdded(
        bytes32 indexed id,
        bytes32 version,
        string value,
        uint256 time
    );

    //event emitted whenever a version is canceled
    event VersionCanceled(bytes32 indexed id, bytes32 version, string reason);

    /**
     * add a version
     * @param id the object-id to add a version (32-byte string)
     * @param version the new version to add (32-byte string)
     * @param value value to attach to this version
     */
    function addVersion(
        bytes32 id,
        bytes32 version,
        string calldata value
    ) external;

    /**
     * cancel a version.
     */
    function cancelVersion(
        bytes32 id,
        bytes32 version,
        string calldata reason
    ) external;
}
