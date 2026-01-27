# 02-User Profile System (UPS-02)

## 02 Overview
This document defines requirements for user profile creation, authentication flows, attendance history, and profile enhancement within the Ticketing Platform on Walrus.

---

## 2.1. Feature: Profile Creation (UPS-02.1)

### 2.1.1. Feature: Register Profile Flow (UPS-02.1.1) - **[CONSOLIDATED]**

| User Story Title | User Story Body | Estimate |
| --- | --- | --- |
| 2.1.1. Feature: Register Profile Flow (UPS-02.1.1) | User Story: As a new user, I want a seamless registration flow that initializes my on-chain identity, so that I can begin interacting with the marketplace and accumulating event history.<br><br>**Stack-Provided Features:**<br>- Sui object ownership model (key ability, UID generation)<br>- Sui address-based access control<br>- SuiNS name resolution (optional)<br><br>**Custom Development Required:**<br>- Define UserProfile struct in Move with required fields (name, email, metadata)<br>- Implement create_profile transaction function<br>- Build "Welcome" onboarding screen component<br>- Connect to wallet context (ID-1.2.1) and social login (ID-1.2.2)<br>- Transaction signing and execution<br>- Error handling and validation<br>- Testing<br><br>**Deliverable**: A deployed smart contract that creates a permanent, non-transferable UserProfile object for every new user. | **22-28 hours** |

**Audit Note**: Consolidated from ID-1.1.2 (User Registration System Architecture, 42 hrs). This represents the canonical implementation reference for user registration from the Identity module.

---

### 2.1.3. Feature: Avatar (Optional) (UPS-02.1.3)

| User Story Title | User Story Body | Estimate |
| --- | --- | --- |
| 2.1.3. Feature: Avatar (Optional) (UPS-02.1.3) | User Story: As a user, I want to upload an optional profile picture, so that I am easily recognizable within the event community and attendee lists.<br><br>**Stack-Provided Features:**<br>- Walrus SDK handles upload/download operations<br>- Blob ID storage and retrieval infrastructure<br><br>**Custom Development Required:**<br>- Build image crop and resize UI component<br>- Implement compression pipeline before upload<br>- Create avatar_blob_id field in UserProfile struct<br>- Build fallback "identicon" generator for users without avatars<br>- Testing and error handling<br><br>**Deliverable**: An avatar management system that links high-resolution media on Walrus to the user's on-chain profile object. | **20-28 hours** |

---

## 2.2. Feature: Authentication (UPS-02.2)

**Note**: Authentication flows consolidated into ID-1.2: Authentication Methods. See Identity module (01 - Identity_and_Authentication_ID-01.md) for implementation details on wallet connection (ID-1.2.1) and social login integration (ID-1.2.2).

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

| Feature | ID | Estimate | Status |
|---------|----|----|---|
| Register Profile Flow | UPS-02.1.1 | 22-28 hours | Not Started |
| Avatar (Optional) | UPS-02.1.3 | 20-28 hours | Not Started |
| Authentication Methods | UPS-02.2 | See ID-1.2 | Not Started |
| Attendance History | UPS-02.3.1 | TBD | Not Started |
| Badge System | UPS-02.4.1 | TBD | Not Started |

**Total Module Hours**: **42-56 hours** (excluding features to be estimated)
