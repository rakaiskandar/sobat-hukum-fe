"use client"

import dayjs from 'dayjs'
import 'dayjs/locale/id'
import React, { useEffect, useState } from 'react'
import HeaderProfile from './HeaderProfile';
import { useSession } from 'next-auth/react';

const HeaderDashboard = () => {
  const { data: session } = useSession();

  dayjs.locale('id'); 
  const formatDate = dayjs().format("dddd, D MMMM YYYY");
  const [greeting, setGreeting] = useState<string | any>("");

  useEffect(() => {
    const now = new Date().getHours();

    if (4 <= now && now <= 11) {
      setGreeting({
        emoji: "🌄",
        greet: "Selamat Pagi, ",
      });
    } else if (12 <= now && now <= 14) {
      setGreeting({
        emoji: "🌞",
        greet: "Selamat Siang, ",
      });
    } else if (15 <= now && now <= 18) {
      setGreeting({
        emoji: "🌆",
        greet: "Selamat Sore, ",
      });
    } else {
      setGreeting({
        emoji: "🌃",
        greet: "Selamat Malam, ",
      });
    }
  }, []);

  return (
      <nav className="p-4 h-[110px] border-b flex flex-col justify-between">
        <h4>{formatDate}</h4>
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">
            <span className="text-3xl">{greeting.emoji}</span>{greeting.greet} 
            <span>{`${session?.user.username ? session.user.username : "..."}`}</span>
          </div>
          <div className="flex items-center gap-6">
            <HeaderProfile img={`${session?.user.profile ? session?.user.profile : 'https://github.com/shadcn.png'}`} />
          </div>
        </div>
      </nav>
    );
};

export default HeaderDashboard;