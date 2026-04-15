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