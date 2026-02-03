# 01-Identity & Authentication (ID-1)

## 01 Overview
This document outlines the requirements for user authentication mechanisms in the Ticketing Platform on Walrus, covering wallet connection and social login methods.

---

## 1.2. Feature: Authentication Methods (ID-1.2)

### 1.2.1. Feature: Wallet Connection (ID-1.2.1)

| User Story Title | User Story Body |
| --- | --- |
| 1.2.1. Feature: Wallet Connection (ID-1.2.1) | As a Web3 power user, I want to connect my existing Sui-compatible wallet, so that I can maintain control over my assets and sign transactions using my preferred security setup.<br><br>**Actions:**<br>- Build "Connect Wallet" button component with styling<br>- Create wallet modal UI (responsive design)<br>- Initialize user account state in app context<br>- Integrate with Sui Wallet Standard framework (@mysten/dapp-kit)<br>- Error handling UI for connection failures<br>- Integration testing<br><br>**Deliverable**: A styled wallet connection component that displays user's SUI balance upon successful connection. |

---

### 1.2.2. Feature: zkLogin Social Authentication (ID-1.2.2)

| User Story Title | User Story Body |
| --- | --- |
| 1.2.2. Feature: zkLogin Social Authentication (ID-1.2.2) | As a mainstream user, I want to sign in with my Google/Facebook/Apple account and have a Sui wallet automatically created, so that I can use the ticketing platform without managing private keys or crypto wallets.<br><br>**Actions:**<br>- Integrate Sui zkLogin SDK (@mysten/zklogin)<br>- Build OAuth provider selection UI (Google, Facebook, Apple buttons)<br>- Implement OAuth redirect callback handler to receive OIDC tokens<br>- Call zkLogin SDK methods to generate Sui address from OAuth credentials<br>- Store ephemeral session data and zkLogin proof<br>- Extract user email/profile from OAuth response for notifications<br>- Error handling for OAuth failures and network issues<br>- Testing OAuth flow end-to-end<br><br>**Technical Notes:**<br>- zkLogin SDK handles: ephemeral key generation, JWT-to-address derivation, zero-knowledge proof creation<br>- Custom work: OAuth callback routing, provider UI, session persistence, profile initialization<br>- User gets a valid Sui address without ever seeing a private key<br><br>**Deliverable**: Social login page with OAuth provider buttons that create Sui addresses via zkLogin and establish authenticated sessions with email access. |

| Feature | ID | Status |
|---------|----|--------|
| Wallet Connection | ID-1.2.1 | Not Started |
| zkLogin Social Authentication | ID-1.2.2 | Not Started |
