// utils/sendEmail.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL, // Y
      to: [to], 
      subject: subject,
      html: html,
    });

    if (error) {
      throw new Error('Failed to send email via Resend: ' + error.message);
    }

    console.log('Email sent via Resend:', data);
    return data; // Optionally return the response data

  } catch (error) {
    throw new Error('Failed to send email: ' + error.message); // Re-throw for handling
  }
};
