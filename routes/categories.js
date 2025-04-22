const express = require('express')
const router = express.Router()

const categories = [
  { name: 'Desktop & laptop', count: 6 },
  { name: 'Tablet', count: 6 },
  { name: 'Console', count: 6 },
  { name: 'Headphones', count: 6 },
  { name: 'Camera', count: 6 },
  { name: 'Speaker', count: 6 }
]

// Rota para retornar as categorias
router.get('/', (req, res) => {
  res.json(categories)
})

module.exports = router
