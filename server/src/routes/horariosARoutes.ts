import { Request, Response } from 'express';
import pool from '../database';
import { Router } from 'express';
import { horariosAController } from '../controllers/horariosAController';
import { validarToken } from '../middleware/auth';

class HorariosRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.post('/', validarToken, horariosAController.create);
        this.router.get('/', validarToken, horariosAController.list);
        this.router.get('/:id', validarToken,horariosAController.listOne);
        this.router.delete('/delete/:id', validarToken,horariosAController.eliminar);
        this.router.put('/update/:id', validarToken,horariosAController.actualizar);
    }
}
export const horariosARoutes = new HorariosRoutes();
export default horariosARoutes.router;