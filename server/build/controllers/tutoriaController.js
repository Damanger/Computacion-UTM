"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutoriaController = void 0;
const database_1 = __importDefault(require("../database"));
class TutoriaController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query(`INSERT INTO Tutoria set hora_tutoria = "${req.body.hora_tutoria}", fecha = "${req.body.fecha}", comentarios = "${req.body.comentarios}", nombre_prof = nombre_prof, nombre_alumno = nombre_alumno`);
            res.json(resp);
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const consulta = 'SELECT DISTINCT nombre_prof,id_al,nombre_alumno,hora_tutoria,fecha,comentarios,A.grado,A.grupo,A.materias,A.P1,A.P2,A.P3,A.Ordinario,A.promedio FROM Tutoria JOIN Alumnos A,Profesores P WHERE id_al=A.matricula AND nombre_prof=A.prof_tutor';
            const respuesta = yield database_1.default.query(consulta);
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_al } = req.params;
            const consulta = `SELECT DISTINCT nombre_prof,id_al,nombre_alumno,hora_tutoria,comentarios,fecha,A.grado,grupo,materias,P1,P2,P3,Ordinario,promedio FROM Tutoria JOIN Profesores P,Alumnos A WHERE matricula= ${id_al} AND A.nombre=nombre_alumno AND nombre_prof=A.prof_tutor`;
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Tutor no encontrado' });
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_al } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM Tutoria WHERE id_al = ${id_al}`);
            res.json(resp);
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_al } = req.params;
            const resp = yield database_1.default.query(`UPDATE Tutoria set hora_tutoria="${req.body.hora_tutoria}", fecha="${req.body.fecha}", comentarios="${req.body.comentarios}" WHERE id_al =${id_al} `);
            res.json(resp);
        });
    }
}
exports.tutoriaController = new TutoriaController();
