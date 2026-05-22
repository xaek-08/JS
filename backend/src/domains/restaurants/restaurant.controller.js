import * as RestaurantService from '../restaurants/restaurant.service.js'

export async function createRestaurant(req,res){
    try{
        const data = req.body
        const restaurant = await RestaurantService.createRestaurant(data)
        res.status(201).json(restaurant) 
    }
    catch(error){
        res.status(400).json({error: error.message})
    }

}

export async function findAllRestaurants(req,res){
    try{
        const restaurants = await RestaurantService.findAllRestaurants()
        res.json(restaurants)
    }
    catch(error) {
        res.status(500).json({error: error.message})
    }
}

export async function findRestaurantById(req,res){
    try{
        const restaurant_id = req.params.id
        const restaurant = await RestaurantService.findRestaurantById(restaurant_id)
        res.status(200).json(restaurant)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

export async function updateRestaurant(req, res) {
  try {
    const restaurant = await RestaurantService.updateRestaurant(req.params.id, req.body)
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' })
    res.json(restaurant)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export async function deleteRestaurant(req,res){
    try{
        const restaurant_id = req.params.id
        await RestaurantService.deleteRestaurant(restaurant_id)
        res.status(204).end()
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

// ------------Branch----------------
export async function createBranch(req,res){
    try{
        const data = req.body
        const restaurant_id = req.params.restaurantId 
        const branch = await RestaurantService.createBranch(restaurant_id,data)
        res.status(201).json(branch)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

export async function getBranchesByRestaurant(req,res){
    try{
        const restaurant_id = req.params.id
        const branch = await RestaurantService.getBranchesByRestaurant(restaurant_id)
        res.status(200).json(branch)
    } catch(error){
        res.status(400).json({error:error.message})
    }
}

// -----------------Master Menu------------------

export async function createMenuItem(req, res) {
  try {
    const menuItem = await RestaurantService.createMenuItem(req.params.restaurantId, req.body)
    res.status(201).json(menuItem)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export async function getMenuItemsByRestaurant(req, res) {
  try {
    const menuItems = await RestaurantService.getMenuItemsByRestaurant(req.params.restaurantId)
    res.json(menuItems)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// --------------------------Branch Menu----------------------------

export async function assignMenuItemToBranch(req, res) {
  try {
    const { menuItemId, price } = req.body
    const branchMenuItem = await RestaurantService.assignMenuItemToBranch(
      req.params.branchId,
      menuItemId,
      price
    )
    res.status(201).json(branchMenuItem)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export async function getBranchMenu(req, res) {
  try {
    const menu = await RestaurantService.getBranchMenu(req.params.branchId)
    res.json(menu)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function updateBranchMenuItem(req, res) {
  try {
    const updated = await RestaurantService.updateBranchMenuItem(
      req.params.branchId,
      req.params.menuItemId,
      req.body
    )
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export async function removeBranchMenuItem(req, res) {
  try {
    await RestaurantService.removeBranchMenuItem(
      req.params.branchId,
      req.params.menuItemId
    )
    res.status(204).end()
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
