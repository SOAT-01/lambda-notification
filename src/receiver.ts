import { SQSEvent } from 'aws-lambda';
import { EmailUseCase } from './usecases/emailUseCase'
import { assertArgumentIsValidEmail, assertArgumentIsValidStatus } from "@/utils/assertionConcern";

const consumeSqsMessage = async (event: SQSEvent) => {
    try {
        const emailUseCase = new EmailUseCase();
        for (const record of event.Records) {
            const messageBody = JSON.parse(record.body || "{}");
            console.log('Received message:', messageBody);
            
            const messageEmail = messageBody.clienteEmail.props.address
            const messageNome = messageBody.clienteNome
            const messageStatus = messageBody.statusPedido
            const messagePedido = messageBody.pedidoId
            const isValidEmail = assertArgumentIsValidEmail(messageEmail)
            const isValidStatus = assertArgumentIsValidStatus(messageStatus)

            if (!isValidEmail) {
                console.error("Skipping message: Incorrect e-mail format, ex: abx@xyz.com");
                continue;
            }
            if (!isValidStatus) {
                console.error("Skipping message: Incorrect status value");
                continue;
            }

            const mailMessage = {
                id: messagePedido, 
                recipient: messageEmail,
                name: messageNome,
                status: messageStatus
            }
            await emailUseCase.sendEmail(mailMessage)
        }
    } catch (error) {
        console.error('Error processing messages:', error);
        throw error;
    }
};

module.exports.handler = consumeSqsMessage;
