# BlockEstate – Real Estate + Blockchain Technical Assessment

## Overview

This repository contains a **Next.js real estate demo** extended with a **Solidity smart contract** for fractional ownership of a single property.

The goal of the implementation was to add a minimal but functional blockchain flow on top of the provided frontend:

- deploy a smart contract representing one property
- allow users to connect MetaMask
- buy property shares with ETH
- update the UI after each purchase

The current implementation focuses on a **single on-chain property contract**, and that blockchain flow was **integrated into the existing frontend** rather than left as a disconnected prototype. The rest of the frontend remains as the original multi-property demo, but one property now exposes the full on-chain purchase flow.

---

## What was implemented

### 1. Smart contract for fractional real estate shares

A Solidity contract was added in:

```bash
contracts/RealEstateShares.sol
```

The contract stores:

- `propertyName`
- `totalShares`
- `pricePerShare`
- `sharesSold`
- `owner`
- `sharesOwned[address]`

Main functionality:

- `buyShares(uint256 shareAmount)` payable
- validates:
  - `shareAmount > 0`
  - enough shares remain
  - exact ETH amount is sent
- updates:
  - `sharesSold`
  - `sharesOwned[msg.sender]`
- emits:
  - `SharesPurchased(address buyer, uint256 amount)`

It also includes:

- `getRemainingShares()`
- `withdraw()` for the owner

---

### 2. Hardhat setup

The project was extended with Hardhat so the contract can be compiled and deployed locally.

Relevant files:

```bash
hardhat.config.js
scripts/deploy.js
contracts/RealEstateShares.sol
artifacts/contracts/RealEstateShares.sol/RealEstateShares.json
```

Deployment parameters used in the assessment:

- Property name: `RoyalCity Tower`
- Total shares: `100`
- Price per share: `0.01 ETH`

---

### 3. Contract integration in the frontend

A blockchain client component was added:

```bash
components/real-estate-shares-client.jsx
```

This component:

- reads contract data through a **read-only RPC provider**
- connects MetaMask when needed
- automatically switches/adds the local Hardhat network
- validates the connected chain
- lets the user purchase shares
- refreshes UI state after the transaction confirms
- listens to:
  - `accountsChanged`
  - `chainChanged`

Contract metadata is centralized in:

```bash
lib/realEstateContract.js
```

This file exports:

- contract address
- contract ABI

A dedicated blockchain page was also added:

```bash
app/blockchain/page.tsx
```

In addition, the blockchain purchase flow was **integrated into the property detail experience** so the user can reach the share-purchase UI from the real estate app itself, not only from a standalone test page.

---

### 4. Frontend fixes and debugging work

During the implementation, several issues were resolved:

- **Hydration mismatch**
  - fixed by using a fixed locale in number formatting:
    - `toLocaleString("en-US")`
- **MetaMask / local network issues**
  - handled with:
    - `wallet_switchEthereumChain`
    - `wallet_addEthereumChain`
- **Contract read failures**
  - solved by separating:
    - read-only provider via `JsonRpcProvider("http://127.0.0.1:8545")`
    - signer/provider via MetaMask only for write actions
- **Next.js cache inconsistencies**
  - resolved by removing `.next` and restarting dev mode when necessary

---

## Current project structure

Relevant directories and files:

```bash
app/
  blockchain/page.tsx
  property/[id]/page.tsx
  components/property-detail.tsx

components/
  real-estate-shares-client.jsx
  fractional-ownership-slider.tsx
  hero-carousel.tsx
  navbar.tsx

contracts/
  RealEstateShares.sol

scripts/
  deploy.js

lib/
  properties-data.ts
  realEstateContract.js

artifacts/
  contracts/RealEstateShares.sol/RealEstateShares.json

hardhat.config.js
package.json
```

Integration points:
- `components/real-estate-shares-client.jsx` contains the wallet/contract interaction logic
- `lib/realEstateContract.js` centralizes contract address + ABI
- `app/components/property-detail.tsx` is the UI integration point where the blockchain purchase flow is rendered inside the property detail page
- `app/blockchain/page.tsx` remains available as a direct standalone route for testing/demo purposes

---

## Tech stack

### Frontend
- Next.js 15
- React
- TypeScript / JavaScript
- Tailwind CSS
- shadcn/ui-style components
- Ethers v6

### Blockchain
- Solidity `^0.8.28`
- Hardhat
- MetaMask
- Local Hardhat network

### Legacy / inherited from template
The repository also contains a `server/` folder with a Node/Express-style backend structure from the original source project.  
That backend was **not required** for the blockchain challenge and was **not used** for the smart contract flow.

---

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd real_estate-b_s
```

### 2. Install dependencies

```bash
npm install
```

---

## Running the frontend

Because the original `package.json` includes a mixed `dev` script that is not ideal for this assessment, the frontend is best started with:

```bash
npx next dev
```

Then open:

```bash
http://localhost:3000
```

Blockchain demo page:

```bash
http://localhost:3000/blockchain
```

---

## Compile and deploy the smart contract

### 1. Compile

```bash
npx hardhat compile
```

### 2. Start the local Hardhat node

Open a terminal and run:

```bash
npx hardhat node
```

This starts the JSON-RPC server at:

```bash
http://127.0.0.1:8545
```

### 3. Deploy the contract

In another terminal:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Expected output will include something like:

```bash
RealEstateShares deployed to: 0x...
Property Name: RoyalCity Tower
Total Shares: 100
Price Per Share: 0.01 ETH
```

### 4. Update the frontend contract address

Copy the deployed address into:

```bash
lib/realEstateContract.js
```

Example:

```js
export const CONTRACT_ADDRESS = "0x...";
```

The ABI is loaded from:

```bash
artifacts/contracts/RealEstateShares.sol/RealEstateShares.json
```

---

## MetaMask setup

### Import a Hardhat account

When `npx hardhat node` starts, it prints test accounts and private keys.

Import one of those accounts into MetaMask.

### Connect MetaMask to Hardhat local network

The app already tries to switch/add the network automatically with chain id `31337`.

If needed manually, use:

- Network name: `Hardhat Local`
- RPC URL: `http://127.0.0.1:8545`
- Chain ID: `31337`
- Symbol: `ETH`

---

## How to test the flow

1. Start Hardhat node
2. Deploy the contract
3. Start Next.js
4. Open:

```bash
http://localhost:3000/blockchain
```

5. Click **Conectar MetaMask**
6. Approve wallet connection
7. Enter a share amount (for example `1`)
8. Click **Buy Shares**
9. Confirm the transaction in MetaMask

After a successful purchase, the UI should update:

- `Shares Sold`
- `Remaining Shares`
- `Your Shares`

---

## Notes about integration

The smart contract models **one property**, which is exactly what the challenge asked for.

The frontend still displays multiple demo properties from static data in:

```bash
lib/properties-data.ts
```

The important part is that the blockchain feature was **integrated into the app flow**, not left completely isolated:
- the contract interaction can be tested directly through `/blockchain`
- the same purchase UI is also rendered inside the property detail flow through `app/components/property-detail.tsx`

So the final result is:
- a real estate frontend
- a single-property on-chain purchase contract
- a working integration between both layers

This keeps the solution aligned with the assessment scope:
- one property
- basic share purchase logic
- ETH payments
- state tracking
- frontend integration inside the existing UI

---

## Useful commands

### Remove Next cache

```bash
rm -rf .next
```

### Remove Hardhat build artifacts

```bash
rm -rf artifacts cache
```

### Restart local flow

```bash
npx hardhat compile
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
npx next dev
```

---

## Deliverable summary

This implementation adds:

- a working Solidity contract for buying fractional real estate shares
- a Hardhat local development and deployment flow
- MetaMask integration
- a working UI to:
  - connect wallet
  - read property/share data
  - buy shares
  - refresh contract state after purchase
- integration of the blockchain flow into the existing real estate frontend

It is intentionally minimal, local-first, integrated into the app UI, and aligned with the technical assessment scope.
