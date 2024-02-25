
const {Router} = require('express')


const router =  Router()
const products = []

router.get("/:merchantId", (req, res) => {
    const merchantProducts = products.filter(product => product.merchantId === req.params.merchantId);
    res.send(merchantProducts);
})

router.post('/:merchantId',  async (req, res) => {
    
    try {
        const data = req.body;
        const merchantId = req.params.merchantId
        console.log(data)
        const isSkuIdUnique = products.every(product => product.skuId !== data.skuId);

    if (!isSkuIdUnique) {
        return res.status(400).json({ error: 'SKU ID must be unique' });
    }
        const product =  {
            merchantId: merchantId,
            skuId: data.skuId,
            name: data.name,
            description: data.description,
            price: data.price,
            dateAdded: new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
        };
        products.push(product);
        res.status(201).send({
            status : "success",
            message: "Product created succesfully",
            data: product
        });
    }  catch (err) {
        res.status(500).json({
          status: 'Failed',
          message: err
        });
      }
    // res.send(201);
    
    
});
// Edit an existing product
router.put('/:skuId', async (req, res) => {
    try{
        const skuId = req.params.skuId;
        const data = req.body;

        const index = products.findIndex(product => product.skuId === skuId);
        if (index !== -1) {
            products[index].name = data.name || products[index].name;
            products[index].description = data.description || products[index].description;
            products[index].price = data.price || products[index].price;
            res.json({ status : "success", message: 'Product updated successfully' });
        } else {
            res.status(404).send({ status : "error", message: 'Products not found' });
        
        }
    }catch(err) {
        console.log(err)
        res.status(404).send({
            status : "error",
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
