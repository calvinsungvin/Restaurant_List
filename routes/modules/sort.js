const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/nameasc', (req, res) => {
    Restaurant.find()
        .lean()
        .sort({ name: 'asc' })
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.log(error))
})

router.get('/namedesc', (req, res) => {
    Restaurant.find()
        .lean()
        .sort({ name: 'desc' })
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.log(error))
})

router.get('/category', (req, res) => {
    Restaurant.find()
        .lean()
        .sort({ category: 'asc' })
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.log(error))
})

router.get('/location', (req, res) => {
    console.log(req.params)
    console.log(req.params.key)
    console.log(req.params.value)
    Restaurant.find()
        .lean()
        .sort({ rating: 'asc' })
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.log(error))
})

router.get('/restaurants/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .lean()
        .then((restaurant) => res.render('show', { restaurant }))
        .catch(error => console.log(error))
})

router.get('/restaurants/:id/edit', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .lean()
        .then((restaurant) => res.render('edit', { restaurant }))
        .catch(error => console.log(error))
})

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

router.post('/', (req, res) => {
    const restaurant = req.body
    return Restaurant.create(restaurant)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

module.exports = router
