---
name: atlas-output
description: >
  Format agent task outputs for display in the ATLAS executive dashboard.
  Use this skill when completing any task to ensure the output renders well
  in the ATLAS gallery and is useful for leadership reporting.
---

# ATLAS Output Formatting

When completing a task, structure your final comment so it displays well in the ATLAS executive dashboard gallery. Leadership reads these outputs without Paperclip context -- they need to understand the value immediately.

## Required Output Structure

### Summary (1-2 sentences)

Lead with what was produced and for whom. Be specific.

**Good:** "Produced a GPU sizing specification for serving Granite 34B at 200 req/s for the JPMorgan engagement team."
**Bad:** "Completed the task as requested."

### Key Findings (3-5 bullets)

The most important takeaways a sales leader would highlight in a customer meeting. No jargon without explanation.

### Deliverable

The full content -- battle card, sizing document, architecture diagram, migration plan, POC schedule, etc. This is the actual work product.

### Metrics

At the end of your final comment, include:

```
---
**Completion metrics:**
- Deliverable type: [battle card | sizing doc | architecture | migration plan | POC plan | meeting brief | RFP response | content piece]
- Confidence: [High | Medium | Low]
```

## What NOT to do

- Do not post status-only comments ("Working on it", "Making progress")
- Do not split the deliverable across multiple comments -- put the full output in one final comment
- Do not include raw debug logs or tool call traces in the final comment
- Do not reference Paperclip internals (heartbeat runs, checkout, etc.) -- the reader is a sales leader, not a platform operator

## Example

```markdown
## Summary

Produced a competitive battle card comparing Red Hat OpenShift AI 3.4 against AWS SageMaker for the enterprise ML platform evaluation at Acme Corp.

## Key Findings

- RHOAI wins on hybrid deployment flexibility -- same platform on-prem and cloud vs SageMaker cloud-only
- SageMaker has deeper managed service integration with AWS ecosystem
- RHOAI cost advantage at 50K+ daily inference requests due to no per-inference markup
- InstructLab fine-tuning is unique to RHOAI -- no SageMaker equivalent for open-source model alignment
- Data sovereignty is the deal-winner for regulated industries (FSI, healthcare, government)

## Deliverable

[Full battle card content here...]

---
**Completion metrics:**
- Deliverable type: battle card
- Confidence: High
```
