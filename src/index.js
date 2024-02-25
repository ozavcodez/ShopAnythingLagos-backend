const express = require('express');
const productsRoute = require('./routes/products.routes')
const merchantsRoute = require('./routes/merchants.routes')
const app = express()

const PORT = 3005;


app.use(express.json())
app.use(express.urlencoded());

app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`)
     next()
 })

 app.use('/products', productsRoute);
app.use('/merchants', merchantsRoute)

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}!`));
