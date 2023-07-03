import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { defaultApi } from "../services/defaultApi";
import { useRouter } from 'next/router';

export default function AppWeb() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const data = await defaultApi.post("/login", {
        email: email,
        password: password,
      });
      localStorage.setItem('token', data.data);
      router.push('/home');
    } catch (error) {
      console.log("error: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    router.push('/register');
  };

  const checkServerStatus = async () => {
    try {
      const response = await defaultApi.get("/healthCheck");
      if (response.data === "live") {
        setIsConnecting(false);
      } else {
        setTimeout(checkServerStatus, 10000);
      }
    } catch (error) {
      setTimeout(checkServerStatus, 10000);
    }
  };

  useEffect(() => {
    checkServerStatus();
  }, []);


  return (
    <>
      <Head>
        <title>Feedback</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
        <div className="max-w-md w-full px-6 py-8 rounded-lg">
          <div className="flex flex-col items-center">
            <h1 className='text-white text-5xl font-bold mb-32'>meufeedback.com</h1>
            <input
              type="email"
              className="border border-gray-300 px-3 py-2 rounded-md mb-4 w-60"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              type="password"
              className="border border-gray-300 px-3 py-2 rounded-md mb-4 w-60"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            {isConnecting ? (
              <p className='text-white mt-4'>Conectando ao Servidor...</p>
            ) : (
              <>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md w-60 mb-4"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <Link href={'/register'}>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-md w-60"
                    onClick={handleSignUp}
                  >
                    Cadastro
                  </button>
                </Link>
                {isLoading && (
                  <p className='text-white mt-4'>Carregando...</p>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

