"use strict";
/* Salt Whisperer v2. Based on the K Swipe engine. No network use, no data collection.
   All sodium values come from content.js (generated from USDA FoodData Central, to be verified by Dr D). */
const DRAFT = true; // set false after Dr D signs off CONTENT_REVIEW.md

/* ---------- CONSTANTS ---------- */
const RATE_LABEL = { low:"Low", mod:"Moderate", high:"High" };
const rateOf  = (mg) => mg <= 140 ? "low" : mg <= 400 ? "mod" : "high";   // per serving
const prateOf = (mg) => mg < 600 ? "low" : mg <= 1000 ? "mod" : "high";  // whole plate
const TSP_MG = 2325; // sodium in 1 tsp table salt (USDA FDC 173468: 38,758 mg/100 g x 6 g)
const MAX_LEVEL = 5, PASS_SCORE = 7, PER_ROUND = 10, SPEED_SECONDS = 60;
const LEVELS = [
  { name:"Pinch",     emoji:"🤏", bgA:"#0b1220", bgB:"#17305a", a1:"#67e8f9", a2:"#a78bfa", theme:"Obvious foods" },
  { name:"Dash",      emoji:"💨", bgA:"#071a2b", bgB:"#173b55", a1:"#4ade80", a2:"#60a5fa", theme:"Sauces and portions" },
  { name:"Sprinkle",  emoji:"✨", bgA:"#1a102a", bgB:"#2b1b4a", a1:"#fbbf24", a2:"#a78bfa", theme:"Whole plates" },
  { name:"Shake",     emoji:"🧂", bgA:"#101020", bgB:"#2b2b6a", a1:"#f87171", a2:"#fbbf24", theme:"Which is lower?" },
  { name:"Whisper",   emoji:"🤫", bgA:"#061018", bgB:"#0f2a3b", a1:"#38bdf8", a2:"#4ade80", theme:"Sneaky sodium" },
];
const PLAYER_RANKS = [[1,"Salt Grain","🧂"],[3,"Crystal","💎"],[5,"Shaker","🥄"],[8,"Salt Sleuth","🕵️"],[12,"Brine Buster","🌊"],[17,"Sodium Sage","🧙"],[23,"Salt Whisperer","🤫"],[30,"Grand Whisperer","👑"]];
const xpFor = (L) => 120 * (L - 1) * (L - 1);       // total XP needed to reach player level L
const levelOf = (xp) => { let L = 1; while (xp >= xpFor(L + 1)) L++; return L; };
const rankOf = (L) => PLAYER_RANKS.filter(r => L >= r[0]).pop();
const GUESS_STOPS = [0,10,25,50,75,100,140,200,250,300,400,500,600,700,800,1000,1250,1500,2000];
const BADGES = [
  { id:"first",   name:"First Pinch",         emoji:"🧂", desc:"Finish any round." },
  { id:"roll",    name:"On a Roll",           emoji:"🔥", desc:"Reach a x3 combo." },
  { id:"storm",   name:"Salt Storm",          emoji:"🌪️", desc:"Reach the x5 combo." },
  { id:"perfect", name:"Flawless",            emoji:"💎", desc:"Get a perfect round." },
  { id:"hunter",  name:"Hidden Salt Hunter",  emoji:"🕵️", desc:"Find the saltiest item in 5 of 6 plates." },
  { id:"sniper",  name:"Sodium Sniper",       emoji:"🎯", desc:"Make 3 bullseye guesses in one Guess the Shaker round." },
  { id:"reader",  name:"Label Reader",        emoji:"🏷️", desc:"Score 8 of 10 in Which is lower?" },
  { id:"subspot", name:"Substitute Spotter",  emoji:"⚠️", desc:"Get the salt substitute card right." },
  { id:"journey", name:"Whisperer",           emoji:"🏆", desc:"Pass all 5 Journey levels." },
  { id:"under",   name:"Under Budget",        emoji:"✅", desc:"Finish a Daily Budget under your target." },
  { id:"under7",  name:"Budget Boss",         emoji:"👑", desc:"Be under budget 7 days in a row." },
  { id:"streak3", name:"Three-Day Shaker",    emoji:"📅", desc:"Keep a 3-day daily streak." },
  { id:"streak7", name:"Week of Whispers",    emoji:"🌙", desc:"Keep a 7-day daily streak." },
  { id:"speed",   name:"Speed Demon",         emoji:"⚡", desc:"Get 12 or more right in a Speed Round." },
  { id:"lvl5",    name:"Shaker Rank",         emoji:"⭐", desc:"Reach player level 5." },
  { id:"record",  name:"Record Breaker",      emoji:"📈", desc:"Beat a personal best." },
];

/* ---------- DATA ---------- */
const FOODS = CONTENT.foods.map(f => ({ ...f, type:"food" }));
const PLATES = CONTENT.plates.map(p => ({ ...p, type:"plate", cat:"plate" }));
const COMPARES = CONTENT.compares.map(c => ({ ...c, type:"compare", cat:"compare" }));
// Hidden Salt needs a clear saltiest part: at least 3 parts and a winner at least 60 mg above the runner-up.
const HIDDEN_POOL = PLATES.filter(p => {
  const m = p.parts.map(x => x.mg).sort((a, b) => b - a);
  return p.parts.length >= 3 && m[0] - m[1] >= 60;
});

/* ---------- STORAGE (on-device only, per profile) ---------- */
const STORE_KEY = "saltwhisperer.v2";
function newProfileData(){
  return { xp:0, unlocked:1, best:{}, journeys:0,
    stats:{ answered:0, correct:0, rounds:0, perfect:0, maxCombo:0, bullseyes:0, dailyPlayed:0 },
    daily:{ last:null, streak:0, best:0, freezes:1, lastTotal:null, lastTarget:null, under:0, lastUnder:null, history:[] },
    records:{}, badges:{} };
}
function defaultSave(){ return { v:2, profile:null, htnLimit:1500, settings:{ sound:true, haptics:true }, p:{ ckd:newProfileData(), htn:newProfileData() } }; }
function mergeP(d, s){ return { ...d, ...s, stats:{...d.stats, ...(s&&s.stats)}, daily:{...d.daily, ...(s&&s.daily)}, best:{...(s&&s.best)}, records:{...(s&&s.records)}, badges:{...(s&&s.badges)} }; }
function loadSave(){
  try{
    const s = JSON.parse(localStorage.getItem(STORE_KEY) || "null"), d = defaultSave();
    if (!s) return d;
    return { ...d, ...s, settings:{...d.settings, ...s.settings}, p:{ ckd:mergeP(d.p.ckd, s.p&&s.p.ckd), htn:mergeP(d.p.htn, s.p&&s.p.htn) } };
  }catch(e){ return defaultSave(); }
}
let save = loadSave();
function persist(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(save)); }catch(e){} }
const PD = () => save.p[save.profile || "ckd"];
const TARGET = () => save.profile === "htn" ? save.htnLimit : 2000;
const pct = (mg) => Math.round(100 * mg / TARGET());
const PROFILE = () => CONTENT.profiles[save.profile || "ckd"];

/* ---------- HELPERS ---------- */
const $ = (id) => document.getElementById(id);
function el(tag, attrs, ...kids){
  const n = document.createElement(tag);
  if (attrs) for (const [k,v] of Object.entries(attrs)){
    if (v == null || v === false) continue;
    if (k === "class") n.className = v;
    else if (k === "text") n.textContent = v;
    else if (k === "style") n.setAttribute("style", v);
    else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v === true ? "" : v);
  }
  for (const c of kids.flat()){ if (c == null || c === false || c === "") continue; n.append(c.nodeType ? c : document.createTextNode(String(c))); }
  return n;
}
function mulberry32(a){ return function(){ a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function shuffle(a, rng = Math.random){ const arr=[...a]; for (let i=arr.length-1;i>0;i--){ const j=Math.floor(rng()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; } return arr; }
const pickOne = (a) => a[Math.floor(Math.random()*a.length)];
function dstr(d = new Date()){ return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function dayNum(s){ const [y,m,d] = s.split("-").map(Number); return Math.round(Date.UTC(y, m-1, d) / 86400000); }
const daysBetween = (a, b) => dayNum(b) - dayNum(a);
const fmt = (n) => Number(n).toLocaleString("en-US");
const mgText = (mg) => mg === 0 ? "0 mg" : "~" + fmt(mg) + " mg";
const reduceMotion = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
const emojiImg = (emoji, label, cls) => el("div", { class:cls, role:"img", "aria-label":label, text:emoji });
function tspText(mg){
  const t = mg / TSP_MG;
  if (t < 0.06) return "a few grains of salt";
  const stops = [[0.125,"⅛ tsp"],[0.25,"¼ tsp"],[0.5,"½ tsp"],[0.75,"¾ tsp"],[1,"1 tsp"],[1.5,"1½ tsp"],[2,"2 tsp"]];
  let best = stops[0]; for (const s of stops) if (Math.abs(s[0]-t) < Math.abs(best[0]-t)) best = s;
  return t > 2.4 ? "about " + t.toFixed(1) + " tsp" : "about " + best[1] + " of table salt";
}
function profNote(c){
  const k = save.profile === "htn" ? "hx" : "cx";
  if (c[k]) return c[k];
  const set = CONTENT.notes[c.cat] || CONTENT.notes.plate;
  const coach = CONTENT.coach[save.profile || "ckd"];
  return Math.random() < 0.4 ? pickOne(coach) : set[save.profile || "ckd"];
}

/* ---------- SOUND + HAPTICS ---------- */
let audioCtx = null;
function tone(freq, dur, type, vol, delay){
  if (!save.settings.sound) return;
  try{
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator(), g = audioCtx.createGain(), t = audioCtx.currentTime + (delay || 0);
    o.type = type || "sine"; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.12, t + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(audioCtx.destination); o.start(t); o.stop(t + dur + 0.02);
  }catch(e){}
}
const LADDER = [523,587,659,784,880,1047,1175,1319,1568];
function sfxCorrect(combo, m){
  const f = LADDER[Math.min(combo - 1, LADDER.length - 1)];
  tone(f, 0.22, "sine", 0.13);
  if (m >= 2) tone(f * 1.5, 0.2, "triangle", 0.08, 0.07);
  if (m >= 4) tone(f * 2, 0.25, "sine", 0.07, 0.14);
}
function sfxWrong(){ tone(160, 0.22, "triangle", 0.12); tone(120, 0.25, "triangle", 0.1, 0.1); }
function sfxFanfare(){ [523,659,784,1047].forEach((f,i) => tone(f, 0.28, "sine", 0.12, i * 0.1)); }
function sfxRecord(){ [659,784,988,1319,1568].forEach((f,i) => tone(f, 0.3, "triangle", 0.11, i * 0.09)); }
function haptic(kind){
  if (!save.settings.haptics) return;
  const H = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Haptics;
  if (H){ try{ kind === "error" ? H.notification({ type:"ERROR" }) : H.impact({ style: kind === "heavy" ? "HEAVY" : kind === "success" ? "MEDIUM" : "LIGHT" }); }catch(e){} return; }
  if (navigator.vibrate){ try{ navigator.vibrate(kind === "error" ? [40,60,40] : kind === "heavy" ? [20,30,40] : kind === "success" ? 25 : 12); }catch(e){} }
}

/* ---------- VISUAL FX: salt crystals, floating points, banners, confetti ---------- */
const fxLayer = $("fx"), confetti = $("confetti");
function burst(x, y, n){
  if (reduceMotion) return;
  for (let i = 0; i < n; i++){
    const c = el("div", { class:"crys" });
    const s = 0.6 + Math.random() * 0.9; c.style.left = x + "px"; c.style.top = y + "px"; c.style.width = c.style.height = (0.55 * s) + "rem";
    fxLayer.append(c);
    const a = Math.random() * Math.PI * 2, d = 40 + Math.random() * 110;
    const anim = c.animate([{ transform:"translate(0,0) rotate(0deg) scale(1)", opacity:1 },
      { transform:`translate(${Math.cos(a)*d}px, ${Math.sin(a)*d + 50}px) rotate(${Math.random()*540}deg) scale(.3)`, opacity:0 }],
      { duration: 550 + Math.random() * 450, easing:"cubic-bezier(.2,.8,.3,1)" });
    anim.onfinish = () => c.remove();
  }
}
function floatText(text, x, y, color){
  if (reduceMotion) return;
  const t = el("div", { class:"floatTxt", text }); t.style.left = (x - 24) + "px"; t.style.top = y + "px"; if (color) t.style.color = color;
  fxLayer.append(t);
  const anim = t.animate([{ transform:"translateY(0) scale(.7)", opacity:0 }, { transform:"translateY(-18px) scale(1.15)", opacity:1, offset:.25 }, { transform:"translateY(-70px) scale(1)", opacity:0 }], { duration:900, easing:"ease-out" });
  anim.onfinish = () => t.remove();
}
function banner(text){
  if (reduceMotion) return;
  const b = el("div", { class:"banner", text }); fxLayer.append(b);
  const anim = b.animate([{ transform:"translateX(-50%) scale(.5)", opacity:0 }, { transform:"translateX(-50%) scale(1.1)", opacity:1, offset:.3 }, { transform:"translateX(-50%) scale(1)", opacity:1, offset:.7 }, { transform:"translateX(-50%) translateY(-20px)", opacity:0 }], { duration:1100 });
  anim.onfinish = () => b.remove();
}
function makeConfettiBurst(){
  if (reduceMotion) return;
  const emojis = ["✨","🎉","⭐️","💥","👏","🧂","🏆","💎"];
  for (let i=0;i<18;i++){
    const d = el("div", { class:"conf", text: pickOne(emojis) });
    d.style.left = (8 + Math.random()*84) + "%"; d.style.top = (8 + Math.random()*18) + "%"; d.style.animationDelay = (Math.random()*140) + "ms";
    confetti.append(d); setTimeout(() => d.remove(), 1200);
  }
}
function centerOf(node){ const r = (node || $("app")).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + Math.min(r.height / 2, 220) }; }

/* ---------- ROUND STATE, COMBO, XP, BADGES ---------- */
let R = null;                 // current round
let newBadges = [], levelUps = [];
const mult = (c) => c >= 9 ? 5 : c >= 7 ? 4 : c >= 5 ? 3 : c >= 3 ? 2 : 1;
function newRound(mode, extra){ R = Object.assign({ mode, points:0, correct:0, total:0, combo:0, maxCombo:0, grid:[], prevMult:1, bullseyes:0 }, extra || {}); newBadges = []; levelUps = []; comboUpdate(); }
function award(id){
  const b = PD().badges; if (b[id]) return;
  b[id] = dstr(); newBadges.push(BADGES.find(x => x.id === id)); persist();
}
function addXP(n){
  const p = PD(), before = levelOf(p.xp);
  p.xp += Math.max(0, Math.round(n));
  const after = levelOf(p.xp);
  for (let L = before + 1; L <= after; L++) levelUps.push(L);
  if (after >= 5) award("lvl5");
  persist();
}
function comboUpdate(pop){
  const m = R ? mult(R.combo) : 1;
  $("comboTxt").textContent = "x" + m + (R && R.combo >= 3 ? " · " + R.combo : "");
  const chip = $("comboChip"); chip.classList.toggle("hot", m >= 3); chip.classList.toggle("max", m >= 5);
  $("ptsTxt").textContent = R ? R.points : 0;
  const sh = $("shaker"); sh.className = "";
  if (pop && !reduceMotion){ void sh.offsetWidth; sh.className = "shake" + m; }
}
function gotRight(base, anchor, bonusLabel){
  R.correct++; R.combo++; R.maxCombo = Math.max(R.maxCombo, R.combo);
  const m = mult(R.combo), pts = base * m; R.points += pts;
  if (m >= 3) award("roll"); if (m >= 5) award("storm");
  comboUpdate(true); sfxCorrect(R.combo, m); haptic(m >= 4 ? "heavy" : "success");
  const c = centerOf(anchor);
  burst(c.x, c.y, 8 + m * 6);
  floatText("+" + pts + (m > 1 ? " x" + m : "") + (bonusLabel ? " " + bonusLabel : ""), c.x, c.y - 10);
  if (m > R.prevMult){ banner(["", "", "x2 Combo!", "x3 Hot streak!", "x4 On fire!", "x5 SALT STORM!"][m]); R.prevMult = m; }
  return pts;
}
function gotWrong(anchor){
  R.combo = 0; R.prevMult = 1; comboUpdate(false); sfxWrong(); haptic("error");
}

/* ---------- SCREENS ---------- */
const SCREENS = ["homeScreen","gameScreen","modeScreen","infoScreen"];
const GAME_SCREENS = ["gameScreen","modeScreen"];
let cleanup = null;           // teardown for the active mode (timers, listeners)
function runCleanup(){ if (cleanup){ try{ cleanup(); }catch(e){} cleanup = null; } }
function show(id, opts){
  runCleanup();
  SCREENS.forEach(s => $(s).hidden = (s !== id));
  const isGame = GAME_SCREENS.includes(id);
  $("topBar").hidden = !isGame;
  $("modal").style.display = "none";
  $("timeChip").hidden = true; $("progWrap").classList.remove("timer"); $("comboChip").hidden = false; $("ptsPill").hidden = false;
  $("profilePill").hidden = isGame || !save.profile;
  if (!isGame) $("subtitle").textContent = save.profile ? "Sodium game · " + PROFILE().short : "Sodium game";
  applyTheme(id === "homeScreen" ? Math.min(PD().unlocked, MAX_LEVEL) : (opts && opts.theme) || 1);
  renderFooter();
  if (!isGame){ const h = $(id).querySelector("h2"); if (h){ h.tabIndex = -1; h.focus({ preventScroll:true }); } $("app").scrollTop = 0; }
}
function applyTheme(lv){
  const t = LEVELS[Math.max(0, Math.min(lv, MAX_LEVEL) - 1)], r = document.documentElement.style;
  r.setProperty("--bgA", t.bgA); r.setProperty("--bgB", t.bgB); r.setProperty("--accent1", t.a1); r.setProperty("--accent2", t.a2);
}
function renderFooter(){
  const f = $("footer");
  f.replaceChildren("Education only, not medical advice. Your sodium goal depends on your health, medicines and care team. Ask them.");
  if (DRAFT) f.append(el("br"), el("span", { class:"draft", text:"Draft: sodium values pending physician review" }));
}
function fill(node, ...kids){ node.replaceChildren(...kids.flat().filter(k => k != null && k !== false)); }
function openModal(...kids){
  fill($("panel"), ...kids);
  $("modal").style.display = "flex";
  const b = $("panel").querySelector("button"); if (b) b.focus({ preventScroll:true });
}
function closeModal(){ $("modal").style.display = "none"; }
function setProgress(n, total){ $("prog").style.width = Math.round(100 * n / total) + "%"; $("progWrap").setAttribute("aria-valuenow", n); $("progWrap").setAttribute("aria-valuemax", total); }

/* ---------- DAILY STREAK + FREEZE ---------- */
function dailyStatus(){
  const d = PD().daily, today = dstr();
  if (!d.last) return { streak:0, doneToday:false, freezeNeeded:false };
  const gap = daysBetween(d.last, today);
  if (gap <= 0) return { streak:d.streak, doneToday:true, freezeNeeded:false };
  if (gap === 1) return { streak:d.streak, doneToday:false, freezeNeeded:false };
  if (gap === 2 && d.freezes > 0) return { streak:d.streak, doneToday:false, freezeNeeded:true };
  return { streak:0, doneToday:false, freezeNeeded:false };
}

/* ---------- HOME ---------- */
function renderHome(){
  show("homeScreen");
  const p = PD(), L = levelOf(p.xp), rk = rankOf(L), lo = xpFor(L), hi = xpFor(L + 1);
  const ds = dailyStatus(), unlocked = Math.min(p.unlocked, MAX_LEVEL);
  $("profilePill").replaceChildren(PROFILE().emoji + " " + PROFILE().short + " · " + fmt(TARGET()) + " mg");
  const modeBtn = (id, e, t, s, fn) => el("button", { class:"modeBtn", id, onclick:fn }, el("span", { class:"me", "aria-hidden":"true", text:e }), t, el("small", { text:s }));
  fill($("homeScreen"), 
    el("div", { class:"panel" },
      el("h2", { id:"homeTitle", text:"Learn sodium, one swipe at a time" }),
      el("div", { class:"rankLine", style:"justify-content:space-between;margin:.2rem 0" },
        el("span", { class:"pillDark" }, el("span", { "aria-hidden":"true", text:rk[2] }), el("b", { text:rk[1] }), ` · Level ${L}`),
        el("span", { class:"pillDark", id:"streakChip", text: ds.streak ? `🔥 ${ds.streak}-day streak` : "🔥 Start a streak" }),
        el("span", { class:"pillDark", id:"freezeChip", title:"A streak freeze automatically covers one missed day", text:`❄️ ${p.daily.freezes} freeze${p.daily.freezes === 1 ? "" : "s"}` })),
      el("div", { class:"xpBar", role:"progressbar", "aria-label":"XP to next level", "aria-valuemin":0, "aria-valuemax":hi - lo, "aria-valuenow":p.xp - lo }, el("div", { style:`width:${Math.round(100 * (p.xp - lo) / (hi - lo))}%` })),
      el("p", { class:"small", style:"margin:.3rem 0 0;font-size:.78rem", text:`${fmt(p.xp - lo)} / ${fmt(hi - lo)} XP to level ${L + 1}. ${PROFILE().goal}` })),
    el("button", { class:"dailyBtn", id:"dailyBtn", onclick:startBudget },
      el("span", { class:"me", "aria-hidden":"true", text:"📅" }),
      el("span", {}, ds.doneToday ? `Daily Budget done (${fmt(p.daily.lastTotal)} mg)` : "Daily Budget",
        el("small", { text: ds.doneToday ? "Replay for practice. Come back tomorrow for a new day." : ds.freezeNeeded ? "A streak freeze is ready to cover yesterday." : `Pick 4 meals under ${fmt(TARGET())} mg. About 2 minutes.` }))),
    el("div", { class:"modeGrid" },
      modeBtn("journeyBtn", "👆", unlocked > 1 ? `Journey: Level ${unlocked}` : "Swipe Journey", LEVELS[unlocked - 1].theme, () => { startJourney(unlocked); }),
      modeBtn("speedBtn", "⚡", "Speed Round", "60 seconds, big combos", startSpeed),
      modeBtn("hiddenBtn", "🕵️", "Hidden Salt", "Find the saltiest item", startHidden),
      modeBtn("guessBtn", "🎯", "Guess the Shaker", "Guess the milligrams", startGuess),
      modeBtn("compareBtn", "⚖️", "Which is lower?", "Swipe to compare", startCompare),
      modeBtn("statsBtn", "🏅", "Stats & Badges", `${Object.keys(p.badges).length}/${BADGES.length} badges`, renderStats)),
    el("div", { class:"btnRow" },
      el("button", { class:"bigBtn secondary", id:"aboutBtn", onclick:renderAbout, text:"ℹ️ About & Sources" }),
      el("button", { class:"bigBtn secondary", id:"settingsBtn", onclick:renderSettings, text:"⚙️ Settings" })),
    unlocked > 1 ? el("button", { class:"bigBtn secondary", id:"restartBtn", onclick:() => startJourney(1), text:"Restart Journey from Level 1" }) : null);
}

/* ---------- PROFILE CHOICE (first launch) + SETTINGS ---------- */
function renderProfileChoice(){
  show("infoScreen");
  const opt = (k) => el("button", { class:"bigBtn", id:"pick-" + k, onclick:() => { save.profile = k; persist(); renderHome(); } },
    CONTENT.profiles[k].emoji + " " + CONTENT.profiles[k].label, el("small", { text: "Daily goal: " + fmt(CONTENT.profiles[k].target) + " mg of sodium" }));
  fill($("infoScreen"), 
    el("div", { class:"panel" },
      el("h2", { id:"profTitle", text:"Welcome to Salt Whisperer" }),
      el("p", { text:"A quick game to learn which foods are high, moderate or low in sodium. Pick the profile that fits you. You can change it any time in Settings, and your progress is kept for each profile." })),
    el("div", { class:"btnCol" }, opt("ckd"), opt("htn")),
    el("p", { class:"footer", text:"Education only, not medical advice. No account, no ads, and nothing leaves your device." }));
}
function renderSettings(){
  show("infoScreen");
  const tog = (id, label, key) => el("button", { class:"toggle", id, "aria-pressed":String(save.settings[key]), onclick:() => { save.settings[key] = !save.settings[key]; persist(); renderSettings(); if (key === "haptics") haptic("light"); else tone(660, .15, "sine", .1); } }, label);
  fill($("infoScreen"), 
    el("div", { class:"panel" },
      el("h2", { id:"setTitle", text:"⚙️ Settings" }),
      el("h3", { text:"Profile" }),
      el("div", { class:"toggles" },
        ...["ckd","htn"].map(k => el("button", { class:"toggle" + (save.profile === k ? " sel" : ""), id:"prof-" + k, "aria-pressed":String(save.profile === k), onclick:() => { save.profile = k; persist(); renderSettings(); } }, CONTENT.profiles[k].emoji + " " + CONTENT.profiles[k].label))),
      el("p", { text: PROFILE().goal }),
      save.profile === "htn" ? el("div", {},
        el("h3", { text:"Daily limit (to be verified with your doctor)" }),
        el("div", { class:"toggles" },
          el("button", { class:"toggle" + (save.htnLimit === 1500 ? " sel" : ""), id:"lim1500", "aria-pressed":String(save.htnLimit === 1500), onclick:() => { save.htnLimit = 1500; persist(); renderSettings(); } }, "1,500 mg (ideal)"),
          el("button", { class:"toggle" + (save.htnLimit === 2300 ? " sel" : ""), id:"lim2300", "aria-pressed":String(save.htnLimit === 2300), onclick:() => { save.htnLimit = 2300; persist(); renderSettings(); } }, "2,300 mg (upper limit)"))) : null,
      el("h3", { text:"Feedback" }),
      el("div", { class:"toggles" }, tog("soundToggle", "🔊 Sound", "sound"), tog("hapticsToggle", "📳 Haptics", "haptics")),
      el("h3", { text:"Your data" }),
      el("p", { text:"Stays on this device. Nothing is sent anywhere." }),
      el("button", { class:"bigBtn secondary", id:"resetBtn", text:`Reset ${PROFILE().short} progress & stats`, onclick:() => {
        if (confirm("Reset all progress and stats for this profile on this device?")){ save.p[save.profile] = newProfileData(); persist(); renderSettings(); } } })),
    el("button", { class:"bigBtn secondary", id:"backBtn", onclick:renderHome, text:"Back" }));
}

/* ---------- ABOUT ---------- */
function renderAbout(){
  show("infoScreen");
  const pr = PROFILE();
  fill($("infoScreen"), 
    el("div", { class:"panel panelText" },
      el("h2", { id:"aboutTitle", text:"About Salt Whisperer" }),
      el("p", { text: pr.about }),
      el("h3", { text:"Medical disclaimer" }),
      el("p", {}, el("b", { text:"This game is for education only. It is not medical advice." }), " Talk to your doctor, dietitian or care team before changing what you eat. Sodium goals differ from person to person. They depend on your blood pressure, kidney function, heart health, medicines, and whether you are on dialysis. Some people need to watch fluids and potassium too."),
      el("h3", { text:"Salt substitutes" }),
      el("p", { text: save.profile === "htn" ? "Salt substitutes and lite salt replace sodium with potassium. Ask your doctor first, especially if you have kidney disease or take ACE inhibitors, ARBs or spironolactone." : "Salt substitutes and lite salt replace sodium with potassium. They can be dangerous in kidney disease. Do not use them unless your kidney team says it is safe." }),
      el("h3", { text:"How foods are sorted" }),
      el("ul", {},
        el("li", { text:"Low: 140 mg or less per serving" }), el("li", { text:"Moderate: 141 to 400 mg per serving" }), el("li", { text:"High: more than 400 mg per serving" }),
        el("li", { text:"Whole plates: low under 600 mg, moderate 600 to 1,000 mg, high over 1,000 mg" }),
        el("li", { text:`Percent of day uses your goal: ${fmt(TARGET())} mg of sodium. 1 teaspoon of table salt is about ${fmt(TSP_MG)} mg of sodium.` })),
      el("p", { text:"Numbers are rounded estimates. Real values vary by brand and recipe. Portion size matters: two servings of a 'low' food can add up to a 'high' amount." }),
      el("h3", { text:"Sources" }),
      el("ul", {},
        el("li", { text:"U.S. Department of Agriculture, FoodData Central (fdc.nal.usda.gov), SR Legacy: sodium per serving. Every card lists its source." }),
        el("li", { text:"U.S. FDA: Daily Value for sodium (2,300 mg) and the 'low sodium' claim (140 mg or less per serving)." }),
        el("li", { text:"American Heart Association: sodium limits (2,300 mg upper limit, 1,500 mg ideal for most adults)." }),
        el("li", { text:"National Kidney Foundation and KDIGO: sodium guidance for chronic kidney disease." }),
        el("li", { text:"NHLBI: DASH eating plan." }),
        el("li", { text:"Product labels for lite salt and salt substitutes." })),
      DRAFT ? el("p", { text:"Draft note: sodium values are pending review by Dr D (see CONTENT_REVIEW.md)." }) : null,
      el("h3", { text:"Privacy" }),
      el("p", {}, "Salt Whisperer collects no data. Your scores and settings stay on this device. ", el("a", { href:"privacy.html", text:"Privacy policy" }))),
    el("button", { class:"bigBtn secondary", id:"backBtn", onclick:renderHome, text:"Back" }));
}

/* ---------- STATS & BADGES ---------- */
function renderStats(){
  show("infoScreen");
  const p = PD(), s = p.stats, acc = s.answered ? Math.round(100 * s.correct / s.answered) : 0, L = levelOf(p.xp), rk = rankOf(L);
  const stat = (v, l) => el("div", { class:"stat" }, el("b", { text:v }), el("span", { text:l }));
  const rec = (k, label, suf) => el("div", { class:"levelRow" }, el("span", { text:label }), el("b", { text: p.records[k] != null ? p.records[k] + (suf || "") : "not played" }));
  fill($("infoScreen"), 
    el("div", { class:"panel" },
      el("h2", { id:"statsTitle", text:`🏅 Stats · ${PROFILE().short}` }),
      el("p", { text:`${rk[2]} ${rk[1]} · Level ${L} · ${fmt(p.xp)} XP` }),
      el("div", { class:"statGrid" },
        stat(fmt(s.answered), "Cards answered"), stat(acc + "%", "Accuracy"),
        stat(s.rounds, "Rounds played"), stat(s.perfect, "Perfect rounds"),
        stat("🔥 " + dailyStatus().streak, "Daily streak"), stat(p.daily.best, "Best daily streak"),
        stat("❄️ " + p.daily.freezes, "Streak freezes"), stat("x" + mult(s.maxCombo), "Best combo (" + s.maxCombo + ")")),
      el("h3", { text:"Personal bests (points)" }),
      rec("budget", "📅 Daily Budget (best score)"), rec("journey", "👆 Journey"), rec("speed", "⚡ Speed Round"), rec("hidden", "🕵️ Hidden Salt"), rec("guess", "🎯 Guess the Shaker"), rec("compare", "⚖️ Which is lower?"),
      el("h3", { text:"Journey best per level" }),
      ...LEVELS.map((Lv, i) => el("div", { class:"levelRow" }, el("span", { text:`${Lv.emoji} ${i+1}. ${Lv.theme}` }),
        el("b", { text: (i+1) > p.unlocked ? "🔒 locked" : (p.best[i+1] != null ? p.best[i+1] + "/10" : "not played") }))),
      el("h3", { text:`Badges ${Object.keys(p.badges).length}/${BADGES.length}` }),
      el("div", { class:"badgeGrid", id:"badgeGrid" }, BADGES.map(b => el("div", { class:"bdg" + (p.badges[b.id] ? " got" : ""), title:b.desc, "aria-label":`${b.name}: ${b.desc}${p.badges[b.id] ? " (earned)" : ""}` }, el("span", { class:"be", text:b.emoji }), b.name))),
      el("ul", { style:"font-size:.78rem" }, BADGES.map(b => el("li", { text:`${p.badges[b.id] ? "✅" : "⬜"} ${b.name}: ${b.desc}` }))),
      el("p", { text:"Stats are stored only on this device, separately for each profile." })),
    el("button", { class:"bigBtn secondary", id:"backBtn", onclick:renderHome, text:"Back" }));
}

/* ---------- ROUND SUMMARY, RECORDS, SHARE ---------- */
function shareLines(title, line){ return `Salt Whisperer 🧂 ${title}\n${line}\n${R.grid.join("")}`; }
async function doShare(text, btn){
  try{ if (navigator.share){ await navigator.share({ text }); return; } }catch(e){ if (e && e.name === "AbortError") return; }
  try{ await navigator.clipboard.writeText(text); btn.textContent = "Copied ✓"; return; }catch(e){}
  try{ const ta = el("textarea", { style:"position:fixed;opacity:0" }); ta.value = text; document.body.append(ta); ta.select(); const ok = document.execCommand("copy"); ta.remove(); btn.textContent = ok ? "Copied ✓" : "Copy not available"; }catch(e){ btn.textContent = "Copy not available"; }
}
function endRound(o){
  const p = PD(), st = p.stats;
  st.rounds++; st.maxCombo = Math.max(st.maxCombo, R.maxCombo);
  const perfect = o.perfect != null ? o.perfect : (R.total > 0 && R.correct === R.total);
  if (perfect){ st.perfect++; award("perfect"); }
  award("first");
  let recMsg = null;
  if (o.recordKey && R.points > 0){
    const prev = p.records[o.recordKey];
    if (prev == null){ p.records[o.recordKey] = R.points; recMsg = "🏆 First score on the board!"; }
    else if (R.points > prev){ p.records[o.recordKey] = R.points; recMsg = `🏆 New record! Old best ${fmt(prev)}`; if (prev > 0) award("record"); }
  }
  const xpBefore = p.xp, lvBefore = levelOf(xpBefore);
  const xp = R.points + 20 + (perfect ? 50 : 0) + (o.xpBonus || 0);
  addXP(xp); persist();
  const lvAfter = levelOf(p.xp), lo = xpFor(lvAfter), hi = xpFor(lvAfter + 1);
  const fromPct = lvAfter > lvBefore ? 0 : Math.round(100 * (xpBefore - lo) / (hi - lo));
  const toPct = Math.round(100 * (p.xp - lo) / (hi - lo));
  const bar = el("div", { style:`width:${fromPct}%` });
  setTimeout(() => { bar.style.width = toPct + "%"; }, 80);
  if (recMsg || newBadges.length || levelUps.length || perfect){ makeConfettiBurst(); (recMsg ? sfxRecord : sfxFanfare)(); haptic("heavy"); }
  const shareBtn = el("button", { class:"bigBtn secondary", id:"shareBtn", text:"📤 Share result", onclick:(e) => doShare(shareLines(o.shareTitle || o.title, o.shareLine || `${R.correct}/${R.total} · ${R.points} pts · best streak ${R.maxCombo} (x${mult(R.maxCombo)})`), e.currentTarget) });
  openModal(
    el("h2", { id:"modalTitle", text:o.title }),
    el("div", { class:"big", id:"bigScore", text:`${fmt(R.points)} pts` }),
    el("p", { text: o.summary || `${R.correct}/${R.total} right · best streak ${R.maxCombo} (x${mult(R.maxCombo)})` }),
    recMsg ? el("p", { class:"record", id:"recordMsg", text:recMsg }) : null,
    ...(o.lines || []).map(t => el("p", { text:t })),
    el("div", { class:"xpBar" }, bar),
    el("p", { style:"margin:.3rem 0", text:`+${fmt(xp)} XP · ${rankOf(lvAfter)[2]} ${rankOf(lvAfter)[1]} · Level ${lvAfter}` }),
    ...(levelUps.length ? [el("p", { class:"record", id:"levelUpMsg", text:`⬆ Level ${levelUps[levelUps.length - 1]}: ${rankOf(levelUps[levelUps.length - 1])[2]} ${rankOf(levelUps[levelUps.length - 1])[1]}` })] : []),
    newBadges.length ? el("div", {}, el("p", { text:"New badges:" }), ...newBadges.map(b => el("span", { class:"newBadge", text:`${b.emoji} ${b.name}` }))) : null,
    el("div", { class:"btnCol", style:"margin-top:.6rem" },
      el("button", { class:"bigBtn", id:"againBtn", text:o.againText || "Play again", onclick:o.again }),
      shareBtn,
      el("button", { class:"bigBtn secondary", id:"toMenuBtn", text:"Back to menu", onclick:renderHome })));
}

/* ---------- SWIPE MODES: Journey, Speed Round, Which is lower? ---------- */
let round = [], idx = 0, state = "idle", teardownCard = null, speedTimer = null, advanceTimer = null;
const stackEl = $("stack"), toastEl = $("toast"), liveEl = $("live");
function pickFrom(pool, n, seen){
  const fresh = shuffle(pool.filter(c => !seen.has(c.id))), used = shuffle(pool.filter(c => seen.has(c.id)));
  const out = [...fresh, ...used].slice(0, n); out.forEach(c => seen.add(c.id)); return out;
}
const sessionSeen = new Set();
function buildJourney(lv){
  const f = (l) => FOODS.filter(x => x.lvl === l), cmp = (l) => COMPARES.filter(c => c.lvl === l);
  const S = sessionSeen; let cards;
  if (lv === 1) cards = pickFrom(f(1), 10, S);
  else if (lv === 2) cards = [...pickFrom(f(2), 7, S), ...pickFrom(f(1), 3, S)];
  else if (lv === 3) cards = [...pickFrom(PLATES, 5, S), ...pickFrom(f(3), 5, S)];
  else if (lv === 4) cards = [...pickFrom(cmp(4), 5, S), ...pickFrom(PLATES, 2, S), ...pickFrom([...f(2), ...f(3)], 3, S)];
  else cards = [...pickFrom(f(3), 5, S), ...pickFrom(cmp(5), 2, S), ...pickFrom(COMPARES, 1, S), ...pickFrom(PLATES, 2, S)];
  return shuffle(cards);
}
function startJourney(lv){
  newRound("journey", { level:lv, total:PER_ROUND });
  if (lv === 1) sessionSeen.clear();
  round = buildJourney(lv); idx = 0;
  show("gameScreen", { theme:lv });
  $("subtitle").textContent = `Level ${lv}: ${LEVELS[lv-1].theme}`;
  renderCard();
}
function startCompare(){
  newRound("compare", { total:PER_ROUND });
  round = shuffle(COMPARES).slice(0, PER_ROUND); idx = 0;
  show("gameScreen", { theme:4 }); $("subtitle").textContent = "Which is lower in sodium?";
  renderCard();
}
function buildSpeed(){
  const rng = Math.random;
  const pool = shuffle([...FOODS, ...FOODS, ...PLATES], rng);
  return pool.slice(0, 80);
}
function startSpeed(){
  newRound("speed", { total:0, endAt:0, done:false });
  round = buildSpeed(); idx = 0;
  show("gameScreen", { theme:5 }); $("subtitle").textContent = "Speed Round: 60 seconds";
  $("timeChip").hidden = false; $("progWrap").classList.add("timer");
  R.endAt = Date.now() + SPEED_SECONDS * 1000;
  const tick = () => {
    const left = Math.max(0, R.endAt - Date.now());
    $("timeChip").textContent = Math.ceil(left / 1000) + "s";
    $("prog").style.width = (100 * left / (SPEED_SECONDS * 1000)) + "%";
    if (left <= 0) endSpeed();
  };
  speedTimer = setInterval(tick, 100);
  cleanup = () => { clearInterval(speedTimer); speedTimer = null; clearTimeout(advanceTimer); if (teardownCard){ teardownCard(); teardownCard = null; } state = "idle"; };
  renderCard();
}
function endSpeed(){
  if (!R || R.done) return; R.done = true;
  clearInterval(speedTimer); speedTimer = null; clearTimeout(advanceTimer);
  if (teardownCard){ teardownCard(); teardownCard = null; } state = "idle";
  R.total = R.answered || 0;
  if (R.correct >= 12) award("speed");
  endRound({ title:"Time! ⏱", recordKey:"speed", perfect:false, shareTitle:"Speed Round ⚡", shareLine:`${R.correct} right in 60s · ${R.points} pts · best streak ${R.maxCombo} (x${mult(R.maxCombo)})`, againText:"Go again ⚡", again:startSpeed,
    lines:[`${R.correct} right out of ${R.total} in 60 seconds.`] });
}
function setControls(c){
  const hi = $("highBtn"), md = $("modBtn"), lo = $("lowBtn");
  if (c.type === "compare"){
    hi.className = "btnA"; hi.replaceChildren("⬅ A is lower", el("small", { text:"swipe left" })); hi.setAttribute("aria-label", "A is lower (swipe left)");
    lo.className = "btnA"; lo.replaceChildren("B is lower ➡", el("small", { text:"swipe right" })); lo.setAttribute("aria-label", "B is lower (swipe right)");
    md.hidden = true;
  } else {
    hi.className = "btnHigh"; hi.replaceChildren("⬅ High", el("small", { text:"swipe left" })); hi.setAttribute("aria-label", "High sodium (swipe left)");
    md.className = "btnMod"; md.setAttribute("aria-label", "Moderate sodium (swipe up)");
    lo.className = "btnLow"; lo.replaceChildren("Low ➡", el("small", { text:"swipe right" })); lo.setAttribute("aria-label", "Low sodium (swipe right)");
    md.hidden = false;
  }
  [hi, md, lo].forEach(b => b.disabled = false);
}
function hudUpdate(){
  if (R.mode !== "speed") setProgress(idx, PER_ROUND);
  $("ptsTxt").textContent = R.points;
}
function renderCard(){
  if (teardownCard){ teardownCard(); teardownCard = null; }
  stackEl.replaceChildren(); toastEl.hidden = true; toastEl.replaceChildren();
  state = "question";
  const c = round[idx % round.length];
  hudUpdate(); setControls(c);
  const isCmp = c.type === "compare";
  const card = el("article", { class:"card", "aria-label": isCmp ? "Which is lower in sodium?" : `${c.name}${c.serving ? ", " + c.serving : ""}` });
  if (isCmp) card.append(el("div", { class:"overlay left", "aria-hidden":"true", text:"A" }), el("div", { class:"overlay right", "aria-hidden":"true", text:"B" }));
  else card.append(el("div", { class:"overlay left", "aria-hidden":"true", text:"HIGH" }), el("div", { class:"overlay up", "aria-hidden":"true", text:"MODERATE" }), el("div", { class:"overlay right", "aria-hidden":"true", text:"LOW" }));
  const label = R.mode === "speed" ? "Speed" : R.mode === "compare" ? "Compare" : `Level ${R.level}`;
  card.append(el("div", { class:"badgeRow" },
    el("div", { class:"pill", text: R.mode === "speed" ? "Speed Round" : `${label} · Card ${idx+1}/${PER_ROUND}` }),
    el("div", { class:"pill pill2", text: c.type === "plate" ? "Plate" : isCmp ? "Which is lower?" : (CONTENT.cats[c.cat] || ["Food"])[0] })));
  const content = el("div", { class:"content" });
  if (isCmp){
    content.append(el("div", { class:"name", text:"Which is lower in sodium?" }));
    const mk = (o, L) => el("div", { class:"opt", "data-opt":L }, el("div", { class:"letter", text:L.toUpperCase() }), emojiImg(o.emoji, o.name, "e"), el("div", { class:"n", text:o.name }), el("div", { class:"s", text:o.serving }));
    content.append(el("div", { class:"compare" }, mk(c.a, "a"), mk(c.b, "b")));
  } else {
    content.append(emojiImg(c.emoji, c.name, "emojiTile"), el("div", { class:"name", text:c.name }));
    if (c.serving) content.append(el("div", { class:"serving", text:"Serving: " + c.serving }));
    content.append(el("div", { class:"prompt", text: c.type === "plate" ? "Is this whole plate high, moderate or low in sodium? (Low is under 600 mg.)" : "Is one serving high, moderate or low in sodium? (Low is 140 mg or less.)" }));
    if (c.type === "plate") content.append(el("div", { class:"mealList" }, c.parts.map(p => el("div", { class:"mealItem" }, el("span", { text:p.t }), el("span", { class:"tag", hidden:true, text:"" })))));
  }
  card.append(content);
  card.append(el("div", { class:"hint", text:"Hidden salt hides in bread, sauces, canned food, deli meat and soup 🥫" }));
  stackEl.append(card);
  teardownCard = enableSwipe(card, c);
}
function choiceToAnswer(c, dir){
  if (!c) return null;
  if (c.type === "compare") return dir === "left" ? "a" : dir === "right" ? "b" : null;
  return { left:"high", up:"mod", right:"low" }[dir];
}
function curCard(){ return round[idx % round.length]; }
function answer(choice){
  if (state !== "question" || !choice || !R) return;
  state = "revealed";
  const c = curCard();
  const ok = choice === (c.type === "compare" ? c.lower : c.rate);
  const st = PD().stats; st.answered++; if (ok) st.correct++;
  const cardEl = stackEl.querySelector(".card");
  if (R.mode === "speed") R.answered = (R.answered || 0) + 1;
  if (ok){ gotRight(10, cardEl); if (c.id === "cmp-salt") award("subspot"); } else gotWrong(cardEl);
  R.grid.push(ok ? "🟩" : "🟥");
  persist(); hudUpdate();
  [$("highBtn"), $("modBtn"), $("lowBtn")].forEach(b => b.disabled = true);
  revealCard(c, ok);
  if (R.mode === "speed"){ liveEl.textContent = (ok ? "Correct. " : "Not quite. ") + (c.rate ? RATE_LABEL[c.rate] : ""); advanceTimer = setTimeout(nextCard, ok ? 520 : 900); }
  else showFeedback(c, ok);
}
function verdictFor(c){
  const rl = RATE_LABEL[c.rate];
  const small = c.type === "plate" ? `About ${fmt(c.mg)} mg for the whole plate · ${pct(c.mg)}% of your ${fmt(TARGET())} mg day` : `${mgText(c.mg)} per ${c.serving} · ${pct(c.mg)}% of your ${fmt(TARGET())} mg day`;
  return el("div", { class:"verdict " + c.rate }, `${rl} sodium`, el("small", { text:small }));
}
function revealCard(c, ok){
  const card = stackEl.querySelector(".card"); if (!card) return;
  card.style.transition = "transform .2s ease, box-shadow .3s ease"; card.style.transform = "none";
  card.querySelectorAll(".overlay").forEach(o => o.style.opacity = 0);
  card.classList.add("revealed", ok ? "glowGood" : "glowBad");
  if (c.type === "compare"){
    card.querySelectorAll(".opt").forEach(o => {
      const L = o.dataset.opt;
      o.append(el("div", { class:"mg", text:`${mgText(c[L].mg)} · ${pct(c[L].mg)}%` }));
      if (L === c.lower){ o.classList.add("win"); o.append(el("div", { class:"tag low", text:"Lower ✓" })); }
    });
  } else {
    card.querySelector(".prompt").replaceWith(verdictFor(c));
    if (c.type === "plate") card.querySelectorAll(".mealItem").forEach((m, i) => { const p = c.parts[i], t = m.querySelector(".tag"); t.hidden = false; t.className = "tag " + rateOf(p.mg); t.textContent = `${mgText(p.mg)}`; });
  }
}
function showFeedback(c, ok){
  toastEl.hidden = false; toastEl.className = "toast " + (ok ? "good" : "bad");
  const right = c.type === "compare" ? `${c.lower.toUpperCase()} (${c[c.lower].name}) is lower.` : `It's ${RATE_LABEL[c.rate].toLowerCase()}.`;
  const last = idx + 1 >= PER_ROUND;
  const next = el("button", { class:"nextBtn", id:"nextCardBtn", text: last ? "See results" : "Next ➜", onclick:(e) => { e.stopPropagation(); nextCard(); } });
  toastEl.replaceChildren(
    el("div", {}, el("b", { text: ok ? "✅ Correct! " : "❌ Not quite. " }), right),
    el("div", { style:"margin-top:.3rem", text:c.teach }),
    el("div", { class:"swap", text:"Swap: " + c.swap }),
    el("div", { class:"coach", text:profNote(c) }),
    el("div", { class:"row" }, el("span", { class:"tapnote", text:"Tap the card to continue" }), next));
  liveEl.textContent = (ok ? "Correct. " : "Not quite. ") + right + " " + c.teach;
  next.focus({ preventScroll:true });
}
function nextCard(){
  if (state !== "revealed" || !R) return;
  state = "idle"; clearTimeout(advanceTimer);
  idx++;
  if (R.mode === "speed"){ if (!R.done) renderCard(); return; }
  if (idx >= PER_ROUND){ if (teardownCard){ teardownCard(); teardownCard = null; } setProgress(PER_ROUND, PER_ROUND); R.mode === "journey" ? endJourneyLevel() : endCompare(); }
  else renderCard();
}
function endJourneyLevel(){
  const p = PD(), lv = R.level, passed = R.correct >= PASS_SCORE;
  if (p.best[lv] == null || R.correct > p.best[lv]) p.best[lv] = R.correct;
  if (passed) p.unlocked = Math.max(p.unlocked, Math.min(lv + 1, MAX_LEVEL));
  let finished = false;
  if (passed && lv === MAX_LEVEL){ p.journeys++; award("journey"); finished = true; }
  persist();
  const next = passed && lv < MAX_LEVEL ? lv + 1 : lv;
  endRound({ title: finished ? "JOURNEY COMPLETE 🏆" : passed ? "LEVEL CLEARED ✅" : "TRY AGAIN 🧠", recordKey:"journey", shareTitle:`Journey Level ${lv}`,
    lines:[ passed ? (finished ? "You are a Salt Whisperer. Sauces, bread, canned food and deli meat are where sodium hides." : `Next up: Level ${lv + 1}, ${LEVELS[lv].theme}.`) : `Get ${PASS_SCORE}/10 to advance.`, `Best on this level: ${p.best[lv]}/10` ],
    againText: passed && !finished ? "Continue journey" : finished ? "Play Level 1 again" : "Try again", again:() => startJourney(finished ? 1 : next) });
}
function endCompare(){
  if (R.correct >= 8) award("reader");
  endRound({ title:"Compare done ⚖️", recordKey:"compare", shareTitle:"Which is lower? ⚖️", lines:["Same food, different label: swaps are one of the easiest ways to cut sodium."], again:startCompare });
}

/* ---------- SWIPE: per-card listeners, all removed on teardown ---------- */
function enableSwipe(card, c){
  let startX=0, startY=0, dx=0, dy=0, dragging=false, pid=null, suppressClick=false;
  const isCmp = c.type === "compare";
  const ov = { left:card.querySelector(".overlay.left"), up:card.querySelector(".overlay.up"), right:card.querySelector(".overlay.right") };
  const clearOv = () => Object.values(ov).forEach(o => { if (o) o.style.opacity = 0; });
  const snapBack = () => { card.style.transition = "transform .25s ease"; card.style.transform = "none"; clearOv(); };
  const onDown = (e) => { if (state !== "question") return; dragging = true; pid = e.pointerId; card.style.transition = "none"; startX = e.clientX; startY = e.clientY; dx = dy = 0; };
  const onMove = (e) => {
    if (!dragging || e.pointerId !== pid) return;
    dx = e.clientX - startX; dy = e.clientY - startY;
    const rot = Math.max(-15, Math.min(15, dx / 18));
    card.style.transform = `translateX(${dx}px) translateY(${isCmp ? dy * 0.3 : dy}px) rotate(${rot}deg)`;
    clearOv(); const ax = Math.abs(dx), ay = Math.abs(dy);
    if (ax > ay){ const o = dx < 0 ? ov.left : ov.right; if (o) o.style.opacity = Math.min(1, ax / 120); }
    else if (dy < 0 && ov.up) ov.up.style.opacity = Math.min(1, ay / 120);
  };
  const onUp = (e) => {
    if (!dragging || e.pointerId !== pid) return;
    dragging = false; pid = null;
    suppressClick = Math.abs(dx) > 10 || Math.abs(dy) > 10;
    const ax = Math.abs(dx), ay = Math.abs(dy); let dir = null;
    if (ax > ay && dx <= -110) dir = "left"; else if (ax > ay && dx >= 110) dir = "right"; else if (!isCmp && ay >= ax && dy <= -110) dir = "up";
    if (dir) answer(choiceToAnswer(c, dir)); else snapBack();
  };
  const onCancel = () => { if (!dragging) return; dragging = false; pid = null; snapBack(); };
  const onClick = () => { if (suppressClick){ suppressClick = false; return; } if (state === "revealed") nextCard(); };
  card.addEventListener("pointerdown", onDown); card.addEventListener("click", onClick);
  window.addEventListener("pointermove", onMove); window.addEventListener("pointerup", onUp); window.addEventListener("pointercancel", onCancel);
  return function teardown(){
    card.removeEventListener("pointerdown", onDown); card.removeEventListener("click", onClick);
    window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); window.removeEventListener("pointercancel", onCancel);
  };
}

/* ---------- MODE SCREEN HELPERS (Hidden Salt, Guess the Shaker, Daily Budget) ---------- */
function showMode(theme, sub, hideScore){
  show("modeScreen", { theme }); $("subtitle").textContent = sub;
  $("comboChip").hidden = !!hideScore; $("ptsPill").hidden = !!hideScore;
  $("modeBox").replaceChildren(); $("modeToast").hidden = true; $("modeToast").replaceChildren();
}
function modeFeedback(c, ok, headExtra, onNext, last){
  const t = $("modeToast"); t.hidden = false; t.className = "toast " + (ok ? "good" : "bad");
  const next = el("button", { class:"nextBtn", id:"modeNextBtn", text: last ? "See results" : "Next ➜", onclick:onNext });
  t.replaceChildren(
    el("div", {}, el("b", { text: ok ? "✅ Nice! " : "❌ Not quite. " }), headExtra),
    el("div", { style:"margin-top:.3rem", text:c.teach }),
    el("div", { class:"swap", text:"Swap: " + c.swap }),
    el("div", { class:"coach", text:profNote(c) }),
    el("div", { class:"row" }, el("span", { class:"tapnote", text:`${rateText(c)}` }), next));
  next.focus({ preventScroll:true }); try{ t.scrollIntoView({ block:"nearest" }); }catch(e){}
  liveEl.textContent = (ok ? "Nice. " : "Not quite. ") + headExtra + " " + c.teach;
}
const rateText = (c) => `${RATE_LABEL[c.rate]} · ${mgText(c.mg)} · ${pct(c.mg)}% of day`;

/* ---------- HIDDEN SALT ---------- */
function startHidden(){
  newRound("hidden", { total:6 });
  round = shuffle(HIDDEN_POOL).slice(0, 6); idx = 0;
  renderHidden();
}
function renderHidden(){
  showMode(3, "Hidden Salt: find the saltiest item");
  setProgress(idx, 6); comboUpdate(false);
  const c = round[idx], max = Math.max(...c.parts.map(p => p.mg)), topI = c.parts.findIndex(p => p.mg === max);
  let answered = false;
  const buttons = c.parts.map((p, i) => el("button", { class:"partBtn", id:"part" + i, "data-i":i, onclick:() => pick(i) },
    el("span", { style:"font-size:1.6rem", "aria-hidden":"true", text:p.e }), el("span", { style:"flex:0 1 auto", text:p.t }),
    el("span", { class:"pbar" }, el("i")), el("span", { class:"pmg" })));
  const card = el("article", { class:"flatCard", id:"hiddenCard", "aria-label":c.name },
    el("div", { class:"badgeRow" }, el("div", { class:"pill", text:`Plate ${idx + 1}/6` }), el("div", { class:"pill pill2", text:"Hidden Salt" })),
    el("div", { class:"content" }, emojiImg(c.emoji, c.name, "emojiTile"), el("div", { class:"name", text:c.name }),
      el("div", { class:"prompt", id:"hiddenPrompt", text:"Which item on this plate adds the MOST sodium? Tap it." })),
    el("div", { class:"mealList", style:"gap:.45rem" }, buttons));
  $("modeBox").replaceChildren(card);
  function pick(i){
    if (answered) return; answered = true;
    const ok = i === topI;
    const st = PD().stats; st.answered++; if (ok) st.correct++;
    if (ok) gotRight(20, buttons[i]); else gotWrong(buttons[i]);
    R.grid.push(ok ? "🟩" : "🟥");
    buttons.forEach((b, j) => {
      const p = c.parts[j]; b.disabled = true;
      b.querySelector(".pbar").style.display = "block"; b.querySelector(".pmg").style.display = "inline"; b.querySelector(".pmg").textContent = mgText(p.mg);
      setTimeout(() => { b.querySelector(".pbar i").style.width = Math.max(2, Math.round(100 * p.mg / max)) + "%"; }, 30);
      if (j === topI) b.classList.add("top"); if (j === i) b.classList.add("mine");
    });
    card.classList.add(ok ? "glowGood" : "glowBad");
    $("hiddenPrompt").replaceWith(el("div", { class:"verdict " + c.rate }, `Whole plate: ${RATE_LABEL[c.rate]}`, el("small", { text:`About ${fmt(c.mg)} mg · ${pct(c.mg)}% of your ${fmt(TARGET())} mg day` })));
    $("ptsTxt").textContent = R.points; persist();
    const last = idx + 1 >= 6;
    modeFeedback(c, ok, `The saltiest item is ${c.parts[topI].t.toLowerCase()} (${mgText(max)}).`, () => { idx++; if (idx >= 6) endHidden(); else renderHidden(); }, last);
  }
}
function endHidden(){
  if (R.correct >= 5) award("hunter");
  endRound({ title:"Hidden Salt done 🕵️", recordKey:"hidden", shareTitle:"Hidden Salt 🕵️", lines:["Sodium hides in the sauce, bread and cured meat, not just the shaker."], again:startHidden });
}

/* ---------- GUESS THE SHAKER ---------- */
function startGuess(){
  newRound("guess", { total:8 });
  const lows = shuffle(FOODS.filter(f => f.rate === "low")).slice(0, 2), mods = shuffle(FOODS.filter(f => f.rate === "mod")).slice(0, 3), highs = shuffle(FOODS.filter(f => f.rate === "high")).slice(0, 3);
  round = shuffle([...lows, ...mods, ...highs]); idx = 0;
  renderGuess();
}
function renderGuess(){
  showMode(2, "Guess the Shaker: how many mg?");
  setProgress(idx, 8); comboUpdate(false);
  const c = round[idx]; let answered = false;
  let val = GUESS_STOPS.indexOf(140);
  const gBig = el("div", { class:"gBig", id:"gBig" }), gSub = el("div", { class:"gSub", id:"gSub" });
  const slider = el("input", { type:"range", id:"gSlider", min:0, max:GUESS_STOPS.length - 1, step:1, value:val, "aria-label":"Your sodium guess in milligrams" });
  const upd = () => { const mg = GUESS_STOPS[Number(slider.value)]; gBig.textContent = mg === 0 ? "0 mg" : "~" + fmt(mg) + " mg"; gSub.textContent = `${RATE_LABEL[rateOf(mg)]} · ${pct(mg)}% of your ${fmt(TARGET())} mg day`; slider.setAttribute("aria-valuetext", gBig.textContent); };
  slider.addEventListener("input", upd); upd();
  const lock = el("button", { class:"bigBtn", id:"lockBtn", text:"🔒 Lock in guess", onclick:() => lockIn() });
  const reveal = el("div", { id:"gReveal" });
  const card = el("article", { class:"flatCard", id:"guessCard", "aria-label":c.name },
    el("div", { class:"badgeRow" }, el("div", { class:"pill", text:`Card ${idx + 1}/8` }), el("div", { class:"pill pill2", text:(CONTENT.cats[c.cat] || ["Food"])[0] })),
    el("div", { class:"content" }, emojiImg(c.emoji, c.name, "emojiTile"), el("div", { class:"name", text:c.name }),
      el("div", { class:"serving", text:"Serving: " + c.serving }),
      el("div", { class:"prompt", text:"Slide to guess the sodium in this serving. Bullseye = within 15% (or 25 mg)." })),
    el("div", { class:"sliderBox" }, gBig, gSub, slider), reveal);
  $("modeBox").replaceChildren(card, lock);
  function lockIn(){
    if (answered) return; answered = true;
    const g = GUESS_STOPS[Number(slider.value)], a = c.mg;
    const bull = Math.abs(g - a) <= Math.max(25, 0.15 * a), band = rateOf(g) === c.rate, ok = bull || band;
    const st = PD().stats; st.answered++; if (ok) st.correct++;
    let pts = 0;
    if (ok){ pts = gotRight(bull ? 30 : 10, card, bull ? "🎯" : ""); } else gotWrong(card);
    if (bull){ R.bullseyes++; st.bullseyes++; if (R.bullseyes >= 3) award("sniper"); }
    R.grid.push(bull ? "🎯" : band ? "🟩" : "🟥");
    slider.disabled = true; lock.hidden = true; card.classList.add(ok ? "glowGood" : "glowBad");
    const sc = Math.max(g, a, 1000) * 1.05;
    reveal.replaceChildren(
      el("div", { class:"verdict " + c.rate }, `${bull ? "🎯 Bullseye! " : band ? "Right band. " : "Off the mark. "}Actual: ${mgText(a)}`, el("small", { text:`${RATE_LABEL[c.rate]} · ${pct(a)}% of your day · ${tspText(a)}` })),
      el("div", { class:"twoBar" }, el("div", {}, el("span", { style:"width:3.2rem", text:"You" }), el("i", { id:"barYou" }), el("span", { text:mgText(g) })), el("div", {}, el("span", { style:"width:3.2rem", text:"Actual" }), el("i", { class:"act", id:"barAct" }), el("span", { text:mgText(a) }))));
    setTimeout(() => { $("barYou").style.width = Math.max(1, 100 * g / sc * 0.62) + "%"; $("barAct").style.width = Math.max(1, 100 * a / sc * 0.62) + "%"; }, 30);
    $("ptsTxt").textContent = R.points; persist();
    const last = idx + 1 >= 8;
    modeFeedback(c, ok, `${c.name}: ${mgText(a)} per ${c.serving}.`, () => { idx++; if (idx >= 8) endGuess(); else renderGuess(); }, last);
  }
}
function endGuess(){
  endRound({ title:"Guess the Shaker done 🎯", recordKey:"guess", shareTitle:"Guess the Shaker 🎯", shareLine:`${R.correct}/8 · ${R.bullseyes} bullseyes · ${R.points} pts`, lines:[`${R.bullseyes} bullseye${R.bullseyes === 1 ? "" : "s"}.`], again:startGuess });
}

/* ---------- DAILY BUDGET (seeded, same options for everyone each day) ---------- */
const SLOTS = [
  { k:"b", name:"Breakfast", emoji:"🌅" }, { k:"l", name:"Lunch", emoji:"☀️" }, { k:"d", name:"Dinner", emoji:"🌙" }, { k:"s", name:"Snack", emoji:"🍿" },
];
function buildBudget(seedStr){
  const rng = mulberry32(parseInt(seedStr.replace(/-/g, ""), 10) ^ 0x5a17);
  return SLOTS.map(s => {
    const pool = (s.k === "s" ? FOODS.filter(f => f.sn) : PLATES.filter(p => p.slot === s.k)).slice().sort((a, b) => a.mg - b.mg);
    const n = pool.length, third = Math.floor(n / 3);
    const lo = pool.slice(0, third), mid = pool.slice(third, n - third), hi = pool.slice(n - third);
    const pk = (a) => a[Math.floor(rng() * a.length)];
    return { ...s, options: shuffle([pk(lo), pk(mid), pk(hi)], rng) };
  });
}
function startBudget(){
  const today = dstr();
  newRound("budget", { total:4, today, slots:buildBudget(today), picks:[], totalMg:0 });
  idx = 0; renderBudget();
}
function meterEl(totalMg){
  const t = TARGET(), scaleMax = Math.max(t * 1.3, totalMg * 1.08);
  const fill = el("div", { class:"meterFill", id:"meterFill" });
  const meter = el("div", { class:"meter", id:"meter", role:"meter", "aria-label":"Sodium so far today", "aria-valuemin":0, "aria-valuemax":t, "aria-valuenow":totalMg },
    fill, el("div", { class:"meterMark", style:`left:${100 * t / scaleMax}%` }, el("span", { text:"goal" })));
  const apply = (mg, animate) => {
    const w = Math.min(100, 100 * mg / scaleMax);
    meter.classList.toggle("under", mg <= t * 0.85);          // green glow
    meter.classList.toggle("warn", mg > t * 0.85 && mg <= t);  // amber glow, still under
    meter.classList.toggle("over", mg > t);                    // red
    fill.style.width = (animate ? w : 0) + "%";
  };
  return { meter, apply, scaleMax };
}
function renderBudget(){
  showMode(1, `Daily Budget · ${R.today}`, true);
  const sl = R.slots[idx], t = TARGET(); let answered = false;
  setProgress(idx, 4); comboUpdate(false);
  const mt = meterEl(R.totalMg); mt.apply(0, false);
  setTimeout(() => mt.apply(R.totalMg, true), 30);
  const left = el("span", { id:"leftTxt" }), tot = el("b", { id:"totTxt", text:`${fmt(R.totalMg)} mg` });
  const setTxt = (mg) => { tot.textContent = `${fmt(mg)} mg (${pct(mg)}%)`; left.textContent = mg <= t ? `${fmt(t - mg)} mg left` : `${fmt(mg - t)} mg over`; };
  setTxt(R.totalMg);
  const opts = sl.options.map((o, i) => el("button", { class:"optCard", id:"opt" + i, "data-i":i, onclick:() => choose(i) },
    el("span", { class:"oe", "aria-hidden":"true", text:o.emoji }),
    el("span", {}, o.name, el("small", { text: o.type === "plate" ? o.parts.map(p => p.t).join(", ") : o.serving })),
    el("span", { class:"omg" })));
  $("modeBox").replaceChildren(
    el("div", { class:"panel", style:"padding:.8rem" },
      el("div", { class:"badgeRow", style:"color:var(--ink)" }, el("b", { text:`${sl.emoji} ${sl.name} (${idx + 1}/4)` }), el("span", { class:"pillDark", text:`${fmt(t)} mg goal` })),
      el("div", { class:"meterWrap", id:"meterWrap" }, mt.meter),
      el("div", { class:"meterTxt" }, tot, left),
      el("p", { style:"margin:.3rem 0 0", id:"budgetPrompt", text:"Pick the meal that keeps your day under budget. Sodium is revealed after you choose." })),
    el("div", { class:"optGrid", id:"optGrid" }, opts));
  function choose(i){
    if (answered) return; answered = true;
    const o = sl.options[i];
    R.picks.push(o); R.totalMg += o.mg;
    const lowest = Math.min(...sl.options.map(x => x.mg));
    R.grid.push(o.rate === "low" ? "🟩" : o.rate === "mod" ? "🟨" : "🟥");
    if (o.mg === lowest){ R.correct++; R.combo++; } else R.combo = 0;
    R.maxCombo = Math.max(R.maxCombo, R.combo);
    opts.forEach((b, j) => {
      const x = sl.options[j]; b.disabled = true; b.classList.add(j === i ? "chosen" : "dim");
      b.querySelector(".omg").replaceChildren(`${fmt(x.mg)} mg`, el("small", { text:`${pct(x.mg)}% of day` }));
    });
    mt.apply(R.totalMg, true); setTxt(R.totalMg);
    const c = centerOf($("meterWrap")), under = R.totalMg <= t;
    if (o.mg === lowest){ sfxCorrect(Math.max(1, R.combo), 1); haptic("success"); burst(c.x, c.y, 14); floatText("Lowest pick! ✨", c.x, c.y - 10); }
    else if (o.rate === "high"){ sfxWrong(); haptic("error"); }
    else { tone(520, .18, "sine", .1); haptic("light"); }
    $("meter").setAttribute("aria-valuenow", R.totalMg);
    const fb = o.mg === lowest ? "That was the lowest option!" : `The lowest was ${fmt(lowest)} mg.`;
    const last = idx + 1 >= 4;
    modeFeedback(o, o.rate !== "high", `${o.name}: ${fmt(o.mg)} mg. ${fb}`, () => { idx++; if (idx >= 4) endBudget(); else renderBudget(); }, last);
    $("modeToast").querySelector(".tapnote").textContent = under ? "Still under budget ✅" : `${fmt(R.totalMg - t)} mg over so far`;
  }
}
function endBudget(){
  const p = PD(), d = p.daily, t = TARGET(), total = R.totalMg, under = total <= t, today = R.today;
  const first = d.last !== today;
  const stars = total <= t * 0.6 ? 3 : total <= t * 0.8 ? 2 : under ? 1 : 0;
  R.points = under ? 100 + Math.min(50, Math.round((t - total) / 20)) : 20;
  R.correct = R.picks.filter((o, i) => o.mg === Math.min(...R.slots[i].options.map(x => x.mg))).length;
  const lines = []; let freezeNote = null;
  if (first){
    const gap = d.last ? daysBetween(d.last, today) : null;
    let usedFreeze = false;
    if (gap === null) d.streak = 1;
    else if (gap === 1) d.streak++;
    else if (gap === 2 && d.freezes > 0){ d.freezes--; d.streak++; usedFreeze = true; freezeNote = "❄️ A streak freeze covered yesterday. Your streak is safe!"; }
    else d.streak = 1;
    d.best = Math.max(d.best, d.streak);
    if (d.streak > 0 && d.streak % 7 === 0 && d.freezes < 2){ d.freezes++; freezeNote = (freezeNote ? freezeNote + " " : "") + "❄️ You earned a streak freeze!"; }
    if (under){
      const g2 = d.lastUnder ? daysBetween(d.lastUnder, today) : null;
      d.under = (g2 === 1 || (usedFreeze && g2 === 2)) ? d.under + 1 : 1; d.lastUnder = today;
    } else d.under = 0;
    d.last = today; d.lastTotal = total; d.lastTarget = t; p.stats.dailyPlayed++;
    d.history = [...(d.history || []), { d:today, mg:total, t }].slice(-30);
    if (d.streak >= 3) award("streak3"); if (d.streak >= 7) award("streak7");
    if (under) award("under"); if (d.under >= 7) award("under7");
  }
  persist();
  const grid = R.grid.join(""), starTxt = stars ? "⭐".repeat(stars) : "";
  R.grid = [grid]; // single line for the share card
  const pctTxt = Math.round(100 * total / t);
    if (first) lines.push(`Daily streak: 🔥 ${d.streak} day${d.streak === 1 ? "" : "s"} (best ${d.best}) · ❄️ ${d.freezes} freeze${d.freezes === 1 ? "" : "s"}`);
  else lines.push("Replays don't change today's score or streak. Come back tomorrow for a new day!");
  if (freezeNote) lines.push(freezeNote);
  if (first && under && d.under > 1) lines.push(`✅ Under budget ${d.under} days in a row.`);
  lines.push(under ? `You finished ${fmt(t - total)} mg under your ${fmt(t)} mg goal. ${starTxt}` : `You were ${fmt(total - t)} mg over today. Tomorrow is a new day, and every swap helps.`);
  // meter result: glows green when under target
  const mt = meterEl(total); mt.apply(0, false); setTimeout(() => mt.apply(total, true), 120);
  R.mode = "budget"; R.total = 4;
  if (first){
    endRound({ title: under ? "Under budget! ✅" : "Day complete 📅", recordKey:"budget", shareTitle:`Daily Budget ${today}`, shareLine:`${fmt(total)} / ${fmt(t)} mg ${under ? "✅" : "❌"} (${pctTxt}%) ${starTxt}`.trim(), summary:`Lowest pick in ${R.correct} of 4 meals · ${R.picks.filter(o => o.rate === "high").length} high-sodium picks`, perfect:false, xpBonus: under ? 40 : 0,
      lines, again:() => { closeModal(); startBudget(); }, againText:"Replay for practice" });
  } else {
    // practice replays: show a result without touching records, streak or XP
    openModal(el("h2", { id:"modalTitle", text: under ? "Under budget! ✅" : "Practice done 📅" }),
      el("div", { class:"big", text:`${fmt(total)} mg` }), el("div", { class:"meterWrap" }, mt.meter), el("p", { text:`${pctTxt}% of your ${fmt(t)} mg goal. ${starTxt}` }), ...lines.map(x => el("p", { text:x })),
      el("div", { class:"btnCol" }, el("button", { class:"bigBtn", id:"againBtn", text:"Replay", onclick:() => { closeModal(); startBudget(); } }),
        el("button", { class:"bigBtn secondary", id:"toMenuBtn", text:"Back to menu", onclick:renderHome })));
  }
  if (first){ // add the glowing meter to the summary modal
    const panel = $("panel"), anchor = panel.querySelector(".big");
    const wrap = el("div", { class:"meterWrap", id:"resultMeter" }, mt.meter); anchor.after(wrap);
    anchor.textContent = `${fmt(total)} mg`;
    const pts = el("p", { text:`${pctTxt}% of your ${fmt(t)} mg goal. ${starTxt} · ${R.points} pts` }); wrap.after(pts);
  }
}

/* ---------- WIRING + BOOT ---------- */
$("highBtn").addEventListener("click", () => answer(choiceToAnswer(curCard(), "left")));
$("modBtn").addEventListener("click",  () => answer(choiceToAnswer(curCard(), "up")));
$("lowBtn").addEventListener("click",  () => answer(choiceToAnswer(curCard(), "right")));
toastEl.addEventListener("click", () => nextCard());
$("homeBtn").addEventListener("click", () => { runCleanup(); if (teardownCard){ teardownCard(); teardownCard = null; } state = "idle"; R = null; renderHome(); });
$("profilePill").addEventListener("click", renderSettings);
document.addEventListener("keydown", (e) => {
  if ($("gameScreen").hidden || $("modal").style.display === "flex") return;
  if (state === "question"){
    const dir = { ArrowLeft:"left", ArrowUp:"up", ArrowRight:"right" }[e.key];
    if (dir){ e.preventDefault(); answer(choiceToAnswer(curCard(), dir)); }
  } else if (state === "revealed" && (e.key === "Enter" || e.key === " ") && e.target.id !== "nextCardBtn" && R && R.mode !== "speed"){
    e.preventDefault(); nextCard();
  }
});
window.addEventListener("error", (e) => { window.__errors = (window.__errors || []).concat(String(e.message)); });
// Test hook (read-only helpers for headless tests)
window.__sw = { get save(){ return save; }, FOODS, PLATES, COMPARES, HIDDEN_POOL, buildBudget, rateOf, prateOf };
if (!save.profile) renderProfileChoice(); else renderHome();
if ("serviceWorker" in navigator && location.protocol !== "file:"){
  window.addEventListener("load", () => { navigator.serviceWorker.register("sw.js").catch(() => {}); });
}
