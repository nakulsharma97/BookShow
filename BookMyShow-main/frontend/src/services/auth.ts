const API_URL = 'http://localhost:8080/api/auth/';

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

interface JwtResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
}


interface MessageResponse {
  message: string;
}

export const AuthService = {
    getCurrentUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
},

logout() {
  localStorage.removeItem('user');
},
  async login(credentials: LoginRequest): Promise<JwtResponse> {
    const response = await fetch(API_URL + 'signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
    return response.json();
  },

  async signup(userData: SignupRequest): Promise<MessageResponse> {
    const response = await fetch(API_URL + 'signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Signup failed');
    }
    return response.json();
  },
};