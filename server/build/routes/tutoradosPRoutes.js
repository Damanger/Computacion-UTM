"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutoradosPRoutes = void 0;
const express_1 = require("express");
const tutoradosPController_1 = require("../controllers/tutoradosPController");
const auth_1 = require("../middleware/auth");
class TutoradosPRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:id', auth_1.validarToken, tutoradosPController_1.tutoradosPController.list);
    }
}
exports.tutoradosPRoutes = new TutoradosPRoutes();
exports.default = exports.tutoradosPRoutes.router;
