# Base Unit of Effort - Definition and Usage Guide

## Executive Summary

**Base Unit Identified:** **21 Man-Hours**

**Numerical Value:** 21 man-hours = 1 Base Unit (BU)

**Three-Point Estimate Breakdown:**
- **Optimistic (Best Case):** 14 man-hours
- **Most Likely:** 21 man-hours
- **Pessimistic (Worst Case):** 28 man-hours
- **PERT Formula:** Expected = (4 × Most_Likely + Best_Case + Worst_Case) / 6
  - Calculation: (4 × 21 + 14 + 28) / 6 = 126 / 6 = **21 hours**

**Represents:** One week of focused development work by a single developer (approximately 3 working days of 7 productive hours, accounting for meetings, code review, and administrative overhead)

---

## Definition

### What is the Base Unit?

The **Base Unit (BU)** is defined as **21 man-hours** of development effort and represents the **minimum quantum of meaningful feature work** in the Ticketing Platform project. This unit encompasses:

- Requirements analysis and clarification
- Technical design and planning
- Implementation (coding)
- Unit testing
- Code review
- Integration testing
- Documentation
- Deployment preparation

### Three-Point Estimation Components

The 21-hour base unit is derived using the **PERT (Program Evaluation and Review Technique)** formula:

**Expected Time = (4 × Most_Likely + Best_Case + Worst_Case) / 6**

| Estimate Type | Hours | Scenario |
|---------------|-------|----------|
| **Best Case (Optimistic)** | 14 hours | Perfect conditions: No blockers, clear requirements, familiar technology, smooth integration |
| **Most Likely (Realistic)** | 21 hours | Normal conditions: Expected overhead, minor clarifications needed, standard review cycles |
| **Worst Case (Pessimistic)** | 28 hours | Complications: Technical challenges, integration issues, requirement changes, extended testing |

**PERT Calculation Verification:**
```
(4 × 21 + 14 + 28) / 6 = (84 + 14 + 28) / 6 = 126 / 6 = 21 hours ✓
```

### Why 21 Hours?

The 21-hour base unit reflects:
1. **One week calendar time** for a single developer (3 productive days × 7 hours)
2. **Realistic productivity accounting** for overhead (meetings, context switching, etc.)
3. **Natural feature granularity** in the blockchain/Web3 development domain
4. **AI-assisted development efficiency** gains reflected in the estimates

---

## Mathematical Consistency Validation

### Validation Against Work Items

| Work Item | Duration | Units | Verification |
|-----------|----------|-------|--------------|
| **UPS-02.1.3** - Avatar Upload | 21 hours | 1.0 BU | ✓ Single feature implementation |
| **UPS-02.1.1** - Badge Display | 21 hours | 1.0 BU | ✓ Single UI component |
| **INF-05.1.1** - Sui Network Setup | 21 hours | 1.0 BU | ✓ Infrastructure setup |
| **EMS-17.2.1** - Capacity Management | 21 hours | 1.0 BU | ✓ Basic business logic |
| **NFT-14.8.1** - SBT Contract | 21 hours | 1.0 BU | ✓ Simple smart contract |
| **EMS-17.1** - Event Creation | 42 hours | 2.0 BU | ✓ Multi-component feature |
| **INF-05.3.1** - Session Management | 42 hours | 2.0 BU | ✓ Complex infrastructure |
| **NFT-14.2.1** - Metadata Display (SIP-16) | 42 hours | 2.0 BU | ✓ Standards integration |
| **NFT-14.1.1** - Ticket NFT Move Contract | 65 hours | 3.1 BU | ✓ Complex contract with tests |
| **TS-18.1.5** - Transfer Policies | 65 hours | 3.1 BU | ✓ Complex policy system |
| **LRW-04.1.1** - Loyalty Token System | 128 hours | 6.1 BU | ✓ Complete subsystem |

### Distribution Analysis

From the 62 work items in MVP 1:

- **42 hours (2.0 BU):** Most common (24 occurrences, 38.7%)
- **21 hours (1.0 BU):** Second most common (10 occurrences, 16.1%)
- **65 hours (3.1 BU):** Third most common (5 occurrences, 8.1%)
- **Range-based estimates:** Approximately 16 items (25.8%)

**Mathematical Consistency:** 75%+ of all estimates are either exact multiples or close approximations (±10%) of the 21-hour base unit.

---

## How to Apply the Base Unit

### For New Work Items

When estimating a new feature or work item, follow this process:

#### Step 1: Identify Complexity Level

Classify the work item and assign an **integer Factor (1-8)**:

| Factor | Complexity Level | Man-Hours (Most Likely) | Example Work Items |
|--------|------------------|------------------------|-------------------|
| **1** | Minimal | 21 hours | Simple config, basic component, single API |
| **2** | Simple | 42 hours | CRUD operations, standard integration |
| **3** | Standard | 63 hours | Multi-step workflow, moderate complexity |
| **4** | Complex | 84 hours | Smart contract, complex business logic |
| **5** | Advanced | 105 hours | Multi-contract system, advanced algorithms |
| **6** | Large Subsystem | 126 hours | Multiple integrated components |
| **7** | Very Large | 147 hours | Complex platform module |
| **8** | Complete System | 168 hours | Full feature domain |

**Calculation is simple:**
- Best Case = Factor × 14
- Most Likely = Factor × 21
- Worst Case = Factor × 28

#### Step 2: Apply Adjustment Factors

Adjust the base Factor by adding integers based on complexity modifiers:

| Adjustment | Add to Factor | When to Apply |
|------------|---------------|---------------|
| **Unknown SDK** | +1 | First-time integration with undocumented SDK |
| **Novel Technology** | +2 | No team experience with the tech stack |
| **Complex Testing** | +1 | Requires extensive integration/E2E testing |
| **External Dependencies** | +1 | Waiting on third-party APIs or services |
| **Security Critical** | +1 | Requires security audit or formal verification |
| **Performance Sensitive** | +1 | Requires optimization and load testing |

**Example Calculation:**
```
Base Factor: 3 (Standard feature)
+ Unknown SDK: +1
+ Security Critical: +1
Total Factor: 5

Best Case = 5 × 14 = 70h
Most Likely = 5 × 21 = 105h
Worst Case = 5 × 28 = 140h
```

#### Step 3: Calculate Three-Point Estimate

Use the final Factor to calculate:

```
Best Case = Factor × 14 hours
Most Likely = Factor × 21 hours
Worst Case = Factor × 28 hours
```

**No need for complex decimals - just multiply!**

### Worked Examples

#### Example 1: QR Code Verification Feature
```
Base classification: Minimal (Factor 1)
Adjustments: None (well-understood technology)
Total Factor: 1

Calculation:
  Best Case:     1 × 14 = 14 hours
  Most Likely:   1 × 21 = 21 hours
  Worst Case:    1 × 28 = 28 hours
  
PERT Expected: (4×21 + 14 + 28) / 6 = 21 hours
```

#### Example 2: Multi-Signature Wallet Integration
```
Base classification: Complex (Factor 4)
Adjustments: 
  - Unknown SDK: +1
  - Security Critical: +1
Total Factor: 6

Calculation:
  Best Case:     6 × 14 = 84 hours
  Most Likely:   6 × 21 = 126 hours
  Worst Case:    6 × 28 = 168 hours
  
PERT Expected: (4×126 + 84 + 168) / 6 = 126 hours
  
Range: 84-168 hours
```

#### Example 3: Custom Payment Gateway
```
Base classification: Advanced (Factor 5)
Adjustments:
  - External Dependencies: +1
  - Complex Testing: +1
  - Security Critical: +1
Total Factor: 8

Calculation:
  Best Case:     8 × 14 = 112 hours
  Most Likely:   8 × 21 = 168 hours
  Worst Case:    8 × 28 = 224 hours
  
PERT Expected: (4×168 + 112 + 224) / 6 = 168 hours
  
Range: 112-224 hours
```

---

## Resource-Based Adjustments

The base unit assumes a **Mid-level developer** as the baseline. Adjust for other resource levels:

| Resource Level | Multiplier | Adjusted Hours per BU |
|----------------|------------|-----------------------|
| Junior (Jun) | 1.0-1.2× | 21-25 hours |
| Mid-level (Mid) | 1.0× | 21 hours |
| Senior (Sen) | 0.8-1.0× | 17-21 hours |
| Team Lead (Lead) | 0.7-0.9× | 15-19 hours |
| DevOps (DO) | 1.0× | 21 hours |

**Note:** Senior developers often tackle more complex work, so actual estimates may appear similar or higher despite faster execution, because they're assigned to inherently harder problems.

---

## Verification Checklist

When estimating new work, verify your estimate against these criteria:

- [ ] **Base unit identified:** Can you express the estimate as a multiple of 21 hours?
- [ ] **Complexity justified:** Does the unit count match the complexity level?
- [ ] **Comparisons made:** Have you compared to similar existing work items?
- [ ] **Adjustments documented:** Are all adjustment factors clearly stated?
- [ ] **Range provided:** For uncertain estimates, is a range (low-high) provided?
- [ ] **Resource match:** Does the estimate account for the assigned resource level?
- [ ] **Dependencies noted:** Are external dependencies that could affect timeline noted?

---

## Integration with Project Phases

Estimates should align with the project phase:

| Phase | Typical Work Item Complexity | Base Units Range |
|-------|----------------------------|------------------|
| **Alpha** | Infrastructure, core setup | 1.0-3.0 BU |
| **Beta** | Feature implementation | 2.0-4.0 BU |
| **RC (Release Candidate)** | Complex features, integrations | 3.0-6.0 BU |
| **Release** | Polish, reporting, analytics | 2.0-3.0 BU |

---

## Summary Formula

### PERT Three-Point Estimation

```
Expected Time = (4 × Most_Likely + Best_Case + Worst_Case) / 6

Where for Base Units:
  Best_Case = Base_Units × 14 hours
  Most_Likely = Base_Units × 21 hours
  Worst_Case = Base_Units × 28 hours
  
  Base_Units = Complexity_Level + Σ(Adjustment_Factors)
```

### Complete Calculation

```
1. Determine Base Factor (1-8):
   Factor = Complexity_Level (integer from table)

2. Add Adjustment Factors (integers):
   Final_Factor = Base_Factor + Σ(Adjustments)

3. Calculate Three-Point Estimates:
   Best_Case_Hours = Final_Factor × 14
   Most_Likely_Hours = Final_Factor × 21
   Worst_Case_Hours = Final_Factor × 28

4. Apply PERT Formula:
   Expected_Hours = (4 × Most_Likely + Best_Case + Worst_Case) / 6
   
5. Apply Resource Multiplier (if needed):
   Final_Estimate = Expected_Hours × Resource_Multiplier
   
6. Express as Range:
   Range = [Best_Case_Hours, Worst_Case_Hours]
```

### Quick Reference

| Factor | Best Case | Most Likely | Worst Case | PERT Expected |
|--------|-----------|-------------|------------|---------------|
| 1 | 14h | 21h | 28h | 21h |
| 2 | 28h | 42h | 56h | 42h |
| 3 | 42h | 63h | 84h | 63h |
| 4 | 56h | 84h | 112h | 84h |
| 5 | 70h | 105h | 140h | 105h |
| 6 | 84h | 126h | 168h | 126h |
| 7 | 98h | 147h | 196h | 147h |
| 8 | 112h | 168h | 224h | 168h |

**Mental Math Shortcuts:**
- **Best Case:** Factor × 14 (or Factor × 10 + Factor × 4)
- **Most Likely:** Factor × 21 (or Factor × 20 + Factor)
- **Worst Case:** Factor × 28 (or Factor × 30 - Factor × 2)

---

## Maintenance and Updates

This base unit definition should be reviewed and calibrated:
- **After Alpha phase:** Verify against actual time spent
- **After Beta phase:** Adjust multipliers based on team velocity
- **At RC milestone:** Final calibration before production estimates
- **Quarterly:** Update based on tooling improvements and team maturity

---

## Document Control

| Property | Value |
|----------|-------|
| **Version** | 1.0 |
| **Date** | February 3, 2026 |
| **Status** | Active |
| **Owner** | Project Management |
| **Review Cycle** | Quarterly |
| **Last Validated** | February 3, 2026 |

---

*This document provides the standardized estimation methodology for the Ticketing Platform on Walrus project. All estimates should be traceable to this base unit for consistency and predictability.*
