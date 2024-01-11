import { useState, useEffect, use } from "react";
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '/styles/Home.module.css';
import axios from 'axios';
import TypingAnimation from "./TypingAnimation";
import api from "@/api/api";
const inter = Inter({ subsets: ['latin'] });

interface ChatMessage {
  type: 'user' | 'bot';
  message: string;
}

export default function ChatUI() {
  const [inputValue, setInputValue] = useState<string>('');
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState([]);
  
 const fetchTransactions =async () => {
    const response = await api.get('/transactions/');

    setTransactions(response.data);
 } ;

 useEffect(()=>{
  fetchTransactions();
 },[]);

 const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }]);

  sendMessage(inputValue);
  
  setInputValue('');
};

  const sendMessage = (message: string) => {
    const url = process.env.NEXT_PUBLIC_API_URL + '/transactions/';
    
    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [{ "role": "user", "content": message }]
    };

    setIsLoading(true);

    axios.get(url).then((response) => {
      
      //console.log(response);
      console.log(response.data) ;
      setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: response.data[0].description }]);
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      console.log(error);
    });
  };

  return (
    
    <div className="container mx-auto">
      <div className="flex flex-col h-screen bg-gray-900 rounded-2xl">
        <div className="flex-grow p-6 min-h-[530px]">
          <div className="flex flex-col space-y-4">
            {
              chatLog.map((message, index) => (
                <div key={index} className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}>
                  <div className={`${
                    message.type === 'user' ? 'bg-purple-500' : 'bg-gray-800'
                  } rounded-lg p-4 text-white max-w-sm`}>
                    {message.message}
                  </div>
                </div>
              ))
            }
            {
              isLoading &&
              <div key={chatLog.length} className="flex justify-start">
                <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
                  <TypingAnimation />
                </div>
              </div>
            }
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex-none p-6" style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
          <div className="flex rounded-lg border border-gray-700 bg-gray-800">
            <input type="text" className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none" placeholder="Type your message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button type="submit" className="bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}
