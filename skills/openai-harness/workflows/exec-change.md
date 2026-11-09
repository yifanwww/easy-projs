# Exec change

Execution delivers an agreed design and leaves evidence of what works, what remains and how to
continue. Use the [shared workflow](../references/workflow.md#determine-scope) to identify the requested stage
and [documentation guidance](../references/documentation.md) for document responsibilities.

## Execution scope

Select the execution scope from the user's instructions, including earlier authorization that
still applies:

| Request                                                                 | Execution scope                                                                   |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Exec change with a plan; execute, implement, resume, or continue a plan | First incomplete phase, including any work already started; stop after that phase |
| Execute a named phase                                                   | That phase, respecting its prerequisites; stop after that phase                   |
| Explicitly run the whole plan or all remaining phases                   | Remaining phases in order, without requiring another request for each phase       |
| Exec change without a plan; implement an existing design                | The authorized change                                                             |

A phase includes implementation, validation, progress updates and affected current documentation.
A plan without phase headings is one phase, so executing or resuming it covers all remaining work
in that checklist unless the user requests a narrower scope. An end-to-end request selects stages;
whole-plan execution still requires an explicit instruction. Existing whole-plan authorization
continues until the user changes it, subject to review boundaries and unresolved blockers.

## Resume from the actual state

Read the complete design and any associated plan, then compare their recorded state with the code
and available evidence. Identify the actual incomplete work and briefly explain the increment
being taken forward. Execution through this workflow uses an existing design, either directly or
through a plan; if it is missing, explain that prerequisite and establish it when design work is
authorized.

Apply the [design readiness and acceptance guidance](design-change.md#design-readiness) before
implementation, including acceptance of a ready Draft design when executing it directly. Use an
existing plan's actual progress and the execution scope above. When executing a design without
a plan, carry the authorized change forward directly.

## Deliver and validate the increment

Implement the intended behavior using the project's contracts, process boundaries and reusable
components. Choose validation from current repository guidance and configuration, and run the
appropriate checks at meaningful milestones. Resolve failures within the authorized scope and
identify unrelated failures or missing external evidence explicitly.

When implementation evidence invalidates a design decision, pause dependent work and establish
what changed. Settle the affected decision and revise dependent plan steps within the authorized
scope, or report the specific decision needed. Resume that work once the revised approach is
settled.

## Reconcile current knowledge

Update the living documents that own the changed behavior as part of the increment delivering it.
Keep the design's affected decisions and Last Updated date accurate when implementation findings
change the approach. Current guides explain the delivered system; the design retains the
decisions and constraints behind the change.

## Record progress and evidence

### Execution with a plan

With a plan, update its checkboxes, Last Updated date and progress log to reflect actual results.
Use the checklist for completed work, Decisions for significant choices, and the progress log for
evidence, deviations, blockers and partial progress needed to resume. Follow the repository's
template, and read the [progress-log guidance](../references/documentation.md#execution-plan-progress-logs)
before writing or revising phase entries. Apply its consolidation and evidence checks before
handoff. When a step becomes unnecessary, record why and revise the checklist to distinguish it
from completed work.

### Execution without a plan

For a small design executed directly without a plan, run the required checks and report results,
blockers and remaining limits in the response. No repository verification or validation record is
required; do not add one to the design or create a separate document to replace the omitted plan.
For other execution without a plan, follow repository conventions for retaining meaningful results
and blockers in a validation record linked to the change.

### Plan status and readiness

Align a plan's status with what can happen next:

| State                                                                                                                                      | Plan status                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| Implementation or required delivery validation remains and can proceed                                                                     | Active                                               |
| An external decision or capability prevents delivery work                                                                                  | Blocked, with the obstacle and what would resolve it |
| Implementation, required delivery validation and current-document updates are complete; identified review, acceptance or close-out remains | Waiting for Review                                   |

Assess readiness using the plan's completion evidence and repository requirements. Preserve
unperformed review or acceptance checks as pending, and use findings from those checks to identify
any further delivery work. Known defects and unfinished required delivery validation keep delivery
open, even when other checks have passed.

The design remains Accepted until eligible close-out records it as Implemented. Keep remaining
human checks and other evidence limits visible alongside the results.

## Hand off or continue

Report the delivered increment, validation results and remaining limits. Identify the next
incomplete phase when work remains, and recommend continuing it when another execution request
is needed. Continue through work already authorized by the execution scope.

Check current evidence and any plan or validation record for unresolved work. When remaining work
requires human action, give actionable instructions in the response:

- Identify the relevant revision/build, environment and prerequisites.
- Describe concrete commands or UI actions and the expected observable results.
- State what results to report back, including failures and skipped or unavailable checks.
- Explain which actions are required for further delivery or close-out and which are optional.

Derive these instructions from the change's actual remaining requirements and respect the
repository's command policy. A status such as "Waiting for Review" or a link to the plan alone
does not provide the handoff. Include human procedures in the plan or validation record only
when relevant; do not add an empty section or invent human work when none is required.

When implementation and required delivery validation are complete, report readiness for review
or acceptance and identify any existing conditions still outstanding. When only close-out remains,
recommend close change or perform it if already authorized and eligible under the shared workflow.

## Receive human validation results

When the user returns results from a human-validation handoff, process them as continuation of
the ongoing change. Do not require a separate execution request just to record the results.

1. Match the report to the handed-off checks and the relevant revision/build and environment,
   using existing context. Distinguish passed, failed, skipped and unclear checks. Ask only when
   ambiguity materially affects the next action; do not infer that unmentioned checks passed.
2. Update the plan's covered checkboxes, Last Updated date and existing phase entry in place using
   the [progress-log guidance](../references/documentation.md#execution-plan-progress-logs), or update
   the existing validation record when applicable. Attribute evidence to the human report and retain its
   coverage limits. Keep skipped, unclear and failed checks incomplete; reopen affected items
   when a finding invalidates earlier completion evidence.
3. For failures, record the observed behavior and available reproduction details, address defects
   within the authorized scope, and run relevant validation. Reconcile affected current docs and
   design decisions as needed. Hand off any required human retest with the updated build, actions
   and expected results. Report decisions or capabilities needed when work cannot proceed.
4. Reassess the remaining requirements and align the plan and index statuses using the
   [status rules](#plan-status-and-readiness). Continue work already authorized; preserve
   required review points and phase boundaries. A passing report completes only the checks it
   covers, not unrelated review or acceptance requirements.
5. Report the recorded outcome and any remaining work. If only close-out remains, perform
   [close change](close-change.md) when already authorized and eligible; otherwise recommend it.
   Human validation results alone do not authorize archival, merge or release.
