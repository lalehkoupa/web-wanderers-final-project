 import nodemailer from "nodemailer";

const sendEmail = async(req:any, res:any,firstName:any,lastName:any,email:any,job:any) =>{

		try {
       		 const transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        //const data = JSON.parse(req.body)

        const options = {
			from: "akwaabatest@outlook.com",
			to: `${email}`,
			subject: "confirmation of volunteer job sign up in Akwaaba",
			html: `Hello ${firstName} ${lastName}<br> Thanks for applying as a <strong>${job[0]["jobTitle"]}</strong>
             for ${job[0]["date"]} from ${job[0]["startTime"]} to ${job[0]["endTime"]}.<br><br><br>Best Regards<br>Akwaaba team`
        }

        const info = await transporter.sendMail(options)

        return res.status(200).json({ success: true, msg: "Email sent!", body: info})

    }
    catch (error) {
        console.log("we got errors *very sad face*", error)
        return res.status(500).json({ error: true, msg: error})
    }
}
    export default sendEmail;