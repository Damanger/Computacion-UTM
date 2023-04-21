"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //libreria
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const profesorRoutes_1 = __importDefault(require("./routes/profesorRoutes"));
const alumnosRoutes_1 = __importDefault(require("./routes/alumnosRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const cors_1 = __importDefault(require("cors"));
const horariosRoutes_1 = __importDefault(require("./routes/horariosRoutes"));
const horariosPRoutes_1 = __importDefault(require("./routes/horariosPRoutes"));
const horariosARoutes_1 = __importDefault(require("./routes/horariosARoutes"));
const tutoradosRoutes_1 = __importDefault(require("./routes/tutoradosRoutes"));
const tutoradosPRoutes_1 = __importDefault(require("./routes/tutoradosPRoutes"));
const tutoresRoutes_1 = __importDefault(require("./routes/tutoresRoutes"));
const tutoriaRoutes_1 = __importDefault(require("./routes/tutoriaRoutes"));
const tutoriaPRoutes_1 = __importDefault(require("./routes/tutoriaPRoutes"));
const fs_1 = __importDefault(require("fs")); //libreria para guardar archivos
class Server {
    constructor() {
        this.app = (0, express_1.default)(); //ejecutar servidor
        this.config();
        this.routes();
        this.app.use(express_1.default.static(__dirname + "/img"));
    }
    config() {
        this.app.set('port', process.env.PORT || 5000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use('/documentacion', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/Computacion/Tutorias', tutoriaRoutes_1.default);
        this.app.use('/api/Computacion/Alumnos/Horarios', horariosARoutes_1.default);
        this.app.use('/api/Computacion/Profesores/Horarios', horariosRoutes_1.default);
        this.app.use('/api/Computacion/Alumnos/Tutores', tutoresRoutes_1.default);
        this.app.use('/api/Computacion/Alumnos', alumnosRoutes_1.default);
        this.app.use('/api/Computacion/Profesores/Tutorados', tutoradosRoutes_1.default);
        this.app.use('/api/Computacion/Profesores', profesorRoutes_1.default);
        this.app.use('/api/Computacion/Profesor/Tutorias', tutoriaPRoutes_1.default);
        this.app.use('/api/Computacion/Profesor/Horario', horariosPRoutes_1.default);
        this.app.use('/api/Computacion/Profesor/Tutorados', tutoradosPRoutes_1.default);
        this.app.use('/api/Computacion/', profesorRoutes_1.default);
        this.app.post('/uploadImagen', (req, res) => {
            const file = req.body.src;
            const carpeta = req.body.carpeta;
            const name = req.body.id;
            console.log(file, carpeta, name);
            const binaryData = Buffer.from(file.replace(/^data:image\/[a-z]+;base64,/, ""), 'base64').toString('binary');
            fs_1.default.writeFile(`${__dirname}/img/perfil/` + carpeta + '/' + name + '.jpg', binaryData, "binary", (err) => {
                console.log(err);
            });
            res.json({ fileName: name + '.jpg' });
        });
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor se encuentra en el puerto: ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
