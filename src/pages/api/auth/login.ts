import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import cookie from 'cookie';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  try {
    const response = await axios.post(`${backendUrl}/auth/login`, req.body, {
      withCredentials: true,
    });

    const token = response.data.token;

    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60,
      path: '/',
    }));

    return res.status(200).json({ message: 'Connecté' });
  } catch (error) {
    return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
  }
}
