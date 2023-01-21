import { FastifyInstance } from "fastify";
import {prisma} from "../lib/prisma";
import {z} from "zod";

export async function userRoutes(fastify: FastifyInstance){
  // ************************************ create user
  fastify.post('/user', async (request, reply) => {

    const getUserParams = z.object({
        name: z.string(),
        email: z.string(),
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

    await prisma.user.create({
      data: {
        name: inputUser.name,
        email: inputUser.email,
        actualCompany: inputUser.actualCompany,
        birthDate: inputUser.birthDate
      }
    });

    return reply.status(201).send(inputUser);
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

    return reply.status(201).send(user);
  });
  
};

