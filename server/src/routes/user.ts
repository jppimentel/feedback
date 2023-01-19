import { FastifyInstance } from "fastify";
import {prisma} from "../lib/prisma";
import {z} from "zod";

export async function userRoutes(fastify: FastifyInstance){
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
      return reply.status(201).send("Usuário já cadastrado");
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
  
  fastify.get('/users/count', async () => {
    // const count = await prisma.user.count();   
    console.log("teste usuários");

    return "count";
  });
};

