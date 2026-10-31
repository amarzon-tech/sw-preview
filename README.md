# Salt Whisperer v2 (branch `v2-game`)

A sodium game for people with kidney disease (CKD) or high blood pressure. Built on the K Swipe engine.

- Modes: Daily Budget, Swipe Journey (5 levels), Speed Round (60 s), Hidden Salt, Guess the Shaker, Which is lower?
- Profiles: CKD (2,000 mg goal) or High blood pressure (1,500 mg default, 2,300 mg option). Chosen on first launch, switch in Settings. Progress is saved per profile.
- Offline PWA, no account, no ads, no data collection. Progress is stored in local storage only.
- Content: `content.js` (generated) and `CONTENT_REVIEW.md` (every card, for physician sign-off). All sodium values are DRAFT until Dr D signs off. Set `DRAFT = false` in `game.js` after sign-off.
- Regenerate content: see `tools/README.md`.
- This branch is not merged to `main`. GitHub Pages still serves the old build from `main`.

Run locally: `python3 -m http.server` in this folder, then open http://localhost:8000/.
