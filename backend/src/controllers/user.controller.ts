import { Request, Response } from 'express';
import { userService } from '../services/user.service.js';

export const UserController = {
    async create(req: Request & {
        body: {
            nombre: string
            apaterno: string
            amaterno: string
            direccion: string
            telefono: string
            ciudad: string
            estado: string
            usuario: string
            password: string
            likes: any[]
        }[]
    }, res: Response) {
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
    },
    async deleteFromLikesProductUser(req: Request & {
      body: {
        productId: number,
        id: string
      }
    },
      res: Response): Promise<void> {
        try {
          const { id, productId } = req.body;
          userService.deleteFromLikesProductUser(productId, id);
          res.status(200).json({status: true});
        } catch (error:any) {
          res.status(401).json({error: error.message});
        }
    },
    async addToLikesProductUser(req: Request & {
      body: {
        productId: number,
        id: string
      }
    }, 
      res: Response): Promise<void> {
        try {
          const { productId, id } = req.body;
          userService.addToLikesProductUser(productId, id)
          res.status(200).json({status: true});
        } catch (error:any) {
          res.status(401).json({error: error.message});
        }
    },
    async getProductsFromUser(req: Request & {
      body: {
        useList: []
      }
    }
     ,res: Response) {
      try {
        const { userList } = req.body
        const userLikeProductList = await userService.getProductsFromUser(userList);
        res.status(200).json({products: userLikeProductList});
      } catch (error:any) {
        res.status(401).json({error: error.message});
      }
    },
    async addCartProductUser(req: Request & {
      body: {
        productList: [],
        id: string
      }
    }
     ,res: Response) {
      try {
        const { productList, id } = req.body
        await userService.addCartProductUser(productList, id);
        res.status(200).json({status: true});
      } catch (error:any) {
        res.status(401).json({error: error.message});
      }
    },
    async deleteFromCartUser(req: Request & {
      body: {
        productList: [],
        id: string
      }
    }
     ,res: Response) {
      try {
        const { productList, id } = req.body
        await userService.deleteFromCartUser(productList, id);
        res.status(200).json({status: true});
      } catch (error:any) {
        res.status(401).json({error: error.message});
      }
    },
    async checkoutCartUser(req: Request & {
      body: {
        id: string
      }
    }
     ,res: Response) {
      try {
        const { id } = req.body
        await userService.checkoutCartUser(id);
        res.status(200).json({status: true});
      } catch (error:any) {
        res.status(401).json({error: error.message});
      }
    }
}