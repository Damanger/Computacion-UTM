import { Request, Response } from 'express';
import pool from '../database';
import { Router } from 'express';
import { tutoradosController } from '../controllers/tutoradosController';
import { validarToken } from '../middleware/auth';

class TutoradosRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.post('/', validarToken, tutoradosController.create);
        this.router.get('/', validarToken, tutoradosController.list);
        this.router.get('/:id', validarToken,tutoradosController.listOne);
        this.router.delete('/delete/:id', validarToken,tutoradosController.eliminar);
        this.router.put('/update/:id', validarToken,tutoradosController.actualizar);
    }
}
export const tutoradosRoutes = new TutoradosRoutes();
export default tutoradosRoutes.router;