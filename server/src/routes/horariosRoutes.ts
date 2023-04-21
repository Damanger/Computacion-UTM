import { Request, Response } from 'express';
import pool from '../database';
import { Router } from 'express';
import { horariosController } from '../controllers/horariosController';
import { validarToken } from '../middleware/auth';

class HorariosRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.post('/', validarToken, horariosController.create);
        this.router.get('/', validarToken, horariosController.list);
        this.router.get('/:id', validarToken,horariosController.listOne);
        this.router.delete('/delete/:id', validarToken,horariosController.eliminar);
        this.router.put('/update/:id', validarToken,horariosController.actualizar);
    }
}
export const horariosRoutes = new HorariosRoutes();
export default horariosRoutes.router;