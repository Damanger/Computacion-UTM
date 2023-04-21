"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.horariosRoutes = void 0;
const express_1 = require("express");
const horariosController_1 = require("../controllers/horariosController");
const auth_1 = require("../middleware/auth");
class HorariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', auth_1.validarToken, horariosController_1.horariosController.create);
        this.router.get('/', auth_1.validarToken, horariosController_1.horariosController.list);
        this.router.get('/:id', auth_1.validarToken, horariosController_1.horariosController.listOne);
        this.router.delete('/delete/:id', auth_1.validarToken, horariosController_1.horariosController.eliminar);
        this.router.put('/update/:id', auth_1.validarToken, horariosController_1.horariosController.actualizar);
    }
}
exports.horariosRoutes = new HorariosRoutes();
exports.default = exports.horariosRoutes.router;
