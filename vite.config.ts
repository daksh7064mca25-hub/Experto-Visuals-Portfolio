import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import contactHandler from './api/contact.ts'

function apiDevPlugin(): Plugin {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/contact' && req.method === 'POST') {
          let body = ''
          req.on('data', (chunk) => {
            body += chunk
          })
          req.on('end', async () => {
            try {
              const parsedBody = body ? JSON.parse(body) : {}
              const mockReq = {
                method: req.method,
                headers: req.headers,
                body: parsedBody,
                socket: req.socket,
                connection: req.socket,
              }
              const mockRes = {
                statusCode: 200,
                headers: {} as Record<string, string | string[]>,
                setHeader(name: string, value: string | string[]) {
                  this.headers[name] = value
                  res.setHeader(name, value)
                  return this
                },
                status(code: number) {
                  this.statusCode = code
                  res.statusCode = code
                  return this
                },
                json(data: any) {
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify(data))
                },
              }
              await contactHandler(mockReq, mockRes)
            } catch (err: any) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: false, error: err?.message || 'Server error' }))
            }
          })
          return
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)

  return {
    plugins: [react(), tailwindcss(), apiDevPlugin()],
    server: {
      watch: {
        ignored: ['**/node_modules/**', '**/.git/**', '**/public/videos/**', '**/*.mp4'],
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})



