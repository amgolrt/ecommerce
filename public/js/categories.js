document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/categories')
    .then(res => res.json())
    .then(categories => {
      const track = document.getElementById('category-track')
      track.innerHTML = ''

      categories.forEach(cat => {
        const card = document.createElement('div')
        card.classList.add('category-card')
        card.innerHTML = `
          <h3>${cat.name}</h3>
          <p>${cat.count} items</p>
        `
        card.addEventListener('click', () => {
          window.location.href = `/products?category=${encodeURIComponent(
            cat.name
          )}`
        })
        track.appendChild(card)
      })
    })
    .catch(err => console.error('Erro ao carregar categorias:', err))
})
