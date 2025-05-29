import { Request, Response } from 'express';
import { userService } from '../services/user.service';

export const UserController = {
    async create(req: Request, res: Response) {
        try {
            const id = await userService.create(req.body)
            res.status(200).json({id}) 
        } catch (error: any) {
            res.status(401).json({error: error.message})
        }
    },
    async update(req: Request, res: Response) {
        try {
            await userService.update(req.params.id, req.body)
            res.status(200).json({ message: 'Usuario Actualizaado Correctamente' }) 
        } catch (error: any) {
            res.status(401).json({error: error.message})
        }
    },
    async delete(req: Request, res: Response) {
        try {
            await userService.delete(req.params.id)
            res.status(200).json({ message: 'Usuario Borrado Correctamente' }) 
        } catch (error: any) {
            res.status(401).json({error: error.message})
        }
    },
    async getAll(req: Request, res: Response) {
        try {
            const users = await userService.getAll()
            res.status(200).json({ users }) 
        } catch (error: any) {
            res.status(401).json({error: error.message})
        }
    },
    async getById(req: Request, res: Response) {
        try {
            const user = await userService.getById(req.params.id)
            res.status(200).json({ user }) 
        } catch (error: any) {
            res.status(401).json({error: error.message})
        }
    },
    async getByUsername(req: Request, res: Response) {
        try {
            const user = await userService.getByUsername(req.params.username)
            res.status(200).json({ user }) 
        } catch (error: any) {
            res.status(401).json({error: error.message})
        }
    }
}