import { Request, response, Response } from 'express';
import pool from '../database';

class TutoriaController {
    public async create(req: Request, res: Response): Promise<void> {
        const resp = await pool.query(`INSERT INTO Tutoria set hora_tutoria = "${req.body.hora_tutoria}", fecha = "${req.body.fecha}", comentarios = "${req.body.comentarios}", nombre_prof = nombre_prof, nombre_alumno = nombre_alumno`);
        res.json(resp);
    }
    public async list(req: Request, res: Response): Promise<void> {
        const consulta = 'SELECT DISTINCT nombre_prof,id_al,nombre_alumno,hora_tutoria,fecha,comentarios,A.grado,A.grupo,A.materias,A.P1,A.P2,A.P3,A.Ordinario,A.promedio FROM Tutoria JOIN Alumnos A,Profesores P WHERE id_al=A.matricula AND nombre_prof=A.prof_tutor';
        const respuesta = await pool.query(consulta);
        res.json(respuesta);
    }
    public async listOne(req: Request, res: Response): Promise<void> {
        const { id_al } = req.params;
        const consulta = `SELECT DISTINCT nombre_prof,id_al,nombre_alumno,hora_tutoria,comentarios,fecha,A.grado,grupo,materias,P1,P2,P3,Ordinario,promedio FROM Tutoria JOIN Profesores P,Alumnos A WHERE matricula= ${id_al} AND A.nombre=nombre_alumno AND nombre_prof=A.prof_tutor`;
        const respuesta = await pool.query(consulta);
        if (respuesta.length > 0) {
            res.json(respuesta[0]);
            return;
        }
        res.status(404).json({ 'mensaje': 'Tutor no encontrado' });
    }
    public async eliminar(req: Request, res: Response): Promise<void> {
        const { id_al } = req.params;
        const resp = await pool.query(`DELETE FROM Tutoria WHERE id_al = ${id_al}`);
        res.json(resp);
    }
    public async actualizar(req: Request, res: Response): Promise<void> {
        const { id_al } = req.params;
        const resp = await pool.query(`UPDATE Tutoria set hora_tutoria="${req.body.hora_tutoria}", fecha="${req.body.fecha}", comentarios="${req.body.comentarios}" WHERE id_al =${id_al} `);
        res.json(resp);
    }
}
export const tutoriaController = new TutoriaController();