

export class EmailSender {
    async sendEmail(recipient: string, name: string, subject: string, body: string): Promise<void> {
        // Code to send email
        // Example: using nodemailer to send email
        console.log(process.env.EMAIL_TOKEN)
        console.log(`Sending email to ${name} <${recipient}> with subject: ${subject}`);
        // Example nodemailer usage:
        // const transporter = nodemailer.createTransport({ ... });
        // await transporter.sendMail({ to: recipient, subject, text: body });
    }
}
