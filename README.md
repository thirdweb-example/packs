> [!Important]  
> This repository is referencing the `mumbai` chain.
> 
> `Mumbai` [is deprecated since 08/04/2024](https://blog.thirdweb.com/deprecation-of-mumbai-testnet/), meaning the code in this repository will no longer work out of the box.
>
> You can still use this repository, however you will have to switch any references to `mumbai` to another chain.

# Packs Example

In this example, we use [packs](https://portal.thirdweb.com/pre-built-contracts/pack) to create loot boxes that can contain any amount of:

- ERC-721 NFTs
- ERC-1155 NFTs
- ERC-20 tokens

We can open these loot boxes to reveal the tokens inside!

## Tools

- [**Pack contract**](https://portal.thirdweb.com/pre-built-contracts/pack): To create openable loot boxes that contain NFTs from our Edition and Token contracts.
- [**Edition contract**](https://portal.thirdweb.com/pre-built-contracts/edition): To create NFTs with multiple copies and bundle them into the packs.
- [**Token contract**](https://portal.thirdweb.com/pre-built-contracts/token): To create our own token that we can bundle into the packs.
- [**React SDK**](https://docs.thirdweb.com/react): to enable users to connect their wallets with the [useMetamask](https://portal.thirdweb.com/react/react.usemetamask) hook, and access hooks such as [usePack](https://portal.thirdweb.com/react/react.usePack) to interact with the Pack contract.
- [**TypeScript SDK**](https://docs.thirdweb.com/typescript): To write [scripts](./scripts) that create and deploy our pack contract, and bundle the tokens into the packs.

## Using This Repo

To create your own version of this template, you can use the following steps:

### 1. Get a copy of this repo

Use our CLI to create a copy of this repo on your local machine:

```bash
npx thirdweb create --template packs
```

### 2. Deploy some contracts!

This example project uses a [Token](https://portal.thirdweb.com/pre-built-contracts/token), [Edition](https://portal.thirdweb.com/pre-built-contracts/edition), and [Pack](https://portal.thirdweb.com/pre-built-contracts/pack) contract.

You can deploy all of these contracts via the [thirdweb dashboard](https://thirdweb.com/dashboard)

This project also includes a [deployPack](./scripts/deployPack.mjs) script that you can use to deploy the pack contract and a [bundleTokens](./scripts/bundleTokens.mjs) script that you can use to bundle the tokens (from your NFT/Token contracts) into the packs.

### 3. Plug in your NFT Drop contract address

Replace the example contract addresses with your contract addresses in the pages, scripts, and components of this project.

You can use find and replace to change these contract addresses. Our example contract addresses are:

- Pack: `0x0Aee160411473f63be2DfF2865E81A1D59636C97`
- Token: `0x270d0f9DA22332F33159337E3DE244113a1C863C`
- Edition: `0xb4A48c837aB7D0e5C85eA2b0D9Aa11537340Fa17`

---

## Guide

Below, you'll find the core features of this example explained!

### Creating a Pack Contract

You can use the thirdweb dashboard to deploy a pack contract.

In this example project, we have written a script to deploy the pack contract via the SDK in [deployPack.ts](./scripts/deployPack.mjs).

```js
const packAddress = await sdk.deployer.deployPack({
  name: "Treasure Chests",
  primary_sale_recipient: "0xb371d1C5629C70ACd726B20a045D197c256E1054",
});
```

### Bundling Tokens

Inside the [bundleTokens](./scripts/bundleTokens.mjs) script, we can bundle NFTs and Tokens into the packs.

We bundle 500 units worth of tokens to create 100 packs with 5 rewards each.

```jsx
const packNfts = await pack.create({
  // ... our tokens and NFTs here
  // ...
  rewardsPerPack: 5,
});
```

### Connecting to User Wallets

We wrap our application in the `ThirdwebProvider` in the [\_app.tsx](./pages/_app.tsx) so that we can use all of the React SDK's hooks:

```jsx
<ThirdwebProvider desiredChainId={activeChainId}>
  <Component {...pageProps} />
</ThirdwebProvider>
```

Now in the [index.tsx](./pages/index.tsx) file, we can use the [useMetamask](https://portal.thirdweb.com/react/react.usemetamask) hook to connect to the user's wallet:

```jsx
const address = useAddress();
const connectWithMetamask = useMetamask();
const disconnectWallet = useDisconnect();
```

### Connecting to our Pack Contract

We use the [usePack](https://portal.thirdweb.com/react/react.usepack) hook to connect to the pack contract using it's contract address:

```jsx
const pack = usePack("0x0Aee160411473f63be2DfF2865E81A1D59636C97");
```

### Viewing Packs Owned by the Connected Wallet

Since each pack is an ERC-1155 NFT itself, we can use the [useOwnedNFTs](https://portal.thirdweb.com/react/react.useownednfts) hook to view the packs (and quantity) that the user owns:

```jsx
const { data: nfts, isLoading } = useOwnedNFTs(pack, address);
```

We use the `nfts` array to display the packs that the user owns on the UI.

### Opening Packs

To open a pack, we simply pass the tokenId of the pack and the quantity to open to the `open` function:

```jsx
const openedRewards = await pack?.open(0, 1); // 0 = tokenId, 1 = quantity
```

### Displaying Rewards

We then use the values returned in this `openedRewards` object to display the tokens that the user opened.

Since the `openedRewards` object returns the `contractAddress` and `tokenId`, we use the [useNFT](https://portal.thirdweb.com/react/react.usenft) or the
[useMetadata](https://portal.thirdweb.com/react/react.usemetadata) hook (for ERC-20 tokens) to get the metadata of the tokens that were opened:

```jsx
// For ERC-1155 / ERC-721 tokens:
const edition = useEdition(reward.contractAddress);
const { data } = useNFT(edition, reward.tokenId);

// For ERC-20 tokens:
const token = useToken(reward.contractAddress);
const { data } = useMetadata(token);
```

Then we again `map` over the rewards arrays contained in the `openedRewards` object and display the rewards that the user opened on the UI.

## Join our Discord!

For any questions, suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
