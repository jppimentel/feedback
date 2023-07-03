import React, { useState } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import Head from 'next/head'

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordMismatch(false);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setPasswordMismatch(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
 
    }
  };
  
  return (
    <>
      <Head>
        <title>Feedback</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex flex-col items-center justify-center min-h-screen bg-gray-800'>
        <div className="max-w-md w-full px-6 py-8 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
            <h1 className='text-white text-5xl font-bold mb-32'>meufeedback.com</h1>
              <input
                type="email"
                className="border border-gray-300 px-3 py-2 rounded-md mb-4 w-60"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="border border-gray-300 px-3 py-2 rounded-md mb-4 pr-10 w-60"
                  placeholder="Senha"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button
                  className="absolute top-2 right-2"
                  onClick={handleTogglePasswordVisibility}
                >
                  {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                className="border border-gray-300 px-3 py-2 rounded-md mb-4 w-60"
                placeholder="Confirmar Senha"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {passwordMismatch && (
                <p className="text-red-500 text-sm mb-4">As senhas não coincidem.</p>
              )}
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md w-60"
                onClick={handleRegister}
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
        
      </main>
    </>
  )
}
