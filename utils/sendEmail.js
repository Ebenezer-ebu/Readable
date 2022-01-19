const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {
  console.log(email, subject, payload, template);
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_HOST,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
      },
    });
    
    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);

    const mailOptions = () => {
      return {
        from: {
          name: "Readable",
          address: process.env.EMAIL_USERNAME,
        },
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };
    // Send email
    transporter
      .sendMail(mailOptions())
      .then((data) => {
        console.log("Mail sent", data);
        return {
          success: true,
        };
      })
      .catch((err) => {
        console.error("Failure", err);
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};


module.exports = { sendEmail };
