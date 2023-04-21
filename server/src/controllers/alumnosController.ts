import { Request, Response } from 'express';
import pool from '../database';

class AlumnosController {
    public async list(req: Request, res: Response): Promise<void> {
        const consulta = 'SELECT * FROM Alumnos';
        const respuesta = await pool.query(consulta);
        res.json(respuesta);
    }
    public async listOne(req: Request, res: Response): Promise<void> {
        const { matricula} = req.params;
        const consulta = 'SELECT * FROM Alumnos WHERE matricula = ' + matricula;
        const respuesta = await pool.query(consulta);
        if (respuesta.length > 0) {
            res.json(respuesta[0]);
            return;
        }
        res.status(404).json({ 'mensaje': 'Alumno no encontrado' });
    }
    public async create(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO Alumnos set ?",[req.body]);
        res.json(resp);
    }
    public async createExcel(req: Request, res: Response): Promise<void> {
        let alumnos=req.body;
        var resp;
        for(var i=0; i<alumnos.length; i++){
            resp = await pool.query("INSERT INTO Alumnos set ?", [alumnos[i]]);
        }
        res.json(resp);
    }
    public async eliminar(req: Request, res: Response): Promise<void> {
        const { matricula } = req.params;
        const resp = await pool.query(`DELETE FROM Alumnos WHERE matricula = ${matricula}`);
        res.json(resp);
    }
    public async actualizar(req: Request, res: Response): Promise<void> {
        const { matricula } = req.params;
        const resp = await pool.query(`UPDATE Alumnos set nombre="${req.body.nombre}", edad="${req.body.edad}", sexo="${req.body.sexo}", grado="${req.body.grado}", grupo="${req.body.grupo}", materias="${req.body.materias}", P1="${req.body.P1}", P2="${req.body.P2}", P3="${req.body.P3}", Ordinario="${req.body.Ordinario}", promedio="${req.body.promedio}", hora_disp="${req.body.hora_disp}", aula="${req.body.aula}", prof_tutor="${req.body.prof_tutor}" WHERE matricula = ${matricula}`);
        
        res.json(resp);
    }
}
export const alumnosController = new AlumnosController();