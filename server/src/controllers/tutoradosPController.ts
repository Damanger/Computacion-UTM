import { Request, response, Response } from 'express';
import pool from '../database';

class TutoradosPController {

    public async list(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        const consulta = `SELECT A.matricula, A.nombre, A.grado, A.grupo, A.materias FROM Alumnos A INNER JOIN Profesores P ON P.nombre = A.prof_tutor WHERE P.id = ${id}`;
        const respuesta = await pool.query(consulta);
        res.json(respuesta);
    }
}
export const tutoradosPController = new TutoradosPController();