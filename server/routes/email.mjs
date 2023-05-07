import express from "express";
import nodemailer from "nodemailer";
const router = express.Router();

router.post('/', async (req, res) => {
    try  {
      console.log(req.body);
      const { to, cc, bcc, subject, body } = req.body;

        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: "sharmameritnation@gmail.com", // generated ethereal user
            pass: "jlyxztgiqpdvygnd", // generated ethereal password
          },
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Platform"', // sender address
          to: to, // list of receivers
          cc: cc,
          bcc: bcc,
          subject: subject, // Subject line
          // text: "Hello world?", // plain text body
          html: body, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.sendStatus(200);
      
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
})

export default router;