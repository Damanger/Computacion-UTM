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
exports.horariosPController = void 0;
const database_1 = __importDefault(require("../database"));
class HorariosPController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const consulta = `SELECT * FROM Profesores WHERE id = ${id}`;
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Profesor no encontrado' });
        });
    }
    actualizarExcel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let horariosp = req.body;
            var resp;
            for (var i = 0; i < horariosp.length; i++) {
                resp = yield database_1.default.query(`UPDATE Horario_Profesor set ? WHERE id=${horariosp[i].id}`, [horariosp[i]]);
            }
            res.json(resp);
        });
    }
}
exports.horariosPController = new HorariosPController();
