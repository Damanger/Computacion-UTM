import { Request, response, Response } from 'express';
import pool from '../database';

class TutoresController {
    public async create(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO Tutores set ?",[req.body]);
        res.json(resp);
    }
    public async list(req: Request, res: Response): Promise<void> {
        const consulta = 'SELECT id_prof,nombre_profesor,horario_asesoria FROM Tutores JOIN Profesores WHERE id_prof=id AND nombre=nombre_profesor';
        const respuesta = await pool.query(consulta);
        res.json(respuesta);
    }
    public async listOne(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const consulta = `SELECT id_prof,nombre_profesor,horario_asesoria FROM Tutores JOIN Profesores WHERE id= ${id} AND id_prof= ${id} AND nombre=nombre_profesor`;
        const respuesta = await pool.query(consulta);
        if (respuesta.length > 0) {
            res.json(respuesta[0]);
            return;
        }
        res.status(404).json({ 'mensaje': 'Tutor no encontrado' });
    }
    public async eliminar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM Tutores WHERE id_prof = ${id}`);
        res.json(resp);
    }
    public async actualizar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query("UPDATE Tutores set ? WHERE id_prof = ?", [req.body, id]);
        res.json(resp);
    }
}
export const tutoresController = new TutoresController();