"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutoradosRoutes = void 0;
const express_1 = require("express");
const tutoradosController_1 = require("../controllers/tutoradosController");
const auth_1 = require("../middleware/auth");
class TutoradosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', auth_1.validarToken, tutoradosController_1.tutoradosController.create);
        this.router.get('/', auth_1.validarToken, tutoradosController_1.tutoradosController.list);
        this.router.get('/:id', auth_1.validarToken, tutoradosController_1.tutoradosController.listOne);
        this.router.delete('/delete/:id', auth_1.validarToken, tutoradosController_1.tutoradosController.eliminar);
        this.router.put('/update/:id', auth_1.validarToken, tutoradosController_1.tutoradosController.actualizar);
    }
}
exports.tutoradosRoutes = new TutoradosRoutes();
exports.default = exports.tutoradosRoutes.router;
