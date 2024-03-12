// usecases/emailService.ts
import { EmailSender } from '../gateways/emailSender';

export class EmailUseCase {
	private emailSender: EmailSender;

	constructor() {
		this.emailSender = new EmailSender();
	}

	async sendEmail(message: { id: string; recipient: string; name: string; status: string }): Promise<void> {
		const { id, recipient, name, status} = message;
		let subject, body
		if (status === 'em_preparacao') {
			subject = 'Pedido confirmado!'
			body = `Seu pedido #${id} foi recebido, e em breve estará pronto para retirada.`
		}
		else {
			subject = 'Pedido cancelado!'
			body = `Seu pedido #${id} foi cancelado devido a problemas no pagamento, por favor, tente novamente usando outro método de pagamento.`
		}
		const htmlMsg = `<html><head></head><body><p>Olá ${name},</p>${body}</p></body></html>`
		await this.emailSender.sendEmail(recipient, name, subject, htmlMsg);
	}
}
