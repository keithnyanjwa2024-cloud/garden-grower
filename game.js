// ============================
// GAME STATE
// ============================
let coins = 1000;
let gear = 0;
let prestigeCount = 0;
let selectedSeed = null;

// ============================
// EXPANDED SEED DATA
// ============================
const seedData = {
  carrot: { 
    cost: 50, 
    value: 80, 
    icon: "🥕", 
    growTime: 3000, 
    name: "Carrot",
    baseProfit: 30,
    description: "Quick-growing basic crop",
    rarity: "Common"
  },
  potato: { 
    cost: 100, 
    value: 160, 
    icon: "🥔", 
    growTime: 4000, 
    name: "Potato",
    baseProfit: 60,
    description: "Higher ROI but slower",
    rarity: "Common"
  },
  tomato: { 
    cost: 200, 
    value: 350, 
    icon: "🍅", 
    growTime: 5000, 
    name: "Tomato",
    baseProfit: 150,
    description: "Juicy and profitable",
    rarity: "Uncommon"
  },
  corn: { 
    cost: 400, 
    value: 700, 
    icon: "🌽", 
    growTime: 6000, 
    name: "Corn",
    baseProfit: 300,
    description: "Tall and valuable",
    rarity: "Uncommon"
  },
  blueberry: { 
    cost: 800, 
    value: 1500, 
    icon: "🫐", 
    growTime: 8000, 
    name: "Blueberry",
    baseProfit: 700,
    description: "Sweet berry bushes",
    rarity: "Rare"
  },
  pumpkin: { 
    cost: 1500, 
    value: 3000, 
    icon: "🎃", 
    growTime: 10000, 
    name: "Pumpkin",
    baseProfit: 1500,
    description: "Large and valuable",
    rarity: "Rare"
  },
  grape: { 
    cost: 3000, 
    value: 6500, 
    icon: "🍇", 
    growTime: 12000, 
    name: "Grape",
    baseProfit: 3500,
    description: "Vine-grown luxury",
    rarity: "Epic"
  },
  watermelon: { 
    cost: 6000, 
    value: 14000, 
    icon: "🍉", 
    growTime: 15000, 
    name: "Watermelon",
    baseProfit: 8000,
    description: "Massive summer fruit",
    rarity: "Epic"
  },
  goldenApple: { 
    cost: 12000, 
    value: 30000, 
    icon: "🍏", 
    growTime: 20000, 
    name: "Golden Apple",
    baseProfit: 18000,
    description: "Legendary golden fruit",
    rarity: "Legendary"
  },
  starfruit: { 
    cost: 25000, 
    value: 75000, 
    icon: "⭐", 
    growTime: 30000, 
    name: "Starfruit",
    baseProfit: 50000,
    description: "Celestial cosmic fruit",
    rarity: "Mythical"
  }
};

// ============================
// GEAR SHOP ITEMS
// ============================
const gearShop = [
  {
    id: "wateringCan",
    name: "Watering Can",
    icon: "💧",
    description: "Reduces grow time by 10%",
    cost: 500,
    level: 0,
    maxLevel: 10,
    effect: "growTimeReduction",
    effectValue: 0.10,
    unlocked: true
  },
  {
    id: "fertilizer",
    name: "Fertilizer",
    icon: "🌱",
    description: "Increases profit by 15%",
    cost: 1000,
    level: 0,
    maxLevel: 10,
    effect: "profitBonus",
    effectValue: 0.15,
    unlocked: true
  },
  {
    id: "irrigation",
    name: "Irrigation System",
    icon: "🚿",
    description: "Auto-waters crops, reduces time by 25%",
    cost: 5000,
    level: 0,
    maxLevel: 5,
    effect: "growTimeReduction",
    effectValue: 0.25,
    unlocked: false,
    requireGearLevel: 2
  },
  {
    id: "tractor",
    name: "Tractor",
    icon: "🚜",
    description: "Plants 2 seeds at once",
    cost: 15000,
    level: 0,
    maxLevel: 3,
    effect: "doublePlant",
    effectValue: 2,
    unlocked: false,
    requireGearLevel: 4
  },
  {
    id: "greenhouse",
    name: "Greenhouse",
    icon: "🏡",
    description: "+50% profit in all seasons",
    cost: 30000,
    level: 0,
    maxLevel: 3,
    effect: "profitBonus",
    effectValue: 0.50,
    unlocked: false,
    requireGearLevel: 6
  },
  {
    id: "harvester",
    name: "Auto-Harvester",
    icon: "🤖",
    description: "10% chance for instant harvest",
    cost: 75000,
    level: 0,
    maxLevel: 5,
    effect: "instantHarvest",
    effectValue: 0.10,
    unlocked: false,
    requireGearLevel: 8
  }
];

// Track purchased gear
let purchasedGear = {};
gearShop.forEach(gear => {
  purchasedGear[gear.id] = { level: 0 };
});

// ============================
// GEAR LEVELS
// ============================
const gearLevels = [
  { level: 0, name: "Basic Tools", profitBonus: 0, features: ["Basic farming"], icon: "🛠️", color: "#94a3b8" },
  { level: 1, name: "Bronze Tools", profitBonus: 25, features: ["+25% profit boost", "Faster planting"], icon: "🥉", color: "#CD7F32" },
  { level: 2, name: "Silver Tools", profitBonus: 50, features: ["+50% profit boost", "Auto-watering"], icon: "🥈", color: "#C0C0C0" },
  { level: 3, name: "Gold Tools", profitBonus: 75, features: ["+75% profit boost", "Fertilizer boost"], icon: "🥇", color: "#FFD700" },
  { level: 4, name: "Platinum Tools", profitBonus: 100, features: ["+100% profit boost", "Double harvest chance"], icon: "💎", color: "#E5E4E2" },
  { level: 5, name: "Diamond Tools", profitBonus: 150, features: ["+150% profit boost", "Instant grow 10%"], icon: "🔷", color: "#b9f2ff" }
];

// ============================
// PRESTIGE TIERS
// ============================
const prestigeTiers = [
  { tier: 0, name: "Beginner", profitBonus: 0, features: ["Start with 1000 coins"], icon: "🌱", color: "#94a3b8" },
  { tier: 1, name: "Apprentice", profitBonus: 50, features: ["+50% permanent profit", "Start with 1500 coins"], icon: "⭐", color: "#fbbf24" },
  { tier: 2, name: "Expert", profitBonus: 100, features: ["+100% permanent profit", "+1 garden plot", "Start with 2000 coins"], icon: "🌟🌟", color: "#22d3ee" },
  { tier: 3, name: "Master", profitBonus: 200, features: ["+200% permanent profit", "+2 garden plots", "Start with 3000 coins"], icon: "👑", color: "#a855f7" },
  { tier: 4, name: "Legend", profitBonus: 400, features: ["+400% permanent profit", "+3 garden plots", "Seed discounts"], icon: "🔥", color: "#ef4444" },
  { tier: 5, name: "God", profitBonus: 800, features: ["+800% permanent profit", "+4 garden plots", "Instant growth"], icon: "⚡", color: "#10b981" }
];

// ============================
// INVENTORY & PLOTS
// ============================
let inventory = {};
Object.keys(seedData).forEach(seed => {
  inventory[seed] = 0;
});
// Give some starting seeds
inventory.carrot = 3;
inventory.potato = 2;

let plots = Array(6).fill({ seed: null, state: 'empty', timer: null });

// ============================
// DOM CACHE
// ============================
const domCache = {
  coins: document.getElementById('coins'),
  gear: document.getElementById('gear'),
  prestigeCount: document.getElementById('prestigeCount'),
  selectedDisplay: document.getElementById('selectedDisplay'),
  profitMultiplier: document.getElementById('profitMultiplier'),
  gearBonus: document.getElementById('gearBonus'),
  prestigeBonus: document.getElementById('prestigeBonus'),
  gearLevel: document.getElementById('gearLevel'),
  currentBonus: document.getElementById('currentBonus'),
  nextBonus: document.getElementById('nextBonus'),
  gearCost: document.getElementById('gearCost'),
  prestigeTier: document.getElementById('prestigeTier'),
  currentMultiplier: document.getElementById('currentMultiplier'),
  nextMultiplier: document.getElementById('nextMultiplier'),
  prestigeCost: document.getElementById('prestigeCost'),
  plotsEl: document.getElementById('plots'),
  toast: document.getElementById('toast'),
  balanceDisplay: document.getElementById('balanceDisplay'),
  balanceGear: document.getElementById('balanceGear'),
  balancePrestige: document.getElementById('balancePrestige')
};

// ============================
// TOAST SYSTEM
// ============================
function showToast(message, type = 'info', duration = 2000) {
  const colors = {
    success: '#10b981',
    error: '#ef4444',
    info: '#22d3ee',
    warning: '#fbbf24',
    gear: '#a855f7',
    prestige: '#f59e0b'
  };
  
  domCache.toast.textContent = message;
  domCache.toast.style.borderLeftColor = colors[type] || colors.info;
  domCache.toast.classList.add('show');
  
  setTimeout(() => {
    domCache.toast.classList.remove('show');
  }, duration);
}

// ============================
// CALCULATE ACTIVE BONUSES
// ============================
function getActiveBonuses() {
  let totalGrowTimeReduction = 0;
  let totalProfitBonus = 0;
  let canDoublePlant = false;
  let instantHarvestChance = 0;
  
  // Calculate from purchased gear
  gearShop.forEach(gearItem => {
    const gearLevel = purchasedGear[gearItem.id].level;
    if (gearLevel > 0) {
      switch(gearItem.effect) {
        case 'growTimeReduction':
          totalGrowTimeReduction += gearItem.effectValue * gearLevel;
          break;
        case 'profitBonus':
          totalProfitBonus += gearItem.effectValue * gearLevel;
          break;
        case 'doublePlant':
          canDoublePlant = true;
          break;
        case 'instantHarvest':
          instantHarvestChance += gearItem.effectValue * gearLevel;
          break;
      }
    }
  });
  
  return {
    growTimeMultiplier: Math.max(0.1, 1 - totalGrowTimeReduction),
    profitMultiplier: 1 + totalProfitBonus,
    canDoublePlant,
    instantHarvestChance
  };
}

// ============================
// PROFIT CALCULATION
// ============================
function calculateProfit(seedType) {
  const seed = seedData[seedType];
  const baseProfit = seed.value - seed.cost;
  
  // Gear level bonus
  const currentGear = gearLevels[Math.min(gear, gearLevels.length - 1)];
  const gearMultiplier = 1 + (currentGear.profitBonus / 100);
  
  // Prestige bonus
  const currentPrestige = prestigeTiers[Math.min(prestigeCount, prestigeTiers.length - 1)];
  const prestigeMultiplier = 1 + (currentPrestige.profitBonus / 100);
  
  // Gear shop bonuses
  const activeBonuses = getActiveBonuses();
  const shopMultiplier = activeBonuses.profitMultiplier;
  
  // Calculate final profit
  const profit = Math.floor(baseProfit * gearMultiplier * prestigeMultiplier * shopMultiplier);
  
  return seed.cost + profit;
}

// ============================
// GEAR SHOP FUNCTIONS
// ============================
function updateGearShop() {
  const gearGrid = document.getElementById('gearShopGrid');
  if (!gearGrid) return;
  
  gearGrid.innerHTML = '';
  
  gearShop.forEach(gearItem => {
    // Check if unlocked
    if (!gearItem.unlocked && gearItem.requireGearLevel && gear >= gearItem.requireGearLevel) {
      gearItem.unlocked = true;
    }
    
    const gearLevel = purchasedGear[gearItem.id].level;
    const isMaxLevel = gearLevel >= gearItem.maxLevel;
    const nextCost = Math.floor(gearItem.cost * Math.pow(1.5, gearLevel));
    
    const gearCard = document.createElement('div');
    gearCard.className = `gear-shop-card ${gearItem.unlocked ? '' : 'locked'} ${isMaxLevel ? 'max-level' : ''}`;
    
    gearCard.innerHTML = `
      <div class="gear-card-header">
        <div class="gear-icon">${gearItem.icon}</div>
        <div class="gear-info">
          <div class="gear-name">${gearItem.name}</div>
          <div class="gear-level">Level ${gearLevel}/${gearItem.maxLevel}</div>
          <div class="gear-desc">${gearItem.description}</div>
          ${!gearItem.unlocked ? `<div class="gear-require">Requires Gear Level ${gearItem.requireGearLevel}</div>` : ''}
        </div>
      </div>
      <div class="gear-card-stats">
        <div class="gear-stat">
          <span>Current Effect:</span>
          <span class="gear-effect">${
            gearItem.effect === 'growTimeReduction' ? `-${(gearItem.effectValue * gearLevel * 100).toFixed(0)}% time` :
            gearItem.effect === 'profitBonus' ? `+${(gearItem.effectValue * gearLevel * 100).toFixed(0)}% profit` :
            gearItem.effect === 'doublePlant' ? 'Double planting' :
            `${(gearItem.effectValue * gearLevel * 100).toFixed(0)}% instant harvest`
          }</span>
        </div>
      </div>
      <div class="gear-card-footer">
        <button class="gear-buy-btn" 
                onclick="buyGear('${gearItem.id}')"
                ${!gearItem.unlocked || isMaxLevel ? 'disabled' : ''}>
          ${isMaxLevel ? 'MAX LEVEL' : `Upgrade - ${nextCost} coins`}
        </button>
      </div>
    `;
    
    gearGrid.appendChild(gearCard);
  });
  
  // Update gear level indicators
  for (let i = 1; i <= 6; i++) {
    const levelIndicator = document.getElementById(`level${i}`);
    if (levelIndicator) {
      if (gear >= i) {
        levelIndicator.classList.add('active');
      } else {
        levelIndicator.classList.remove('active');
      }
    }
  }
}

function buyGear(gearId) {
  const gearItem = gearShop.find(g => g.id === gearId);
  if (!gearItem || !gearItem.unlocked) return;
  
  const gearLevel = purchasedGear[gearId].level;
  if (gearLevel >= gearItem.maxLevel) {
    showToast(`${gearItem.name} is at max level!`, 'warning');
    return;
  }
  
  const cost = Math.floor(gearItem.cost * Math.pow(1.5, gearLevel));
  if (coins < cost) {
    showToast(`Need ${cost} coins to upgrade!`, 'error');
    return;
  }
  
  coins -= cost;
  purchasedGear[gearId].level++;
  
  const newLevel = purchasedGear[gearId].level;
  
  let effectMessage = '';
  switch(gearItem.effect) {
    case 'growTimeReduction':
      effectMessage = `Grow time reduced by ${(gearItem.effectValue * newLevel * 100).toFixed(0)}%`;
      break;
    case 'profitBonus':
      effectMessage = `Profit increased by ${(gearItem.effectValue * newLevel * 100).toFixed(0)}%`;
      break;
    case 'doublePlant':
      effectMessage = 'Can now plant 2 seeds at once!';
      break;
    case 'instantHarvest':
      effectMessage = `${(gearItem.effectValue * newLevel * 100).toFixed(0)}% instant harvest chance`;
      break;
  }
  
  showToast(`⚡ ${gearItem.name} Level ${newLevel}! ${effectMessage}`, 'gear');
  updateGearShop();
  updateUI();
}

// ============================
// SEED SHOP FUNCTIONS
// ============================
function updateSeedShop() {
  const seedCards = document.querySelector('.seed-cards');
  if (!seedCards) return;
  
  seedCards.innerHTML = '';
  
  Object.entries(seedData).forEach(([seedId, seed]) => {
    const profit = calculateProfit(seedId);
    const finalProfit = profit - seed.cost;
    const roi = Math.round((finalProfit / seed.cost) * 100);
    const growTime = Math.floor(seed.growTime / 1000);
    
    const seedCard = document.createElement('div');
    seedCard.className = `seed-card rarity-${seed.rarity.toLowerCase()}`;
    seedCard.innerHTML = `
      <div class="seed-icon">${seed.icon}</div>
      <div class="seed-info">
        <div class="seed-name">${seed.name} <span class="roi-badge">${roi}% ROI</span></div>
        <div class="seed-details">
          <div class="seed-stat"><i class="fas fa-coins"></i> Cost: <strong>${seed.cost.toLocaleString()}</strong></div>
          <div class="seed-stat"><i class="fas fa-money-bill-wave"></i> Sells for: <strong>${profit.toLocaleString()}</strong></div>
          <div class="seed-stat"><i class="fas fa-chart-line"></i> Profit: <strong>+${finalProfit.toLocaleString()}</strong></div>
          <div class="seed-stat"><i class="fas fa-clock"></i> Time: <strong>${growTime}s</strong></div>
        </div>
      </div>
      <button class="buy-btn" onclick="buySeed('${seedId}')">
        <i class="fas fa-shopping-bag"></i> Buy
      </button>
    `;
    seedCards.appendChild(seedCard);
  });
}

function buySeed(seedId) {
  const seed = seedData[seedId];
  
  if (coins < seed.cost) {
    showToast(`Need ${seed.cost.toLocaleString()} coins for ${seed.name}!`, 'error');
    return;
  }
  
  coins -= seed.cost;
  inventory[seedId]++;
  selectedSeed = seedId;
  
  const profit = calculateProfit(seedId);
  const finalProfit = profit - seed.cost;
  const roi = Math.round((finalProfit / seed.cost) * 100);
  
  showToast(`Bought ${seed.name} seeds! ${roi}% ROI`, 'success');
  updateUI();
}

// ============================
// INVENTORY FUNCTIONS
// ============================
function updateInventory() {
  const inventoryCards = document.querySelector('.inventory-cards');
  if (!inventoryCards) return;
  
  inventoryCards.innerHTML = '';
  
  Object.entries(seedData).forEach(([seedId, seed]) => {
    if (inventory[seedId] > 0) {
      const invCard = document.createElement('div');
      invCard.className = `inv-card ${selectedSeed === seedId ? 'selected' : ''}`;
      invCard.onclick = () => selectSeed(seedId);
      invCard.innerHTML = `
        <div class="inv-icon">${seed.icon}</div>
        <div class="inv-details">
          <div class="inv-name">${seed.name}</div>
          <div class="inv-count">x<span id="inv-${seedId}">${inventory[seedId]}</span></div>
          <div class="inv-profit rarity-${seed.rarity.toLowerCase()}">${seed.rarity}</div>
        </div>
        <div class="inv-action">Click to select</div>
      `;
      inventoryCards.appendChild(invCard);
    }
  });
}

function selectSeed(seedId) {
  if (inventory[seedId] > 0) {
    selectedSeed = seedId;
    const profit = calculateProfit(seedId);
    const seed = seedData[seedId];
    const finalProfit = profit - seed.cost;
    showToast(`Selected ${seed.name} (+${finalProfit.toLocaleString()} profit)`, 'info');
    updateUI();
  } else {
    showToast(`Buy ${seedData[seedId].name} seeds first!`, 'error');
  }
}

// ============================
// PLOT FUNCTIONS
// ============================
function updatePlots() {
  if (!domCache.plotsEl) return;
  
  domCache.plotsEl.innerHTML = '';
  const currentTier = prestigeTiers[Math.min(prestigeCount, prestigeTiers.length - 1)];
  const activeBonuses = getActiveBonuses();
  
  plots.forEach((plot, i) => {
    const plotDiv = document.createElement('div');
    plotDiv.className = 'plot';
    plotDiv.dataset.index = i;
    
    if (i >= 6 && i < plots.length) {
      plotDiv.classList.add('prestige-plot');
      plotDiv.style.borderColor = currentTier.color;
    }
    
    if (plot.state === 'growing') {
      plotDiv.classList.add('growing');
      plotDiv.innerHTML = `
        <div class="plot-content">
          <div class="plot-icon">🌱</div>
          <div class="plot-name">${plot.seed}</div>
          <div class="plot-time">Growing...</div>
        </div>
      `;
    } else if (plot.state === 'ready') {
      plotDiv.classList.add('ready');
      const profit = calculateProfit(plot.seed);
      const seed = seedData[plot.seed];
      const finalProfit = profit - seed.cost;
      
      plotDiv.innerHTML = `
        <div class="plot-content">
          <div class="plot-icon">${seedData[plot.seed].icon}</div>
          <div class="plot-name">${plot.seed}</div>
          <div class="plot-profit">+${finalProfit.toLocaleString()} 💰</div>
        </div>
      `;
    } else {
      plotDiv.innerHTML = `
        <div class="plot-content">
          <div class="plot-icon">${i >= 6 ? '✨' : '🪴'}</div>
          <div class="plot-name">${i >= 6 ? 'Prestige Plot' : 'Empty Plot'}</div>
        </div>
      `;
    }
    
    plotDiv.onclick = () => clickPlot(i);
    domCache.plotsEl.appendChild(plotDiv);
  });
}

function clickPlot(index) {
  const plot = plots[index];
  const activeBonuses = getActiveBonuses();
  
  if (plot.state === 'empty') {
    if (!selectedSeed) {
      showToast('Select a seed first!', 'error');
      return;
    }
    
    if (inventory[selectedSeed] <= 0) {
      showToast(`No ${selectedSeed} seeds!`, 'error');
      return;
    }
    
    // Check for double planting
    let seedsToPlant = 1;
    if (activeBonuses.canDoublePlant && inventory[selectedSeed] >= 2) {
      seedsToPlant = 2;
    }
    
    inventory[selectedSeed] -= seedsToPlant;
    
    const growTime = Math.floor(seedData[selectedSeed].growTime * activeBonuses.growTimeMultiplier);
    
    plots[index] = {
      seed: selectedSeed,
      state: 'growing',
      timer: setTimeout(() => {
        plots[index].state = 'ready';
        updatePlots();
        
        // Check for instant harvest
        if (Math.random() < activeBonuses.instantHarvestChance) {
          setTimeout(() => {
            clickPlot(index);
            showToast(`⚡ Instant harvest! ${selectedSeed}`, 'gear');
          }, 500);
        } else {
          showToast(`${selectedSeed} ready to harvest!`, 'success');
        }
      }, growTime)
    };
    
    showToast(`Planted ${seedsToPlant} ${selectedSeed}${seedsToPlant > 1 ? 's' : ''}!`, 'success');
    updateUI();
    
  } else if (plot.state === 'ready') {
    const profit = calculateProfit(plot.seed);
    const seed = seedData[plot.seed];
    const finalProfit = profit - seed.cost;
    
    coins += profit;
    
    if (plot.timer) clearTimeout(plot.timer);
    plots[index] = { seed: null, state: 'empty', timer: null };
    
    showToast(`Harvested ${plot.seed}! +${finalProfit.toLocaleString()} profit`, 'success');
    updateUI();
  } else if (plot.state === 'growing') {
    showToast(`${plot.seed} is still growing!`, 'warning');
  }
}

// ============================
// GEAR LEVEL FUNCTIONS
// ============================
function upgradeGear() {
  const baseCost = 100;
  const scalingFactor = Math.pow(1.5, gear);
  const cost = Math.floor(baseCost * scalingFactor);
  
  if (coins < cost) {
    showToast(`Need ${cost.toLocaleString()} coins!`, 'error');
    return;
  }
  
  if (gear >= gearLevels.length - 1) {
    showToast('Max gear level reached!', 'info');
    return;
  }
  
  coins -= cost;
  gear++;
  
  const newGear = gearLevels[gear];
  showToast(`⚡ Gear Level ${gear}! ${newGear.name} unlocked!`, 'gear', 3000);
  
  // Visual effect
  document.body.style.animation = 'gearFlash 1s';
  setTimeout(() => document.body.style.animation = '', 1000);
  
  updateUI();
}

// ============================
// PRESTIGE FUNCTIONS
// ============================
function updatePrestigeShop() {
  const currentTier = prestigeTiers[Math.min(prestigeCount, prestigeTiers.length - 1)];
  const nextTier = prestigeTiers[Math.min(prestigeCount + 1, prestigeTiers.length - 1)];
  
  // Update prestige info
  const prestigeNameEl = document.getElementById('prestigeName');
  const prestigeIconEl = document.getElementById('prestigeIcon');
  const prestigeFeaturesEl = document.getElementById('prestigeFeatures');
  
  if (prestigeNameEl) {
    prestigeNameEl.textContent = currentTier.name;
    prestigeNameEl.style.color = currentTier.color;
  }
  
  if (prestigeIconEl) {
    prestigeIconEl.textContent = currentTier.icon;
  }
  
  if (prestigeFeaturesEl) {
    prestigeFeaturesEl.innerHTML = currentTier.features.map(f => 
      `<li><i class="fas fa-star"></i> ${f}</li>`
    ).join('');
  }
  
  // Update next tier preview
  const nextTierEl = document.getElementById('nextPrestigePreview');
  if (nextTierEl && prestigeCount < prestigeTiers.length - 1) {
    nextTierEl.innerHTML = `
      <h4><i class="fas fa-rocket"></i> Next Tier: ${nextTier.name}</h4>
      <ul>
        ${nextTier.features.map(f => `<li><i class="fas fa-gift"></i> ${f}</li>`).join('')}
      </ul>
    `;
  }
  
  // Update cost with exponential scaling
  const baseCost = 1000;
  const scalingFactor = Math.pow(2, prestigeCount);
  const cost = Math.floor(baseCost * scalingFactor);
  
  if (domCache.prestigeCost) {
    domCache.prestigeCost.textContent = cost.toLocaleString();
  }
  
  // Update prestige progress
  const progressEl = document.getElementById('prestigeProgress');
  if (progressEl) {
    const progress = ((prestigeCount + 1) / prestigeTiers.length) * 100;
    progressEl.style.width = `${progress}%`;
    progressEl.textContent = `Tier ${prestigeCount + 1}/${prestigeTiers.length}`;
  }
  
  // Update prestige displays
  if (domCache.prestigeTier) {
    domCache.prestigeTier.textContent = prestigeCount;
  }
  
  if (domCache.currentMultiplier) {
    const total = 100 + currentTier.profitBonus;
    domCache.currentMultiplier.textContent = `${total}%`;
  }
  
  if (domCache.nextMultiplier) {
    const nextTotal = 100 + nextTier.profitBonus;
    domCache.nextMultiplier.textContent = `${nextTotal}%`;
  }
}

function prestige() {
  const baseCost = 1000;
  const scalingFactor = Math.pow(2, prestigeCount);
  const cost = Math.floor(baseCost * scalingFactor);
  
  if (coins < cost) {
    showToast(`Need ${cost.toLocaleString()} coins!`, 'error');
    return;
  }
  
  if (prestigeCount >= prestigeTiers.length - 1) {
    showToast('Max prestige tier reached!', 'info');
    return;
  }
  
  const nextTier = prestigeTiers[prestigeCount + 1];
  const message = `PRESTIGE to ${nextTier.name}?\n\n` +
                 `💰 Cost: ${cost.toLocaleString()} coins\n` +
                 `✨ +${nextTier.profitBonus}% permanent profit\n` +
                 `🎁 ${nextTier.features.join('\n')}\n\n` +
                 `Reset: Coins, Gear, Inventory, Crops`;
  
  if (!confirm(message)) return;
  
  // Clear all timers
  plots.forEach(p => {
    if (p.timer) clearTimeout(p.timer);
  });
  
  prestigeCount++;
  coins = 1000 + (prestigeCount * 500);
  gear = 0;
  
  // Reset inventory
  Object.keys(inventory).forEach(seed => {
    inventory[seed] = 0;
  });
  
  // Give some starting seeds
  inventory.carrot = 3;
  inventory.potato = 2;
  
  // Reset gear purchases
  gearShop.forEach(gearItem => {
    purchasedGear[gearItem.id].level = 0;
    if (gearItem.requireGearLevel) {
      gearItem.unlocked = false;
    }
  });
  
  // Keep only basic gear unlocked
  gearShop[0].unlocked = true;
  gearShop[1].unlocked = true;
  
  plots = Array(6).fill({ seed: null, state: 'empty', timer: null });
  selectedSeed = null;
  
  showToast(`🎉 ${nextTier.name} ACHIEVED! +${nextTier.profitBonus}% permanent profit`, 'prestige', 4000);
  
  updateUI();
}

// ============================
// UPDATE UI
// ============================
function updateUI() {
  // Update basic stats
  if (domCache.coins) domCache.coins.textContent = coins.toLocaleString();
  if (domCache.gear) domCache.gear.textContent = gear;
  if (domCache.prestigeCount) domCache.prestigeCount.textContent = prestigeCount;
  
  // Update balance displays
  if (domCache.balanceDisplay) domCache.balanceDisplay.textContent = coins.toLocaleString();
  if (domCache.balanceGear) domCache.balanceGear.textContent = coins.toLocaleString();
  if (domCache.balancePrestige) domCache.balancePrestige.textContent = coins.toLocaleString();
  
  // Update selected seed
  if (selectedSeed && domCache.selectedDisplay) {
    const profit = calculateProfit(selectedSeed);
    const seed = seedData[selectedSeed];
    const finalProfit = profit - seed.cost;
    domCache.selectedDisplay.textContent = `${seed.icon} ${seed.name} → ${profit.toLocaleString()} coins (+${finalProfit.toLocaleString()} profit)`;
  } else if (domCache.selectedDisplay) {
    domCache.selectedDisplay.textContent = 'None (Select seed from Inventory)';
  }
  
  // Update multipliers
  const currentGear = gearLevels[Math.min(gear, gearLevels.length - 1)];
  const currentPrestige = prestigeTiers[Math.min(prestigeCount, prestigeTiers.length - 1)];
  const activeBonuses = getActiveBonuses();
  
  const totalMultiplier = (1 + currentGear.profitBonus/100) * (1 + currentPrestige.profitBonus/100) * activeBonuses.profitMultiplier;
  
  if (domCache.profitMultiplier) {
    domCache.profitMultiplier.textContent = `${((totalMultiplier - 1) * 100).toFixed(0)}%`;
  }
  
  if (domCache.gearBonus) {
    domCache.gearBonus.textContent = `+${currentGear.profitBonus}%`;
  }
  
  if (domCache.prestigeBonus) {
    domCache.prestigeBonus.textContent = `+${currentPrestige.profitBonus}%`;
  }
  
  // Update gear level displays
  if (domCache.gearLevel) domCache.gearLevel.textContent = gear;
  if (domCache.currentBonus) domCache.currentBonus.textContent = `+${currentGear.profitBonus}%`;
  if (domCache.nextBonus) {
    const nextGear = gearLevels[Math.min(gear + 1, gearLevels.length - 1)];
    domCache.nextBonus.textContent = `+${nextGear.profitBonus - currentGear.profitBonus}%`;
  }
  
  // Update gear cost
  if (domCache.gearCost) {
    const baseCost = 100;
    const scalingFactor = Math.pow(1.5, gear);
    const cost = Math.floor(baseCost * scalingFactor);
    domCache.gearCost.textContent = cost.toLocaleString();
  }
  
  // Update gear progress
  const progressEl = document.getElementById('gearProgress');
  if (progressEl) {
    const progress = ((gear + 1) / gearLevels.length) * 100;
    progressEl.style.width = `${progress}%`;
    progressEl.textContent = `Level ${gear + 1}/${gearLevels.length}`;
  }
  
  // Update gear name and icon
  const gearNameEl = document.getElementById('gearName');
  const gearIconEl = document.getElementById('gearIcon');
  const gearFeaturesEl = document.getElementById('gearFeatures');
  
  if (gearNameEl) gearNameEl.textContent = currentGear.name;
  if (gearIconEl) gearIconEl.textContent = currentGear.icon;
  if (gearFeaturesEl) {
    gearFeaturesEl.innerHTML = currentGear.features.map(f => 
      `<li><i class="fas fa-check"></i> ${f}</li>`
    ).join('');
  }
  
  // Update gear bonus display
  const gearBonusDisplay = document.getElementById('gearBonusDisplay');
  if (gearBonusDisplay) {
    gearBonusDisplay.textContent = `+${currentGear.profitBonus}%`;
  }
  
  // Update shops and plots
  updateGearShop();
  updateSeedShop();
  updateInventory();
  updatePlots();
  updatePrestigeShop();
}

// ============================
// TAB NAVIGATION
// ============================
document.querySelectorAll('.tab').forEach((tab, index) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    const indicator = document.querySelector('.tab-indicator');
    if (indicator) {
      indicator.style.transform = `translateX(${index * 100}%)`;
    }
    
    const viewId = tab.dataset.view;
    document.querySelectorAll('.view').forEach(view => {
      view.classList.remove('active');
    });
    document.getElementById(viewId).classList.add('active');
  });
});

// ============================
// ANIMATIONS
// ============================
const style = document.createElement('style');
style.textContent = `
  @keyframes gearFlash {
    0% { filter: brightness(1) hue-rotate(0deg); }
    50% { filter: brightness(1.5) hue-rotate(90deg); }
    100% { filter: brightness(1) hue-rotate(0deg); }
  }
  
  @keyframes prestigeEffect {
    0% { opacity: 0.8; transform: scale(1); }
    100% { opacity: 0; transform: scale(1.5); }
  }
`;
document.head.appendChild(style);

// ============================
// START GAME
// ============================
// Select carrot as default seed
selectedSeed = 'carrot';
updateUI();
showToast('Welcome to Garden Grower! 🌱 Start by planting carrots!', 'info', 3000);