const {Router} = require('express');
const { v4: uuidv4 } = require('uuid');


const router =  Router()
const  merchants = []
// Create a new merchant
router.post('/', async (req, res) => {
    try{
        const data = req.body;
        const merchant = {
            merchantId: uuidv4(), // Generate a unique merchant ID
            name: data.name,
            email: data.email
        };
        merchants.push(merchant);
        res.status(201).send({
            status : "success",
            message: "Merchant created succesfully",
            data: merchant
        });
    }catch (err) {
        res.status(500).json({
          status: 'Failed',
          message: err
        });
    }
    
});

module.exports = router