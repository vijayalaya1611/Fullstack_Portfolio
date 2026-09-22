import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import os from "os";
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const resendKey = process.env.RESEND_API_KEY;

    if (!resendKey || resendKey === "re_...") {
      console.log("--- CONTACT FORM SUBMISSION (No API Key) ---");
      console.log(`From: ${name} (${email})`);
      console.log(`Message: ${message}`);
      console.log("--------------------------------------------");
      
      // Return success anyway for demo purposes, but log that it wasn't actually sent
      return res.json({ 
        success: true, 
        message: "Message received! (Note: RESEND_API_KEY not configured, check server logs)" 
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

      res.json({ success: true, data });
    } catch (err) {
      console.error("Server Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

function getLocalIp(): string | null {
  const interfaces = os.networkInterfaces();
  const validIps: string[] = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      // Ignore IPv6, internal loopback (127.0.0.1), and link-local autoconfigured addresses (169.254.x.x)
      if (iface.family === 'IPv4' && !iface.internal && !iface.address.startsWith('169.254.')) {
        // Prioritize standard local router subnets (192.168.x.x, 10.x.x.x, 172.16-31.x.x)
        if (iface.address.startsWith('192.168.') || iface.address.startsWith('10.')) {
          return iface.address;
        }
        validIps.push(iface.address);
      }
    }
  }
  return validIps[0] || null;
}

  app.listen(PORT, "0.0.0.0", () => {
    const localIp = getLocalIp();
    console.log(`\n  🚀 Portfolio dev server running:`);
    console.log(`  ➜  Local:   http://localhost:${PORT}/`);
    if (localIp) {
      console.log(`  ➜  Network: http://${localIp}:${PORT}/\n`);
    } else {
      console.log(`  ➜  Network: http://0.0.0.0:${PORT}/\n`);
    }
  });
}

startServer();
