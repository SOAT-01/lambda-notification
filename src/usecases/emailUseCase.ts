// usecases/emailService.ts
import { EmailSender } from '../gateways/emailSender';

export class EmailUseCase {
	private emailSender: EmailSender;

	constructor() {
		this.emailSender = new EmailSender();
	}

	async sendEmail(message: { recipient: string; name: string; status: string }): Promise<void> {
		const { recipient, name, status} = message;
		const body = 'E-mail sucesso enviado'
		const subject = 'Pedido aprovado'
		await this.emailSender.sendEmail(recipient, name, subject, body);
	}
}
