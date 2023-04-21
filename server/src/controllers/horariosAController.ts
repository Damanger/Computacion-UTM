import { Request, response, Response } from 'express';
import pool from '../database';

class HorariosAController {
    public async create(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO Horario_Alumno set ?",[req.body]);
        res.json(resp);
    }
    public async list(req: Request, res: Response): Promise<void> {
        const consulta = 'SELECT matricula,nombre,grado,grupo,materia,hora,salon FROM Horario_Alumno JOIN Alumnos WHERE matricula=id_alumno';
        const respuesta = await pool.query(consulta);
        res.json(respuesta);
    }
    public async listOne(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const consulta = `SELECT id_alumno,nombre,materia,hora,salon,grado,grupo FROM Horario_Alumno JOIN Alumnos WHERE matricula = ${id} AND id_alumno = ${id}`;
        const respuesta = await pool.query(consulta);
        if (respuesta.length > 0) {
            res.json(respuesta[0]);
            return;
        }
        res.status(404).json({ 'mensaje': 'Alumno no encontrado' });
    }
    public async eliminar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM Horario_Alumno WHERE id_alumno = ${id}`);
        res.json(resp);
    }
    public async actualizar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query("UPDATE Horario_Alumno set ? WHERE id_alumno = ?", [req.body, id]);
        res.json(resp);
    }
}
export const horariosAController = new HorariosAController();