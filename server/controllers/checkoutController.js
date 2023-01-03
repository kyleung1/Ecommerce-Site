const Item = require('../models/itemsModel')
const mongoose = require('mongoose')
const Stripe = require("stripe")
require('dotenv').config({path: '.env'})
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY)

var storeItems = []

const checkout = async (req, res) => {
    // if (storeItems.length == 0) {
    //     test2(req)
    // }
    // else {
    //     console.log(test3(req))
    // }
    try {
        const session = await stripe.checkout.sessions.create({
            
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: await Promise.all(req.body.items?.map(async item => {
                const storeItem = await Item.findById(item.id);
                // console.log(storeItem)
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.price*100 //tempPrice * 100
                    },
                    quantity: item.quantity
                }
            })),
            success_url: "http://localhost:" + process.env.PORTCLIENT + "/success",
            cancel_url: "http://localhost:" + process.env.PORTCLIENT + "/fail"
        })
        res.json({ url: session.url})
    } catch (e) {
        res.status(500).json({error: e.message})
    }
    storeItems = []
}

const test1 = async (req, res) => {
    res.status(200).json({"url": "hi"})
}

const test2 = async (req, res) => {
    //console.log(req.body)
    
    req.body.items?.map(item => {
        Item.findById(item.id, (err, docs) => {    
            if (err) {
                console.log(err);
            }
            else {
                storeItems.push(docs)
                // console.log(storeItems)
            }
    })
    })
    return storeItems
    
}

const test3 = async (req, res) => {
    
        const session = await stripe.checkout.sessions.create({
            
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items?.map(item => {
                const storeItem = storeItems.find(x => x._id === item.id)
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.price*100 //tempPrice * 100
                    },
                    quantity: item.quantity
                    }
                // Item.findById(item.id, function (err, docs) {
                //     if (err){
                //         console.log(err);
                //     }
                //     else{
                //         //console.log("Result : ", docs);
                //         return {
                //             price_data: {
                //                 currency: 'usd',
                //                 product_data: {
                //                     name: docs.name
                //                 },
                //                 unit_amount: docs.price*100
                //             },
                //             quantity: item.quantity
                //         }
                //     }
                // });  

            }),

            success_url: "http://localhost:" + process.env.PORT + "/success",
            cancel_url: "http://localhost:" + process.env.PORT + "/fail"
        })
        res.json({ url: session.url})
    
}

const test4 = async (req, res) => {
    Item.findById(req.id, (err, docs) => {    
        if (err) {
            console.log(err);
        }
        else {
            res.json(docs)
        }
})
}

module.exports = {
    checkout,
    test1
}