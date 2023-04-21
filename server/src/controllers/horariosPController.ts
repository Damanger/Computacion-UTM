import { Request, response, Response } from 'express';
import pool from '../database';

class HorariosPController {
    public async list(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const consulta = `SELECT * FROM Profesores WHERE id = ${id}`;
        const respuesta = await pool.query(consulta);
        if (respuesta.length > 0) {
            res.json(respuesta[0]);
            return;
        }
        res.status(404).json({ 'mensaje': 'Profesor no encontrado' });
    }

    public async actualizarExcel(req: Request, res: Response): Promise<void> {
        let horariosp=req.body;
        var resp;
        for(var i=0; i<horariosp.length; i++){
            resp = await pool.query(`UPDATE Horario_Profesor set ? WHERE id=${horariosp[i].id}`,[horariosp[i]]);
        }
        res.json(resp);
    }

}
export const horariosPController = new HorariosPController();