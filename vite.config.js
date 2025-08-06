import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
	base: '/handyhelper/', // 🔹 назва твого репозиторію
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['.daytona.work'],
    strictPort: true
  }
});