import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  async login(email: string, password: string): Promise<string> {
    // Simulação de chamada API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'usuario@exemplo.com' && password === 'senha') {
      const token = 'fake-jwt-token';
      await AsyncStorage.setItem('authToken', token);
      return token;
    }
    throw new Error('Credenciais inválidas');
  },

  async logout(): Promise<void> {
    await AsyncStorage.removeItem('authToken');
  },

  async checkAuth(): Promise<boolean> {
    const token = await AsyncStorage.getItem('authToken');
    return !!token;
  },
};