"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutoriaPRoutes = void 0;
const express_1 = require("express");
const tutoriaPController_1 = require("../controllers/tutoriaPController");
const auth_1 = require("../middleware/auth");
class TutoriaPRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:id', auth_1.validarToken, tutoriaPController_1.tutoriaPController.listOne);
        this.router.get('/:id', auth_1.validarToken, tutoriaPController_1.tutoriaPController.list);
    }
}
exports.tutoriaPRoutes = new TutoriaPRoutes();
exports.default = exports.tutoriaPRoutes.router;
