// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../Interface/IERC20.sol";


contract EthBnbBridge {
    address public phnxAddress;
    address public signer;

    uint256 public nonce;
    mapping(bytes32 => bool) public sigRepeated;

    //keccak("ETH_BRIDGE_HASH_ONE")
    bytes32 public constant HASH_ONE = 0x63c7f5cdb1d38bbec4fca06b08adbb3c338e225bf61b79696076f193b0a70f07;
    //keccak("ETH_BRIDGE_HASH_TWO")
    bytes32 public constant HASH_TWO = 0xc17d317ce8d3846b73214929c7cc4a2a2679e1c043b10e5612748890112fb726;
    //keccak("ETH_BRIDGE_HASH_THREE")
    bytes32 public constant HASH_THREE = 0x521953684645f878093bce1437e3c6d4d19a8a16cb0cb7379b2da2e14f5bb7cb;

    event TokenDeposited(address user, uint256 amount, uint256 nonce);
    event TokenWithdrawn(address user, uint256 amount, uint256 nonce);

    constructor(address _phnxAddress, address _signer) {
        require(_phnxAddress!=address(0) && _signer!=address(0),"EthBnbBridge: Signer and Token cannot be zero Address");
        phnxAddress = _phnxAddress;
        signer = _signer;
    }

    function changeSigner(address _signer) external{
        require(signer==msg.sender,"Changing Signer Forbidden");
        signer = _signer;
    }

    function depositToken(uint256 amount) external {
        require(amount!=0,"EthBnbBridge: Amount Cannot be Zero");
        address sender = msg.sender;
        IERC20(phnxAddress).transferFrom(sender, address(this), amount);
        emit TokenDeposited(sender, amount, nonce++);
    }

    function withdrawToken(
        address sender,
        uint256 amount,
        uint256 nonce,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        require(sender == msg.sender, "Invalid sender");
        require(amount!=0,"EthBnbBridge: Amount Cannot be Zero");
        bytes32 encodeData = keccak256(abi.encode(amount, sender, nonce));
        require(!sigRepeated[encodeData], "Alredy claimed");
        sigRepeated[encodeData] = true;
        _validateSignedData(encodeData, v, r, s);
        IERC20(phnxAddress).transfer(sender, amount);
        emit TokenWithdrawn(sender, amount, nonce);
    }

    function getDomainSeparator() public view returns (bytes32) {
        return keccak256(abi.encode(HASH_ONE, HASH_TWO, HASH_THREE, "0x01", address(this)));
    }

    function _validateSignedData(
        bytes32 encodeData,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) internal view {
        bytes32 digest = keccak256(abi.encodePacked("\x19\x01", getDomainSeparator(), encodeData));
        address recoveredAddress = ecrecover(digest, v, r, s);
        // Explicitly disallow authorizations for address(0) as ecrecover returns address(0) on malformed messages
        require(recoveredAddress != address(0) && recoveredAddress == signer, "Invlid Signature");
    }

    function withdrawTokens() external {
        require(msg.sender == signer);
        IERC20(phnxAddress).transfer(signer,IERC20(phnxAddress).balanceOf(address(this)));
    }
}
