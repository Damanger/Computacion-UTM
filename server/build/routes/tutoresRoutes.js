"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutoresRoutes = void 0;
const express_1 = require("express");
const tutoresController_1 = require("../controllers/tutoresController");
const auth_1 = require("../middleware/auth");
class TutoresRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', auth_1.validarToken, tutoresController_1.tutoresController.create);
        this.router.get('/', auth_1.validarToken, tutoresController_1.tutoresController.list);
        this.router.get('/:id', auth_1.validarToken, tutoresController_1.tutoresController.listOne);
        this.router.delete('/delete/:id', auth_1.validarToken, tutoresController_1.tutoresController.eliminar);
        this.router.put('/update/:id', auth_1.validarToken, tutoresController_1.tutoresController.actualizar);
    }
}
exports.tutoresRoutes = new TutoresRoutes();
exports.default = exports.tutoresRoutes.router;
