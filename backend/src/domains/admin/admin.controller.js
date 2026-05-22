import * as adminServices from './admin.service.js'

export async function getAllOrders(req,res){
    try{
        return res.status(200).json(await adminServices.getAllOrders())
    } catch(err){
        res.status(400).json({ error: err.message})
    }
    
}

export async function getAllUsers(req,res){
    try{
        return res.status(200).json(await adminServices.getAllUsers())
    } catch(err){
        res.status(500).json({error: err.message})
    }
    
}

export async function assignRole(req,res){
    try{
        const user_id = req.params.id
        const role = req.body.role
        return res.status(200).json(await adminServices.assignRole(user_id,role))
    } catch(err){
        res.status(400).json({error: err.message})
    }
    
}