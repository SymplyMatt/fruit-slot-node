import nodemailer from 'nodemailer'

export default async function sendEmail (subject : string,output : string ,email : string | Array<string>) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
       // true for 465, false for other ports
   host: "smtp.gmail.com",
   port: 465,
   secure: true,
   auth: {
   user: process.env.EMAIL_USER, // generated ethereal user
   pass: process.env.EMAIL_PASS, // generated ethereal password
   },
   // tls : {
   //     rejectUnauthorized : false
   // }
   });

   // send mail with defined transport object
   let info = await transporter.sendMail({
       from: `"GJC Recycling" <${process.env.EMAIL_USER}>`, // sender address
       to: email, // list of receivers
       subject: subject, // Subject line
       text: "Hello, use the code below to verify your account", // plain text body
       html: output, // html body
   });
   console.log('done sending email');

}
