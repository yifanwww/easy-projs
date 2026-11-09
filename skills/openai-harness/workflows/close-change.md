# Close change

Close-out establishes what was delivered, leaves current knowledge accurate and archives the
change's decision and execution records. Use the [shared workflow](../references/workflow.md#determine-scope)
to identify the requested stage and [documentation guidance](../references/documentation.md) for document
responsibilities.

## Establish delivery

Identify the change from the user's path or context and find its design, any associated plan and
validation evidence. Clarify the target when the context leaves several possible changes.

Compare the implementation with the agreed scope and acceptance criteria using code, completed
steps and validation results. Establish completion from that evidence. For direct execution,
assess the design and its implementation using available evidence, rerunning checks when needed;
close the design alone when there is no plan. A small design executed without a plan does not need
a repository verification or validation record for close-out. Explain any incomplete work or
unverified conditions that prevent closure.

## Reconcile current knowledge

Check that the living documents owning the affected behavior describe the delivered system.
Reconcile discrepancies and record remaining nonblocking debt in the project's existing tracker
when applicable. Current guides should make the system understandable alongside the historical
decision context preserved in completed designs and plans.

Update delivered specs to Active where appropriate. Specs remain living documents in their
current location while the design and any execution plan become historical records.

## Establish archive eligibility

Assess the project's existing review and acceptance results alongside the delivery evidence.
A reviewable implementation with required review or acceptance still pending remains at Waiting
for Review, with the design Accepted. Explain the outstanding condition and retain the active
records until it is satisfied.

If acceptance reveals an implementation defect or missing required delivery validation, identify
the remaining delivery work and reflect its Active or Blocked state in the plan. Archive once
the existing completion, review and acceptance requirements are satisfied.

## Archive the records

Once eligible, perform the local bookkeeping for the identified change:

1. Set the design to Implemented and any associated plan to Completed, update Last Updated dates,
   and move the existing artifacts into their corresponding `completed/` directories. Preserve
   creation dates in filenames and retain decision and progress history.
2. Update active/completed indexes with accurate references and completion dates, following the
   repository's index conventions. If an active design-doc or execution-plan table becomes empty,
   retain its heading, header and separator row.
3. Repair any plan's **Design Doc** reference and all affected inbound/outbound links and path
   references, including references between two moved files. Search both Markdown links and plain
   path references.
4. Check formatting, links and index/status consistency against the final locations.

## Report the outcome

Present the archived paths, what was completed and the evidence supporting close-out. Identify
any remaining merge, release or operational work as separate outcomes under the shared
workflow's authorization boundaries.
