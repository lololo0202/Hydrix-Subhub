---
arc: 33
title: xGov Pilot - Becoming an xGov
description: Explanation on how to become Expert Governors.
author: Stéphane Barroso (@SudoWeezy), Adriana Belotti, Massimo Morini, Michel Treccani, John Woods, Shai Halevi
discussions-to: https://github.com/algorandfoundation/ARCs/issues/
status: Deprecated
type: Meta
created: 2022-11-22
---

## Abstract
This ARC proposes a standard for achieving xGov status in the Algorand governance process. xGov status grants the right to vote on [ARC-34](./arc-0034.md) proposals raised by the community, specifically spending a previously specified amount of Algo in a given Term on particular initiatives.


## Specification
The key words "**MUST**", "**MUST NOT**", "**REQUIRED**", "**SHALL**", "**SHALL NOT**", "**SHOULD**", "**SHOULD NOT**", "**RECOMMENDED**", "**MAY**", and "**OPTIONAL**" in this document are to be interpreted as described in <a href="https://www.ietf.org/rfc/rfc2119.txt">RFC-2119</a>.

<table>
<thead>
  <tr>
    <th colspan="2">Algorand xGovernor Summary</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Enrolment</td>
    <td colspan="2">At the start of each governance period</td>
  </tr>
  <tr>
    <td>How to <br>become eligible</td>
    <td>Having completed participation in the previous governance period through official or approved decentralized finance governance.</td>
  </tr>  <tr>
    <td>Requisite</td>
    <td colspan="2">Commit of governance reward for one year</td>
  </tr>
  <tr>
    <td>Duration</td>
    <td colspan="2">1 Year</td>
  </tr>
  <tr>
    <td>Voting Power</td>
    <td colspan="2">1 Algo committed = 1 Vote, as per REWARDS DEPOSIT</td>
  </tr>
  <tr>
    <td>Duty</td>
    <td colspan="2">Spend all available votes each time a voting period occurs. (In case there is no proposal that aligns with an xGov's preference, a mock proposal can be used as an alternative.)</td>
  </tr>
  <tr>
    <td rowspan="1">Disqualification</td>
    <td colspan="2">Forfeit rewards pledged</td>
  </tr>
</tbody>
</table>

### What is an xGov?
xGovs, or Expert Governors, are a **self-selected** group of decentralized decision makers who demonstrate an enduring commitment to the Algorand community, possess a deep understanding of the blockchain’s inner workings and realities of the Algorand community, and whose interests are aligned with the good of the Algorand blockchain. These individuals have the ability to participate in the designation **and** approval of proposals, and play an instrumental role in shaping the future of the Algorand ecosystem.

### Requirement to become an xGov
To become an xGov, or Expert Governor, an account:
- **MUST** first be deemed eligible by having fully participated in the previous governance period, either through official or approved decentralized finance governance.
- At the start of each governance period, eligible participants will have the option to enrol in the xGov program
- To gain voting power as an xGov, the eligible **governor rewards for the period of the enrolment** **MUST** be committed to the xGov Term Pool and locked for a period of 12 months.
> Only the GP rewards are deposited to the xGov Term Pool. The principal algo committed remains in the gov wallet (or DeFi protocol) and can be used in subsequent Governance Periods.

Rewards deposited to the xGov Term Pool will be call **REWARDS DEPOSIT**.

### Voting Power
Voting power in the xGov process is determined by the amount of Algo an eligible participant commits. Voting power is 1 Algo = 1 Vote, as per REWARDS DEPOSIT, and it renews at the start of every quarter - provided the xGov remain eligible.
This ensures that the weight of each vote is directly proportional to the level of investment and commitment to the Algorand ecosystem.

### Duty of an xGov
As an xGov, you **MUST** actively participate in the governance process by using all available votes amongst proposals each time a voting period occurs. If you don't do it, you will be disqualified.
> eg. For 100 Algo as per REWARDS DEPOSIT, 100 votes available, they can be spent like this:
> - 50 on proposal A
> - 20 on proposal B
> - 30 on proposal C
> - 0 on every other proposal

> In case no proposal aligns with an xGov's preference, a mock proposal can be used as an alternative.

### Disqualification
As an xGov, it is important to understand the importance of your role in the governance process and the responsibilities that come with it. Failure to do so will result in disqualification. The consequences of disqualification are significant, as the xGov will lose the rewards that were committed when they entered the xGov process. It is important to take your role as an xGov seriously and fulfill your responsibilities to ensure the success of the governance process.

> The rewards will remain in the xGov reward pools & will be distributed among remaining xGovs

## Rationale
This proposal provides a clear and simple method for participation in xGov process, while also providing incentives for long-term commitment to the network. Separate pools for xGov and Gov allow for a more diverse range of participation, with the xGov pool providing an additional incentive for longer-term commitment. The requirement to spend 100% of your vote on proposals will ensure that participants are actively engaged in the decision-making process.

After weeks of engagement with the community, it has been decided:
- That the xGov process will not utilize token or NFT.
- There will be no minimum or maximum amount of Algo required to participate in the xGov process
- In the future, the possibility of node operation being considered as a form of participation eligibility is being explored
This approach aims to make the xGov process accessible and inclusive for all members of the community.

We encourage the community to continue to provide input on this topic through the submission of questions and ideas in this ARC document.

> **Important**:  The xGov program is still a work in progress, and changes are expected to happen over the next few years with community input and design consultation. Criteria to ENTER the program will only be applied forward, which means Term Pools already in place will not be affected by new any NEW ENTRY criteria. However, other ELIGIBILITY criteria could be added and be applied to all pools. For example, if the majority of the community deems necessary to have more than 1 voting session per quarter, this type of change could be applied to all Term pools, given ample notice and time for preparation.

## Security Considerations
No funds need to leave the user's wallet in order to become an xGov.

## Copyright
Copyright and related rights waived via <a href="https://creativecommons.org/publicdomain/zero/1.0/">CCO</a>.
