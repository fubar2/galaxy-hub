---
title: "Survival analysis for right censored data using lifelines"
date: "2023-08-11"
authors: Ross Lazarus
authors_structured:
- github: fubar2
tease: "Kaplan-Meier and Cox proportional hazards models are available for testing in Galaxy"
hide_tease: true
subsites: [all]
---

A wrapper for the [lifelines](https://github.com/CamDavidsonPilon/lifelines) package is available.

*Recommended reading:* The [introduction to survival analysis](https://lifelines.readthedocs.io/en/latest/Survival%20Analysis%20intro.html)
from the lifelines documentation is a very good place to start if this topic is not familiar.

Given a time and status indicator column in the input tabular data, this Galaxy tool will:

1. Run a Kaplan-Meier non-parametric survival analysis and generate a KM plot showing shaded 95% confidence intervals.
2. If a grouping variable is provided, produce separate curves by group.
3. If there are exactly 2 groups,  such as case and control, report a log-rank test of the hypothesis of no difference between groups.
4. If covariates are provided, a Cox's proportional hazards model is run. Proportionality assumptions are tested and partial plots are generated, for each covariate.

**Using the Rossi recidivism data from the lifelines tutorials**

With race as a grouping variable, the plot shows two separate curves and the report (below) shows the output from a logrank test.

![KM plot sample](lifelines_rossi_km.png)

A comma separated list (prio, age, race, mar, fin) of covariate column names was provided on the tool form,
so after the logrank test, a Cox-PH model was run. The report also contains a text report about the assumption of proportionality, and may have some recommendations
for alternative models.

![KM plot sample](lifelines_report.png)

For each covariate, a Schoenfeld diagnostic plot is produced in a history collection.

![KM plot sample](lifelines_rossi_schoenfeld.png)

Partial plots for each covariate are produced. Quintiles are used for covariates with > 10 distinct values.
Non-ordinal categories with > 10 values will produce meaningless quintiles, but ordinal should work.
10 or fewer distinct values are used as is.
The age plot suggests that there is an important "dose-response" effect, with consistently higher risk of re-arrest for younger subjects confirming the
significant Cox-PH coefficient on age.

![C-PH partial plot samples](agepartialrossi.png)

![C-PH partial plot samples](parolepartialrossi.png)

Analysis text output is written to a new history file. Plot images, and a tabular survival table, with the corresponding "collapsed" life table,
are written to a new output history collection for review.

### Installation for testing

The [lifelines tool](https://toolshed.g2.bx.psu.edu/view/fubar/lifelines_km_cph_tool/dd5e65893cb8), owned by fubar,
is available for testing, in the main Galaxy Toolshed. It is very new and so not suitable for production use yet.
Issues and successes welcomed at the [github repository](https://github.com/fubar2/lifelines_tool).
