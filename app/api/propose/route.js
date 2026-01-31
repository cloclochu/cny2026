import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { username, type, proposal } = await request.json();
    const name = String(username || '').trim();
    const typeText = String(type || '').trim();
    const proposalText = String(proposal || '').trim();

    if (!name || !typeText || !proposalText) {
      return NextResponse.json(
        { error: 'Missing fields' },
        { status: 400 }
      );
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
    } = process.env;
    const smtpPass = SMTP_PASS ? SMTP_PASS.replace(/\s+/g, '') : '';

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !smtpPass) {
      return NextResponse.json(
        { error: 'Email config missing' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: smtpPass,
      },
    });

    const subject = `新提议 - ${typeText} - ${name}`;
    const text = `来自: ${name}\n\n类型: ${typeText}\n\n内容: ${proposalText}`;

    try {
      await transporter.sendMail({
        from: SMTP_USER,
        to: 'yiching.uhc@gmail.com',
        subject,
        text,
      });
    } catch (mailError) {
      console.error('Mail send error details:', {
        error: mailError.message,
        code: mailError.code,
        command: mailError.command,
      });
      throw mailError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Proposal error:', error.message || error);
    return NextResponse.json(
      { error: error.message || 'Email send failed' },
      { status: 500 }
    );
  }
}
