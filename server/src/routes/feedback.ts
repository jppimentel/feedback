import { FastifyInstance } from "fastify";
import {prisma} from "../lib/prisma";
import {z} from "zod";
import { STATUS } from "../config/feedbackVariables";

export async function feedbackRoutes(fastify: FastifyInstance){


  // ************************************ get sent feedbacks
  fastify.get('/feedback/sent/:userId', async (request, reply) => {

    // --- validate variables
    const getFeedbackParams = z.object({
        userId: z.string()
    });

    const {userId} = getFeedbackParams.parse(request.params);
    
    // --- search for feedback
    const feedbacks = await prisma.feedback.findMany({
      where : {
        fromUserId: userId
      },
      include: {
        feedbacksData: true
      }
    });

    return reply.status(201).send(feedbacks);
  });

  // ************************************ get received feedbacks
  fastify.get('/feedback/received/:userId', async (request, reply) => {

    // --- validate variables
    const getFeedbackParams = z.object({
        userId: z.string()
    });

    const {userId} = getFeedbackParams.parse(request.params);
    
    // --- search for feedback
    const feedbacks = await prisma.feedback.findMany({
      where : {
        toUserId: userId
      },
      include: {
        feedbacksData: true
      }
    });

    return reply.status(201).send(feedbacks);
  });

  // ************************************ create feedback
  fastify.post('/feedback', async (request, reply) => {

    // --- validate variables
    const getFeedbackParams = z.object({
      fromUserId: z.string(),
      toUserId: z.string(),
      date: z.string().datetime(),
      currentRole: z.string(),
      comments: z.string(),
    });

    const inputFeedback = getFeedbackParams.parse(request.body);
    
    // --- search feedback
    const searchFeedback = await prisma.feedback.findFirst({
      where : {
        fromUserId: inputFeedback.fromUserId,
        toUserId:inputFeedback.toUserId
      }
    });
    
    // --- update/create feedback
    let createdFeedback;
    if(searchFeedback){
      
      createdFeedback = await prisma.feedback.update({
        where: {
          id: searchFeedback.id
        },
        data: {
          fromUserId: inputFeedback.fromUserId,
          toUserId:inputFeedback.toUserId,
          feedbacksData: {
            create: [
              {
                date: inputFeedback.date,
                currentRole: inputFeedback.currentRole,
                comments: inputFeedback.comments,
                status: STATUS.WAITING
              }
            ]
          }
        }
      });

    } else {
      createdFeedback = await prisma.feedback.create({
        data: {
          fromUserId: inputFeedback.fromUserId,
          toUserId:inputFeedback.toUserId,
          feedbacksData: {
            create: [
              {
                date: inputFeedback.date,
                currentRole: inputFeedback.currentRole,
                comments: inputFeedback.comments,
                status: STATUS.WAITING
              }
            ]
          }
        }
      });
    }

    return reply.status(201).send(createdFeedback);
  });

  // ************************************ accept feedback
  fastify.post('/feedback/accept', async (request, reply) => {

    // --- validate variables
    const getFeedbackParams = z.object({
        id: z.string(),
        acceptingUserId: z.string(),
        status: z.string()
    });

    const {id, acceptingUserId, status} = getFeedbackParams.parse(request.body);
    
    const acceptingFeedback = await prisma.feedbackData.findUnique({
      where : {
        id: id
      },
      include: {
        feedback: true
      }
    });


    if(!acceptingFeedback){
      return reply.status(400).send("Feedback not found");
    }

    if(acceptingFeedback.feedback?.toUserId !== acceptingUserId){
      return reply.status(400).send("The user can't accept this feedback");
    }

    if(status !== STATUS.ACCEPT && status !== STATUS.DENIED){
      return reply.status(400).send("The status can't be accepted");
    }

    // --- update feedback
    const updatedFeedback = await prisma.feedbackData.update({
      where: {
        id: acceptingFeedback.id
      },
      data: {
        status: status 
      }
    });


    return reply.status(201).send(updatedFeedback);
  });


  
};

