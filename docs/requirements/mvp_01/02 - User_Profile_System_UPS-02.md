# 02-User Profile System (UPS-02)

## 02 Overview
This document defines requirements for user profile creation, authentication flows, attendance history, and profile enhancement within the Ticketing Platform on Walrus.

---

## 2.1. Feature: Profile Creation (UPS-02.1)

### 2.1.1. Feature: Register Profile Flow (UPS-02.1.1)

| User Story Title | User Story Body |
| --- | --- |
| 2.1.1. Feature: Register Profile Flow (UPS-02.1.1) | User Story: As a new user, I want a seamless registration flow that initializes my on-chain identity, so that I can begin interacting with the marketplace and accumulating event history.<br><br>Actions:<br>- Schema Design: Define the UserProfile struct in the Move smart contract with the key ability, ensuring it is a unique object owned by the user's address.<br>- Initialization Logic: Implement a create_profile function in Move that generates a new UID and transfers the object to the transaction sender.<br>- Frontend Workflow: Build a "Welcome" onboarding screen that triggers the transaction when the user first connects their wallet (ID-1.2.1) or logs in via zkLogin (ID-1.2.2).<br>- On-chain Anchoring: Provide optional support to link the profile to a SuiNS (.sui) name if one is detected in the wallet.<br>- Cross-Reference: This is the canonical implementation of the registration architecture defined in ID-1.1.2.<br><br>Deliverable: A deployed smart contract that creates a permanent, non-transferable UserProfile object for every new user. |

---

### 2.1.3. Feature: Avatar (Optional) (UPS-02.1.3)

| User Story Title | User Story Body |
| --- | --- |
| 2.1.3. Feature: Avatar (Optional) (UPS-02.1.3) | User Story: As a user, I want to upload an optional profile picture, so that I am easily recognizable within the event community and attendee lists.<br><br>Actions:<br>- Decentralized Storage: Integrate the Walrus Protocol to host the image file, ensuring the avatar is decentralized and highly available.<br>- Blob Linking: Store the avatar_blob_id as an optional field within the UserProfile struct.<br>- Image Processing: Build a frontend utility to crop and compress images to a standard resolution before uploading to Walrus to minimize storage costs.<br>- Fallback Logic: Implement a default "identicon" renderer for profiles that choose not to upload a custom avatar.<br><br>Deliverable: An avatar management system that links high-resolution media on Walrus to the user’s on-chain profile object. |

---

## 2.2. Feature: Authentication (UPS-02.2)

### 2.2.1. Feature: Authenticate User Flows (UPS-02.2.1)

| User Story Title | User Story Body |
| --- | --- |
| 2.2.1. Feature: Authenticate User Flows (UPS-02.2.1) | User Story: As a returning user, I want a secure authentication process that recognizes my existing profile, so that I can access my private dashboard and purchased tickets instantly.<br><br>Actions:<br>- Session Handshake: Implement a "Sign Message" flow where the user signs a unique nonce to prove ownership of the address without incurring a gas fee.<br>- Profile Resolution: Develop a backend query that checks for the existence of a UserProfile object associated with the authenticated address.<br>- zkLogin Persistence: Map the OpenID Connect (OIDC) sub-claim to the user’s Sui address to allow seamless login across devices.<br>- Route Guarding: Build React "Protected Routes" that redirect unauthenticated users to the login page when attempting to access private profile data.<br><br>Deliverable: A secure authentication gateway that grants users access to their personalized experience based on cryptographic proof. |

---

## 2.3. Feature: Attendance History (UPS-02.3)

### 2.3.1. Feature: Attendance History (UPS-02.3.1)

| User Story Title | User Story Body |
| --- | --- |
| 2.3.1. Feature: Attendance History (UPS-02.3.1) | User Story: As a frequent attendee, I want a permanent record of every event I've participated in, so that I can build a "Proof of Experience" resume over time.<br><br>Actions:<br>- Dynamic Field Mapping: Utilize Sui Dynamic Fields to attach a list of EventRecord objects to the main UserProfile struct as they occur.<br>- Atomic Logging: Configure the ticket redemption function to automatically push a reference of the event to the user's attendance history at the moment of check-in.<br>- Privacy Controls: Add a flag to the profile allowing users to toggle their attendance history between "Public" and "Private" viewability.<br>- Cross-Reference: Integrates with AM-3.1.1 (Check-in redemption) and AM-3.2.1 (Attendance Badge minting).<br><br>Deliverable: A "My Journey" timeline on the user profile that displays a chronological list of all past attended events. |

---

## 2.4. Feature: Profile Enhancement (UPS-02.4)

### 2.4.1. Feature: Badge System (UPS-02.4.1)

| User Story Title | User Story Body |
| --- | --- |
| 2.4.1. Feature: Badge System (UPS-02.4.1) | User Story: As an achiever, I want to display earned Soulbound Token (SBT) badges on my profile, so that I can visually signal my expertise and status within the community.<br><br>Actions:<br>- SBT Integration: Implement a "Trophy Case" feature that scans the user's address for non-transferable badges issued by the platform.<br>- Visual Standards: Implement Sui Object Display standard for badges that maps different tier levels to 3D models or animated SVGs hosted on Walrus.<br>- Verifiable Credentials: Ensure each badge includes a link to the original event minting transaction to provide proof of authenticity.<br>- Cross-Reference: Integrates with AM-3.2.1 (Attendance Badge minting).<br><br>Deliverable: A visual badge gallery on the user profile that showcases earned non-transferable achievements. |

---

## Summary of Requirements

| Feature | ID | Status |
|---------|----|----|
| Register Profile Flow | UPS-02.1.1 | Not Started |
| Avatar (Optional) | UPS-02.1.3 | Not Started |
| Authenticate User Flows | UPS-02.2.1 | Not Started |
| Attendance History | UPS-02.3.1 | Not Started |
| Badge System | UPS-02.4.1 | Not Started |
