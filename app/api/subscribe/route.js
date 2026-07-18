// app/api/subscribe/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // 1. Save to Supabase
    const { data, error } = await supabase
      .from('subscribers')
      .insert([{ name, email }]);

    if (error) {
      console.error("Supabase subscription error:", error);
      if (error.code === '23505' || error.message?.includes('unique constraint') || error.message?.includes('duplicate key')) {
        return NextResponse.json({ error: 'You are already subscribed to the newsletter!' }, { status: 409 });
      }
      return NextResponse.json({ error: error.message || 'Database error occurred' }, { status: 500 });
    }

    // 2. Send Notification Email to Admin via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: [process.env.NEXT_PUBLIC_SITE_EMAIL],
          subject: 'New Newsletter Subscriber!',
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
              <h3 style="color: #333; margin-top: 0;">New Subscriber Joined</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
            </div>
          `
        });
      } catch (resendError) {
        console.error("Resend notification dispatch error:", resendError);
      }
    }

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error) {
    console.error("Subscription API Route Error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
