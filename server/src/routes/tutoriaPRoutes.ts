import { Request, Response } from 'express';
import pool from '../database';
import { Router } from 'express';
import { tutoriaPController } from '../controllers/tutoriaPController';
import { validarToken } from '../middleware/auth';

class TutoriaPRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/:id', validarToken, tutoriaPController.listOne);
        this.router.get('/:id', validarToken, tutoriaPController.list);
    }
}
export const tutoriaPRoutes = new TutoriaPRoutes();
export default tutoriaPRoutes.router;