# 01-Identity & Authentication (ID-1)

## 01 Overview
This document outlines the requirements for user identity management and authentication mechanisms in the Ticketing Platform on Walrus. It covers sealed encryption, user registration, and multiple authentication methods including wallet connection and social login.

---

## 1.1. Feature: User Identity (ID-1.1)

### 1.1.1. Feature: Seal Encryption Integration (ID-1.1.1.)

| User Story Title | User Story Body |
| --- | --- |
| 1.1.1. Feature: Seal Encryption Integration (ID-1.1.1.) | As a user, I want my sensitive ticket preferences to be stored in a "Sealed" state on-chain, so that only the venue staff can access this data during the active window of the event.<br><br>Actions:<br>- Policy Definition: Define a Sui Move policy struct that specifies the GatekeeperCap as the only authorized entity for decryption requests.<br>- Seal Wrapping: Use the Sui Seal SDK to wrap sensitive user attributes into ciphertext blobs that are anchored to the user's on-chain address.<br>- Approval Logic: Write a seal_approve Move function that validates the current network epoch (time) to ensure decryption is only possible during event hours.<br>- Threshold Request: Configure the scanner app to request a "decryption fragment" from Sui key servers, which only succeeds if the Move policy conditions are met.<br><br>Deliverable: A cryptographically gated data storage system where user attributes are physically unreadable until the event gatekeeper initiates a "Seal Approval" transaction. |

---

### 1.1.2. Feature: User Registration System Architecture (ID-1.1.2)

| User Story Title | User Story Body |
| --- | --- |
| 1.1.2. Feature: User Registration System Architecture (ID-1.1.2) | As a new user, I want a frictionless registration process that works with both wallet connections and social logins, so that I can start browsing and buying tickets within seconds regardless of my Web3 experience level.<br><br>Actions:<br>- Multi-Path Registration: Support registration via both traditional wallet connection (ID-1.2.1) and zkLogin social authentication (ID-1.2.2).<br>- Schema Design: Define the UserProfile struct in the Move smart contract, including fields for display_name, bio, and avatar_blob_id (detailed implementation in UPS-02.1.1).<br>- Decentralized Storage Integration: Implement Walrus Protocol integration for hosting profile avatars and media assets.<br>- Automatic Profile Creation: Trigger profile initialization automatically upon first wallet connection or zkLogin completion.<br>- Caching Layer: Configure a Suibase or custom indexer to cache profile data, preventing slow on-chain reads during page loads.<br>- Cross-Reference: Detailed profile creation flow specified in UPS-02.1.1; avatar management in UPS-02.1.3.<br><br>Deliverable: A unified registration architecture supporting multiple authentication methods with seamless profile initialization. |

---

## 1.2. Feature: Authentication Methods (ID-1.2)

### 1.2.1. Feature: Wallet Connection (ID-1.2.1)

| User Story Title | User Story Body |
| --- | --- |
| 1.2.1. Feature: Wallet Connection (ID-1.2.1) | As a Web3 power user, I want to connect my existing Sui-compatible wallet, so that I can maintain control over my assets and sign transactions using my preferred security setup.<br><br>Actions:<br>- Provider Integration: Implement the Sui Wallet Standard to support a wide range of browser extensions (Sui Wallet, Ethos, Surf).<br>- Connection Logic: Build a "Connect Wallet" modal that detects installed extensions and handles the sui:connect request.<br>- Session Management: Set up a listener for accountChange events to update the UI instantly if the user switches addresses in their extension.<br>- Message Signing: Implement a signPersonalMessage test to verify that the connected wallet can successfully produce valid cryptographic signatures.<br><br>Deliverable: A robust connection modal that displays the user's active SUI balance and ENS-style (.sui) name upon successful connection. |

---

### 1.2.2. Feature: Social Login Integration (ID-1.2.2)

| User Story Title | User Story Body |
| --- | --- |
| 1.2.2. Feature: Social Login Integration (ID-1.2.2) | As a mainstream user, I want to log in using my Google or Twitch account, so that I can access my tickets without needing to download a separate wallet extension.<br><br>Actions:<br>- OIDC Configuration: Set up the OpenID Connect (OIDC) client IDs for Google, Twitch, and Apple within the application dashboard.<br>- Redirect Handling: Build a custom redirect route that captures the id_token from the URL fragment and initiates the zkLogin proving flow.<br>- Fallback UI: Design a "Loading Experience" that masks the complexity of ZK-proof generation, keeping the user informed while the wallet is being prepared.<br>- Token Caching: Securely cache the ephemeral private key in sessionStorage to allow the user to sign multiple ticket purchases without re-logging.<br><br>Deliverable: A seamless login experience where a user transitions from a social "Sign-in" page directly to an active, funded event ticket marketplace. |

---

## Summary of Requirements

| Feature | ID | Status |
|---------|----|----|
| Seal Encryption Integration | ID-1.1.1 | Not Started |
| User Registration Flow | ID-1.1.2 | Not Started |
| Wallet Connection | ID-1.2.1 | Not Started |
| Social Login Integration | ID-1.2.2 | Not Started |
