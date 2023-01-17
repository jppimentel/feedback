import Fastify from 'fastify';
import { userRoutes } from './routes/user';

async function bootstrap() {
   const fastify = Fastify({
        logger: true, 
   });

   await fastify.register(userRoutes);
    
    await fastify.listen({port: 3333, host: '0.0.0.0'});
};

bootstrap();
