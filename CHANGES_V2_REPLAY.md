# CHANGES_V2_REPLAY.md

New and changed user-visible strings on the `v2-replay-pics` branch, for Dr D's sign-off.

This branch is based on `v2-game` (f172664). No sodium values, categories, teaching text (`teach` / `swap` / `coach`), food, plate or compare names, servings, sources, profile medical copy, or other medical wording from v2-game were changed. Existing game strings (mode names, button labels, feedback, Daily Budget copy, badges, footer, draft banner, Settings) are unchanged. New strings are listed below.

`DRAFT = true` is unchanged. This branch is not merged or deployed. It is for review only.

## Home screen (additions)

The Journey start button for new players now says “Let's play! 🧂” instead of “Swipe Journey”. Returning players still see “Journey: Level {n}”. Daily Budget and the other five mode buttons are unchanged. Added:

- “Daily Challenge”
- “Daily Challenge done ({score}/10)”
- “Today’s 10 cards · {weekday, month day}”
- “Replay for practice. Come back tomorrow for a new set.”
- “Practice the ones you missed”
- “No misses to practice”
- “1 card to review”
- “{n} cards to review”

## During play (HUD)

- “Daily Challenge” (HUD pill, when playing the daily set)
- “Daily Challenge · {weekday, month day}” (subtitle)
- “Practice” (HUD pill)
- “Practice the ones you missed” (subtitle)
- “Preview” (subtitle used only by the test hook)

Existing Journey / Compare / Speed / Hidden Salt / Guess the Shaker / Daily Budget HUD strings are unchanged.

## End of Daily Challenge

- “Daily Challenge complete”
- “Today’s score: {n}/10”
- “Best daily: {n}/10. Come back tomorrow for a new set.”
- “Score: {n}/10”
- “Best daily: {n}/10. Replays don't change today's first score. Come back tomorrow for a new set.”
- “Back to menu” (already used elsewhere; also the again-button here)

## End of Practice

- “Practice complete”
- “Score: {n}/{total}”
- “{n} still on your practice list.”
- “You cleared your practice list!”
- “Practice again”
- “Back to menu”

## Stats & Badges (addition)

- “☀️ Daily Challenge (best points)” (a new personal-bests row, same “not played” empty state as the others)

## Images

Every food, plate, and compare-card side now shows a photograph. Alt text is the existing food or side name (unchanged wording). Compare-card milligram values, teachings, and swaps are unchanged.
