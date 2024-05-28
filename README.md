# Mint NFTs on Avalanche Fuji Testnet using Core Wallet and Next.js.

## For testing purposes, please deploy the following contract, you can use Remix IDE for example.

Don't forget to switch Core wallet to Fiji testnet, if you don't have AVAX, ask for it in the Avalanche [GUILD](https://guild.xyz/avalanche), get the code and paste it in the [Faucet](https://core.app/tools/testnet-faucet/).

```
// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity 0.8.24;

import "@openzeppelin/contracts@5.0.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@5.0.2/access/Ownable.sol";

contract HelloAvax is ERC721, Ownable {
    uint256 private _nextTokenId;

    constructor(
        address initialOwner
    ) ERC721("HelloAvax", "HVA") Ownable(initialOwner) {}

    function _baseURI() internal pure override returns (string memory) {
        return
            "https://bafybeibodhnumbvvzjtplwzxomddz53jmgejb4eezv7ii6kw5py6c2rnya.ipfs.dweb.link/";
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }
}
```
## After you deploy the contract
- Copy and paste the contract address in line 18 of ```app/components/minter.js``` file.
- Copy and past the contract ABI in ```app/contractABI.js```.
- Run ```npm install``` in the terminal.
- Run ```npm run dev``` in the terminal.
- Now you will be able to connect your wallet and mint an NFT:

  ![Screenshot of the app running when the wallet is connected](https://i.ibb.co/hcJTcdZ/Screenshot-at-May-28-18-20-17.png)

- After you hit mint, check for a pixelart blackberry NFT in your wallet or go to https://testnet.snowtrace.io and check for your contract's activity.
