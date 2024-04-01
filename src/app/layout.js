"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { getJwtCookie, dgb, setCookie, getCookie, dbg, getUserFromJwt } from "@/utils/method";
import { useEffect } from 'react';
import { makeRequest } from '@/utils/api.js';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {

  const router = useRouter();

  useEffect(() => {
    const jwt = getJwtCookie();

    const tryAth = async () => {
      const request = await makeRequest('/api/tryauth', 'POST', null, false,jwt);
      dbg(`status first layout is ${request.status}`)

      if (request.status != 200) {
        router.push('/');
        setCookie('usrname', "");

      }

      // const usr_id = getUserFromJwt(jwt);
      // dbg(usr_id['user_id']);
      

      if (!getCookie('usrname')) {
        const request_user = await makeRequest('/api/getuser', 'POST', null,false,jwt);
        setCookie('usrname', request_user['data']['user']);




      }
      setCookie('athstatus', request.status);


    }
    tryAth();

  }, [router]);




  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
