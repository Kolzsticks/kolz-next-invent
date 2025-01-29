import type { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10); // Cookie expires in 10 minutes
        (await cookies()).set('userloggedin', 'true', { expires: expiresAt });

    // Send a success response
    res.status(200).json({ message: "Cookie set successfully" });
  } else {
    // Handle unsupported methods
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
