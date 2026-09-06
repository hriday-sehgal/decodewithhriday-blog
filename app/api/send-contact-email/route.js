// app/api/send-contact-email/route.js
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields (name, email, message)' }, { status: 400 });
    }

    // 1. Save to Supabase (Backend side)
    const { error: supabaseError } = await supabase
      .from('contacts')
      .insert([{ name, email, message }]);

    if (supabaseError) {
      console.error("Supabase contacts insert error:", supabaseError);
      // We log the error but still try to send the email so the lead is not lost
    }

    // 2. Send Email via Resend
    const htmlContent = `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #333;">New Contact Form Submission on Decode with Hriday</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-line;">${message}</p>
      </div>
    `;

    const { data, error: resendError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: [process.env.NEXT_PUBLIC_SITE_EMAIL],
      subject: 'New Contact Form Submission',
      html: htmlContent,
    });

    if (resendError) {
      console.error("Resend error:", resendError);
      return NextResponse.json({ error: 'Failed to send email via Resend' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
