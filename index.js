const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

const productRoutes = require('./routes/products')
const categoriesRoutes = require('./routes/categories')

app.use('/api/products', productRoutes)
app.use('/api/categories', categoriesRoutes)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
