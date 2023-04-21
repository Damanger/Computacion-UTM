import { Request, Response } from 'express';
import pool from '../database';
import { Router } from 'express';
import { profesorController } from '../controllers/profesorController';
import { validarToken } from '../middleware/auth';

class profesorsRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.post('/verificarProfesor', validarToken,profesorController.verificarProfesor);
        this.router.post('/', validarToken, profesorController.createExcel);
        this.router.post('/', validarToken, profesorController.create);
        this.router.get('/', validarToken, profesorController.list);
        this.router.get('/:id', validarToken,profesorController.listOne);
        this.router.delete('/delete/:id', validarToken,profesorController.eliminar);
        this.router.put('/update/:id', validarToken,profesorController.actualizar);
    }
}
export const profesorRoutes = new profesorsRoutes();
export default profesorRoutes.router;