import api from './api';

type LoginData = {
  email: string;
  password: string;
};

export const login = async (data: LoginData) => {
  try {
    const response = await api.post('/usuario_sessions', { usuario: data });
    return response.data;
  } catch (error) {
    throw new Error('Falha no login. Verifique suas credenciais e tente novamente.');
  }
};
