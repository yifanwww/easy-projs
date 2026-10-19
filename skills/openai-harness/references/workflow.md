# Explicitly requested change workflow

Apply the [entrypoint scope rules](../SKILL.md#select-the-requested-work) to select the requested
stages, then use their procedures below.

## Determine scope

Read the user's request and any named artifact. Check relevant indexes for related current work
when needed. Do not infer that an unrelated Active plan should be resumed just because it exists.

| Request                               | Authorized work                                                                                                               |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Draft/update a spec                   | Product definition and its index; report open decisions                                                                       |
| Design a change in a document         | Design artifact and its index                                                                                                 |
| Create a repository execution plan    | Plan artifact and its index; accept the associated design and update its index                                                |
| Implement a named plan/design         | Implementation within the [execution scope](#execute-authorized-work), current-doc updates, validation, and artifact progress |
| Follow the change workflow end to end | Appropriate artifacts and execution scope, validation, current-doc reconciliation, and eligible close-out                     |
| Close/archive a change                | Verify completion and reconcile documentation/statuses/links; archive eligible records                                        |

Respect requested stage boundaries. Drafting a spec does not authorize implementing it. Creating
an execution plan records a design that meets the [readiness criteria](#design-readiness) as
`Accepted`; it does not grant implementation authority. Resolve material design decisions and
feasibility questions before creating the plan.
Ask a focused question only when an unresolved decision materially changes the requested outcome.

Read [documentation guidance](documentation.md) for the artifacts being written. Use repository
templates and statuses; use the skill's defaults only when the repository has none.

## Define product behavior when requested

Find an existing spec by feature rather than creating a duplicate for every change. Write its
content using [product-behavior guidance](documentation.md#product-behavior-and-change-history).

In the default layout, use `docs/product-specs/<feature>.md`; living specs have no date prefix.
Update the appropriate Draft/Active/Deprecated index entry and the Last Updated date. A proposed
update to an Active spec must visibly distinguish planned behavior from shipped behavior.

A product spec is useful for new or revised user-facing behavior. An internal change may have no
spec. A user requesting only a design or plan does not implicitly request a new spec.

## Design when requested

Read relevant product context, architecture, constraints, and code. Explain the problem, chosen
approach, state and interface changes, ownership, significant alternatives, tradeoffs, and limits.
Capture assumptions that affect the design. Omit irrelevant template sections.

In the default layout, create `docs/design-docs/active/YYYY-MM-DD-<change>.md` as Draft and add an
entry in the active index using the user's preferred reference format or the existing index style
(plain or backticked path, or clickable relative link). Reuse an existing matching design when
updating it. Keep the creation date stable.

### Design readiness

Before acceptance, resolve feasibility questions whose answers could invalidate the chosen approach
or materially change its behavior, contracts, or ownership. Use evidence appropriate to the
uncertainty: source inspection, authoritative documentation, or a bounded prototype or experiment.
Runtime experiments are not mandatory when existing evidence establishes the required behavior.
Record the resulting constraints, rationale, and meaningful evidence limits in the design.

Keep the design Draft while a blocking feasibility question remains. Tests of the finished
implementation and native acceptance checks can remain pending; they verify delivery of the agreed
solution. A request for an execution plan does not establish feasibility or turn an unresolved
design into an accepted one. Resolve prerequisites within the authorized scope, or report the
specific design gap without creating an executable plan that depends on a feasibility phase.

## Plan when requested

Every execution plan must reference an existing design doc in its **Design Doc** field. Use a plain
or backticked path or a clickable relative link, following the user's preference or existing style.
Resolve the named design or a matching design from the task context, read it, and inspect the
affected code.
If none exists, establish the design before writing the execution plan; do not omit the field or
reference a nonexistent placeholder. Keep that prerequisite within the authorized task scope and
resolve material design questions before planning. Link any related spec rather than copying it.

Use the accepted design as the implementation baseline. When creating the execution plan, confirm
the design meets the readiness criteria above, then mark an associated Draft design `Accepted`,
update its Last Updated date, and set its design-index entry to the same status. Keep an already
Accepted or Implemented design's status when its baseline remains valid; an existing status alone
does not resolve a demonstrated feasibility gap. Creating only a design doc leaves it Draft.

Group work into phases that deliver coherent behavior and preserve a valid codebase. For changes
across process boundaries, prefer an end-to-end capability increment over separate type/backend/UI
phases. Write concrete development and testing steps, meaningful validation, dependencies, and
completion conditions. Validation phases establish that the implemented solution follows the
accepted design and meets acceptance criteria. Resolve questions about whether the chosen approach
is viable during design rather than scheduling them as execution prerequisites.

Write steps around outcomes, important constraints, and completion conditions. Inspect affected
source before planning, but include source references only when they resolve execution or review
ambiguity, such as an owning contract, an unusual integration point, or a migration target. Avoid
file inventories, routine wiring lists, and inspection summaries. Link to the relevant design
section instead of repeating its implementation reasoning, APIs, or detailed behavior rules.
Keep validation commands, results, blockers, and remaining human checks concrete; selective source
references should not make the work or its completion criteria vague.

Order phases by actual dependencies and logical increments; the appropriate sequence depends on
the task. Put documentation updates in the increment that changes the facts they describe. Add a
final consolidation phase only when work remains that benefits from one.

In the default layout, create `docs/exec-plans/active/YYYY-MM-DD-<change>.md` with status Active,
and update its index using the same reference-format guidance as the design index. Reference the
required design in the plan's **Design Doc** field using the format described above. Present the plan
and the relevant decisions. Continue into execution only if that work is already authorized.

## Execute authorized work

Select the execution scope from the user's instructions, including earlier authorization that
still applies:

| Request                                               | Execution scope                                                                   |
| ----------------------------------------------------- | --------------------------------------------------------------------------------- |
| Execute, implement, resume, or continue a plan        | First incomplete phase, including any work already started; stop after that phase |
| Execute a named phase                                 | That phase, respecting its prerequisites; stop after that phase                   |
| Explicitly run the whole plan or all remaining phases | Remaining phases in order, without requiring another request for each phase       |
| Implement a design or description without a plan      | The authorized change                                                             |

An end-to-end workflow request selects workflow stages; execution of a whole plan still requires
an explicit instruction. A phase includes its validation, progress updates, and affected current
docs. Complete those before stopping. Whole-plan authorization remains effective until the user
changes it; required review boundaries and unresolved blockers still apply.

1. Read the complete plan or design and resume from the actual incomplete work. Explain the current
   increment briefly.
2. Implement it using project-owned contracts, boundaries, reusable components, and command rules.
   Obtain validation commands from current repository guidance/configuration, not a copied skill
   command list.
3. Run appropriate checks at meaningful milestones. Resolve failures within the authorized scope;
   record unrelated failures or missing external evidence without claiming they passed.
4. Update checkboxes and Last Updated, marking only work supported by the actual result as complete.
   Record significant decisions and rationale in Decisions. Keep dated Progress Log entries newest
   first and focused on validation results, deviations, findings, blockers, and partial progress
   needed to resume. Reference phase or step numbers; omit implementation summaries and next-step
   reminders already captured by the checklist. Follow the
   [evidence guidance](documentation.md#evidence-and-maintenance).
5. Reconcile affected current docs with the implemented behavior within the phase that changes it.
6. Report completed work and validation results. For a plan, identify the next incomplete phase if
   any. Continue or stop according to the selected execution scope.

If unexpected evidence during implementation invalidates a design decision, stop dependent work
and record the finding and blocker. Revise the affected design decision and dependent plan steps
within the authorized scope, or report the specific decision needed. Resume dependent execution
once the revised design is settled. This exception does not justify planning unresolved design
feasibility work as an execution phase.

Keep a plan Active while executable phases remain; completing one phase does not complete the
plan. Use Blocked only for a real obstacle preventing progress, and explain what is needed.
Use Waiting for Review when all phases and required agent checks are complete but review/close-out
remains. Keep a design Accepted until eligible close-out records it as Implemented.
Report validation limits, including any required human checks; do not mark unperformed checks done.

Implementation alone does not authorize archival if the user requested execution without
close-out. An end-to-end workflow request includes bookkeeping once completion and project review
conditions are satisfied. Never infer permission to merge, publish, release, push, or send messages
from workflow completion.

## Reconcile and close out

Identify the exact change from the user's path or context. If several eligible changes remain and
the target is unclear, ask which one. A Draft or Accepted status alone is not evidence that a
design has been implemented.

Before archiving:

- Verify implementation against the agreed scope and acceptance criteria using code, completed
  steps, and validation evidence. Explain any unverified conditions that prevent completion.
- Confirm affected current docs have been reconciled under the
  [document-ownership rules](documentation.md#choose-the-owner); record remaining debt in the
  project's existing tracker when applicable.
- Verify the project's review/close-out requirements. A pending required review keeps the plan at
  Waiting for Review. Do not invent a new approval requirement.

Once eligible, perform the local bookkeeping directly:

1. Set the plan to Completed and the design to Implemented, update Last Updated dates, and move
   them into their corresponding `completed/` directories.
2. Update active/completed indexes with accurate document references and completion dates. Follow
   the user's preference or existing index style for plain paths or clickable relative links. Keep
   file creation dates in filenames and preserve decision/progress history. If the active design-doc
   or execution-plan table becomes empty, keep its heading, header, and separator row.
3. Repair the plan's **Design Doc** reference and all affected inbound/outbound links and path
   references, including references between two moved files. Search both Markdown links and plain
   path references.
4. Update any delivered spec to Active when appropriate. Specs remain living documents and do not
   move into the design/plan archive.
5. Check formatting, links, and index/status consistency. Report what was completed, what was
   validated, and any remaining review, merge, or operational work separately.
