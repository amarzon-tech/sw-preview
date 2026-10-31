# Salt Whisperer v2: content review

**Status: DRAFT. Every sodium value below is TO BE VERIFIED by Dr D before release.** Nothing here is medical advice.

## How values were made

- Source: **USDA FoodData Central, SR Legacy (April 2018 release)**, sodium in mg per 100 g multiplied by the gram weight of the serving (USDA portion table where available). The FDC ID and USDA description are given for every card.
- Rounded to the nearest 5 mg (nearest 25 mg above 1,000 mg). Rating is computed from the rounded value, so a card can sit exactly on a cutoff.
- Cutoffs per serving: **Low <= 140 mg, Moderate 141 to 400 mg, High > 400 mg.** Plates (whole meals): **Low < 600 mg, Moderate 600 to 1,000 mg, High > 1,000 mg.** The percent of daily target is shown against the profile target (CKD 2,000 mg; High blood pressure 1,500 mg by default, 2,300 mg option).
- SR Legacy is a 2018 snapshot. Branded products change. 'Low sodium', 'reduced sodium' and 'no salt added' rows are USDA entries for those product types. Brands differ, so the game says 'about'.
- Cards marked **ESTIMATE** (rotisserie chicken, lite salt, salt substitute) have no USDA entry and use typical label values. Please check these.
- Hidden Salt plates and Daily Budget meals are sums of the part values listed.
- Foods in the **Snack** slot of Daily Budget are the cards flagged 'snack'.

## Profile settings and text

### Kidney disease (CKD) (ckd)
- Default daily target: **2000 mg** (TO VERIFY: commonly advised under 2,000 mg for CKD; each patient's target differs)
- About text: Salt Whisperer was made by a nephrologist (Dr D) to help people with chronic kidney disease and their families spot sodium. For many people with kidney disease, too much sodium causes thirst, fluid buildup, swelling and high blood pressure, which can strain the kidneys and heart. A common goal is under 2,000 mg of sodium a day, but your own target may differ.
- Goal line: Daily goal in this profile: 2,000 mg of sodium. Ask your kidney team for your own number.
- Coach lines (shown at random after answers):
  - Less salt means less thirst and less fluid to manage.
  - Sodium holds water. That raises blood pressure and swelling.
  - Lower sodium helps protect your kidneys and your heart.
  - Never swap in salt substitutes without asking your kidney team: they contain potassium.
  - Reading labels is a kidney-friendly superpower.

### High blood pressure (htn)
- Default daily target: **1500 mg** (option: 2,300 mg upper limit, TO VERIFY with AHA guidance)
- About text: Salt Whisperer was made by a nephrologist (Dr D) to help people with high blood pressure and their families spot sodium. Sodium raises blood pressure in many people. The American Heart Association recommends no more than 2,300 mg of sodium a day, and an ideal limit of 1,500 mg a day for most adults, especially if you have high blood pressure.
- Goal line: Daily goal in this profile: 1,500 mg of sodium (ideal limit). You can switch to 2,300 mg (upper limit) in Settings. Ask your doctor which is right for you.
- Coach lines (shown at random after answers):
  - Lower sodium helps lower blood pressure.
  - DASH-style eating: more vegetables, fruit and low-fat dairy, less processed food.
  - Most sodium comes from packaged and restaurant food, not the shaker.
  - Small drops in sodium can lower blood pressure within weeks.
  - Reading labels is a blood-pressure superpower.

### Category notes (shown after the swap tip)

| Category | CKD wording | High blood pressure wording |
|---|---|---|
| Fresh & whole foods | Fresh foods are the easiest way to keep sodium (and fluid) down. Ask your dietitian about potassium and phosphorus too. | Fresh produce fits a DASH-style pattern and helps blood pressure. |
| Breads, grains & cereal | Bread is a top sodium source for many kidney patients because we eat it daily. Compare labels. | Bread and cereal are among the biggest hidden sodium sources for blood pressure. Read the label. |
| Meat, fish & deli | Cured and deli meats are salty and often high in phosphate additives too. Ask your dietitian. | Processed meats raise sodium fast. DASH-style eating favors fresh fish, poultry and beans. |
| Dairy & cheese | Cheese is salty, and dairy has phosphorus and potassium. Ask your dietitian how much is right for you. | Low-fat dairy is part of DASH, but choose lower sodium cheeses. |
| Canned & packaged | Canned foods are a big salt source. Salt makes you thirsty, which makes fluid limits harder. | Canned soups and vegetables are major sodium sources. Choose "no salt added". |
| Sauces, condiments & seasonings | Sauces are concentrated salt. Do NOT use salt substitutes unless your kidney team says it is safe: they contain potassium. | Sauces and seasonings add sodium quickly. Flavor with herbs, citrus and spices instead. |
| Snacks | Salty snacks make you thirsty and can raise blood pressure and swelling. | Choose unsalted snacks: they fit a DASH-style pattern and help blood pressure. |
| Frozen & ready meals | Ready meals are very high in sodium. They are also often high in phosphate additives. | Frozen and boxed meals are hidden sodium. Compare the label per serving. |
| Restaurant & fast food | Restaurant meals are very high in sodium. Ask for sauces on the side and no added salt. | Restaurant meals can exceed a whole day of sodium. Ask for sauce on the side and no added salt. |
| Whole plates | Whole meals matter more than single foods. Sodium and fluid go together in kidney disease. | Whole meals matter. DASH-style plates are rich in vegetables, fruit and low-fat dairy. |
| Which is lower? | Small swaps add up across the day. | Small swaps add up and can help lower blood pressure. |

### Card-specific profile overrides

| Card | CKD wording | HTN wording |
|---|---|---|
| Low sodium vegetable juice | If you also limit potassium, check that label. Low sodium juices often use potassium chloride. |  |
| Lite salt (half salt, half potassium) | Lite salt and salt substitutes contain potassium. Many people with kidney disease must avoid them. Ask your care team first. | Lite salt cuts sodium but adds potassium. Fine for many people with high blood pressure, but ask your doctor if you have kidney disease or take certain BP medicines. |
| Salt substitute (potassium chloride) | Warning: salt substitutes are made of potassium. They can be dangerous for people with kidney disease. Do not use them unless your kidney team says it is safe. | Salt substitutes can lower sodium, but they are potassium. Check with your doctor if you have kidney disease or take ACE inhibitors, ARBs or spironolactone. |
| Compare: cmp-salt | Salt substitutes are NOT a safe swap for most people with kidney disease. Ask your kidney team before using one. | Salt substitute is lower in sodium, but contains potassium. Check with your doctor if you have kidney disease or take certain BP medicines. |

## Items needing your attention

- **White bread**: 140 mg sits within 10 mg of a cutoff (rated low). Raw value 142.1 mg.
- **Whole-wheat bread**: 145 mg sits within 10 mg of a cutoff (rated mod). Raw value 145.6 mg.
- **Cheerios-type oat cereal**: 140 mg sits within 10 mg of a cutoff (rated low). Raw value 139.2 mg.
- **Beef hot dog (no bun)**: 410 mg sits within 10 mg of a cutoff (rated high). Raw value 409.0 mg.
- **Store rotisserie chicken** (450 mg): TO VERIFY: store-to-store range is wide (about 300 to 600 mg per 3 oz). Compare with a label.
- **'Low sodium' chicken noodle soup** (430 mg): USDA lists this 'low sodium' product at about 430 mg a cup. Brands differ.
- **Low sodium vegetable juice**: 140 mg sits within 10 mg of a cutoff (rated low). Raw value 139.7 mg.
- **Taco seasoning mix**: 410 mg sits within 10 mg of a cutoff (rated high). Raw value 410.6 mg.
- **Lite salt (half salt, half potassium)** (290 mg): TO VERIFY current label: about 290 mg sodium and 350 mg potassium per ¼ tsp.
- **Salt substitute (potassium chloride)** (0 mg): TO VERIFY current label: 0 mg sodium and about 650 mg potassium per ¼ tsp.
- **Potato chips**: 150 mg sits within 10 mg of a cutoff (rated mod). Raw value 147.6 mg.
- **Store-bought hummus**: 130 mg sits within 10 mg of a cutoff (rated low). Raw value 127.8 mg.
- **Beef empanada**: 390 mg sits within 10 mg of a cutoff (rated mod). Raw value 391.6 mg.
- **Instant ramen**: USDA's 'dry ramen noodle soup' row is per 81 g block and appears to include the flavor packet. Real packages vary a lot (about 1,200 to 1,800 mg).
- **Soup values**: 'Chicken noodle soup, canned, prepared with equal volume water' is used as given. Condensed cream of mushroom is the half-cup condensed weight (126 g) that makes one cup.
- **Frozen shrimp**: USDA row notes 'may contain additives'. Fresh shrimp is lower. Check the claim you want to teach.
- **Draining and rinsing beans**: the USDA 'rinsed' row is used. Published studies suggest roughly 30 to 40% less sodium. Confirm the message.
- **Fast-food values** come from USDA's older fast-food and restaurant entries (some brand-named: Pizza Hut). Today's menus may differ.
- **Pepper/garlic card** is 'about 0 mg' (garlic powder 1 tsp about 2 mg, pepper about 0).
- **Plate cutoffs**: with Low < 600 mg, a bagel with cream cheese and a tuna sandwich (580 mg) are rated Low. Confirm that is the message you want.

## Counts

- Food/item cards: **126**
- Whole plates: **29**
- Which-is-lower pairs: **17**
- **Total cards: 172**
- Plate components (not stand-alone cards): 16

## Food and item cards

Columns: serving, sodium (mg), rating, % of 2,000 mg, teaching text, swap tip, source. 'lvl' is the Swipe Journey level it first appears in.

### Fresh & whole foods (21)

| Card | Serving | mg | Rating | % of 2,000 | lvl | Teaching text | Swap tip | Source |
|---|---|---|---|---|---|---|---|---|
| 🥚 Hard-boiled egg | 1 large | 60 | low | 3% | 1 | Plain eggs are naturally low in sodium. Salt gets added at the table. | Season with pepper, herbs or lemon instead of salt. | USDA FoodData Central (SR Legacy) FDC 173424: Egg, whole, cooked, hard-boiled |
| 🍌 Banana | 1 medium | 0 | low | 0% | 1 | Fresh fruit has almost no sodium. | A great snack with no label to read. | USDA FoodData Central (SR Legacy) FDC 173944: Bananas, raw |
| 🍎 Apple | 1 medium | 0 | low | 0% | 1 | Fresh fruit has almost no sodium. | Pair with unsalted nuts for a filling snack. | USDA FoodData Central (SR Legacy) FDC 171688: Apples, raw, with skin (Includes foods for USDA's Food Distribution Pr |
| 🍓 Strawberries | 1 cup halves | 0 | low | 0% | 1 | Fresh fruit has almost no sodium. | Add to plain yogurt or oatmeal. | USDA FoodData Central (SR Legacy) FDC 167762: Strawberries, raw |
| 🍊 Orange | 1 large | 0 | low | 0% | 1 | Fresh fruit has almost no sodium. | Whole fruit beats canned or juice-box versions. | USDA FoodData Central (SR Legacy) FDC 169097: Oranges, raw, all commercial varieties |
| 🥦 Broccoli, raw | 1 cup chopped | 30 | low | 2% | 1 | Fresh vegetables are low in sodium. Plain frozen ones are too. | Steam or roast with garlic and lemon. | USDA FoodData Central (SR Legacy) FDC 170379: Broccoli, raw |
| 🥕 Carrots, raw | 1 cup chopped | 90 | low | 4% | 1 | Carrots are among the saltier fresh vegetables, but still low. | Dip in unsalted hummus or plain yogurt dip. | USDA FoodData Central (SR Legacy) FDC 170393: Carrots, raw |
| 🥒 Cucumber slices | ½ cup | 0 | low | 0% | 1 | Fresh cucumber has almost no sodium. Pickling it is what adds the salt. | Fresh cucumber with vinegar and dill is a quick swap for pickles. | USDA FoodData Central (SR Legacy) FDC 168409: Cucumber, with peel, raw |
| 🌽 Corn on the cob | 1 ear | 20 | low | 1% | 2 | Fresh corn is low in sodium. Canned corn is not. | Choose fresh, frozen without sauce, or no-salt-added canned. | USDA FoodData Central (SR Legacy) FDC 169998: Corn, sweet, yellow, raw |
| 🫛 Green beans, fresh | 1 cup | 5 | low | 0% | 1 | Fresh green beans are very low in sodium. | Canned green beans are the version to watch. | USDA FoodData Central (SR Legacy) FDC 169961: Beans, snap, green, raw |
| 🥔 Baked potato, plain | 1 medium | 15 | low | 1% | 1 | A plain potato is low in sodium. Toppings change that. | Top with plain yogurt and chives, not bacon and cheese sauce. | USDA FoodData Central (SR Legacy) FDC 170093: Potatoes, baked, flesh and skin, without salt |
| 🍗 Roasted chicken breast, plain | 3 oz | 65 | low | 3% | 1 | Fresh chicken cooked at home with no salt added is low. | Check the label for 'solution added' or 'broth added' on raw chicken. | USDA FoodData Central (SR Legacy) FDC 171477: Chicken, broilers or fryers, breast, meat only, cooked, roasted |
| 🐟 Baked salmon | 3 oz | 50 | low | 2% | 1 | Fresh fish is naturally low in sodium. | Season with lemon, dill and black pepper. | USDA FoodData Central (SR Legacy) FDC 175168: Fish, salmon, Atlantic, farmed, cooked, dry heat |
| 🍔 Lean beef patty, plain | 3 oz cooked | 65 | low | 3% | 2 | Plain ground beef is low in sodium. Seasoning mixes and buns add it. | Season with pepper, onion and garlic powder. | USDA FoodData Central (SR Legacy) FDC 171793: Beef, ground, 90% lean meat / 10% fat, patty, cooked, pan-broiled |
| 🍚 White rice, cooked | 1 cup | 0 | low | 0% | 1 | Plain rice is very low in sodium when cooked without salt. | Skip the seasoning packet and boxed 'flavored' rice. | USDA FoodData Central (SR Legacy) FDC 168878: Rice, white, long-grain, regular, enriched, cooked |
| 🍝 Pasta, cooked | 1 cup | 0 | low | 0% | 1 | Plain pasta is very low in sodium when the water is not salted. | The sauce and cheese are where sodium hides. | USDA FoodData Central (SR Legacy) FDC 169737: Pasta, cooked, enriched, without added salt |
| 🥣 Oatmeal, plain, cooked | 1 cup | 10 | low | 0% | 1 | Plain rolled oats cooked in water have almost no sodium. | Add fruit and cinnamon, not salt. | USDA FoodData Central (SR Legacy) FDC 173905: Cereals, oats, regular and quick, unenriched, cooked with water (inclu |
| 🍅 Fresh tomatoes | 1 cup cherry | 5 | low | 0% | 1 | Fresh tomatoes are low in sodium. Canned and sauced tomatoes are not. | Choose fresh or 'no salt added' canned. | USDA FoodData Central (SR Legacy) FDC 170457: Tomatoes, red, ripe, raw, year round average |
| 🌰 Almonds, unsalted | 1 oz | 0 | low | 0% | 1 | Unsalted nuts are very low in sodium. | Check that the label says 'unsalted' or 'no salt added'. | USDA FoodData Central (SR Legacy) FDC 170158: Nuts, almonds, dry roasted, without salt added |
| 🥜 Peanuts, unsalted | 1 oz | 0 | low | 0% | 1 | Unsalted peanuts are very low in sodium. | Salted ones are the version to skip. | USDA FoodData Central (SR Legacy) FDC 173806: Peanuts, all types, dry-roasted, without salt |
| 🫒 Olive oil | 1 tbsp | 0 | low | 0% | 1 | Plain oil has no sodium. | Oil, lemon and herbs make a no-sodium dressing. | USDA FoodData Central (SR Legacy) FDC 171413: Oil, olive, salad or cooking |

### Breads, grains & cereal (12)

| Card | Serving | mg | Rating | % of 2,000 | lvl | Teaching text | Swap tip | Source |
|---|---|---|---|---|---|---|---|---|
| 🍞 White bread | 1 slice | 140 | low | 7% | 3 | Bread is one of the biggest sodium sources in the diet because we eat it often. | Look for breads under 140 mg a slice. | USDA FoodData Central (SR Legacy) FDC 174924: Bread, white, commercially prepared (includes soft bread crumbs) |
| 🍞 Whole-wheat bread | 1 slice | 145 | mod | 7% | 3 | Whole grain does not mean low sodium. | Compare labels. Brands vary a lot. | USDA FoodData Central (SR Legacy) FDC 172688: Bread, whole-wheat, commercially prepared |
| 🥪 Bread, 2 slices (a sandwich's worth) | 2 slices | 285 | mod | 14% | 3 | Two slices of bread can use up a seventh of your day before any filling. | Try a lettuce wrap or one slice open-faced. | USDA FoodData Central (SR Legacy) FDC 174924: Bread, white, commercially prepared (includes soft bread crumbs) |
| 🥯 Plain bagel | 1 medium | 420 | high | 21% | 2 | A bagel packs about three slices of bread worth of sodium. | Pick a mini bagel or a slice of toast. | USDA FoodData Central (SR Legacy) FDC 174899: Bagels, plain, enriched, with calcium propionate (includes onion, popp |
| 🌯 Flour tortilla | 1 tortilla (48 g) | 355 | mod | 18% | 3 | Flour tortillas carry a lot of salt and baking powder. | Corn tortillas are far lower. | USDA FoodData Central (SR Legacy) FDC 175037: Tortillas, ready-to-bake or -fry, flour, refrigerated |
| 🌮 Corn tortilla | 1 medium | 10 | low | 0% | 2 | Plain corn tortillas are low in sodium. | Choose corn tortillas for tacos and bowls. | USDA FoodData Central (SR Legacy) FDC 175036: Tortillas, ready-to-bake or -fry, corn |
| 🥣 Cheerios-type oat cereal | 1 cup | 140 | low | 7% | 3 | Cold cereal is an everyday source of hidden salt. | Check the label. Plain shredded wheat or oats are lower. | USDA FoodData Central (SR Legacy) FDC 173884: Cereals ready-to-eat, GENERAL MILLS, CHEERIOS |
| 🥣 Instant oatmeal packet | 1 packet (dry) | 195 | mod | 10% | 3 | Flavored instant packets add salt that plain oats do not have. | Cook plain oats and add your own fruit and cinnamon. | USDA FoodData Central (SR Legacy) FDC 171663: Cereals, QUAKER, Instant Oatmeal, apples and cinnamon, dry |
| 🥞 Pancakes from a mix | 3 pancakes (4 in) | 715 | high | 36% | 3 | Pancake mix uses baking powder and salt. Three pancakes add up fast. | Make a smaller stack, and skip the sausage. | USDA FoodData Central (SR Legacy) FDC 175006: Pancakes, plain, dry mix, complete, prepared |
| 🧇 Frozen waffles | 2 waffles | 435 | high | 22% | 3 | Frozen waffles are salty. The label per waffle looks small. | Try one waffle with fruit. | USDA FoodData Central (SR Legacy) FDC 167519: Waffle, plain, frozen, ready-to-heat, microwave |
| 🍘 Saltine crackers | 10 crackers | 280 | mod | 14% | 3 | The name gives it away. Salt is on top and in the dough. | Choose unsalted-top or low-salt crackers, or rice cakes. | USDA FoodData Central (SR Legacy) FDC 172746: Crackers, saltines (includes oyster, soda, soup) |
| 🍔 Hamburger bun | 1 bun | 215 | mod | 11% | 3 | The bun is a hidden part of a burger's sodium. | Go open-faced or use lettuce wrap. | USDA FoodData Central (SR Legacy) FDC 172796: Rolls, hamburger or hotdog, plain |

### Meat, fish & deli (13)

| Card | Serving | mg | Rating | % of 2,000 | lvl | Teaching text | Swap tip | Source |
|---|---|---|---|---|---|---|---|---|
| 🦃 Deli turkey slices | 3 thin slices (2 oz) | 505 | high | 25% | 2 | Deli meat is cured or brined. 'Healthy' turkey is still salty. | Roast your own turkey or chicken and slice it. | USDA FoodData Central (SR Legacy) FDC 172941: Turkey breast, sliced, prepackaged |
| 🍖 Sliced deli ham | 2 oz | 455 | high | 23% | 2 | Ham is cured in salt. | Fresh roasted pork or chicken slices are far lower. | USDA FoodData Central (SR Legacy) FDC 173864: Ham, sliced, regular (approximately 11% fat) |
| 🥓 Bacon | 2 slices | 355 | mod | 18% | 2 | Two slices are moderate. Most breakfasts use four or more. | Two slices is your whole serving. Skip the sausage on the side. | USDA FoodData Central (SR Legacy) FDC 167914: Pork, cured, bacon, cooked, baked |
| 🌭 Beef hot dog (no bun) | 1 frank | 410 | high | 20% | 2 | A hot dog is moderate to high before the bun and toppings. | Look for lower sodium franks, or grill a fresh sausage-style patty at home. | USDA FoodData Central (SR Legacy) FDC 174614: Frankfurter, beef, heated |
| 🌭 Pork sausage links | 2 links | 375 | mod | 19% | 2 | Breakfast sausage is cured and seasoned heavily. | Make a patty from plain ground turkey and sage. | USDA FoodData Central (SR Legacy) FDC 174578: Pork sausage, link/patty, cooked, pan-fried |
| 🥩 Corned beef | 3 oz | 825 | high | 41% | 2 | Corned beef is cured in brine. A normal plate is very high. | Choose fresh brisket or roast beef and cook it yourself. | USDA FoodData Central (SR Legacy) FDC 170200: Beef, cured, corned beef, brisket, cooked |
| 🥩 Beef jerky | 1 oz | 505 | high | 25% | 2 | Jerky is dried with salt. A small bag is a big sodium hit. | Look for 'no salt added' jerky or choose unsalted nuts. | USDA FoodData Central (SR Legacy) FDC 167536: Snacks, beef jerky, chopped and formed |
| 🐟 Canned tuna in water | 3 oz drained | 210 | mod | 10% | 3 | Canned fish is packed in salt. | Choose 'no salt added' tuna, and drain it. | USDA FoodData Central (SR Legacy) FDC 173709: Fish, tuna, light, canned in water, drained solids (Includes foods for |
| 🐟 Canned tuna, no salt added | 3 oz drained | 40 | low | 2% | 3 | No-salt-added tuna is the same fish with a fraction of the sodium. | Add lemon and pepper for flavor. | USDA FoodData Central (SR Legacy) FDC 171986: Fish, tuna, light, canned in water, without salt, drained solids |
| 🍤 Frozen fish sticks | 4 sticks | 450 | high | 22% | 3 | Breaded and frozen fish adds salt in the coating. | Bake plain fish fillets with a little crumb coating of your own. | USDA FoodData Central (SR Legacy) FDC 174195: Fish, fish sticks, frozen, prepared |
| 🍗 Chicken nuggets, frozen | 6 nuggets | 585 | high | 29% | 3 | Breaded chicken is salty, and shows up in kids' meals and takeout. | Bake chicken strips breaded with unsalted crumbs. | USDA FoodData Central (SR Legacy) FDC 172111: Chicken, nuggets, dark and white meat, precooked, frozen, not reheated |
| 🍤 Frozen shrimp, cooked | 3 oz | 805 | high | 40% | 3 | Frozen shrimp is often soaked in salt-based preservatives. | Check the label for 'sodium tripolyphosphate' and added salt. | USDA FoodData Central (SR Legacy) FDC 171971: Crustaceans, shrimp, mixed species, cooked, moist heat (may contain ad |
| 🍗 Store rotisserie chicken | 3 oz | 450 | high | 22% | 3 | Store rotisserie birds are usually injected or brined with salt solution. | Roast your own chicken at home with herbs. | Estimate from typical store labels. No USDA entry. (ESTIMATE) |

### Dairy & cheese (8)

| Card | Serving | mg | Rating | % of 2,000 | lvl | Teaching text | Swap tip | Source |
|---|---|---|---|---|---|---|---|---|
| 🥛 Plain low-fat yogurt | 8 oz | 160 | mod | 8% | 2 | Plain yogurt is a bit higher than people expect, but it is a good protein food. | Compare labels and pick the lowest sodium brand. | USDA FoodData Central (SR Legacy) FDC 170886: Yogurt, plain, low fat |
| 🥛 Whole milk | 1 cup | 105 | low | 5% | 2 | Milk has some natural sodium, about 100 mg a cup. | Fine for most people. Your care team may have limits on dairy for other reasons. | USDA FoodData Central (SR Legacy) FDC 171265: Milk, whole, 3.25% milkfat, with added vitamin D |
| 🧀 American cheese slice | 1 slice | 350 | mod | 18% | 2 | Processed cheese has added salts. One slice is already moderate. | Use a thin slice of Swiss, or skip cheese on sandwiches. | USDA FoodData Central (SR Legacy) FDC 171290: Cheese, pasteurized process, American, without added vitamin D |
| 🧀 Grated parmesan | 2 tbsp | 180 | mod | 9% | 3 | Parmesan is salty. A sprinkle is moderate, a handful is high. | Measure it. Use a pinch for flavor. | USDA FoodData Central (SR Legacy) FDC 171247: Cheese, parmesan, grated |
| 🥛 Cottage cheese, 2% | ½ cup | 350 | mod | 18% | 3 | Cottage cheese surprises people: it is salted for flavor and texture. | Look for 'no salt added' cottage cheese. | USDA FoodData Central (SR Legacy) FDC 172182: Cheese, cottage, lowfat, 2% milkfat |
| 🧀 Feta cheese | ¼ cup crumbled | 425 | high | 21% | 3 | Feta is stored in brine. | Use a small sprinkle, or try a different salad topping. | USDA FoodData Central (SR Legacy) FDC 173420: Cheese, feta |
| 🧀 Swiss cheese | 1 oz | 55 | low | 3% | 3 | Swiss is one of the lowest-sodium cheeses. | Pick Swiss over American or feta. | USDA FoodData Central (SR Legacy) FDC 171251: Cheese, swiss |
| 🧀 Cream cheese | 2 tbsp | 90 | low | 4% | 3 | Cream cheese is low per serving. Bagels are the issue. | Use a thin spread on lower sodium bread. | USDA FoodData Central (SR Legacy) FDC 173418: Cheese, cream |

### Canned & packaged (20)

| Card | Serving | mg | Rating | % of 2,000 | lvl | Teaching text | Swap tip | Source |
|---|---|---|---|---|---|---|---|---|
| 🥫 Canned chicken noodle soup | 1 cup prepared | 830 | high | 42% | 2 | Canned soup is a classic high sodium food. One bowl can use over a third of your day. | Make soup at home with low sodium broth. | USDA FoodData Central (SR Legacy) FDC 172909: Soup, chicken noodle, canned, prepared with equal volume water |
| 🥫 'Low sodium' chicken noodle soup | 1 cup prepared | 430 | high | 22% | 3 | 'Low sodium' can still be high. It means lower than the regular version, not low. | Check the number, not the front label. | USDA FoodData Central (SR Legacy) FDC 171593: Soup, chicken noodle, low sodium, canned, prepared with equal volume w |
| 🥫 Cream of mushroom soup (condensed) | 1 cup made with water | 870 | high | 44% | 3 | Condensed soups used in casseroles bring a lot of salt. | Make a sauce from milk and flour with herbs. | USDA FoodData Central (SR Legacy) FDC 171155: Soup, cream of mushroom, canned, condensed |
| 🥫 Low sodium cream of mushroom soup | 1 cup | 50 | low | 2% | 3 | Truly low sodium soups exist. Compare the number on the label. | Use low sodium soup in recipes. | USDA FoodData Central (SR Legacy) FDC 171607: Soup, cream of mushroom, low sodium, ready-to-serve, canned |
| 🍲 Chicken broth, regular | 1 cup | 925 | high | 46% | 2 | Broth is mostly salty water. | Use low sodium or no salt added broth. | USDA FoodData Central (SR Legacy) FDC 174536: Soup, chicken broth, ready-to-serve |
| 🍲 Low sodium chicken broth | 1 cup | 70 | low | 4% | 2 | Low sodium broth is a big upgrade. | Make your own stock when you can. | USDA FoodData Central (SR Legacy) FDC 171609: Soup, chicken broth, low sodium, canned |
| 🫘 Canned kidney beans (with liquid) | ½ cup | 330 | mod | 16% | 3 | Canned beans are stored in salty liquid. | Drain and rinse, or buy 'no salt added'. | USDA FoodData Central (SR Legacy) FDC 175195: Beans, kidney, red, mature seeds, canned, solids and liquids |
| 🫘 Canned kidney beans, drained and rinsed | ½ cup | 165 | mod | 8% | 3 | Draining and rinsing washes away a good share of the sodium. | Rinse for a full minute. | USDA FoodData Central (SR Legacy) FDC 175243: Beans, kidney, red, mature seeds, canned, drained solids, rinsed in ta |
| 🌽 Canned corn | ½ cup | 250 | mod | 12% | 3 | Canned vegetables are packed with salt. | Choose 'no salt added' or frozen. | USDA FoodData Central (SR Legacy) FDC 170409: Corn, sweet, yellow, canned, brine pack, regular pack, solids and liqu |
| 🌽 No-salt-added canned corn | ½ cup | 15 | low | 1% | 3 | The same corn, with almost no sodium. | Stock your pantry with no-salt-added cans. | USDA FoodData Central (SR Legacy) FDC 169345: Corn, sweet, yellow, canned, no salt added, solids and liquids (Includ |
| 🥤 Vegetable juice cocktail | 1 cup | 430 | high | 22% | 3 | A glass of 'veggie juice' can be a high sodium drink. | Choose low sodium vegetable juice, or eat the vegetables. | USDA FoodData Central (SR Legacy) FDC 170063: Vegetable juice cocktail, canned |
| 🥤 Low sodium vegetable juice | 1 cup | 140 | low | 7% | 3 | A low sodium version cuts it way down. | Watch the potassium if you are on a potassium limit. | USDA FoodData Central (SR Legacy) FDC 170473: Vegetable juice cocktail, low sodium, canned |
| 🍝 Jarred marinara sauce | ½ cup | 575 | high | 29% | 2 | Jarred pasta sauce is a big hidden sodium source. | Choose 'no salt added' sauce or make your own. | USDA FoodData Central (SR Legacy) FDC 171192: Sauce, pasta, spaghetti/marinara, ready-to-serve |
| 🍝 Low sodium marinara sauce | ½ cup | 40 | low | 2% | 3 | A low sodium sauce is a big win. | Add garlic, basil and oregano. | USDA FoodData Central (SR Legacy) FDC 171597: Sauce, pasta, spaghetti/marinara, ready-to-serve, low sodium |
| 🥬 Sauerkraut | ½ cup | 470 | high | 24% | 2 | Fermented and pickled foods are brined. | Use fresh cabbage slaw with vinegar. | USDA FoodData Central (SR Legacy) FDC 169279: Sauerkraut, canned, solids and liquids |
| 🥒 Dill pickle spear | 1 spear | 285 | mod | 14% | 2 | One spear is moderate. A whole pickle is high. | Fresh cucumber with vinegar tastes close. | USDA FoodData Central (SR Legacy) FDC 168558: Pickles, cucumber, dill or kosher dill |
| 🫒 Green olives | 5 olives | 210 | mod | 10% | 3 | Olives are cured in brine. | Count them out. A handful adds up. | USDA FoodData Central (SR Legacy) FDC 169096: Olives, pickled, canned or bottled, green |
| 🥫 Canned ravioli | 1 cup | 740 | high | 37% | 2 | Canned pasta meals are heavily salted. | Cook pasta at home and top with no-salt sauce. | USDA FoodData Central (SR Legacy) FDC 173328: Ravioli, cheese-filled, canned |
| 🫘 Canned baked beans | ½ cup | 435 | high | 22% | 3 | Baked beans are sweet and savory, with a lot of salt. | No-salt-added baked beans exist. | USDA FoodData Central (SR Legacy) FDC 175182: Beans, baked, canned, plain or vegetarian |
| 🍲 Canned New England clam chowder | 1 cup | 870 | high | 44% | 2 | Creamy canned soups are very high in sodium. | A smaller cup or a homemade version. | USDA FoodData Central (SR Legacy) FDC 174062: Soup, clam chowder, new england, canned, ready-to-serve |

### Sauces, condiments & seasonings (20)

| Card | Serving | mg | Rating | % of 2,000 | lvl | Teaching text | Swap tip | Source |
|---|---|---|---|---|---|---|---|---|
| 🥢 Soy sauce | 1 tbsp | 880 | high | 44% | 1 | One tablespoon is more than a third of a 2,000 mg day. | Use a few drops, or rice vinegar, ginger and garlic. | USDA FoodData Central (SR Legacy) FDC 174277: Soy sauce made from soy and wheat (shoyu) |
| 🥢 Reduced-sodium soy sauce | 1 tbsp | 435 | high | 22% | 2 | 'Reduced sodium' still lands in the high range. | Measure it. A teaspoon is plenty. | USDA FoodData Central (SR Legacy) FDC 172474: Soy sauce, reduced sodium, made from hydrolyzed vegetable protein |
| 🍅 Ketchup | 1 tbsp | 155 | mod | 8% | 2 | A tablespoon is moderate. Fries and burgers use more. | Low sodium ketchup, or a thin layer. | USDA FoodData Central (SR Legacy) FDC 168556: Catsup |
| 🍅 Low sodium ketchup | 1 tbsp | 0 | low | 0% | 3 | A low sodium version is a clear win. | Look for it near regular ketchup. | USDA FoodData Central (SR Legacy) FDC 169381: Catsup, low sodium |
| 🌭 Yellow mustard | 1 tsp | 55 | low | 3% | 2 | Mustard is low per teaspoon. | Good flavor for very little sodium. | USDA FoodData Central (SR Legacy) FDC 172234: Mustard, prepared, yellow |
| 🥪 Mayonnaise | 1 tbsp | 90 | low | 4% | 2 | Mayo is low per tablespoon. | Use less, since spreads add up. | USDA FoodData Central (SR Legacy) FDC 171009: Salad dressing, mayonnaise, regular |
| 🍖 BBQ sauce | 2 tbsp | 350 | mod | 18% | 2 | Two tablespoons is moderate. Most people use more. | Make a rub from paprika, garlic and pepper. | USDA FoodData Central (SR Legacy) FDC 174523: Sauce, barbecue |
| 🍱 Teriyaki sauce | 1 tbsp | 690 | high | 34% | 1 | Teriyaki is mostly soy sauce. | Make a ginger-garlic sauce with a splash of low sodium soy. | USDA FoodData Central (SR Legacy) FDC 171167: Sauce, teriyaki, ready-to-serve |
| 🌶️ Tabasco-style hot sauce | 1 tsp | 30 | low | 2% | 2 | Vinegar-style hot sauce is low per teaspoon. | Check labels on other hot sauces. | USDA FoodData Central (SR Legacy) FDC 174528: Sauce, ready-to-serve, pepper, TABASCO |
| 🥗 Ranch dressing | 2 tbsp | 270 | mod | 14% | 2 | Two tablespoons is moderate, and most salads get more. | Dip your fork in the dressing, or use oil and vinegar. | USDA FoodData Central (SR Legacy) FDC 173592: Salad dressing, ranch dressing, regular |
| 🥗 Italian dressing | 2 tbsp | 290 | mod | 14% | 2 | Bottled dressings are salty. | Use olive oil with lemon or vinegar. | USDA FoodData Central (SR Legacy) FDC 171019: Salad dressing, italian dressing, commercial, regular |
| 🍅 Jarred salsa | 2 tbsp | 255 | mod | 13% | 2 | Salsa has salt from tomatoes and brine. | Fresh pico de gallo is lower. | USDA FoodData Central (SR Legacy) FDC 174524: Sauce, salsa, ready-to-serve |
| 🐟 Fish sauce | 1 tbsp | 1425 | high | 71% | 1 | Fish sauce is concentrated salt. | Use lime juice and herbs. | USDA FoodData Central (SR Legacy) FDC 174531: Sauce, fish, ready-to-serve |
| 🍲 Miso paste | 1 tbsp | 635 | high | 32% | 2 | Miso is fermented with salt. | Use a small amount, and skip other salt in the dish. | USDA FoodData Central (SR Legacy) FDC 172442: Miso |
| 🧊 Bouillon cube | 1 cube | 955 | high | 48% | 2 | One tiny cube holds nearly half your day. | Use herbs, or low sodium stock. | USDA FoodData Central (SR Legacy) FDC 171562: Soup, chicken broth or bouillon, dry |
| 🌮 Taco seasoning mix | 2 tsp | 410 | high | 20% | 2 | Seasoning packets are mostly salt. | Make your own: chili, cumin, garlic and paprika. | USDA FoodData Central (SR Legacy) FDC 172243: Seasoning mix, dry, taco, original |
| 🧂 Table salt | ¼ tsp | 580 | high | 29% | 1 | A quarter teaspoon of salt is about 580 mg. A full teaspoon is about 2,300 mg. | Measure it. A pinch is far less than a spoon. | USDA FoodData Central (SR Legacy) FDC 173468: Salt, table |
| 🧄 Garlic powder + black pepper | 1 tsp each | 0 | low | 0% | 1 | Herbs and spices add flavor without sodium. Choose pure ones, not 'garlic salt'. | Check the label for 'salt' in the ingredients. | USDA FoodData Central (SR Legacy) FDC 171325 garlic powder, FDC 170931 black pepper |
| 🧂 Lite salt (half salt, half potassium) | ¼ tsp | 290 | mod | 14% | 3 | Lite salt halves the sodium, but replaces it with potassium chloride. | Ask your care team before using any salt substitute. | Product label (Morton Lite Salt style). (ESTIMATE) |
| 🧂 Salt substitute (potassium chloride) | ¼ tsp | 0 | low | 0% | 3 | Salt substitutes have no sodium but are made of potassium chloride. | Use herbs, lemon, vinegar and spices instead. | Product label (NoSalt style). (ESTIMATE) |

### Snacks (10)

| Card | Serving | mg | Rating | % of 2,000 | lvl | Teaching text | Swap tip | Source |
|---|---|---|---|---|---|---|---|---|
| 🥔 Potato chips | 1 oz (about 20 chips) | 150 | mod | 8% | 2 | A small bag is moderate. A big bowl is high. | Unsalted chips, or air-popped popcorn. | USDA FoodData Central (SR Legacy) FDC 169677: Snacks, potato chips, plain, salted |
| 🥨 Salted pretzels | 1 oz | 350 | mod | 18% | 2 | Pretzels have more sodium than chips because of the salt crust. | Unsalted pretzels or rice cakes. | USDA FoodData Central (SR Legacy) FDC 167555: Snacks, pretzels, hard, plain, salted |
| 🍿 Microwave butter popcorn | 3 cups popped | 180 | mod | 9% | 2 | Microwave bags are seasoned and salted. | Air-pop and add pepper or garlic powder. | USDA FoodData Central (SR Legacy) FDC 173141: Popcorn, microwave, regular (butter) flavor, made with palm oil |
| 🍿 Air-popped popcorn | 3 cups | 0 | low | 0% | 1 | Plain popcorn is a very low sodium snack. | Season with herbs or a bit of oil. | USDA FoodData Central (SR Legacy) FDC 167959: Snacks, popcorn, air-popped |
| 🥜 Salted dry-roasted peanuts | 1 oz | 115 | low | 6% | 2 | A small handful is lower than people think. A big bowl is not. | Count out one ounce. Choose unsalted. | USDA FoodData Central (SR Legacy) FDC 174262: Peanuts, all types, dry-roasted, with salt |
| 🌽 Tortilla chips, salted | 1 oz | 95 | low | 5% | 2 | Tortilla chips are lower than potato chips per ounce. | Pair with fresh salsa or guacamole, not queso. | USDA FoodData Central (SR Legacy) FDC 167558: Snacks, tortilla chips, plain, white corn, salted |
| 🧀 Cheese crackers | 1 oz | 275 | mod | 14% | 2 | Cheese crackers are salt on salt. | Choose plain whole-grain, low sodium crackers. | USDA FoodData Central (SR Legacy) FDC 174975: Crackers, cheese, regular |
| 🍘 Rice cakes | 2 cakes | 30 | low | 2% | 1 | Plain rice cakes are low sodium. | Top with banana or unsalted nut butter. | USDA FoodData Central (SR Legacy) FDC 169679: Snacks, rice cakes, brown rice, corn |
| 🍫 Hard granola bar | 1 bar | 60 | low | 3% | 2 | Most bars are lower in sodium than chips. | Check the label. | USDA FoodData Central (SR Legacy) FDC 167542: Snacks, granola bars, hard, plain |
| 🧆 Store-bought hummus | 2 tbsp | 130 | low | 6% | 3 | Hummus is moderate for two tablespoons. | Make it at home with no salt. | USDA FoodData Central (SR Legacy) FDC 174289: Hummus, commercial |

### Frozen & ready meals (7)

| Card | Serving | mg | Rating | % of 2,000 | lvl | Teaching text | Swap tip | Source |
|---|---|---|---|---|---|---|---|---|
| 🍕 Frozen cheese pizza | ⅓ of a 12 in pizza (151 g) | 675 | high | 34% | 2 | Pizza combines salty crust, cheese and sauce. | A thin crust with veggies, one slice. | USDA FoodData Central (SR Legacy) FDC 170317: Pizza, cheese topping, regular crust, frozen, cooked |
| 🍜 Instant ramen, whole package | 1 block with flavor packet | 1500 | high | 75% | 1 | One package can hold most of a day. The flavor packet is the main culprit. | Use only a quarter of the packet, or plain noodles in low sodium broth. | USDA FoodData Central (SR Legacy) FDC 171177: Soup, ramen noodle, any flavor, dry |
| 🧀 Boxed mac and cheese, prepared | 1 cup | 870 | high | 44% | 2 | The powder cheese packet is very salty. | Make it with real cheese, milk and pepper. | USDA FoodData Central (SR Legacy) FDC 169770: Macaroni and cheese, box mix with cheese sauce, prepared |
| 🥟 Frozen stuffed sandwich | 1 sandwich | 480 | high | 24% | 2 | Convenience foods pack sodium in crust, filling and sauce. | Make a quick sandwich with fresh ingredients. | USDA FoodData Central (SR Legacy) FDC 172107: HOT POCKETS, meatballs & mozzarella stuffed sandwich, frozen |
| 🍕 Frozen pizza rolls | 6 rolls | 480 | high | 24% | 2 | Party snacks are salty. | Bake a small veggie pizza on a pita. | USDA FoodData Central (SR Legacy) FDC 168957: Pizza rolls, frozen, unprepared |
| 🥟 Frozen vegetable egg roll | 1 egg roll | 335 | mod | 17% | 3 | Fried appetizers are moderate to high. | Try fresh spring rolls with a low sodium dipping sauce. | USDA FoodData Central (SR Legacy) FDC 172105: Egg rolls, vegetable, frozen, prepared |
| 🥦 Plain frozen vegetables | 1 cup broccoli, boiled no salt | 20 | low | 1% | 1 | Plain frozen vegetables are low. Sauced or buttered ones are not. | Choose bags with no sauce. | USDA FoodData Central (SR Legacy) FDC 169969: Broccoli, frozen, chopped, cooked, boiled, drained, without salt |

### Restaurant & fast food (15)

| Card | Serving | mg | Rating | % of 2,000 | lvl | Teaching text | Swap tip | Source |
|---|---|---|---|---|---|---|---|---|
| 🍔 Fast-food cheeseburger | 1 sandwich | 800 | high | 40% | 2 | A single burger lands in the high zone. | Order plain, skip the cheese, or go for a grilled sandwich. | USDA FoodData Central (SR Legacy) FDC 170691: Fast foods, cheeseburger; single, regular patty, with condiments |
| 🍟 Fast-food fries, medium | 1 medium | 245 | mod | 12% | 2 | Fries are moderate. A large is nearly high. | Order small, no added salt. | USDA FoodData Central (SR Legacy) FDC 170698: Fast foods, potato, french fried in vegetable oil |
| 🍗 Fast-food chicken pieces | 6 pieces | 570 | high | 28% | 2 | Breaded and fried chicken is high. | Grilled chicken, no sauce packets. | USDA FoodData Central (SR Legacy) FDC 170718: Fast foods, chicken, breaded and fried, boneless pieces, plain |
| 🍔 Fish sandwich with tartar | 1 sandwich | 1325 | high | 66% | 2 | A fish sandwich is higher than a burger. | A plain grilled fish with a side salad. | USDA FoodData Central (SR Legacy) FDC 170296: Fast foods, fish sandwich, with tartar sauce |
| 🥪 Roast beef sub | 6 inch sub | 625 | high | 31% | 2 | A six-inch sub is already high. | Order half, load up the veggies, skip the cheese. | USDA FoodData Central (SR Legacy) FDC 170298: Fast foods, submarine sandwich, roast beef on white bread with lettuce |
| 🍕 Pepperoni pizza slice | 1 slice thin crust | 775 | high | 39% | 2 | Restaurant pizza slices are high. | One slice with a big salad and a light dressing. | USDA FoodData Central (SR Legacy) FDC 170369: PIZZA HUT 14" Pepperoni Pizza, THIN 'N CRISPY Crust |
| 🌮 Restaurant soft taco | 1 taco | 680 | high | 34% | 2 | A single restaurant taco is high. | Order one taco with extra veggies and no cheese. | USDA FoodData Central (SR Legacy) FDC 167658: Restaurant, Mexican, soft taco with ground beef, cheese and lettuce |
| 🌯 Bean and cheese burrito | 1 burrito | 1050 | high | 52% | 2 | Burritos are high. Tortilla, cheese, beans and sauce. | Make a bowl with rice, beans (rinsed) and fresh salsa. | USDA FoodData Central (SR Legacy) FDC 172039: Fast foods, burrito, with beans and cheese |
| 🧅 Fast-food onion rings | 18 rings | 910 | high | 46% | 2 | Breading makes onion rings very salty. | Choose a side salad. | USDA FoodData Central (SR Legacy) FDC 170697: Fast foods, onion rings, breaded and fried |
| 🍚 Chinese fried rice | 1 cup | 530 | high | 26% | 3 | Restaurant fried rice is moderate to high before soy sauce. | Ask for sauce on the side, or steamed rice. | USDA FoodData Central (SR Legacy) FDC 167668: Restaurant, Chinese, fried rice, without meat |
| 🍜 Vegetable lo mein | 1 cup | 585 | high | 29% | 3 | A noodle dish is high even without meat. | Ask for light sauce. | USDA FoodData Central (SR Legacy) FDC 167677: Restaurant, Chinese, vegetable lo mein, without meat |
| 🥐 Fast-food breakfast biscuit | 1 egg, cheese and bacon biscuit | 1175 | high | 59% | 2 | Breakfast sandwiches are very high. | Try plain oatmeal with fruit. | USDA FoodData Central (SR Legacy) FDC 172029: Fast foods, biscuit, with egg, cheese, and bacon |
| 🥗 Coleslaw | ½ cup | 195 | mod | 10% | 3 | Coleslaw dressing adds up. | Make slaw with vinegar and a little oil. | USDA FoodData Central (SR Legacy) FDC 170300: Fast foods, coleslaw |
| 🥟 Beef empanada | 1 piece | 390 | mod | 20% | 3 | Pastries with meat fillings are moderate. | Share one, with a salad. | USDA FoodData Central (SR Legacy) FDC 167660: Restaurant, Latino, empanadas, beef, prepared |
| 🍗 Chicken and rice entree | 1 cup | 730 | high | 36% | 3 | Mixed rice dishes often use seasoning blends. | Ask how it is seasoned. | USDA FoodData Central (SR Legacy) FDC 167659: Restaurant, Latino, chicken and rice, entree, prepared |

## Whole plates (Hidden Salt and Daily Budget)

### 🍳 Eggs, toast & banana: 320 mg, low (16% of 2,000), slot: Breakfast

- Teaching text: A simple breakfast. The toast is the main sodium source.
- Swap tip: Pick a bread under 140 mg a slice.
- Parts: Scrambled eggs (2) 180 mg; White toast (1 slice) 140 mg; Banana 0 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🥓 Bacon, eggs & toast: 815 mg, mod (41% of 2,000), slot: Breakfast

- Teaching text: Cured meat and bread add up before noon.
- Swap tip: Skip the bacon or limit to one slice.
- Parts: Bacon (2 slices) 355 mg; Scrambled eggs (2) 180 mg; White toast (2 slices) 280 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🥣 Oatmeal, banana & almonds: 115 mg, low (6% of 2,000), slot: Breakfast

- Teaching text: Home-cooked plain oats keep sodium very low.
- Swap tip: Add cinnamon instead of salt.
- Parts: Oatmeal, plain 10 mg; Banana 0 mg; Almonds, unsalted 0 mg; Milk (1 cup) 105 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🥣 Cereal, milk & banana: 245 mg, low (12% of 2,000), slot: Breakfast

- Teaching text: Cold cereal is a hidden source but this plate stays low.
- Swap tip: Check the cereal label. Brands differ a lot.
- Parts: Oat cereal (1 cup) 140 mg; Milk (1 cup) 105 mg; Banana 0 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🥯 Bagel with cream cheese: 510 mg, low (26% of 2,000), slot: Breakfast

- Teaching text: The bagel alone is almost 'high'. The plate stays under the limit.
- Swap tip: Half a bagel with fruit.
- Parts: Plain bagel 420 mg; Cream cheese (2 tbsp) 90 mg; Orange 0 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🥞 Pancakes & sausage: 1090 mg, high (54% of 2,000), slot: Breakfast

- Teaching text: A diner breakfast is a sodium bomb.
- Swap tip: Choose oatmeal or eggs and fruit.
- Parts: Pancakes (3) 715 mg; Sausage links (2) 375 mg; Maple syrup 0 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🧇 Waffles & bacon: 790 mg, mod (40% of 2,000), slot: Breakfast

- Teaching text: Frozen waffles and bacon are both hidden salt.
- Swap tip: One waffle, no bacon.
- Parts: Frozen waffles (2) 435 mg; Bacon (2 slices) 355 mg; Strawberries 0 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🥐 Fast-food breakfast biscuit: 1175 mg, high (59% of 2,000), slot: Breakfast

- Teaching text: One drive-thru sandwich can exceed a plate.
- Swap tip: Order oatmeal and fruit.
- Parts: Biscuit with egg, cheese and bacon 1175 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🥪 Deli turkey & cheese sandwich: 1190 mg, high (60% of 2,000), slot: Lunch

- Teaching text: A classic sandwich is a stack of salty foods.
- Swap tip: Use roast chicken, fresh tomato and lettuce.
- Parts: White bread (2 slices) 280 mg; Deli turkey (2 oz) 505 mg; American cheese (1 slice) 350 mg; Mustard (1 tsp) 55 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🥪 Home chicken sandwich: 435 mg, low (22% of 2,000), slot: Lunch

- Teaching text: Same sandwich, made at home, much lower.
- Swap tip: Use unsalted roasted chicken.
- Parts: Bread (2 slices) 280 mg; Roasted chicken, plain 65 mg; Lettuce 0 mg; Tomato slices 0 mg; Mayo (1 tbsp) 90 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🥫 Canned soup & crackers: 1110 mg, high (56% of 2,000), slot: Lunch

- Teaching text: Soup plus crackers is salt on salt.
- Swap tip: Choose a homemade soup with low sodium broth.
- Parts: Chicken noodle soup (1 cup) 830 mg; Saltines (10) 280 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🥣 Low sodium soup & apple: 430 mg, low (22% of 2,000), slot: Lunch

- Teaching text: Even low sodium soup uses a good part of a plate.
- Swap tip: Compare labels for under 140 mg per serving.
- Parts: Low sodium chicken noodle soup 430 mg; Apple 0 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🥪 Tuna salad sandwich: 580 mg, low (29% of 2,000), slot: Lunch

- Teaching text: Bread and canned tuna both bring sodium.
- Swap tip: Use no-salt-added tuna.
- Parts: Bread (2 slices) 280 mg; Canned tuna 210 mg; Mayo (1 tbsp) 90 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🥪 Tuna sandwich, no-salt-added tuna: 410 mg, low (20% of 2,000), slot: Lunch

- Teaching text: Swapping one ingredient cuts sodium by about 170 mg.
- Swap tip: Always look for 'no salt added' tuna.
- Parts: Bread (2 slices) 280 mg; No-salt-added tuna 40 mg; Mayo (1 tbsp) 90 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🍜 Instant ramen: 1500 mg, high (75% of 2,000), slot: Lunch

- Teaching text: A single package is a day's worth of salt.
- Swap tip: Use a small portion of the packet.
- Parts: Instant ramen (whole package) 1500 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🌭 Hot dog with chips: 930 mg, mod (46% of 2,000), slot: Lunch

- Teaching text: Every piece adds salt: meat, bun, ketchup and chips.
- Swap tip: Skip the chips and use mustard.
- Parts: Hot dog 410 mg; Bun 215 mg; Ketchup (1 tbsp) 155 mg; Potato chips (1 oz) 150 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🌯 Home burrito bowl: 485 mg, low (24% of 2,000), slot: Lunch

- Teaching text: Building a bowl at home keeps control.
- Swap tip: Use fresh salsa to cut further.
- Parts: Rice 0 mg; Black beans, low sodium 165 mg; Roasted chicken, plain 65 mg; Fresh salsa (use jarred, 2 tbsp) 255 mg; Lettuce 0 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🍕 Pizza night: 2 slices: 1550 mg, high (78% of 2,000), slot: Lunch

- Teaching text: Two slices of restaurant pizza pass a thousand.
- Swap tip: One slice and a salad.
- Parts: Pepperoni pizza slice (2) 1550 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🍗 Grilled chicken, rice & broccoli: 95 mg, low (5% of 2,000), slot: Dinner

- Teaching text: Simple home cooking is very low in sodium.
- Swap tip: Flavor with herbs and lemon.
- Parts: Roasted chicken, plain 65 mg; Rice 0 mg; Broccoli 30 mg; Olive oil (1 tbsp) 0 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🍝 Spaghetti with jarred sauce: 755 mg, mod (38% of 2,000), slot: Dinner

- Teaching text: The jar of sauce makes the meal.
- Swap tip: Choose no-salt-added sauce.
- Parts: Pasta (1½ cups) 0 mg; Jarred marinara (½ cup) 575 mg; Grated parmesan (2 tbsp) 180 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🍝 Spaghetti with low sodium sauce: 130 mg, low (6% of 2,000), slot: Dinner

- Teaching text: A smart swap saves over 600 mg.
- Swap tip: Add basil and garlic.
- Parts: Pasta (1½ cups) 0 mg; Low sodium marinara (½ cup) 40 mg; Grated parmesan (1 tbsp) 90 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🍔 Cheeseburger, fries & slaw: 1240 mg, high (62% of 2,000), slot: Dinner

- Teaching text: A fast-food meal runs past a thousand.
- Swap tip: Order a small burger, no fries.
- Parts: Fast-food cheeseburger 800 mg; Fries, medium 245 mg; Coleslaw (½ cup) 195 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🍔 Homemade burger & baked potato: 345 mg, low (17% of 2,000), slot: Dinner

- Teaching text: Home burger, low sodium everything.
- Swap tip: Use low sodium ketchup.
- Parts: Lean beef patty 65 mg; Whole-wheat bun 265 mg; Tomato slices 0 mg; Low sodium ketchup 0 mg; Baked potato 15 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🍜 Takeout lo mein & egg roll: 1220 mg, high (61% of 2,000), slot: Dinner

- Teaching text: Takeout adds up in sauces and fried items.
- Swap tip: Get steamed rice and veggies, sauce on the side.
- Parts: Vegetable lo mein (1 cup) 585 mg; Egg roll 335 mg; Soy sauce packet (1 tsp) 300 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🐟 Salmon, baked potato & green beans: 70 mg, low (4% of 2,000), slot: Dinner

- Teaching text: Fresh fish and vegetables are very low.
- Swap tip: Season with lemon and dill.
- Parts: Baked salmon 50 mg; Baked potato 15 mg; Green beans, fresh 5 mg; Olive oil (1 tbsp) 0 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🥩 Corned beef & potatoes: 1310 mg, high (66% of 2,000), slot: Dinner

- Teaching text: Cured and pickled foods are very high.
- Swap tip: Roast fresh beef instead.
- Parts: Corned beef (3 oz) 825 mg; Baked potato 15 mg; Sauerkraut (½ cup) 470 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🌮 Taco night: 2 tacos: 1605 mg, high (80% of 2,000), slot: Dinner

- Teaching text: Tacos, cheese and salsa are all salty.
- Swap tip: Use corn tortillas and fresh salsa.
- Parts: Restaurant soft taco (2) 1350 mg; Jarred salsa (2 tbsp) 255 mg; Rice 0 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🍱 Chicken stir-fry with teriyaki: 1470 mg, high (74% of 2,000), slot: Dinner

- Teaching text: The sauce is almost all of the sodium.
- Swap tip: Use 1 tsp low sodium soy sauce with ginger and garlic.
- Parts: Chicken, plain 65 mg; Broccoli 30 mg; Rice 0 mg; Teriyaki (2 tbsp) 1375 mg
- Source: sum of the parts (USDA FDC values on the food cards)

### 🥦 Chicken stir-fry, light sauce: 240 mg, low (12% of 2,000), slot: Dinner

- Teaching text: Light sauce and spices save over a thousand milligrams.
- Swap tip: Add ginger and lime.
- Parts: Chicken, plain 65 mg; Broccoli 30 mg; Rice 0 mg; Reduced sodium soy (1 tsp) 145 mg; Garlic and pepper 0 mg
- Source: sum of the parts (USDA FDC values on the food cards)

## Which-is-lower pairs

| Pair | A (mg) | B (mg) | Lower | Teaching text | Swap tip |
|---|---|---|---|---|---|
| cmp-soup | 🥫 Canned chicken noodle soup, 1 cup prepared (830) | 🥫 'Low sodium' chicken noodle soup, 1 cup prepared (430) | B | The 'low sodium' soup is lower, but it is still high. | Compare the number on the label. |
| cmp-broth | 🍲 Chicken broth, regular, 1 cup (925) | 🍲 Low sodium chicken broth, 1 cup (70) | B | Broth is a hidden sodium source. Low sodium broth is a big upgrade. | Use low sodium or unsalted broth in soups and rice. |
| cmp-marinara | 🍝 Jarred marinara sauce, ½ cup (575) | 🍝 Low sodium marinara sauce, ½ cup (40) | B | Same sauce, much less salt. | Choose 'no salt added' sauce. |
| cmp-corn | 🌽 Canned corn, ½ cup (250) | 🌽 No-salt-added canned corn, ½ cup (15) | B | Same vegetable, very different sodium. | Stock no-salt-added cans. |
| cmp-beans | 🫘 Canned kidney beans (with liquid), ½ cup (330) | 🫘 Canned kidney beans, drained and rinsed, ½ cup (165) | B | Draining and rinsing canned beans removes some of the sodium. | Rinse beans for a full minute. |
| cmp-tuna | 🐟 Canned tuna in water, 3 oz drained (210) | 🐟 Canned tuna, no salt added, 3 oz drained (40) | B | No-salt-added tuna is the better pick. | Drain it too. |
| cmp-ketchup | 🍅 Ketchup, 1 tbsp (155) | 🍅 Low sodium ketchup, 1 tbsp (0) | B | A low sodium ketchup is a small win. | Look for it near regular ketchup. |
| cmp-soy | 🥢 Soy sauce, 1 tbsp (880) | 🥢 Reduced-sodium soy sauce, 1 tbsp (435) | B | Reduced sodium soy sauce is half, but still high. | Use a teaspoon, not a tablespoon. |
| cmp-salt | 🧂 Table salt, ¼ tsp (580) | 🧂 Salt substitute (potassium chloride), ¼ tsp (0) | B | Salt substitute has no sodium, but it is potassium chloride. This can be dangerous for kidney patients. | Use herbs, spices and lemon instead. |
| cmp-liteSalt | 🧂 Table salt, ¼ tsp (580) | 🧂 Lite salt (half salt, half potassium), ¼ tsp (290) | B | Lite salt halves the sodium, but adds potassium. | Measure either one. Better yet, season with herbs. |
| cmp-bread | 🍞 White bread, 1 slice (140) | 🥯 Plain bagel, 1 medium (420) | A | A bagel has about three slices of bread worth of sodium. | Pick a mini bagel or a slice of toast. |
| cmp-chips | 🥔 Potato chips, 1 oz (about 20 chips) (150) | 🥨 Salted pretzels, 1 oz (350) | A | Pretzels, not chips, are the saltier snack. | Choose unsalted pretzels or popcorn. |
| cmp-popcorn | 🍿 Air-popped popcorn, 3 cups (0) | 🍿 Microwave butter popcorn, 3 cups popped (180) | A | Microwave popcorn is seasoned. Air-popped is not. | Air-pop and add your own spice. |
| cmp-chicken | 🍗 Roasted chicken breast, plain, 3 oz (65) | 🍗 Store rotisserie chicken, 3 oz (450) | A | Store rotisserie chicken is usually brined. Plain home-roasted chicken is not. | Roast your own chicken. |
| cmp-cottage | 🥛 Cottage cheese, 2%, ½ cup (350) | 🧀 Swiss cheese, 1 oz (55) | B | Swiss cheese is far lower than cottage cheese. | Look for no-salt-added cottage cheese. |
| cmp-fries | 🍟 Fast-food fries, medium, 1 medium (245) | 🥔 Baked potato, plain, 1 medium (15) | B | Same food, different cooking. | Choose a plain baked potato. |
| cmp-shrimp | 🍤 Frozen shrimp, cooked, 3 oz (805) | 🐟 Baked salmon, 3 oz (50) | B | Frozen shrimp is soaked in salt. Fresh salmon is not. | Buy fresh or check the label for added salt. |

## Plate components

| Component | Serving | mg | Source |
|---|---|---|---|
| 🍳 Scrambled egg | 1 large | 90 | USDA FoodData Central (SR Legacy) FDC 172187: Egg, whole, cooked, scrambled |
| 🥬 Lettuce | 1 cup | 0 | USDA FoodData Central (SR Legacy) FDC 169247: Lettuce, cos or romaine, raw |
| 🍯 Maple syrup | 2 tbsp | 0 | No sodium (assumed) |
| 🧄 Garlic powder | 1 tsp | 0 | USDA FoodData Central (SR Legacy) FDC 171325: Spices, garlic powder |
| ⚫ Black pepper | 1 tsp | 0 | USDA FoodData Central (SR Legacy) FDC 170931: Spices, pepper, black |
| 🍞 Toast | 1 slice | 140 | USDA FoodData Central (SR Legacy) FDC 174924: Bread, white, commercially prepared (includes soft bread crumbs) |
| 🥜 Peanut butter, no salt | 2 tbsp | 5 | USDA FoodData Central (SR Legacy) FDC 172470: Peanut butter, smooth style, without salt |
| 🧀 Cheddar slice | 1 slice | 120 | USDA FoodData Central (SR Legacy) FDC 170899: Cheese, cheddar, sharp, sliced |
| 🥣 Low sodium tomato soup | 1 cup | 80 | USDA FoodData Central (SR Legacy) FDC 171591: Soup, tomato, low sodium, with water |
| 🥛 Plain yogurt dip | 2 tbsp | 0 | No sodium (assumed) |
| 🍋 Fresh herb and lemon dressing | 2 tbsp | 0 | No sodium (assumed) |
| 🍅 Tomato slices | ½ cup | 0 | USDA FoodData Central (SR Legacy) FDC 170457: Tomatoes, red, ripe, raw, year round average |
| 🍔 Whole-wheat bun | 1 bun | 265 | USDA FoodData Central (SR Legacy) FDC 174090: Rolls, hamburger or hot dog, whole wheat |
| 🍜 Lo mein noodles, plain | 1 cup | 0 | USDA FoodData Central (SR Legacy) FDC 169737: Pasta, cooked, enriched, without added salt |
| 🍅 Ketchup packet | 2 packets | 165 | USDA FoodData Central (SR Legacy) FDC 168556: Catsup |
| 🫘 Black beans, low sodium | ½ cup | 165 | USDA FoodData Central (SR Legacy) FDC 175238: Beans, black, mature seeds, canned, low sodium |

## Sign-off

- [ ] Dr D has reviewed the values, ratings and wording above
- [ ] Salt substitute and lite salt wording approved (CKD and HTN)
- [ ] Daily targets approved (CKD 2,000 mg; HTN 1,500 mg default / 2,300 mg option)
- [ ] 'Estimate' cards checked against labels or removed
