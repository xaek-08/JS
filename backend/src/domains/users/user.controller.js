import * as userService from "./user.service.js";

export async function register(req, res) {
    try {
        const user = await userService.register_user(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export async function login(req,res){
    try {
        const result = await userService.login_user(req.body);
        res.json(result);
    }
    catch (error){
        res.status(401).json({error: error.message});
    }
}