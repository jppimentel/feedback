import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthentication } from '../components/useAuthentication';
import Head from 'next/head';
import Navbar from '../components/navbar';
import ListCards from '../components/listCards';
import FeedbackCard from '../components/feedbacksCards';
import {defaultApi} from "../services/defaultApi";

export default function FeedbackReceived() {
  const router = useRouter();
  const { authenticated, isLoading } = useAuthentication();
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loadedFeedbacks, setLoadedFeedbacks] = useState(false);
  const [noFeedbacks, setNoFeedbacks] = useState(false);
  const [lastFeedbackAccepted, setLastFeedbackAccepted] = useState("");

  const handleFeedbackAccepted = (feedbackId: string) => {
    setLastFeedbackAccepted(feedbackId);
  };

  useEffect(() => {
    if (!authenticated && !isLoading) {
      router.push('/');
    }
  }, [authenticated, isLoading, router]);

  useEffect(() => {
    const getFeedbacks = async () => {
      await defaultApi
      .get("/feedback/received/"+localStorage.getItem('userId'),{})
      .then((data) => {
        setFeedbacks(data.data);
        setLoadedFeedbacks(true);
        if(data && data.data && data.data.length === 0){
          setNoFeedbacks(true);
        }
        console.log("feedbacks received now: "+ JSON.stringify(feedbacks))
      }).catch(err => {
        console.log("error: "+err);
      });

    }
    if (localStorage.getItem('isTokenValid') && localStorage.getItem('userId')) {
      getFeedbacks();
    }
  }, [lastFeedbackAccepted]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!authenticated) {
    return <div>Você não está autenticado.</div>;
  }
  
  return (
    <>
      <Head>
        <title>Feedback</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='h-screen'>
        <Navbar activeButton='received' />
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between mb-4 mt-4">
            <h1 className="text-2xl text-gray-800 font-bold ml-4">Feedbacks Recebidos</h1>
          </div>
          {noFeedbacks === false && loadedFeedbacks === true && feedbacks.map((feedback, index) => (
            <ListCards 
              key={"feedbackReceived" + index}   
              listType={"feedbacks"}
              index={"received" + index}
              title={"Orientador: " + feedback.fromUserName}
              info1={"Último Feedback: " + returnMaxDate(feedback.feedbacksData)}
              info2={"Total de Feedbacks: " + feedback.feedbacksData.length}
              approvalSent={false}
              approvalWaiting={feedback.feedbacksData.some((feedback: any) => feedback.status === "WAITING")}
              feedbackCards={true}
            >
                <FeedbackCard feedbacks={feedback.feedbacksData} collaborator={feedback.fromUserName} collaboratorId={feedback.fromUserId} type="received" onFeedbackSent={handleFeedbackAccepted}/>
            </ListCards>
          ))}
          {noFeedbacks === false && loadedFeedbacks === false && (
            <p className='ml-4'>Carregando...</p>
          )}

          {noFeedbacks === true && loadedFeedbacks === true && (
            <p className='ml-4'>Você ainda não recebeu feedbacks.</p>
          )}
        </div>
      </main>
    </>
  );
}


function returnMaxDate(feedbacksData: any[]): string {
  const maxDate = feedbacksData.reduce((max: any, feedback: any) => {
    const feedbackDate = new Date(feedback.date);
    return feedbackDate > max ? feedbackDate : max;
  }, new Date('1900-01-01')); 

  const day = String(maxDate.getDate()).padStart(2, '0');
  const month = String(maxDate.getMonth() + 1).padStart(2, '0');
  const year = maxDate.getFullYear();
  const hours = String(maxDate.getHours()).padStart(2, '0');
  const minutes = String(maxDate.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
