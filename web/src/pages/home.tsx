import styles from '../styles/Home.module.css'
import Link from 'next/link';

const linkButton = (buttonName:string, link:string) => {
  return(
  <Link href={link}>
    <button 
      className="bg-orange-500 px-6 py-4 rounded-full text-white font-bold text-sm uppercase hover:bg-orange-300"
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
      <main className='flex flex-col items-center justify-center h-screen bg-orange-100'>
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
