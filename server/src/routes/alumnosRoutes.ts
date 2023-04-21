import { Request, Response } from 'express';
import pool from '../database';
import { Router } from 'express';
import { alumnosController } from '../controllers/alumnosController';
import { validarToken } from '../middleware/auth';


class alumnosRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/', validarToken,alumnosController.list);
        this.router.get('/:matricula', validarToken,alumnosController.listOne);
        this.router.post('/', validarToken, alumnosController.createExcel);
        this.router.post('/', validarToken,alumnosController.create);
        this.router.delete('/delete/:matricula', validarToken,alumnosController.eliminar);
        this.router.put('/update/:matricula', validarToken,alumnosController.actualizar);
    }
}
export const AlumnosRoutes = new alumnosRoutes();
export default AlumnosRoutes.router;