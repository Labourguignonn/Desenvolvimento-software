// src/utils/axios.js

import axios from 'axios';

// Definir a URL base da sua API (ajuste conforme necessário)
const api = axios.create({
  baseURL: 'http://localhost:8000/',  // Substitua com a URL da sua API
  timeout: 5000,  // Tempo máximo para aguardar a resposta (5 segundos)
});

// Adicionar interceptores, se necessário (para lidar com tokens, por exemplo)
api.interceptors.request.use(
  (config) => {
    // Se precisar de um token de autenticação, adicione no cabeçalho aqui
    const token = localStorage.getItem('auth_token');  // Exemplo com token no localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
