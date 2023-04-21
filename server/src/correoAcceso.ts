import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
var email = require("emailjs/email");

module.exports = (formulario: any) => {
    const token: string = jwt.sign(formulario.correo, process.env.TOKEN_SECRET || 'prueba');
    console.log(formulario)
    var server = email.server.connect(
        {
            user: "ingeneria.computacion.utm@gmail.com",
            password: "faqsfrxelnubiioe",
            host: "smtp.gmail.com",
            ssl: true,
        });
    var message: any = {};
    message = {
        from: "ingeneria.computacion.utm@gmail.com",
        to: formulario.correo,
        bcc: "",
        subject: "Reestablecer contraseña",
        attachment: [
            {
                data: `¡¡Buen día!! Por favor, para reestablecer su contraseña ingrese al siguiente link:
                <a href="http://localhost:4200/recuperar/${token}" >Reestablecer</a>
                <br><br>`, alternative: true
            }
        ]
    };
    console.log(message)
    server.send(message, function (err: any, message: any) { console.log(err); });
}