const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');


const merchantsRoute = Router()
const merchants = []
// Create a new merchant
merchantsRoute.post('/', async (req, res) => {
    try {
        const data = req.body;
        const merchant = {
            id: uuidv4(), // Generate a unique merchant ID
            name: data.name,
            email: data.email
        };
        merchants.push(merchant);
        res.status(201).send({
            status: "success",
            message: "Merchant created succesfully",
            data: merchant
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err
        });
    }

});
merchantsRoute.get('/', async (req, res) => {
    try {
        res.status(200).send({
            status: "success",
            message: "merchants fetched succesfully",
            data: merchants
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            status: "error",
            message: "server error",
            data: null
        })
    }
});
module.exports = { merchantsRoute, merchants }
