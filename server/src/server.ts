import Fastify from 'fastify';
import { userRoutes } from './routes/user';
import { friendsRoutes } from './routes/friends';
import { feedbackRoutes } from './routes/feedback';

async function bootstrap() {
   const fastify = Fastify({
        logger: true, 
   });

   await fastify.register(userRoutes);
   await fastify.register(friendsRoutes);
   await fastify.register(feedbackRoutes);
    
    await fastify.listen({port: 3333, host: '0.0.0.0'});
};

bootstrap();
