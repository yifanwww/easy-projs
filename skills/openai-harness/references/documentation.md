# Write and maintain repository documentation

Read existing repository conventions and the relevant source before writing. This guide supplies
default document responsibilities; adapt destinations to the established repository layout.

## Choose the owner

| Document                | Question it answers                                     | Appropriate content                                                                             |
| ----------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| README                  | What is this and how do I use or develop it?            | Introduction, setup, commands, delivery pointers                                                |
| AGENTS                  | Where should a contributor look and what rules apply?   | Repository map, essential constraints, action-oriented doc pointers                             |
| Architecture            | What are the major parts and how do they work together? | System context, components, dependencies, boundaries, state/runtime ownership, key rationale    |
| Current subsystem guide | How does this subsystem work today?                     | Detailed internal model, important flows and invariants, implementation entry points            |
| Product spec            | What should the user experience?                        | Concepts, workflows, acceptance criteria, user-visible failures and limits                      |
| Engineering guide       | What conventions and guarantees must changes preserve?  | Applicable rules, rationale, enforcement, practical limits                                      |
| Testing guide           | How do I test a change, and what do the checks prove?   | Test environments and placement, conventions, commands, prerequisites and evidence limits       |
| Design doc              | Why and how is a specific change being made?            | Problem, approach, feasibility evidence, decisions, alternatives, tradeoffs, affected contracts |
| Execution plan          | What work remains and what evidence shows progress?     | Development and testing of the accepted design, progress, validation evidence and blockers      |
| Quality scorecard       | Where does quality stand and what needs attention?      | Grading rubric, current domain/layer grades, concise rationale, priority improvements           |
| Debt tracker            | What unresolved work needs follow-up?                   | Concrete gaps, impact, and actionable follow-up                                                 |

Update the owner of a fact in place. Other docs should summarize only what helps their reader and
link to the owner for details. Existing content in the wrong file is a reason to relocate it within
an authorized documentation repair, not a reason to perpetuate the mismatch.

Apply the skill's scope rules when creating artifacts. A requested documentation repair may create
current guides when existing destinations cannot hold the content coherently.

A testing guide such as `docs/TESTING.md` owns current testing practice. Follow the
[testing guidance](engineering.md#document-testing-practice) when writing or reviewing it. Keep
reliability requirements in their engineering owner, quality grades in the scorecard, unresolved
coverage work in the debt tracker and past run results in validation records. Link from AGENTS and
related guides, replacing duplicated testing detail within the authorized scope.

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

### Product behavior and specification status

Describe product behavior from the user's perspective: what they do, what the product responds
with, and how they recognize success or recover from failure. Define ambiguous terms. Include
observable acceptance criteria; move internal contracts and component choices to technical docs.

Separate proposed changes from implemented behavior. An existing Active spec should make planned
changes explicit until delivered, rather than silently describing an unavailable feature as
current. A new spec can remain Draft while behavior is unsettled or undelivered.

### Design content and boundaries

Design docs explain the problem, chosen approach, and significant decisions for a particular
change. Present the current understanding and rationale coherently, whether research happened
before drafting or between revisions. Integrate research findings as background, constraints,
and implications for the design. When a finding changes an assumption, rewrite the affected
explanation and decisions instead of appending dated corrections or a discovery narrative.
Preserve significant alternatives and why they were rejected when they help explain the choice.

Keep execution status, implementation progress, validation commands/results, and future
implementation tests or delivery acceptance procedures out of design docs. This boundary applies
to prose as well as checklists, including sections called "Validation Approach" or "Test Strategy."
Design docs may explain why available evidence supports a decision and what its limits are;
prescribing future delivery verification belongs in execution plans or validation records.
Design status metadata records the design's acceptance or disposition, not a progress report;
do not add execution-status commentary when accepting a design or linking a plan.

Implementation detail should be sufficient for assessing the design and important tradeoffs;
exhaustive code dumps and file-by-file patch narratives age quickly. Omit irrelevant sections in
an instantiated document; reusable templates follow the
[template-copying rules](setup.md#template-copying).

### Feasibility evidence and readiness

State relevant facts directly and connect them to the constraints or tradeoffs they create.
Include supporting source links, relevant versions, assumptions, and unresolved limitations
where they help assess a decision. Distinguish blocking feasibility questions from pending tests
of the finished implementation. Resolve the former before acceptance under the
[design-readiness criteria](../workflows/design-change.md#design-readiness). Keep the resulting feasibility
evidence and constraints in the design; track implementation and acceptance checks in the execution
plan. Execution plans develop and test that settled solution.
Use the [evidence guidance](#design-research-and-feasibility-evidence) to
retain appropriate support without turning the design into an investigation log.

### Historical records and current documentation

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

### Evidence by document type

Verify current claims against source, configuration, tests, or an identified external source.
State the relevant behavior directly and distinguish requirements, proposals, implemented
guarantees, and known gaps. Routine verification does not need a narrated inspection history.

Keep evidence with the claim or decision it supports, using the form appropriate to the document:

| Document                     | Evidence to include                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------ |
| Current guides               | Supporting links, relevant versions, and concise limitations or assumptions affecting current claims   |
| Design docs                  | Research-informed background, supporting sources, design constraints and rationale, unresolved limits  |
| Execution-plan progress logs | Latest phase validation, meaningful fixes, deviations, findings, blockers, and distinct human evidence |
| Quality scorecards           | Assessment date, concise grade rationale and relevant limits; supporting links when useful             |
| Validation records           | Date, applicable version/revision, method or commands, results, and limits of what is proven           |

### Execution-plan progress logs

In execution plans, checkboxes record completed work. Progress logs add evidence and context that
the checklist does not provide: checks performed and their results, deviations, findings, blockers,
remaining validation, and partial progress needed to resume safely. Reference phase or step numbers
instead of restating their descriptions. Omit implementation summaries and next-step reminders
already apparent from the checklist. Record significant decisions and rationale in Decisions.

Keep one consolidated entry per phase, newest phase first, and update it in place during
development. Merge related fixes and remove superseded details instead of appending an entry for
every change. Preserve only information that adds to the checklist and Decisions section. Plan
creation alone needs no log entry; its date and baseline belong in the plan's metadata.

Keep the latest result of each applicable check within each phase, with the tested revision/worktree,
commands, outcomes and evidence limits. A rerun supersedes the earlier result of that check, not
the results of different checks. When a retained result predates later code changes, identify that
scope and explain why it still applies, or leave the affected validation pending. Remove resolved
intermediate failure results; retain a concise finding and fix when it explains a meaningful
deviation or limitation. Finalize the phase's evidence at its delivery boundary before starting
the next phase; a later phase's results do not replace earlier phases' delivery evidence.

Keep human reports separate from automated results and preserve their actual scope and limits;
do not infer coverage from checks the user did not enumerate or supply an unreported build identity.

When a passing full suite covers the focused tests on the same final code state, record only the
full-suite result; omit separate focused-test commands, counts, and passing results. Retain focused
results only when full validation is incomplete or they provide distinct findings or blockers.

Before handing off the increment, review the entry against these rules. Remove checklist
narration, redundant focused passes and next-step/status reminders; retain results and findings
that explain what the evidence establishes and what remains unverified.

Keep writing conventions in repository documentation guidance and skill references. Individual
plans contain the change's work and evidence; do not insert progress-log maintenance rules into
them. Templates may contain placeholders, which should be replaced by change-specific content.

### Design research and feasibility evidence

For design docs, express prototype or feasibility findings as the behavior or constraint learned
and its implications for the proposed approach. Include tested versions, environment, or method
only when needed to understand the finding's applicability or uncertainty. Distinguish prototype
findings from validation of the implemented product; do not imply broader guarantees than the
research supports.

Detailed commands, probe outputs, investigation chronology, and corrected earlier interpretations
belong in a separate research or validation record when retaining them has lasting value or the
user requests that record. Follow repository conventions and link it from the design when useful.
Do not create extra documents just to log routine source reading. Include dates in explanatory
prose only when time affects the meaning or reliability of a claim.
Use the [validation-evidence guidance](engineering.md#make-behavior-inspectable) when assessing
coverage.

### Documentation maintenance

- Prefer small, focused updates. Reuse the appropriate existing document and remove duplicated
  assertions as content is consolidated.
- Index summaries describe the linked document's purpose and scope. Update them when that
  description becomes inaccurate or the scope changes. A status change alone does not require
  rewriting the summary. Keep execution progress, validation results and blockers in the owning
  document.
- Follow established heading/status conventions and the user's preferred reference format. In
  design-doc and execution-plan indexes and a plan's **Design Doc** field, plain or backticked paths
  and clickable relative links are equally valid; preserve the existing style when no preference
  is given. Use descriptive labels for Markdown links. Fix affected links and plain path references
  when moving a file.

Use the [drift audit](engineering.md#reconcile-drift) for requested documentation maintenance.
Workflow-specific update and archive steps are in [workflow guidance](workflow.md).
