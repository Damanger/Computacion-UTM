"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutoriaRoutes = void 0;
const express_1 = require("express");
const tutoriaController_1 = require("../controllers/tutoriaController");
const auth_1 = require("../middleware/auth");
class TutoriaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', auth_1.validarToken, tutoriaController_1.tutoriaController.create);
        this.router.get('/', auth_1.validarToken, tutoriaController_1.tutoriaController.list);
        this.router.get('/:id_al', auth_1.validarToken, tutoriaController_1.tutoriaController.listOne);
        this.router.delete('/delete/:id_al', auth_1.validarToken, tutoriaController_1.tutoriaController.eliminar);
        this.router.put('/update/:id_al', auth_1.validarToken, tutoriaController_1.tutoriaController.actualizar);
    }
}
exports.tutoriaRoutes = new TutoriaRoutes();
exports.default = exports.tutoriaRoutes.router;
