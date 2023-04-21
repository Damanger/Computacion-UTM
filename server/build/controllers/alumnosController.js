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
exports.alumnosController = void 0;
const database_1 = __importDefault(require("../database"));
class AlumnosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const consulta = 'SELECT * FROM Alumnos';
            const respuesta = yield database_1.default.query(consulta);
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { matricula } = req.params;
            const consulta = 'SELECT * FROM Alumnos WHERE matricula = ' + matricula;
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Alumno no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO Alumnos set ?", [req.body]);
            res.json(resp);
        });
    }
    createExcel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let alumnos = req.body;
            var resp;
            for (var i = 0; i < alumnos.length; i++) {
                resp = yield database_1.default.query("INSERT INTO Alumnos set ?", [alumnos[i]]);
            }
            res.json(resp);
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { matricula } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM Alumnos WHERE matricula = ${matricula}`);
            res.json(resp);
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { matricula } = req.params;
            const resp = yield database_1.default.query(`UPDATE Alumnos set nombre="${req.body.nombre}", edad="${req.body.edad}", sexo="${req.body.sexo}", grado="${req.body.grado}", grupo="${req.body.grupo}", materias="${req.body.materias}", P1="${req.body.P1}", P2="${req.body.P2}", P3="${req.body.P3}", Ordinario="${req.body.Ordinario}", promedio="${req.body.promedio}", hora_disp="${req.body.hora_disp}", aula="${req.body.aula}", prof_tutor="${req.body.prof_tutor}" WHERE matricula = ${matricula}`);
            res.json(resp);
        });
    }
}
exports.alumnosController = new AlumnosController();
