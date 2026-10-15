
import 'server-only';
import { Resend } from 'resend';

type SendEmailInput = {
    to: string;
    subject: string;
    html: string;
};

export async function sendEmail({
    to,
    subject,
    html,
}: SendEmailInput): Promise<{ id: string }> {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !from) {
        throw new Error('Email service is not configured');
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
        from,
        to,
        subject,
        html,
    });

    if (error || !data?.id) {
        console.error('Resend email request failed', {
            message: error?.message,
        });

        throw new Error('EMAIL_DELIVERY_FAILED');
    }

    return { id: data.id };
}
