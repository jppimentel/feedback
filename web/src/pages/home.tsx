import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const linkButton = (buttonName:string, link:string) => {
  return(
  <Link href={link}>
    <button 
      className="bg-blue-500 px-6 py-4 rounded-full text-white font-bold text-sm uppercase hover:bg-blue-600"
      style={{ width: '250px'}}
    >
      {buttonName}
    </button>
  </Link>
  )
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Feedback</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex flex-col items-center justify-center h-screen bg-gray-800'>
        <div className='py-16'>
          <h1 className='text-white text-5xl font-bold'>meufeedback.com</h1>
        </div>
        <div className="container mx-auto p-4 ">
          <div className='flex flex-col items-center space-y-4'>
            {linkButton('Minhas Informações', '/myInformations')}
            {linkButton('Feedbacks Enviados', '/feedbackSent')}
            {linkButton('Feedbacks Recebidos', '/feedbackReceived')}
            {linkButton('Meus Amigos', '/myFriends')}
          </div>
        </div>
        
      </main>
    </>
  )
}
