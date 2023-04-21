"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profesorRoutes = void 0;
const express_1 = require("express");
const profesorController_1 = require("../controllers/profesorController");
const auth_1 = require("../middleware/auth");
class profesorsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/verificarProfesor', auth_1.validarToken, profesorController_1.profesorController.verificarProfesor);
        this.router.post('/', auth_1.validarToken, profesorController_1.profesorController.createExcel);
        this.router.post('/', auth_1.validarToken, profesorController_1.profesorController.create);
        this.router.get('/', auth_1.validarToken, profesorController_1.profesorController.list);
        this.router.get('/:id', auth_1.validarToken, profesorController_1.profesorController.listOne);
        this.router.delete('/delete/:id', auth_1.validarToken, profesorController_1.profesorController.eliminar);
        this.router.put('/update/:id', auth_1.validarToken, profesorController_1.profesorController.actualizar);
    }
}
exports.profesorRoutes = new profesorsRoutes();
exports.default = exports.profesorRoutes.router;
