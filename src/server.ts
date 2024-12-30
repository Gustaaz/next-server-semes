import 'dotenv/config'

import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { userRoutes } from './routes/user-routes'
import { fastifyJwt } from '@fastify/jwt'
import { env } from './env'
import { authRoutes } from './routes/auth-routes'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifyJwt, {
  secret: env.SECRET_KEY_JWT,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '1d',
  },
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Fastify API',
      description: 'Description',
      version: '0.1.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next()
    },
    preHandler: function (request, reply, next) {
      next()
    },
  },
  staticCSP: true,
  transformSpecification: function (swaggerObject) {
    return swaggerObject
  },
  transformSpecificationClone: true,
})

app.register(authRoutes)
app.register(userRoutes)

app.listen(
  {
    port: 3333,
    host: '0.0.0.0',
  },
  () => {
    console.log('HTTP server running on http://localhost:3333')
  },
)
