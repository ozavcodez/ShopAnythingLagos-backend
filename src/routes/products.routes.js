
const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const {merchants} = require('./merchants.routes')



const router = Router()
const products = []

router.get("/", (req, res) => {
    const ismerchantId = merchants.every(merchant => merchant.id === req.query.merchantId )
    if (!ismerchantId) {
        return res.status(401).send(
            {
                status: 'Failed',
                message: 'not authorized'
            });
    }
    const merchantProducts = products.filter(product => product.merchantId === req.query.merchantId);
    res.status(200).send({
        status: "success",
        message: "Products fetched succesfully",
        data: merchantProducts
    });
})

router.post('/', async (req, res) => {
    console.log(merchants);
    try {
        const data = req.body;
        console.log(data)
        const ismerchantId = merchants.every(merchant => merchant.id === data.merchantId );

        if (!ismerchantId) {
            return res.status(401).send(
                {
                    status: 'Failed',
                    message: 'not authorized'
                });
        }

        const isSkuIdUnique = products.every(product => product.skuId !== data.skuId);
        if (!isSkuIdUnique) {
            return res.status(400).send(
                {
                    status: 'Failed',
                    message: 'SKU ID must be unique'
                });
        }
        
        const product = {
            merchantId: data.merchantId,
            skuId: data.skuId,
            name: data.name,
            description: data.description,
            price: data.price,
            id: uuidv4(),
            dateAdded: new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
        };
        products.push(product);
        res.status(201).send({
            status: "success",
            message: "Product created succesfully",
            data: product
        });
    } catch (err) {
        res.status(500).send({
            status: 'Failed',
            message: err
        });
    }
    // res.send(201);


});
// Edit an existing product
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products[index].name = data.name || products[index].name;
            products[index].description = data.description || products[index].description;
            products[index].price = data.price || products[index].price;
            res.json({ status: "Success", message: 'Product updated successfully' });
        } else {
            res.status(404).send({ status: "Failed", message: 'Product not found' });

        }
    } catch (err) {
        console.log(err)
        res.status(500).send({
            status: "Failed",
            message: "server error",
            data: null
        })
    }

});

// Delete an existing product
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = products.findIndex(product => product.id === id);

    if (index !== -1) {
        products.splice(index, 1);
        res.status(200).send({status:"Success", message: 'Product deleted successfully' });
    } else {
        res.status(404).send({status:"Failed", message: 'Product not found' });
    }
});

module.exports = router
