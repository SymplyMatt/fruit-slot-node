"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
function sendEmail(subject, output, email) {
    return __awaiter(this, void 0, void 0, function* () {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer_1.default.createTransport({
            // true for 465, false for other ports
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // generated ethereal password
            },
            // tls : {
            //     rejectUnauthorized : false
            // }
        });
        // send mail with defined transport object
        let info = yield transporter.sendMail({
            from: `"GJC Recycling" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: subject,
            text: "Hello, use the code below to verify your account",
            html: output, // html body
        });
        console.log('done sending email');
    });
}
exports.default = sendEmail;
