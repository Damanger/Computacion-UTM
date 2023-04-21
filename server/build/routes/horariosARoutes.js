"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.horariosARoutes = void 0;
const express_1 = require("express");
const horariosAController_1 = require("../controllers/horariosAController");
const auth_1 = require("../middleware/auth");
class HorariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', auth_1.validarToken, horariosAController_1.horariosAController.create);
        this.router.get('/', auth_1.validarToken, horariosAController_1.horariosAController.list);
        this.router.get('/:id', auth_1.validarToken, horariosAController_1.horariosAController.listOne);
        this.router.delete('/delete/:id', auth_1.validarToken, horariosAController_1.horariosAController.eliminar);
        this.router.put('/update/:id', auth_1.validarToken, horariosAController_1.horariosAController.actualizar);
    }
}
exports.horariosARoutes = new HorariosRoutes();
exports.default = exports.horariosARoutes.router;
