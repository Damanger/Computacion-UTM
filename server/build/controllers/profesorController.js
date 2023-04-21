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
exports.profesorController = void 0;
const database_1 = __importDefault(require("../database"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class ProfesorController {
    verificarProfesor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const passProfe = `SELECT password FROM Profesores WHERE correo="${req.body.correo}"`;
            const respuesta = yield database_1.default.query(passProfe);
            const hashPassword = respuesta[0].password;
            let prueba = yield bcryptjs_1.default.compare(req.body.password, hashPassword);
            req.body.password = hashPassword;
            if (prueba == true) {
                const consultaProfe = `SELECT * FROM Profesores WHERE correo="${req.body.correo}"`;
                const consulta = yield database_1.default.query(consultaProfe);
                res.json(consulta);
            }
            else {
                const consulta = "";
                res.json(consulta);
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const consulta = 'SELECT * FROM Profesores';
            const respuesta = yield database_1.default.query(consulta);
            res.json(respuesta);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcryptjs_1.default.genSalt(10);
            req.body.password = yield bcryptjs_1.default.hash(req.body.password, salt);
            const resp = yield database_1.default.query("INSERT INTO Profesores set ?", [req.body]);
            res.json(resp);
        });
    }
    createExcel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let profesores = req.body;
            var resp;
            const salt = yield bcryptjs_1.default.genSalt(10);
            for (var i = 0; i < profesores.length; i++) {
                profesores[i].password = yield bcryptjs_1.default.hash(profesores[i].password, salt);
                resp = yield database_1.default.query("INSERT INTO Profesores set ?", [profesores[i]]);
            }
            res.json(resp);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const consulta = 'SELECT * FROM Profesores WHERE id = ' + id;
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Profesor no encontrado' });
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM Profesores WHERE id = ${id}`);
            res.json(resp);
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`UPDATE Profesores set ? WHERE id=${id}`, [req.body]);
            res.json(resp);
        });
    }
}
exports.profesorController = new ProfesorController();
