import { Request, Response } from 'express';
import pool from '../database';
import { Router } from 'express';
import { horariosPController } from '../controllers/horariosPController';
import { validarToken } from '../middleware/auth';

class HorariosPRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/:id', validarToken, horariosPController.list);
        this.router.post('/', validarToken, horariosPController.actualizarExcel);
    }
}
export const horariosPRoutes = new HorariosPRoutes();
export default horariosPRoutes.router;