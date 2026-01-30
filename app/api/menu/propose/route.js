import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { username, dish, option } = await request.json();
    const name = String(username || '').trim();
    const dishText = String(dish || '').trim();
    const optionText = String(option || '').trim();

    if (!name || !dishText || !optionText) {
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

    const subject = `菜单提议 - ${name}`;
    const text = `来自: ${name}\n\n提议的菜: ${dishText}\n\n准备方式: ${optionText}`;

    await transporter.sendMail({
      from: SMTP_USER,
      to: 'yiching.uhc@gmail.com',
      subject,
      text,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Menu proposal email error:', error);
    return NextResponse.json(
      { error: 'Email send failed' },
      { status: 500 }
    );
  }
}
