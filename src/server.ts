import 'dotenv/config'

import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'
import cors from '@fastify/cors'
import { authRoutes } from './routes/auth'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { uploadRoutes } from './routes/upload'
import fastifyStatic from '@fastify/static'
import { resolve } from 'node:path'

const app = fastify()

app.register(multipart)

app.register(fastifyStatic, {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(cors, { origin: true })

app.register(jwt, { secret: 'spacetime' })

app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoutes)

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('🚀 HTTP server running on http://localhost:3333')
})
