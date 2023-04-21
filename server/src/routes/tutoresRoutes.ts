import { Request, Response } from 'express';
import pool from '../database';
import { Router } from 'express';
import { tutoresController } from '../controllers/tutoresController';
import { validarToken } from '../middleware/auth';

class TutoresRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.post('/', validarToken, tutoresController.create);
        this.router.get('/', validarToken, tutoresController.list);
        this.router.get('/:id', validarToken,tutoresController.listOne);
        this.router.delete('/delete/:id', validarToken,tutoresController.eliminar);
        this.router.put('/update/:id', validarToken,tutoresController.actualizar);
    }
}
export const tutoresRoutes = new TutoresRoutes();
export default tutoresRoutes.router;