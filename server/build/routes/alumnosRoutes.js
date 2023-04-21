"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlumnosRoutes = void 0;
const express_1 = require("express");
const alumnosController_1 = require("../controllers/alumnosController");
const auth_1 = require("../middleware/auth");
class alumnosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', auth_1.validarToken, alumnosController_1.alumnosController.list);
        this.router.get('/:matricula', auth_1.validarToken, alumnosController_1.alumnosController.listOne);
        this.router.post('/', auth_1.validarToken, alumnosController_1.alumnosController.createExcel);
        this.router.post('/', auth_1.validarToken, alumnosController_1.alumnosController.create);
        this.router.delete('/delete/:matricula', auth_1.validarToken, alumnosController_1.alumnosController.eliminar);
        this.router.put('/update/:matricula', auth_1.validarToken, alumnosController_1.alumnosController.actualizar);
    }
}
exports.AlumnosRoutes = new alumnosRoutes();
exports.default = exports.AlumnosRoutes.router;
