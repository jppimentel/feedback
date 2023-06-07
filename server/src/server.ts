import Fastify from 'fastify';
import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/user';
import { friendsRoutes } from './routes/friends';
import { feedbackRoutes } from './routes/feedback';
import fastifyCors from '@fastify/cors';

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  // Registrar o plugin @fastify/cors
  fastify.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await fastify.register(authRoutes);
  await fastify.register(userRoutes);
  await fastify.register(friendsRoutes);
  await fastify.register(feedbackRoutes);

  await fastify.listen({
    port: 3333,
    host: '0.0.0.0',
  });
}

bootstrap();
