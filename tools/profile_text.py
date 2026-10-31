CATS={
 'fresh':('Fresh & whole foods','🥦'),'bread':('Breads, grains & cereal','🍞'),'meat':('Meat, fish & deli','🥩'),
 'dairy':('Dairy & cheese','🧀'),'canned':('Canned & packaged','🥫'),'sauce':('Sauces, condiments & seasonings','🧂'),
 'snack':('Snacks','🥨'),'frozen':('Frozen & ready meals','🍕'),'rest':('Restaurant & fast food','🍔'),
 'plate':('Whole plates','🍽️'),'compare':('Which is lower?','⚖️'),
}
NOTES={ # per-category profile note, shown after the swap tip
 'fresh':{'ckd':'Fresh foods are the easiest way to keep sodium (and fluid) down. Ask your dietitian about potassium and phosphorus too.',
          'htn':'Fresh produce fits a DASH-style pattern and helps blood pressure.'},
 'bread':{'ckd':'Bread is a top sodium source for many kidney patients because we eat it daily. Compare labels.',
          'htn':'Bread and cereal are among the biggest hidden sodium sources for blood pressure. Read the label.'},
 'meat':{'ckd':'Cured and deli meats are salty and often high in phosphate additives too. Ask your dietitian.',
         'htn':'Processed meats raise sodium fast. DASH-style eating favors fresh fish, poultry and beans.'},
 'dairy':{'ckd':'Cheese is salty, and dairy has phosphorus and potassium. Ask your dietitian how much is right for you.',
          'htn':'Low-fat dairy is part of DASH, but choose lower sodium cheeses.'},
 'canned':{'ckd':'Canned foods are a big salt source. Salt makes you thirsty, which makes fluid limits harder.',
           'htn':'Canned soups and vegetables are major sodium sources. Choose "no salt added".'},
 'sauce':{'ckd':'Sauces are concentrated salt. Do NOT use salt substitutes unless your kidney team says it is safe: they contain potassium.',
          'htn':'Sauces and seasonings add sodium quickly. Flavor with herbs, citrus and spices instead.'},
 'snack':{'ckd':'Salty snacks make you thirsty and can raise blood pressure and swelling.',
          'htn':'Choose unsalted snacks: they fit a DASH-style pattern and help blood pressure.'},
 'frozen':{'ckd':'Ready meals are very high in sodium. They are also often high in phosphate additives.',
           'htn':'Frozen and boxed meals are hidden sodium. Compare the label per serving.'},
 'rest':{'ckd':'Restaurant meals are very high in sodium. Ask for sauces on the side and no added salt.',
         'htn':'Restaurant meals can exceed a whole day of sodium. Ask for sauce on the side and no added salt.'},
 'plate':{'ckd':'Whole meals matter more than single foods. Sodium and fluid go together in kidney disease.',
          'htn':'Whole meals matter. DASH-style plates are rich in vegetables, fruit and low-fat dairy.'},
 'compare':{'ckd':'Small swaps add up across the day.','htn':'Small swaps add up and can help lower blood pressure.'},
}
COACH={
 'ckd':[
  'Less salt means less thirst and less fluid to manage.',
  'Sodium holds water. That raises blood pressure and swelling.',
  'Lower sodium helps protect your kidneys and your heart.',
  'Never swap in salt substitutes without asking your kidney team: they contain potassium.',
  'Reading labels is a kidney-friendly superpower.',
 ],
 'htn':[
  'Lower sodium helps lower blood pressure.',
  'DASH-style eating: more vegetables, fruit and low-fat dairy, less processed food.',
  'Most sodium comes from packaged and restaurant food, not the shaker.',
  'Small drops in sodium can lower blood pressure within weeks.',
  'Reading labels is a blood-pressure superpower.',
 ],
}
PROFILES={
 'ckd':{'label':'Kidney disease (CKD)','short':'CKD','emoji':'🫘','target':2000,'about':
   'Salt Whisperer was made by a nephrologist (Dr D) to help people with chronic kidney disease and their families spot sodium. For many people with kidney disease, too much sodium causes thirst, fluid buildup, swelling and high blood pressure, which can strain the kidneys and heart. A common goal is under 2,000 mg of sodium a day, but your own target may differ.',
   'goal':'Daily goal in this profile: 2,000 mg of sodium. Ask your kidney team for your own number.'},
 'htn':{'label':'High blood pressure','short':'HTN','emoji':'❤️','target':1500,'about':
   'Salt Whisperer was made by a nephrologist (Dr D) to help people with high blood pressure and their families spot sodium. Sodium raises blood pressure in many people. The American Heart Association recommends no more than 2,300 mg of sodium a day, and an ideal limit of 1,500 mg a day for most adults, especially if you have high blood pressure.',
   'goal':'Daily goal in this profile: 1,500 mg of sodium (ideal limit). You can switch to 2,300 mg (upper limit) in Settings. Ask your doctor which is right for you.'},
}
