'use client';
import Link from 'next/link';
import terra from '../public/terra.png';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface player {
  user_id: number;
  username: string;
  email: string;
}

export default function Dashboard() {
  const [players, setPlayers] = useState<player[]>([]);

  async function getPlayerInfo() {
    const getPlayersINFO = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const res = await fetch(
      `${process.env.MYSQL_HOST}/api/players`,
      getPlayersINFO
    );
    const response = await res.json();
    setPlayers(response.results);
  }
  useEffect(() => {
    getPlayerInfo();
  }, []);

  return (
    <div className="flex flex-col min-w-max min-h-screen bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white">
      <main className="flex-1 self-center py-12 md:py-24 lg:py-32">
        <section className="container px-4 md:px-6 space-y-10 xl:space-y-16">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Welcome to Game Stats Tracker
                </h1>
                <p className="max-w-[600px] text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Track your board game statistics and improve your strategy.
                </p>
              </div>
            </div>
            <Image
              alt="Board games"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              height="550"
              src={terra}
              width="550"
            />
          </div>
          <div className="bg-purple-900 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Player Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-sm">Games Played:</p>
              <p className="text-sm">-</p>
              <p className="text-sm">Wins:</p>
              <p className="text-sm">-</p>
              <p className="text-sm">Losses:</p>
              <p className="text-sm">-</p>
            </div>
          </div>
          <div className="bg-inherit text-slate-300">
            <h2 className="text-2xl font-bold mb-4">Players</h2>
            {players.map((player: player) => {
              return (
                <div key={player.user_id}>
                  <p>{player.username}</p>
                  <p>{player.email}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-white">
        <p className="text-xs">
          © 2023 Game Stats Tracker. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
