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
exports.tutoriaPController = void 0;
const database_1 = __importDefault(require("../database"));
class TutoriaPController {
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const consulta = `SELECT T.id_al, T.nombre_alumno, T.hora_tutoria, T.fecha, T.comentarios, A.grado, A.grupo, A.materias, A.P1, A.P2, A.P3, A.Ordinario, A.promedio FROM Tutoria T INNER JOIN Alumnos A ON T.id_al = A.matricula INNER JOIN Profesores P ON P.nombre = T.nombre_prof WHERE P.id = ${id}`;
            const respuesta = yield database_1.default.query(consulta);
            res.json(respuesta);
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const consulta = `SELECT T.id_al, T.nombre_alumno, T.hora_tutoria, T.fecha, T.comentarios, A.grado, A.grupo, A.materias, A.P1, A.P2, A.P3, A.Ordinario, A.promedio 
        FROM Tutoria T 
        INNER JOIN Alumnos A ON T.id_al = A.matricula 
        INNER JOIN Profesores P ON P.nombre = T.nombre_prof 
        WHERE P.id = ${id} AND A.prof_tutor =  ${req.body.nombre_prof}`;
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Profesor no encontrado' });
        });
    }
}
exports.tutoriaPController = new TutoriaPController();
