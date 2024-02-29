import { SQSEvent } from 'aws-lambda';
import { EmailUseCase } from './usecases/emailUseCase'

const consumeSqsMessage = async (event: SQSEvent) => {
    try {
        const emailUseCase = new EmailUseCase();
        for (const record of event.Records) {
            // Process each SQS message
            const messageBody = JSON.parse(record.body);
            console.log('Received message:', messageBody);
            const mailMessage = { 
                recipient: "jane@soat.com.br",
                name: "Jane Doe",
                status: "recebido"
            }
            await emailUseCase.sendEmail(mailMessage)
        }
        return { 
            statusCode: 200, body: 'Messages processed successfully' 
        };
    } catch (error) {
        console.error('Error processing messages:', error);
        throw error;
    }
};

module.exports.handler = consumeSqsMessage;