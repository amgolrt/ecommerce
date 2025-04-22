let allProducts = []

fetch('/api/products')
  .then(response => response.json())
  .then(products => {
    allProducts = products // Salva os produtos
    updateCategoryCounts() // Atualiza o contador
    renderProducts(allProducts) // Exibe todos inicialmente
  })
  .catch(error => console.log('Erro ao carregar produtos:', error))

// Função para renderizar produtos
function renderProducts(products) {
  const productContainer = document.getElementById('product-list')
  productContainer.innerHTML = '' // Limpa os antigos

  products.forEach(product => {
    const productElement = document.createElement('div')
    productElement.classList.add('product-item')
    productElement.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price}</p>
      <p>${product.stars} stars</p>
    `
    productContainer.appendChild(productElement)
  })
}

// Atualiza o contador ao lado de cada categoria
function updateCategoryCounts() {
  const categoryCounts = {}
  const checkedValues = Array.from(
    document.querySelectorAll('#categoryFilter input[type="checkbox"]:checked')
  ).map(cb => cb.value)

  allProducts.forEach(product => {
    const category = product.category.toLowerCase()
    categoryCounts[category] = (categoryCounts[category] || 0) + 1
  })

  document
    .querySelectorAll('#categoryFilter input[type="checkbox"]')
    .forEach(checkbox => {
      const category = checkbox.value.toLowerCase()
      const label = checkbox.parentElement
      const count = categoryCounts[category] || 0

      label.innerHTML = `
        <input type="checkbox" value="${category}" ${
        checkedValues.includes(category) ? 'checked' : ''
      } />
        <span class="checkmark"></span> 
        ${capitalize(category)} <span class="count">(${count})</span>
      `
    })

  // Adiciona os eventos de novo, já que reescreveu o HTML
  addCheckboxListeners()
}

// Adiciona os eventos aos checkboxes
function addCheckboxListeners() {
  const categoryCheckboxes = document.querySelectorAll(
    '#categoryFilter input[type="checkbox"]'
  )
  const availabilityCheckboxes = document.querySelectorAll(
    '#avaliabilityFilter input[type="checkbox"]'
  )

  function applyFilters() {
    const selectedCategories = Array.from(
      document.querySelectorAll(
        '#categoryFilter input[type="checkbox"]:checked'
      )
    ).map(cb => cb.value)

    const selectedAvailability = Array.from(
      document.querySelectorAll(
        '#avaliabilityFilter input[type="checkbox"]:checked'
      )
    ).map(cb => cb.value)

    let filtered = allProducts

    // Filtro por categoria
    if (
      !(selectedCategories.includes('all') || selectedCategories.length === 0)
    ) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category.toLowerCase())
      )
    }

    // Filtro por disponibilidade
    if (selectedAvailability.length > 0) {
      filtered = filtered.filter(product => {
        const inStock = product.stock > 0
        return (
          (selectedAvailability.includes('instock') && inStock) ||
          (selectedAvailability.includes('outofstock') && !inStock)
        )
      })
    }

    renderProducts(filtered)
  }

  categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      if (checkbox.value === 'all') {
        categoryCheckboxes.forEach(cb => {
          if (cb.value !== 'all') cb.checked = false
        })
        applyFilters()
      } else {
        const allCheckbox = document.querySelector(
          '#categoryFilter input[value="all"]'
        )
        allCheckbox.checked = false

        applyFilters()
      }
    })
  })

  availabilityCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters)
  })
}

// Capitaliza o nome da categoria
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
