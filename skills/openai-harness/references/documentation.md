# Write and maintain repository documentation

Read existing repository conventions and the relevant source before writing. This guide supplies
default document responsibilities; adapt destinations to the established repository layout.

## Choose the owner

| Document                | Question it answers                                     | Appropriate content                                                                          |
| ----------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| README                  | What is this and how do I use or develop it?            | Introduction, setup, commands, delivery pointers                                             |
| AGENTS                  | Where should a contributor look and what rules apply?   | Repository map, essential constraints, action-oriented doc pointers                          |
| Architecture            | What are the major parts and how do they work together? | System context, components, dependencies, boundaries, state/runtime ownership, key rationale |
| Current subsystem guide | How does this subsystem work today?                     | Detailed internal model, important flows and invariants, implementation entry points         |
| Product spec            | What should the user experience?                        | Concepts, workflows, acceptance criteria, user-visible failures and limits                   |
| Engineering guide       | What conventions and guarantees must changes preserve?  | Applicable rules, rationale, enforcement, practical limits                                   |
| Design doc              | Why and how is a specific change being made?            | Problem, proposed approach, decisions, alternatives, tradeoffs, affected contracts           |
| Execution plan          | What work remains and what evidence shows progress?     | Concrete phases, steps, decisions, progress, validation and blockers                         |
| Quality scorecard       | Where does quality stand and what needs attention?      | Grading rubric, current domain/layer grades, concise rationale, priority improvements        |
| Debt tracker            | What unresolved work needs follow-up?                   | Concrete gaps, impact, and actionable follow-up                                              |

Update the owner of a fact in place. Other docs should summarize only what helps their reader and
link to the owner for details. Existing content in the wrong file is a reason to relocate it within
an authorized documentation repair, not a reason to perpetuate the mismatch.

Apply the [entrypoint scope rules](../SKILL.md#select-the-requested-work) when creating artifacts.
A requested documentation repair may create current guides when existing destinations cannot
hold the content coherently.

## Architecture and subsystem explanations

Start with the system context and major components. Explain how components communicate, who owns
runtime resources and authoritative state, what persists, and why important boundaries exist.
Use representative flows when they clarify the structure.

A process diagram alone does not describe the whole architecture. In an Electron client, for
example, explain both main/preload/renderer boundaries and the product subsystems within main and
renderer. Distinguish shared infrastructure from independently owned runtimes.

Keep directory listings and class names subordinate to this explanation. Link to source entry
points to help navigation. Detailed algorithms, settings defaults, timer values, UI copy, and
feature acceptance criteria belong in their respective current guides or product specs. Build
instructions belong with development guidance; architecture can explain build constraints that
affect the system structure.

## Product behavior and change history

Describe product behavior from the user's perspective: what they do, what the product responds
with, and how they recognize success or recover from failure. Define ambiguous terms. Include
observable acceptance criteria; move internal contracts and component choices to technical docs.

Separate proposed changes from implemented behavior. An existing Active spec should make planned
changes explicit until delivered, rather than silently describing an unavailable feature as
current. A new spec can remain Draft while behavior is unsettled or undelivered.

Design docs explain the problem, chosen approach, and significant decisions for a particular
change. State facts and connect them to the constraints or tradeoffs they create. Include source
links, relevant versions, assumptions, and validation gaps where they help assess a decision.
Describe proposed validation as work still to do. Present completed checks and prototype findings
using the [evidence guidance](#evidence-and-maintenance).

Implementation detail should be sufficient for assessing the design and important tradeoffs;
exhaustive code dumps and file-by-file patch narratives age quickly. Omit irrelevant sections in
an instantiated document; reusable templates follow the
[template-copying rules](setup.md#template-copying).

Completed design docs and plans preserve history. Maintain current explanations in living docs
so readers need not reconstruct today's system by reading successive completed changes. Correct
historical links or add a supersession pointer when needed; retain the original decision context.

## Quality scorecards

`QUALITY_SCORE.md` is a concise, current scorecard of quality across product domains and
architectural layers. It owns the grading rubric, current grades and rationale, and priority
improvements. Use the [quality guidance](quality.md) to assess and maintain it. Detailed validation
results belong in execution plans, CI, or dedicated validation records; unresolved work belongs
in the debt tracker.

## Diagram defaults

When a repository has no diagram conventions, use Mermaid for relationships that are clearer
visually. Select the diagram from what needs explaining:

| Relationship                                             | Diagram                     |
| -------------------------------------------------------- | --------------------------- |
| Components, dependencies, domains, or process boundaries | Graph or block diagram      |
| Ordered interaction among several participants           | Sequence diagram            |
| Branches, decisions, or validation paths                 | Flowchart                   |
| Constrained lifecycle transitions                        | State diagram               |
| Entities and cardinality                                 | Entity-relationship diagram |
| Temporal phases, dependencies, or parallel work          | Gantt or timeline           |

Use tables for lookup/comparison, prose for rationale, numbered lists for short sequences, and code
blocks for signatures or examples. A diagram should express a meaningful relationship, use named
project concepts, be understandable with its nearby explanation, and avoid volatile implementation
detail. Check that labels and arrows agree with the actual design. Diagrams need the same factual
maintenance as prose.

## Evidence and maintenance

Verify current claims against source, configuration, tests, or an identified external source.
State the relevant behavior directly and distinguish requirements, proposals, implemented
guarantees, and known gaps. Routine verification does not need a narrated inspection history.

Keep evidence with the claim or decision it supports, using the form appropriate to the document:

| Document                     | Evidence to include                                                                                  |
| ---------------------------- | ---------------------------------------------------------------------------------------------------- |
| Current guides               | Supporting links, relevant versions, and concise limitations or assumptions affecting current claims |
| Design docs                  | Supporting sources, decision-relevant results, their design implications, and unresolved limitations |
| Execution-plan progress logs | Dated work, checks performed, results, and remaining validation or blockers                          |
| Quality scorecards           | Assessment date, concise grade rationale and relevant limits; supporting links when useful           |
| Validation records           | Date, applicable version/revision, method or commands, results, and limits of what is proven         |

Concise prototype or feasibility findings can stay in a design doc when they help assess a
decision. Identify the tested versions/environment and relevant date, summarize the method and
results, and explain their design implications and untested limits. Distinguish prototype
findings from validation of the implemented product.

Use a separate evidence record when substantial detail would obscure the design or needs an
independently maintained artifact; follow repository conventions and link it from the design.
Include dates in explanatory prose when time affects the meaning or reliability of a claim.
Do not create extra documents just to log routine source reading.
Use the [validation-evidence guidance](engineering.md#make-behavior-inspectable) when assessing
coverage.

- Prefer small, focused updates. Reuse the appropriate existing document and remove duplicated
  assertions as content is consolidated.
- Follow established heading/status conventions and the user's preferred reference format. In
  design-doc and execution-plan indexes and a plan's **Design Doc** field, plain or backticked paths
  and clickable relative links are equally valid; preserve the existing style when no preference
  is given. Use descriptive labels for Markdown links. Fix affected links and plain path references
  when moving a file.

Use the [drift audit](engineering.md#reconcile-drift) for requested documentation maintenance.
Workflow-specific update and archive steps are in [workflow guidance](workflow.md).
