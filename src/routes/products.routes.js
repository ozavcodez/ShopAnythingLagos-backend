
const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const {merchants} = require('./merchants.routes')



const router = Router()
const products = []

router.get("/:merchantId", (req, res) => {
    const merchantProducts = products.filter(product => product.merchantId === req.params.merchantId);
    res.send(merchantProducts);
})

router.post('/', async (req, res) => {
    console.log(merchants);
    try {
        const data = req.body;
        console.log(data)
        const isSkuIdUnique = products.every(product => product.skuId !== data.skuId);
        const ismerchantId = merchants.every(merchant => merchant.id === data.merchantId )

        if (!isSkuIdUnique) {
            return res.status(400).send(
                {
                    status: 'Failed',
                    message: 'SKU ID must be unique'
                });
        }
        if (!ismerchantId) {
            return res.status(400).send(
                {
                    status: 'Failed',
                    message: 'not authorized'
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
router.put('/:skuId', async (req, res) => {
    try {
        const skuId = req.params.skuId;
        const data = req.body;

        const index = products.findIndex(product => product.skuId === skuId);
        if (index !== -1) {
            products[index].name = data.name || products[index].name;
            products[index].description = data.description || products[index].description;
            products[index].price = data.price || products[index].price;
            res.json({ status: "success", message: 'Product updated successfully' });
        } else {
            res.status(404).send({ status: "error", message: 'Products not found' });

        }
    } catch (err) {
        console.log(err)
        res.status(404).send({
            status: "error",
            message: "Product not found",
            data: null
        })
    }

});

// Delete an existing product
router.delete('/:skuId', (req, res) => {
    const skuId = req.params.skuId;
    const index = products.findIndex(product => product.skuId === skuId);

    if (index !== -1) {
        products.splice(index, 1);
        res.json({ message: 'Product deleted successfully' });
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

module.exports = router
