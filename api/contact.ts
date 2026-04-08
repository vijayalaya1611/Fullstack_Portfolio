import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const resendKey = process.env.RESEND_API_KEY;

  if (!resendKey || resendKey === "re_...") {
    console.log("--- CONTACT FORM SUBMISSION (No API Key) ---");
    console.log(`From: ${name} (${email})`);
    console.log(`Message: ${message}`);
    
    return res.json({ 
      success: true, 
      message: "Message received! (Note: RESEND_API_KEY not configured)" 
    });
  }

  try {
    const resend = new Resend(resendKey);
    
    const { data, error } = await resend.emails.send({
      from: 'From Portfolio Contact <onboarding@resend.dev>',
      to: ['mrvijayalaya2002@gmail.com'],
      subject: `New Message from ${name}`,
      html: `
        <h3>New Portfolio Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return res.status(500).json({ error: "Failed to send email" });
    }

    return res.json({ success: true, data });
  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
