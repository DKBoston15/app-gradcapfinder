import nodeMailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: "dirit@gradcapfinder.com",
    to: "dirit@gradcapfinder.com",
    subject: "Request for Access to GradCapFinder App",
    html: `<h4>User Information</h4><br/>Name: ${body.firstName} ${body.lastName}<br/>Email: ${body.email}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  return res.status(200).json({ status: "success" });
};
