/* ======================
   CROP DATA
====================== */
const crops = {
  Carrot:     { cost: 5,  sell: 8,  growTime: 3000, icon: "🥕", rarity: "Common" },
  Potato:    { cost: 6,  sell: 10, growTime: 3200, icon: "🥔", rarity: "Common" },
  Tomato:    { cost: 10, sell: 15, growTime: 4000, icon: "🍅", rarity: "Uncommon" },
  Corn:      { cost: 14, sell: 22, growTime: 4500, icon: "🌽", rarity: "Uncommon" },
  Blueberry: { cost: 18, sell: 30, growTime: 5200, icon: "🫐", rarity: "Rare" },
  Pumpkin:   { cost: 25, sell: 45, growTime: 6500, icon: "🎃", rarity: "Rare" },
  Grape:     { cost: 30, sell: 60, growTime: 7200, icon: "🍇", rarity: "Epic" },
  Watermelon:{ cost: 40, sell: 85, growTime: 8500, icon: "🍉", rarity: "Epic" },
  GoldenApple:{cost: 75, sell: 160,growTime: 11000,icon:"🍏", rarity:"Legendary"},
  Starfruit: { cost: 100,sell: 250,growTime: 14000,icon:"⭐", rarity:"Legendary"}
};

/* ======================
   GAME STATE
====================== */
let coins = 100;
let inventory = {};
let selectedSeed = null;

/* ======================
   ELEMENTS
====================== */
const coinsEl = document.getElementById("coins");
const selectedEl = document.getElementById("selected");
const plotsEl = document.getElementById("plots");
const inventoryEl = document.getElementById("inventoryList");
const shopEl = document.getElementById("shopList");

/* ======================
   UI
====================== */
function updateUI() {
  coinsEl.textContent = coins;
  selectedEl.textContent = selectedSeed ?? "None";
  renderInventory();
}

function show(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

/* ======================
   SHOP
====================== */
function renderShop() {
  shopEl.innerHTML = "";
  for (const seed in crops) {
    const c = crops[seed];
    const btn = document.createElement("button");
    btn.textContent = `${c.icon} ${seed} (${c.cost})`;
    btn.onclick = () => buySeed(seed);
    shopEl.appendChild(btn);
  }
}

function buySeed(type) {
  const crop = crops[type];
  if (coins < crop.cost) return;
  coins -= crop.cost;
  inventory[type] = (inventory[type] || 0) + 1;
  selectedSeed = type;
  updateUI();
}

/* ======================
   INVENTORY
====================== */
function renderInventory() {
  inventoryEl.innerHTML = "";
  for (const seed in inventory) {
    if (inventory[seed] <= 0) continue;
    const crop = crops[seed];

    const item = document.createElement("div");
    item.className = `inv-item rarity-${crop.rarity}`;
    if (seed === selectedSeed) item.classList.add("active");

    item.innerHTML = `
      <span>${crop.icon} ${seed}</span>
      <strong>${inventory[seed]}</strong>
      <small>${crop.rarity}</small>
    `;

    item.onclick = () => {
      selectedSeed = seed;
      updateUI();
    };

    inventoryEl.appendChild(item);
  }
}

/* ======================
   GARDEN
====================== */
for (let i = 0; i < 12; i++) {
  const plot = document.createElement("div");
  plot.className = "plot";
  plot.dataset.state = "empty";
  plot.dataset.seed = "";

  plot.onclick = () => {
    if (plot.dataset.state === "empty") {
      if (!selectedSeed || inventory[selectedSeed] <= 0) return;

      inventory[selectedSeed]--;
      plot.dataset.seed = selectedSeed;
      plot.dataset.state = "growing";
      plot.classList.add("planted");
      plot.textContent = "🌱";

      const crop = crops[selectedSeed];
      setTimeout(() => {
        if (plot.dataset.state === "growing") {
          plot.dataset.state = "ready";
          plot.textContent = crop.icon;
        }
      }, crop.growTime);
    }

    else if (plot.dataset.state === "ready") {
      const crop = crops[plot.dataset.seed];
      coins += crop.sell;

      plot.dataset.state = "empty";
      plot.dataset.seed = "";
      plot.classList.remove("planted");
      plot.textContent = "";
      updateUI();
    }
  };

  plotsEl.appendChild(plot);
}

renderShop();
updateUI();
function spawnHarvestParticles(x, y, color = "#6affb3") {
  for (let i = 0; i < 12; i++) {
    const p = document.createElement("div");
    p.className = "harvest-particle";
    document.body.appendChild(p);

    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 30;

    p.style.left = x + "px";
    p.style.top = y + "px";
    p.style.setProperty("--dx", Math.cos(angle) * distance + "px");
    p.style.setProperty("--dy", Math.sin(angle) * distance + "px");
    p.style.background = color;

    setTimeout(() => p.remove(), 700);
  }
}
