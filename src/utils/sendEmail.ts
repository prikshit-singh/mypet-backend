import SibApiV3Sdk from 'sib-api-v3-sdk';
import dotenv from 'dotenv';

dotenv.config();

const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Set API key
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY!;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
interface SendEmailParams {
  email: string;
  name: string;
  subject: string;
  htmlContent: string;
  fromEmail?: string;
  fromName?: string;
}

export const sendEmail = async ({
  email,
  name,
  subject,
  htmlContent,
  fromEmail = 'prikshitlatherlather@gmail.com',
  fromName = 'The Pet Wala',
}: SendEmailParams) => {

  const sendSmtpEmail = {
    sender: { name: fromName, email: fromEmail },
    to: [{ email: email, name: name }],
    subject,
    htmlContent,
  };

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent successfully:', response);
    return response;
  } catch (error: any) {
    console.error('Error sending email:', error.response?.body || error.message);
    throw error;
  }
};
