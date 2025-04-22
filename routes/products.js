const express = require('express')
const router = express.Router()
let products = require('../data/products')

// GET /api/produtos - listar todos
router.get('/', (req, res) => {
  res.json(products)
})

// POST /api/produtos - criar novo
router.post('/', (req, res) => {
  const { name, img, price, stars, color, stock, size, category } = req.body

  // Validação básica
  if (!name || !price || !img || !color || !stock || !size || !category) {
    return res.status(400).json({ message: 'Missing information' })
  }

  const newProduct = {
    id: products.length + 1,
    name,
    img,
    price,
    stars,
    color,
    stock,
    size,
    category
  }

  products.push(newProduct)

  res.status(201).json(newProduct)
})

module.exports = router
