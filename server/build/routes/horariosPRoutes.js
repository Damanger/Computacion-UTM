"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.horariosPRoutes = void 0;
const express_1 = require("express");
const horariosPController_1 = require("../controllers/horariosPController");
const auth_1 = require("../middleware/auth");
class HorariosPRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:id', auth_1.validarToken, horariosPController_1.horariosPController.list);
        this.router.post('/', auth_1.validarToken, horariosPController_1.horariosPController.actualizarExcel);
    }
}
exports.horariosPRoutes = new HorariosPRoutes();
exports.default = exports.horariosPRoutes.router;
