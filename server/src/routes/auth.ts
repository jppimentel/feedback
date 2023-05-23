import { FastifyInstance } from "fastify";
import {prisma} from "../lib/prisma";
import {z} from "zod";
import { JwtService } from '../jwtService/jwtService';
import { JwtVerify } from '../jwtService/jwtVerify';

export async function authRoutes(fastify: FastifyInstance){
  // ************************************ login - get token jwt
  fastify.post('/login', async (request, reply) => {

    const getUserParams = z.object({
        email: z.string(),
        password: z.string()
    })

    const inputUser = getUserParams.parse(request.body);
    
    try{
      const user = await prisma.user.findUnique({
        where : {
          email: inputUser.email
        }
      });
  
      if(!user){
        return reply.status(400).send("Email not found!");
      }
      if(user?.password !== inputUser.password){
        return reply.status(400).send("Incorrect password!");
      }
  
      const token = await JwtService.generateToken({ userId: user.id, login: user.email });
  
      return reply.status(201).send(token);
    }catch(e){
      return reply.status(400).send(e);
    }
    
  });

  // ************************************ me - verify token jwt
  fastify.get('/me', async (request, reply) => { 
    try{
      const userToken = await JwtVerify(request.headers.authorization);
      
      if (typeof userToken !== "string" && userToken.hasOwnProperty("login")) {
        
        const user = await prisma.user.findUnique({
          where : {
            email: userToken.login
          }
        });
        
        if(!user){
          return reply.status(400).send("Email not found!");
        }
        
        user.password = "";
        return reply.status(201).send(user);
      } else {
        return reply.status(400).send(userToken);  
      }
      
    }catch(e){
      return reply.status(400).send(e);
    }
    
  });
  
};

