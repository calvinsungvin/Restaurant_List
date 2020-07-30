const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//showing adding new page
router.get('/new', (req, res) => {
    return res.render('new')
  })
  
  //Create
  router.post('/create', (req, res) => {
    const restaurant = req.body
    return Restaurant.create(restaurant)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
  })
  
  //Show Details
  router.get('/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
      .lean()
      .then((restaurant) => res.render('show', { restaurant }))
      .catch((error) => console.error(error))
  })
  
  //Update (Get)
  router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
      .lean()
      .then((restaurant) => res.render('edit', { restaurant }))
      .catch((error) => console.error(error))
  })
  
  //Update (Post)
  router.put('/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
      .then((restaurant) => {
        restaurant = Object.assign(restaurant, req.body)
        return restaurant.save()   
      })
      .then(() => res.redirect(`/restaurants/${id}`))
      .catch((error) => console.error(error))
  })
  
  //Delete
  router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
      .then((restaurant) => restaurant.remove())
      .then(() => res.redirect('/'))
      .catch((error) => console.error(error))
  })
  


module.exports = router