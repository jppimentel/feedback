import Head from 'next/head'
import Navbar from '../components/navbar'
import ListCards from '../components/listCards'
import AddItem from '../components/addItem'
import AddFeedback from '../components/addFeedback'
import FeedbackCard from '../components/feedbacksCards'
import { FaPlus } from 'react-icons/fa'

const feedbacks = [
  {
    collaborator: 'João das Neves',
    lastFeedback: '05/12/2022',
    totalFeedbacks: '1',
    approvalSent: true

  },
  {
    collaborator: 'Maria das Flores',
    lastFeedback: '23/05/2023',
    totalFeedbacks: '4',
    approvalSent: false
  },
  {
    collaborator: 'Apolinário do Rio',
    lastFeedback: '01/02/2023',
    totalFeedbacks: '2',
    approvalSent: false
  },
];

const cards = [
  {
    post: 'Card 1',
    date: '01/01/2023',
    comment: 'Ótimo funcionário',
  },
  {
    post: 'Card 2',
    date: '01/01/2023',
    comment: 'Ótimo funcionário',
  },
  {
    post: 'Card 3',
    date: '01/01/2023',
    comment: 'Ótimo funcionário',
  },
  {
    post: 'Card 4',
    date: '01/01/2023',
    comment: 'Ótimo funcionário',
  }
];


export default function FeedbackSent() {
  return (
    <>
      <Head>
        <title>Feedback</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='h-screen'>
        <Navbar activeButton='sent' />
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between mb-4 mt-4">
            <h1 className="text-2xl text-gray-800 font-bold ml-4">Feedbacks Enviados</h1>
            <AddItem> <AddFeedback startUser={null}/> </AddItem>
          </div>
          {feedbacks.map((feedback, index) => (
            <ListCards 
              index={"sent"+index}
              title={feedback.collaborator}
              info1={"Último Feedback: "+feedback.lastFeedback}
              info2={"Total de Feedbacks: "+feedback.totalFeedbacks}
              approvalSent={feedback.approvalSent}
              approvalWaiting={false}
              feedbackCards={true}
            >
              <FeedbackCard feedbacks={cards} collaborator={feedback.collaborator}/>
            </ListCards>
          ))}
        </div>
      </main>
    </>
  );
}
