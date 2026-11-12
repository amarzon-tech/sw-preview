/* Salt Whisperer service worker: precache the app shell and food photos so it works offline.
   Bump CACHE_VERSION whenever any cached file changes. */
const CACHE_VERSION = "salt-whisperer-preview-replay-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./game.js",
  "./content.js",
  "./privacy.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./sw.js",
  "images/food-egg.webp",
  "images/food-banana.webp",
  "images/food-apple.webp",
  "images/food-strawberries.webp",
  "images/food-orange.webp",
  "images/food-broccoli.webp",
  "images/food-carrots.webp",
  "images/food-cucumber.webp",
  "images/food-corn-fresh.webp",
  "images/food-green-beans-fresh.webp",
  "images/food-baked-potato.webp",
  "images/food-chicken-home.webp",
  "images/food-salmon.webp",
  "images/food-beef-patty.webp",
  "images/food-rice.webp",
  "images/food-pasta.webp",
  "images/food-oatmeal.webp",
  "images/food-tomato.webp",
  "images/food-almonds.webp",
  "images/food-peanuts-unsalted.webp",
  "images/food-olive-oil.webp",
  "images/food-yogurt.webp",
  "images/food-milk.webp",
  "images/food-bread-white.webp",
  "images/food-bread-ww.webp",
  "images/food-bread-2.webp",
  "images/food-bagel.webp",
  "images/food-tortilla-flour.webp",
  "images/food-tortilla-corn.webp",
  "images/food-cheerios.webp",
  "images/food-oatmeal-instant.webp",
  "images/food-pancakes.webp",
  "images/food-waffles-frozen.webp",
  "images/food-saltines.webp",
  "images/food-bun.webp",
  "images/food-deli-turkey.webp",
  "images/food-ham.webp",
  "images/food-bacon.webp",
  "images/food-hot-dog.webp",
  "images/food-sausage.webp",
  "images/food-corned-beef.webp",
  "images/food-jerky.webp",
  "images/food-tuna-can.webp",
  "images/food-tuna-nsa.webp",
  "images/food-fish-sticks.webp",
  "images/food-nuggets.webp",
  "images/food-shrimp.webp",
  "images/food-rotisserie.webp",
  "images/food-american-cheese.webp",
  "images/food-parmesan.webp",
  "images/food-cottage.webp",
  "images/food-feta.webp",
  "images/food-swiss.webp",
  "images/food-cream-cheese.webp",
  "images/food-soup-cn.webp",
  "images/food-soup-cn-low.webp",
  "images/food-soup-mushroom.webp",
  "images/food-soup-mushroom-low.webp",
  "images/food-broth.webp",
  "images/food-broth-low.webp",
  "images/food-kidney-beans.webp",
  "images/food-kidney-beans-rinsed.webp",
  "images/food-corn-can.webp",
  "images/food-corn-nsa.webp",
  "images/food-v8.webp",
  "images/food-v8-low.webp",
  "images/food-marinara.webp",
  "images/food-marinara-low.webp",
  "images/food-sauerkraut.webp",
  "images/food-pickle.webp",
  "images/food-olives.webp",
  "images/food-ravioli-can.webp",
  "images/food-baked-beans.webp",
  "images/food-clam-chowder.webp",
  "images/food-soy-sauce.webp",
  "images/food-soy-reduced.webp",
  "images/food-ketchup.webp",
  "images/food-ketchup-low.webp",
  "images/food-mustard.webp",
  "images/food-mayo.webp",
  "images/food-bbq.webp",
  "images/food-teriyaki.webp",
  "images/food-hot-sauce.webp",
  "images/food-ranch.webp",
  "images/food-italian-dressing.webp",
  "images/food-salsa.webp",
  "images/food-fish-sauce.webp",
  "images/food-miso.webp",
  "images/food-bouillon.webp",
  "images/food-taco-seasoning.webp",
  "images/food-table-salt.webp",
  "images/food-pepper-garlic.webp",
  "images/food-lite-salt.webp",
  "images/food-salt-sub.webp",
  "images/food-chips.webp",
  "images/food-pretzels.webp",
  "images/food-popcorn-micro.webp",
  "images/food-popcorn-air.webp",
  "images/food-peanuts-salted.webp",
  "images/food-tortilla-chips.webp",
  "images/food-cheese-crackers.webp",
  "images/food-rice-cakes.webp",
  "images/food-granola-bar.webp",
  "images/food-hummus.webp",
  "images/food-frozen-pizza.webp",
  "images/food-ramen.webp",
  "images/food-mac-box.webp",
  "images/food-hot-pocket.webp",
  "images/food-pizza-rolls.webp",
  "images/food-egg-roll.webp",
  "images/food-veg-frozen.webp",
  "images/food-cheeseburger.webp",
  "images/food-fries-med.webp",
  "images/food-fried-chicken.webp",
  "images/food-fish-sandwich.webp",
  "images/food-sub-rb.webp",
  "images/food-pizza-hut.webp",
  "images/food-taco-rest.webp",
  "images/food-burrito.webp",
  "images/food-onion-rings.webp",
  "images/food-fried-rice.webp",
  "images/food-lo-mein.webp",
  "images/food-biscuit-sandwich.webp",
  "images/food-coleslaw.webp",
  "images/food-empanada.webp",
  "images/food-chicken-rice-latino.webp",
  "images/plate-pl-eggs-toast.webp",
  "images/plate-pl-bacon-eggs.webp",
  "images/plate-pl-oatmeal.webp",
  "images/plate-pl-cereal.webp",
  "images/plate-pl-bagel.webp",
  "images/plate-pl-pancakes.webp",
  "images/plate-pl-waffles.webp",
  "images/plate-pl-bkfast-sandwich.webp",
  "images/plate-pl-turkey-sandwich.webp",
  "images/plate-pl-home-sandwich.webp",
  "images/plate-pl-soup-crackers.webp",
  "images/plate-pl-lowsoup.webp",
  "images/plate-pl-tuna-sandwich.webp",
  "images/plate-pl-tuna-nsa.webp",
  "images/plate-pl-ramen.webp",
  "images/plate-pl-hotdog.webp",
  "images/plate-pl-burrito-bowl.webp",
  "images/plate-pl-pizza.webp",
  "images/plate-pl-chicken-rice.webp",
  "images/plate-pl-spaghetti.webp",
  "images/plate-pl-spaghetti-low.webp",
  "images/plate-pl-cheeseburger.webp",
  "images/plate-pl-home-burger.webp",
  "images/plate-pl-lo-mein.webp",
  "images/plate-pl-salmon.webp",
  "images/plate-pl-corned-beef.webp",
  "images/plate-pl-tacos.webp",
  "images/plate-pl-stirfry.webp",
  "images/plate-pl-stirfry-light.webp"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_VERSION).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cached) => {
      if (cached) {
        // stale-while-revalidate for navigations and scripts
        fetch(req).then((res) => {
          if (res && res.ok) caches.open(CACHE_VERSION).then((c) => c.put(req, res));
        }).catch(() => {});
        return cached;
      }
      return fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() =>
        req.mode === "navigate" ? caches.match("./index.html") : Response.error()
      );
    })
  );
});
