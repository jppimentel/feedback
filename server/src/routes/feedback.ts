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
    
    // --- search for friends
    const feedbacks = await prisma.feedback.findMany({
      where : {
        fromUserId: userId
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
    
    // --- search for friends
    const feedbacks = await prisma.feedback.findMany({
      where : {
        toUserId: userId
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
    
    // --- create feedback data
    let createdFeedback;
    let createdFeedbackData = await prisma.feedbackData.create({
      data: {
        date: inputFeedback.date,
        currentRole: inputFeedback.currentRole,
        comments: inputFeedback.comments,
        status: STATUS.WAITING
      }
    });
    
    // --- search feedback
    const searchFeedback = await prisma.feedback.findFirst({
      where : {
        fromUserId: inputFeedback.fromUserId,
        toUserId:inputFeedback.toUserId
      }
    });
    
    // --- update/create feedback
    if(searchFeedback){
      if(searchFeedback?.feedbacksIds && searchFeedback.feedbacksIds.length > 0){
        searchFeedback.feedbacksIds.push(createdFeedbackData.id)
      } else {
        searchFeedback.feedbacksIds = [createdFeedbackData.id]
      }

      createdFeedback = await prisma.feedback.update({
        where: {
          id: searchFeedback.id
        },
        data: {
          fromUserId: inputFeedback.fromUserId,
          toUserId:inputFeedback.toUserId,
          feedbacksIds: searchFeedback.feedbacksIds
        }
      });

    } else {
      createdFeedback = await prisma.feedback.create({
        data: {
          fromUserId: inputFeedback.fromUserId,
          toUserId:inputFeedback.toUserId,
          feedbacksIds: [createdFeedbackData.id]
        }
      });
    }

    return reply.status(201).send(createdFeedback);
  });


  
};

