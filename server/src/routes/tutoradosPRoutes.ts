import { Request, Response } from 'express';
import pool from '../database';
import { Router } from 'express';
import { tutoradosPController } from '../controllers/tutoradosPController';
import { validarToken } from '../middleware/auth';

class TutoradosPRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/:id', validarToken, tutoradosPController.list);
    }
}
export const tutoradosPRoutes = new TutoradosPRoutes();
export default tutoradosPRoutes.router;