# Assess and maintain repository quality

`QUALITY_SCORE.md` answers where quality stands across product domains and architectural layers,
and which improvements matter most. Keep it a concise assessment of the current system. Its size
should follow the assessed areas, rather than the number of commits or completed features.

## Choose the assessment scope

Read the existing scorecard, architecture, product expectations, and known debt. Identify stable
product domains and the repository's actual architectural layers; do not turn each new feature,
file, or test suite into a scorecard row. Domains describe product capabilities; layers describe
shared structural responsibilities. Separate tables are useful when they make that distinction
clearer, but reuse a coherent existing layout.

For a focused reassessment, inspect the affected areas and preserve unrelated assessments and
their dates. For a repository-wide assessment, account for every identified domain and layer,
including areas that cannot yet be assessed. State the scope and assessment date accurately.

## Apply a consistent rubric

Reuse an established rubric when it defines meaningful grades. If none exists, define one in the
scorecard. The following is a default to adapt to the project's expectations:

| Grade      | Meaning                                                                |
| ---------- | ---------------------------------------------------------------------- |
| A          | Meets the area's quality expectations, with no significant known gaps  |
| B          | Generally sound, with bounded gaps that warrant improvement            |
| C          | Significant gaps undermine expected behavior or make changes difficult |
| D          | Systemic problems or recurring failures require substantial repair     |
| Unassessed | Insufficient basis for a defensible grade                              |

Judge applicable concerns such as correctness, reliability, security, maintainability, and
validation confidence against the area's responsibilities. Inspect representative implementation,
boundaries, failure handling, and relevant checks before assigning a grade. A passing test suite,
test count, or completed feature list alone does not establish quality. Explain material weaknesses
in the rationale; avoid averaging them away in an aggregate score. Limited knowledge is a reason
to mark an area unassessed; a demonstrated validation gap can itself warrant a lower grade.

## Write the current scorecard

Include the rubric, assessment scope/date, and a compact table such as **Area**, **Grade**,
**Rationale**, and **Next improvement**. The rationale should explain the judgment and the most
consequential limitation. Choose an actionable improvement that addresses that limitation;
an area with no significant gap need not invent one. Make the highest-priority improvements easy
to identify by their impact on users, reliability, or future changes.

Ground assessments in source and available validation, while keeping supporting links selective.
Detailed commands, test output, and validation history belong in execution plans, CI, or existing
validation records. Link substantial follow-up to the debt tracker rather than copying its backlog.
Do not create extra evidence documents merely to populate the scorecard.

## Maintain the assessment

Reassess an area when its quality, responsibilities, or significant gaps change. Update its grade,
rationale, next improvement, and assessment date together. Replace obsolete content in place;
Git preserves historical assessments. A routine successful check need not change a grade or append
an entry. Keep area names and the rubric stable enough for meaningful comparison over time; explain
a material rubric change briefly so readers can interpret it.

When migrating a scorecard dominated by validation evidence, synthesize the current judgments,
retain only useful supporting links, and preserve still-relevant follow-up in its owning tracker.
Run formatting and link checks, and review whether every grade is defensible and the next
improvements follow from the stated weaknesses. Follow the requested assessment scope;
implementation, recurring automation, and external actions require their own authorization.
