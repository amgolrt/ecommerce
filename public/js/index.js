document.addEventListener('DOMContentLoaded', () => {
  //  PRODUTOS - CARROSSEL

  const track = document.querySelector('.product-track')
  const dotsAll = document.querySelectorAll('.product-dots')

  let index = 0
  const total = dotsAll.length

  function updateSlide(newIndex) {
    const cardWidth = document.querySelector('.product-card').offsetWidth
    track.style.transform = `translateX(-${newIndex * cardWidth}px)`

    dotsAll.forEach((dotGroup, i) => {
      const dots = dotGroup.querySelectorAll('.dot')
      dots.forEach((dot, j) => {
        dot.classList.toggle('active', j === newIndex)
      })
    })

    index = newIndex
  }

  dotsAll.forEach(dotGroup => {
    const dots = dotGroup.querySelectorAll('.dot')
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => updateSlide(i))
    })
  })

  //  ENTREVISTAS - CARROSSEL

  const trackInterview = document.querySelector('.interview-track')
  const dotsAllInterview = document.querySelectorAll('.interview-dots')

  let indexinterview = 0
  const totalInterview = dotsAllInterview.length

  function updateSlideInterview(newIndex) {
    const cardWidthInterview =
      document.querySelector('.interview-card').offsetWidth
    track.style.transform = `translateX(-${newIndex * cardWidthInterview}px)`

    dotsAllInterview.forEach((dotGroup, i) => {
      const dots = dotGroup.querySelectorAll('.dot')
      dots.forEach((dot, j) => {
        dot.classList.toggle('active', j === newIndex)
      })
    })

    indexinterview = newIndex
  }

  dotsAllInterview.forEach(dotGroup => {
    const dots = dotGroup.querySelectorAll('.dot')
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => updateSlideInterview(i))
    })
  })

  // Inicia na primeira página
  updateSlideInterview(0)

  //CAROUSEL PRODUCTS

  let allProducts = []

  fetch('/api/products')
    .then(response => response.json())
    .then(products => {
      allProducts = products

      const popularProducts = allProducts.filter(
        product => product.stars >= 4 && product.reviews >= 30
      )

      renderProducts(popularProducts)
      setupCategoryButtons()
      setupPopularCategoryButtons()
    })
    .catch(error => console.log('Erro ao carregar produtos:', error))

  function renderProducts(products) {
    const productContainer = document.getElementById('product-list')
    productContainer.innerHTML = ''

    products.forEach(product => {
      const productElement = document.createElement('div')
      productElement.classList.add('product-item')
      productElement.innerHTML = `
        <img src="${product.img}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <p>${product.stars} stars</p>
        <div class="product-buttons">
          <button class="add-cart-btn">Add to cart <img class="icons-img" src="img/shopping-cart.png" alt="Shopping cart symbol" /> </button>
          <button class="eye-btn"><img class="icons-img" src="img/eye.png" alt="Eye symbol" /></button>
        </div>
      `
      productContainer.appendChild(productElement)
    })
  }

  //POPULAR PRODUCTS

  function setupPopularCategoryButtons() {
    const buttons = document.querySelectorAll('#categoryButtons button')

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const selectedCategory = button
          .getAttribute('data-category')
          .toLowerCase()

        const filtered = allProducts.filter(
          product =>
            product.category.toLowerCase() === selectedCategory &&
            product.stars >= 4 &&
            product.reviews >= 30
        )

        renderProducts(filtered)
      })
    })
  }

  //CAROUSEL CATEGORIES

  function setupCategoryButtons() {
    const buttons = document.querySelectorAll('#categoryButtons button')

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        button.classList.toggle('active')

        const activeButtons = Array.from(buttons).filter(btn =>
          btn.classList.contains('active')
        )

        const filtered = allProducts.filter(product => product.stars >= 4)

        if (activeButtons.length === 0) {
          renderProducts(filtered)
        } else {
          const selectedCategories = activeButtons.map(
            btn => btn.dataset.category
          )
          const filteredByCategory = filtered.filter(product =>
            selectedCategories.includes(product.category.toLowerCase())
          )
          renderProducts(filteredByCategory)
        }
      })
    })

    let currentIndex = 0
    const cardsPerPage = 3

    async function loadCategories() {
      const res = await fetch('/api/categories')
      const categories = await res.json()

      const track = document.getElementById('category-track')
      track.innerHTML = ''

      categories.forEach(category => {
        const card = document.createElement('div')
        card.className = 'category-card'
        card.innerHTML = `
          <h3>${category.name}</h3>
          <p>${category.count} items</p>
        `
        track.appendChild(card)
      })

      updateTrackPosition()
    }

    function updateTrackPosition() {
      const track = document.getElementById('category-track')
      const offset = currentIndex * -100
      track.style.transform = `translateX(${offset}%)`
    }

    document.getElementById('nextBtn').addEventListener('click', () => {
      const totalCards = document.querySelectorAll('.category-card').length
      const maxIndex = Math.ceil(totalCards / cardsPerPage) - 1
      if (currentIndex < maxIndex) {
        currentIndex++
        updateTrackPosition()
      }
    })

    document.getElementById('prevBtn').addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--
        updateTrackPosition()
      }
    })

    loadCategories()
  }
})

//NEWS CAROUSEL

const newsTrack = document.getElementById('newsTrack')
const newsDots = document.querySelectorAll('#newsDots .dot')
let newsIndex = 0

function updateNewsCarousel(newIndex) {
  const wrapperWidth = document.querySelector('.track-wrapper').offsetWidth
  const offset = newIndex * wrapperWidth
  newsTrack.style.transform = `translateX(-${offset}px)`

  newsDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === newIndex)
  })

  newsIndex = newIndex
}

newsDots.forEach((dot, index) => {
  dot.addEventListener('click', () => updateNewsCarousel(index))
})
