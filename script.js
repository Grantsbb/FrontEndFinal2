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
