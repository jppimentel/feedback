import Head from 'next/head'
import Navbar from '../components/navbar'
import ListCards from '../components/listCards';
import { FaPlus } from 'react-icons/fa'

const feedbacks = [
  {
    leader: 'João das Neves',
    lastFeedback: '05/12/2022',
    totalFeedbacks: '1',
    approved: true

  },
  {
    leader: 'Maria das Flores',
    lastFeedback: '23/05/2023',
    totalFeedbacks: '4',
    approved: false
  }
];


export default function FeedbackReceived() {
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
          {feedbacks.map((feedback, index) => (
            <ListCards 
              index={"received"+index}
              title={"Orientador: "+feedback.leader}
              approved={feedback.approved}
              info1={"Último Feedback: "+feedback.lastFeedback}
              info2={"Total de Feedbacks: "+feedback.totalFeedbacks}
            />
          ))}
        </div>
      </main>
    </>
  );
}
