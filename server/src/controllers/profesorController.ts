import { Request, response, Response } from 'express';
import pool from '../database';
import bcrypt from 'bcryptjs';

class ProfesorController {
    public async verificarProfesor(req: Request, res: Response): Promise<void> {

        const passProfe = `SELECT password FROM Profesores WHERE correo="${req.body.correo}"`;
        const respuesta = await pool.query(passProfe);
        const hashPassword = respuesta[0].password;
        let prueba = await bcrypt.compare(req.body.password, hashPassword);
        req.body.password = hashPassword;

        if (prueba == true) {
            const consultaProfe = `SELECT * FROM Profesores WHERE correo="${req.body.correo}"`;
            const consulta = await pool.query(consultaProfe);
            res.json(consulta);
        } else {
            const consulta = "";
            res.json(consulta);
        }
    }

    public async list(req: Request, res: Response): Promise<void> {
        const consulta = 'SELECT * FROM Profesores';
        const respuesta = await pool.query(consulta);
        res.json(respuesta);
    }

    public async create(req: Request, res: Response): Promise<void> {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        const resp = await pool.query("INSERT INTO Profesores set ?", [req.body]);
        res.json(resp);
    }

    public async createExcel(req: Request, res: Response): Promise<void> {
        let profesores = req.body;
        var resp;
        const salt = await bcrypt.genSalt(10);
        for (var i = 0; i < profesores.length; i++) {
            profesores[i].password = await bcrypt.hash(profesores[i].password, salt);
            resp = await pool.query("INSERT INTO Profesores set ?", [profesores[i]]);
        }
        res.json(resp);
    }

    public async listOne(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const consulta = 'SELECT * FROM Profesores WHERE id = ' + id;
        const respuesta = await pool.query(consulta);
        if (respuesta.length > 0) {
            res.json(respuesta[0]);
            return;
        }
        res.status(404).json({ 'mensaje': 'Profesor no encontrado' });
    }
    public async eliminar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM Profesores WHERE id = ${id}`);
        res.json(resp);
    }
    public async actualizar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`UPDATE Profesores set ? WHERE id=${id}`, [req.body]);

        res.json(resp);
    }
}
export const profesorController = new ProfesorController();