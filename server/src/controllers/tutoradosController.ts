import { Request, response, Response } from 'express';
import pool from '../database';

class TutoradosController {
    public async create(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO Tutorados set ?",[req.body]);
        res.json(resp);
    }
    public async list(req: Request, res: Response): Promise<void> {
        const consulta = 'SELECT tutor,matricula,nombre,grado,grupo,materias,P1,P2,P3,Ordinario,promedio FROM Tutorados JOIN Alumnos WHERE id_alu=matricula AND nombre_alumno=nombre';
        const respuesta = await pool.query(consulta);
        res.json(respuesta);
    }
    public async listOne(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const consulta = 'SELECT tutor,matricula,nombre,grado,grupo,materias,P1,P2,P3,Ordinario,promedio FROM Tutorados JOIN Alumnos WHERE id_alu=matricula AND matricula = ' + id;
        const respuesta = await pool.query(consulta);
        if (respuesta.length > 0) {
            res.json(respuesta[0]);
            return;
        }
        res.status(404).json({ 'mensaje': 'Tutorado no encontrado' });
    }
    public async eliminar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM Tutorados WHERE id_alu = ${id}`);
        res.json(resp);
    }
    public async actualizar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query("UPDATE Tutorados set ? WHERE id_alu = ?", [req.body, id]);
        res.json(resp);
    }
}
export const tutoradosController = new TutoradosController();