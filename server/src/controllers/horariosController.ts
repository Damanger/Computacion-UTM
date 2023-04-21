import { Request, response, Response } from 'express';
import pool from '../database';

class HorariosController {
    public async create(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO Horario_Profesor set ?",[req.body]);
        res.json(resp);
    }
    public async list(req: Request, res: Response): Promise<void> {
        const consulta = 'SELECT id,nombre,materias_impartidas,grado_,num_salon,hora_ FROM Horario_Profesor JOIN Profesores WHERE id=id_profesor AND nombre=nombre_profesor';
        const respuesta = await pool.query(consulta);
        res.json(respuesta);
    }
    public async listOne(req: Request, res: Response): Promise<void> {
        const { id} = req.params;
        const consulta = `SELECT id_profesor,nombre_profesor,grado_,num_salon,hora_,materias_impartidas FROM Horario_Profesor JOIN Profesores WHERE id = ${id} AND id_profesor = ${id}`;
        const respuesta = await pool.query(consulta);
        if (respuesta.length > 0) {
            res.json(respuesta[0]);
            return;
        }
        res.status(404).json({ 'mensaje': 'Profesor no encontrado' });
    }
    public async eliminar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM Horario_Profesor WHERE id_profesor = ${id}`);
        res.json(resp);
    }
    public async actualizar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query("UPDATE Horario_Profesor set ? WHERE id_profesor = ?", [req.body, id]);
        res.json(resp);
    }
}
export const horariosController = new HorariosController();