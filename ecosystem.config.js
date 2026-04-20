const path = require('path');
// Carrega as variáveis do arquivo local config.env.local para a memória
require('dotenv').config({ path: path.join(__dirname, 'config.env.local') });

module.exports = {
  apps : [{
    name: "SankhyaVendas",
    
    // --- AJUSTE: Utiliza o binário direto do Next.js (Evita erro de 'file not found') ---
    script: "./node_modules/next/dist/bin/next",
    args: "start", 
    
    instances: 1,
    exec_mode: "fork",
    
    // Mantém o diretório atual de trabalho
    cwd: "/home/crescimentoerp/SANKHYA_VENDAS_V1.3.2",

    env: {
      NODE_ENV: "production",
      PORT: 5000,
      HOSTNAME: "0.0.0.0",

      // === CONEXÃO BANCO ORACLE ===
      ORACLE_CONNECT_STRING: "localhost:1521/FREEPDB1",
      
      // Credenciais (Buscando do seu config.env.local via process.env)
      ORACLE_USER: process.env.ORACLE_USER || "SYSTEM",
      ORACLE_PASSWORD: process.env.ORACLE_PASSWORD, 

      // Variáveis da API Sankhya e IA
      SANKHYA_TOKEN: process.env.SANKHYA_TOKEN,
      SANKHYA_APPKEY: process.env.SANKHYA_APPKEY,
      SANKHYA_USERNAME: process.env.SANKHYA_USERNAME,
      SANKHYA_PASSWORD: process.env.SANKHYA_PASSWORD,
      GEMINI_API_KEY: process.env.GEMINI_API_KEY,
      
      // URL do Site
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL
    }
  }]
};
