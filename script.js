document.addEventListener('DOMContentLoaded', function () {
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