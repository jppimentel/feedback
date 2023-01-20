import { FastifyInstance } from "fastify";
import {prisma} from "../lib/prisma";
import {z} from "zod";
import { STATUS } from "../config/friendsVariables";

export async function friendsRoutes(fastify: FastifyInstance){

  // ************************************ create a new friendship
  fastify.post('/friend', async (request, reply) => {

    // --- validate variables
    const getFriendsParams = z.object({
        fromUserId: z.string(),
        toUserEmail: z.string()
    })

    const inputFriend = getFriendsParams.parse(request.body);
    
    const fromUser = await prisma.user.findUnique({
      where : {
        id: inputFriend.fromUserId
      }
    });

    const toUser = await prisma.user.findUnique({
      where : {
        email: inputFriend.toUserEmail
      }
    });

    if(!fromUser || !toUser || fromUser.id === toUser.id ){
      return reply.status(400).send("User not found");
    }

    // --- validate friendship 
    const fromFriend = await prisma.friend.findMany({
      where : {
        userId: fromUser.id,
        friendId: toUser.id
      }
    });

    const toFriend = await prisma.friend.findMany({
      where : {
        userId: toUser.id,
        friendId: fromUser.id
      }
    });

    if(fromFriend.length > 0 || toFriend.length > 0){
      return reply.status(400).send("Friendship request has already been sent");
    }

    // --- create from user friend
    const fromUserFriend = await prisma.friend.create({
      data: {
        userId: fromUser.id,
        friendId: toUser.id,
        waitingResponse: toUser.id,
      }
    }); 

    if(fromUser.friendsIds && fromUser.friendsIds.length > 0){
      fromUser.friendsIds.push(fromUserFriend.id)
    } else {
      fromUser.friendsIds = [fromUserFriend.id]
    }

    await prisma.user.update({
      where: {
        id: fromUser.id
      },
      data: {
        name: fromUser.name,
        email: fromUser.email,
        actualCompany: fromUser.actualCompany,
        birthDate: fromUser.birthDate,
        friendsIds: fromUser.friendsIds 
      }
    });

    // --- create to user friend
    const toUserFriend = await prisma.friend.create({
      data: {
        userId: toUser.id,
        friendId: fromUser.id,
        waitingResponse: toUser.id,
      }
    }); 

    if(toUser.friendsIds && toUser.friendsIds.length > 0){
      toUser.friendsIds.push(toUserFriend.id)
    } else {
      toUser.friendsIds = [toUserFriend.id]
    }

    await prisma.user.update({
      where: {
        id: toUser.id
      },
      data: {
        name: toUser.name,
        email: toUser.email,
        actualCompany: toUser.actualCompany,
        birthDate: toUser.birthDate,
        friendsIds: toUser.friendsIds 
      }
    });

    return reply.status(201).send(fromUserFriend);
  });

  // ************************************ get friendships
  fastify.get('/friend/:userId', async (request, reply) => {

    // --- validate variables
    const getUserParams = z.object({
        userId: z.string()
    });

    const {userId} = getUserParams.parse(request.params);
    
    // --- search for friends
    const friends = await prisma.friend.findMany({
      where : {
        userId: userId
      }
    });

    return reply.status(201).send(friends);
  });

  // ************************************ accept friendship
  fastify.post('/friend/accept', async (request, reply) => {

    // --- validate variables
    const getFriendParams = z.object({
        id: z.string(),
        acceptingUserId: z.string()
    });

    const {id, acceptingUserId} = getFriendParams.parse(request.body);
    
    const acceptingFriend = await prisma.friend.findUnique({
      where : {
        id: id
      }
    });

    const sendingFriend = await prisma.friend.findFirst({
      where : {
        userId: acceptingFriend?.friendId,
        friendId: acceptingFriend?.userId
      }
    });

    if(!acceptingFriend || !sendingFriend){
      return reply.status(400).send("Friendship request not found");
    }

    if(acceptingFriend.waitingResponse !== acceptingUserId || sendingFriend.waitingResponse !== acceptingUserId){
      return reply.status(400).send("The user can't accept this friendship request");
    }

    // --- update friendship
    const updatedAcceptingFriend = await prisma.friend.update({
      where: {
        id: acceptingFriend.id
      },
      data: {
        waitingResponse: STATUS.ACCEPT 
      }
    });

    const updatedSendingFriend = await prisma.friend.update({
      where: {
        id: sendingFriend.id
      },
      data: {
        waitingResponse: STATUS.ACCEPT 
      }
    });

    return reply.status(201).send({updatedAcceptingFriend, updatedSendingFriend});
  });


  
};

