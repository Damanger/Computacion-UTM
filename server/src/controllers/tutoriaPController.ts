import { Request, response, Response } from 'express';
import pool from '../database';

class TutoriaPController {
    public async listOne(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        
        const consulta = `SELECT T.id_al, T.nombre_alumno, T.hora_tutoria, T.fecha, T.comentarios, A.grado, A.grupo, A.materias, A.P1, A.P2, A.P3, A.Ordinario, A.promedio FROM Tutoria T INNER JOIN Alumnos A ON T.id_al = A.matricula INNER JOIN Profesores P ON P.nombre = T.nombre_prof WHERE P.id = ${id}`;
        const respuesta = await pool.query(consulta);
        res.json(respuesta);
    }
    public async list(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        
        const consulta = `SELECT T.id_al, T.nombre_alumno, T.hora_tutoria, T.fecha, T.comentarios, A.grado, A.grupo, A.materias, A.P1, A.P2, A.P3, A.Ordinario, A.promedio 
        FROM Tutoria T 
        INNER JOIN Alumnos A ON T.id_al = A.matricula 
        INNER JOIN Profesores P ON P.nombre = T.nombre_prof 
        WHERE P.id = ${id} AND A.prof_tutor =  ${req.body.nombre_prof}`;
        const respuesta = await pool.query(consulta);
        if (respuesta.length > 0) {
            res.json(respuesta[0]);
            return;
        }
        res.status(404).json({ 'mensaje': 'Profesor no encontrado' });
    }
}
export const tutoriaPController = new TutoriaPController();