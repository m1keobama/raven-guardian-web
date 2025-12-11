import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Lädt Umgebungsvariablen aus der .env Datei
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Damit diese Variablen im Frontend verfügbar sind, müssen wir sie hier definieren
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      'process.env.ADMIN_USER_HASH': JSON.stringify(env.ADMIN_USER_HASH),
      'process.env.ADMIN_PASS_HASH': JSON.stringify(env.ADMIN_PASS_HASH),
    }
  }
})
