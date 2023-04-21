import { Request, Response } from 'express';
import pool from '../database';
import { Router } from 'express';
import { tutoriaController } from '../controllers/tutoriaController';
import { validarToken } from '../middleware/auth';

class TutoriaRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.post('/', validarToken, tutoriaController.create);
        this.router.get('/', validarToken, tutoriaController.list);
        this.router.get('/:id_al', validarToken,tutoriaController.listOne);
        this.router.delete('/delete/:id_al', validarToken,tutoriaController.eliminar);
        this.router.put('/update/:id_al', validarToken,tutoriaController.actualizar);
    }
}
export const tutoriaRoutes = new TutoriaRoutes();
export default tutoriaRoutes.router;