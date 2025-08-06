import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface User {
  userId: string;
  username: string;
  role: string;
}

class AuthService {
  private api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
  });

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await this.api.post('/auth/login', credentials);
      const { access_token } = response.data;
      
      // Stocker le token dans un cookie httpOnly côté client
      Cookies.set('auth-token', access_token, {
        expires: 1, // 1 jour
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erreur de connexion');
    }
  }

  async getDashboard(): Promise<any> {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error('Token manquant');
      }

      const response = await this.api.get('/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erreur d\'accès au dashboard');
    }
  }

  getToken(): string | undefined {
    return Cookies.get('auth-token');
  }

  logout(): void {
    Cookies.remove('auth-token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Décoder le JWT pour récupérer les infos utilisateur
  getUser(): User | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        userId: payload.sub,
        username: payload.username,
        role: payload.role
      };
    } catch (error) {
      return null;
    }
  }
}

export const authService = new AuthService();