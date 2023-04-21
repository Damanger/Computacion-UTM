import express, { Application } from 'express'; //libreria
import indexRoutes from './routes/indexRoutes';
import profesorRoutes from './routes/profesorRoutes';
import alumnosRoutes from './routes/alumnosRoutes';
import morgan from 'morgan';
import swagger_ui_express from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import cors from 'cors';
import horariosRoutes from './routes/horariosRoutes';
import horariosPRoutes from './routes/horariosPRoutes';
import horariosARoutes from './routes/horariosARoutes';
import tutoradosRoutes from './routes/tutoradosRoutes';
import tutoradosPRoutes from './routes/tutoradosPRoutes';
import tutoresRoutes from './routes/tutoresRoutes';
import tutoriaRoutes from './routes/tutoriaRoutes';
import tutoriaPRoutes from './routes/tutoriaPRoutes';
import fs from 'fs'; //libreria para guardar archivos
class Server { //clase
    public app: Application; //variable de control
    constructor() {
        this.app = express(); //ejecutar servidor
        this.config();
        this.routes();
        this.app.use(express.static(__dirname + "/img"));
    }
    config(): void //definir propiedades del servidor (en este caso el puerto)
    {
        this.app.set('port', process.env.PORT || 5000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use('/documentacion', swagger_ui_express.serve, swagger_ui_express.setup(swaggerDocument));
    }
    routes(): void {
        this.app.use(indexRoutes);
        this.app.use('/api/Computacion/Tutorias', tutoriaRoutes);
        this.app.use('/api/Computacion/Alumnos/Horarios', horariosARoutes);
        this.app.use('/api/Computacion/Profesores/Horarios', horariosRoutes);
        this.app.use('/api/Computacion/Alumnos/Tutores', tutoresRoutes)
        this.app.use('/api/Computacion/Alumnos', alumnosRoutes);
        this.app.use('/api/Computacion/Profesores/Tutorados', tutoradosRoutes);
        this.app.use('/api/Computacion/Profesores', profesorRoutes);
        this.app.use('/api/Computacion/Profesor/Tutorias', tutoriaPRoutes);
        this.app.use('/api/Computacion/Profesor/Horario', horariosPRoutes);
        this.app.use('/api/Computacion/Profesor/Tutorados', tutoradosPRoutes);
        this.app.use('/api/Computacion/', profesorRoutes);
        this.app.post('/uploadImagen', (req, res) => {
            const file = req.body.src;
            const carpeta = req.body.carpeta;
            const name = req.body.id;
            console.log(file, carpeta, name);

            const binaryData = Buffer.from(file.replace(/^data:image\/[a-z]+;base64,/, ""), 'base64').toString('binary');
            fs.writeFile(`${__dirname}/img/perfil/` + carpeta + '/' + name + '.jpg', binaryData,
                "binary", (err) => {
                    console.log(err);
                });

            res.json({ fileName: name + '.jpg' });
        });

    }
    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor se encuentra en el puerto: ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();