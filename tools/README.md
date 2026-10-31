# Salt Whisperer content tools

`content.js` and `CONTENT_REVIEW.md` in the repo root are generated. Do not edit them by hand.

1. Edit cards in `cards_src.py` (foods, plate components, plates, compare pairs) and profile wording in `profile_text.py`.
2. Download USDA SR Legacy CSV (link in `sr_cache.py`), then `python3 tools/sr_cache.py <folder>`.
3. `python3 tools/build_content.py` regenerates `content.js` and `CONTENT_REVIEW.md`.

Sodium (mg) = USDA SR Legacy sodium per 100 g x serving grams / 100, rounded. Cards without a USDA entry are marked ESTIMATE.
`sr_cache.json` and `content.json` are build artifacts and are not committed.
