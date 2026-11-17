# Vocab Quest — Unit 3 & 4

A self-contained Vietnamese vocabulary adventure for English 12. No dependencies, account, API key, analytics, or network-loaded assets.

## Play

Open `index.html` in a browser, or serve this folder with `python3 -m http.server 8080` and visit `http://localhost:8080`.

Hosted playable version: https://vocab-quest-unit-3-4-lemon.quartzeft1.chatgpt.site (owner-private).

For GitHub Pages, this repository is compatible with deployment from `main`, root directory. GitHub Pages has not been configured by this project.

## Features

- Two islands, eight lessons, 48 target expressions.
- 204 authored question variants: 48 meaning questions, 96 practice contexts, 48 separate boss contexts, 12 cloze questions across four original passages.
- Each lesson introduces six expressions then quizzes twelve questions.
- Quick practice, targeted mistake/due review, searchable notebook, progress dashboard.
- Each boss: 14 sentence questions + 6 cloze questions. Answers, correctness and XP are withheld until submission. No time limit.
- Random answer order, Vietnamese meanings and explanations, optional hints.
- XP, coins, daily goals, study streak, three unlockable companions, optional sounds.
- Responsive desktop/mobile layouts; A–D keyboard shortcuts; reduced-motion support.

## Saving progress

`localStorage` key: `vocab-quest-v1`. Saves after each answer, including the active question order, choices and hints. Reload the same URL and choose “Tiếp tục lượt đang chơi”.

Data stays in the current browser and origin. This is **not account/cloud synchronization**. Clearing site data or using another device/URL creates separate progress. Export/import a JSON backup in **Hành trang** to move progress. Imported data is validated before replacement. A warning is displayed if browser storage cannot be used. Simultaneous tabs receive storage updates; avoid answering simultaneously in different tabs.

## Learning model

- Correct unassisted answer: +10 XP; hinted correct answer: +3 XP. Wrong answer: no XP penalty.
- Review intervals: 1, 3, 7, 14 days based on consecutive unassisted successes; wrong answers become immediately due and reset mastery evidence.
- “Khá vững”: at least two successful question variants and a correct streak of two.
- “Đã kiểm tra lại”: at least three successful variants, successes on two separate local-calendar dates, and a correct streak of two.
- This is a practical learning heuristic, not a validated proficiency score.
- Lesson completion records participation; it is separate from mastery.

## Content scope

Selected target vocabulary is based on the supplied Vocabulary 3–4 study sheets. All example sentences and cloze passages are newly written; source photos, names, and handwriting are not included. This is a focused vocabulary game, not a complete transcription of every worksheet or reading-comprehension question. The four cloze passages are a finite bank and can recur on later attempts.

## Development

The entire application (CSS, data, SVG illustrations, JavaScript) lives in `index.html`. `DATA` contains the vocabulary bank; `CLOZE` contains the four passages. Edit this file, run tests, then build static output.

```sh
node test.cjs
node build.mjs
```

`build.mjs` copies the self-contained app to `dist/index.html`. No package install is needed. The optional `.openai/hosting.json` in the hosted source configures the separate Sites deployment; it is not required to run the GitHub copy.

## Validation

Automated Node assertions cover bank structure, four distinct options, hints, duplicate-answer protection, mistake review, in-progress serialization, boss scoring only after submission, cloze composition, import validation and mastery thresholds. Browser QA covered desktop, a 390px mobile viewport, answer feedback, reload/resume, and a complete 20-question boss with result explanations.
