import { FastifyInstance } from "fastify";
import {prisma} from "../lib/prisma";
import {z} from "zod";
import { JwtService } from '../jwtService/jwtService';

export async function userRoutes(fastify: FastifyInstance){
  // ************************************ create user
  fastify.post('/user', async (request, reply) => {

    const getUserParams = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        actualCompany: z.string(),
        birthDate: z.string().datetime()
    })

    const inputUser = getUserParams.parse(request.body);
    
    const user = await prisma.user.findUnique({
      where : {
        email: inputUser.email
      }
    });

    if(user){
      return reply.status(400).send("User already registered");
    }

    const createdUser = await prisma.user.create({
      data: {
        name: inputUser.name,
        email: inputUser.email,
        password: inputUser.password,
        actualCompany: inputUser.actualCompany,
        birthDate: inputUser.birthDate
      }
    });

    const token = await JwtService.generateToken({ userId: createdUser.id, login: createdUser.email });

    return reply.status(201).send(token);
  });

  // ************************************ get user
  fastify.get('/user/:userId', async (request, reply) => {

    // --- validate variables
    const getUserParams = z.object({
        userId: z.string()
    });

    const {userId} = getUserParams.parse(request.params);
    
    // --- search for friends
    const user = await prisma.user.findUnique({
      where : {
        id: userId
      },
      include: {
        friends: true,
        friendBy: true
      }
    });

    if(user){
      user.password = '';
      return reply.status(201).send(user);
    } else {
      return reply.status(400).send("User not found!");
    }


  });
  
};

