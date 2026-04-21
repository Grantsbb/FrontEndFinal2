document.addEventListener('DOMContentLoaded', function () {
        const saveddarklightmode = localStorage.getItem('theme');
    const lightdarkmode = document.getElementById('lightdarkmode');
lightdarkmode.addEventListener('change', function() {
    if (this.checked){
      applyTheme('dark');
    }
    else {                                                                                                                                                     
    applyTheme('light');                                    
  }
});

  if (saveddarklightmode) applyTheme(saveddarklightmode);
  const searchBar = document.getElementById('searchBar');

  searchBar.addEventListener('input', function () {
    const query = searchBar.value.toLowerCase();
    const cards = Array.from(document.querySelectorAll('.col-md-4'));

    cards.forEach(function (card) {
      const title = card.querySelector('.card-title').textContent.toLowerCase();
      const description = card.querySelector('.card-text').textContent.toLowerCase();

      if (title.includes(query) || description.includes(query)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

function applyTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    const btn = document.getElementById("theme-toggle");
    if (btn) btn.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
}

async function loadRecipeOfTheDay() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day   = String(today.getDate()).padStart(2, '0');
  const year  = String(today.getFullYear()).slice(-2);
  const todayStr = `${month}-${day}-${year}`;

  let recipes = [];
  try {
    const res = await fetch('recipes.json');
    recipes = await res.json();
  } catch (e) {
    document.getElementById('rotd-content').innerHTML =
      '<div class="col-12"><h2>Recipe of the Day</h2><p>Nano does not giveth this Day.</p></div>';
    return;
  }

  const recipe = recipes.find(r => r.date === todayStr);
  const container = document.getElementById('rotd-content');
  if (!container) return;

  if (!recipe) {
    container.innerHTML = `
      <div class="col-12">
        <h2>Recipe of the Day</h2>
        <p>Nano does not giveth this day</p>
      </div>`;
    return;
  }

  const image = recipe.images && recipe.images[0]
    ? `images/${recipe.images[0]}`
    : '';

  const detailUrl = `recipe-detail.html?id=${recipe.id}`;

  container.innerHTML = `
    <div class="col-md-6">
      <h2>Recipe of the Day</h2>
      <a href="${detailUrl}"><h3>${recipe.name}</h3></a>
      <ul class="list-unstyled mt-2">
        <li><strong>Season:</strong> ${recipe.season}</li>
        <li><strong>Cuisine:</strong> ${recipe.cuisine}</li>
        <li><strong>Prep Time:</strong> ${recipe.prep_time}</li>
        <li><strong>Difficulty:</strong> ${recipe.difficulty}</li>
      </ul>
      <a href="${detailUrl}" class="btn">View Recipe</a>
    </div>
    <div class="col-md-6">
      <a href="${detailUrl}">
        <img src="${image}" class="img-fluid" alt="${recipe.name}">
      </a>
    </div>`;
}

loadRecipeOfTheDay();

async function loadSeasonalSection() {
  const container = document.getElementById('seasonal-content');
  if (!container) return;

  const month = new Date().getMonth() + 1;
  let season;
  if (month >= 3 && month <= 5)       season = 'Spring';
  else if (month >= 6 && month <= 8)  season = 'Summer';
  else if (month >= 9 && month <= 11) season = 'Autumn';
  else                                 season = 'Winter';

  const descriptions = {
    Spring: "Nano knows just what food goes perfectly with the blossoming of spring, and has plenty of recipes to compliment the fresh fruit and warming weather.",
    Summer: "When the sun shines bright in the sky, some lucky few have been blessed to taste one of the cool refreshing dishes Nano creates, or perhaps see one of Nano's legendary grill outs. With these recipes, you too can try your hand at a dish of such culinary expertise.",
    Autumn: "What could possibly be better than going out to jump in leaf piles with Nano? Obviously nothing, but getting to eat one of Nano's Autumn delicacies afterward is a close second.",
    Winter: "After a cold day of running through the snow, Nano knows just what kind of food he wants to warm him right up. Thankfully for the rest of us, Nano is willing to share this knowledge."
  };

  const pages = {
    Spring: 'spring.html',
    Summer: 'summer.html',
    Autumn: 'autumn.html',
    Winter: 'winter.html'
  };

  let recipes = [];
  try {
    const res = await fetch('recipes.json');
    recipes = await res.json();
  } catch (e) { return; }

  const recipe = recipes.find(r => r.season === season);
  const image = recipe && recipe.images && recipe.images[0] ? `images/${recipe.images[0]}` : '';
  const imgTag = image ? `<a href="${pages[season]}"><img src="${image}" class="img-fluid" alt="${recipe.name}"></a>` : '';

  container.innerHTML = `
    <div class="col-md-6">
      <h2>${season} Recipes</h2>
      <p>${descriptions[season]}</p>
      <a href="${pages[season]}" class="btn">Browse</a>
    </div>
    <div class="col-md-6">${imgTag}</div>`;
}

loadSeasonalSection();
