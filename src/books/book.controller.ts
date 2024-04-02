import { Request, Response } from 'express'
import { BookService } from './book.service'

class BookController {
    
    async findAll(req: Request, res: Response){
        try{
            const book = await BookService.findAll()
            return res.json(book)
        }catch(error){
            return error
        }
    }

    async findById(req: Request, res: Response){
        try{
            const book = await BookService.findById(req.params.id)
            return res.json(book)
        }catch(error){
            return error
        }
    }

    async create(req: Request, res: Response){
        try {
            const book = await BookService.create(req.body)
            return res.json(book)
        } catch (error) {
            return error
        }
    }

    async update(req: Request, res: Response){
        try{
            const book = await BookService.update(req.params.id, req.body)
            return res.json(book)
        }catch (error){
            return error
        }
    }

    async delete(req: Request, res: Response){
        try{
            const book = await BookService.delete(req.params.id)
            return res.json(book)
        }catch (error){
            return error
        }
    }
    
}

export default new BookController()