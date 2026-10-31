"""Build tools/sr_cache.json from the USDA SR Legacy CSV download.
Usage: python3 tools/sr_cache.py /path/to/FoodData_Central_sr_legacy_food_csv_2018-04
Download: https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_sr_legacy_food_csv_2018-04.zip"""
import csv, json, sys, os
D = sys.argv[1].rstrip('/') + '/'
foods = {r['fdc_id']: r['description'] for r in csv.DictReader(open(D + 'food.csv', encoding='utf-8'))}
na = {r['fdc_id']: float(r['amount']) for r in csv.DictReader(open(D + 'food_nutrient.csv', encoding='utf-8')) if r['nutrient_id'] == '1093'}
json.dump({'foods': {i: d for i, d in foods.items() if i in na}, 'na': na, 'por': {}}, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'sr_cache.json'), 'w'))
print('wrote sr_cache.json', len(na))
