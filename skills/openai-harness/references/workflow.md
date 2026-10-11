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
an execution plan for a design records that design as `Accepted`; it does not grant implementation
authority. Resolve material design decisions before creating the plan.
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

## Plan when requested

Every execution plan must reference an existing design doc in its **Design Doc** field. Use a plain
or backticked path or a clickable relative link, following the user's preference or existing style.
Resolve the named design or a matching design from the task context, read it, and inspect the
affected code.
If none exists, establish the design before writing the execution plan; do not omit the field or
reference a nonexistent placeholder. Keep that prerequisite within the authorized task scope and
resolve material design questions before planning. Link any related spec rather than copying it.

When creating the execution plan, mark its associated Draft design `Accepted`, update the design's
Last Updated date, and set its design-index entry to the same status. Plan creation records the
design as settled and ready to implement. Keep an already Accepted or Implemented design's status;
do not downgrade it. Creating only a design doc leaves it Draft.

Group work into phases that deliver coherent behavior and preserve a valid codebase. For changes
across process boundaries, prefer an end-to-end capability increment over separate type/backend/UI
phases. Write concrete steps, meaningful validation, dependencies, and known uncertainties.

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
4. Update completed checkboxes, significant decisions, dated progress, and Last Updated. Mark only
   work supported by the actual result as complete.
5. Reconcile affected current docs with the implemented behavior within the phase that changes it.
6. Report completed work and validation results. For a plan, identify the next incomplete phase if
   any. Continue or stop according to the selected execution scope.

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
   file creation dates in filenames and preserve decision/progress history.
3. Repair the plan's **Design Doc** reference and all affected inbound/outbound links and path
   references, including references between two moved files. Search both Markdown links and plain
   path references.
4. Update any delivered spec to Active when appropriate. Specs remain living documents and do not
   move into the design/plan archive.
5. Check formatting, links, and index/status consistency. Report what was completed, what was
   validated, and any remaining review, merge, or operational work separately.
