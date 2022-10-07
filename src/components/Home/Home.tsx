import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import { useEffect, useState } from "react";
import { CreateAdBanner } from "../CreateAdBanner";
import { CreateAdModal } from "../CreateAdModal";
import { GameBanner } from "../GameBanner";
import logoImg from '../../assets/logo-nlw-esports.svg';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

export function Home() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('https://nlw-esports-backend-onoue9.herokuapp.com/games')
      .then(response => setGames(response.data));
  }, []);
  
  return (
    <div className="w-screen sm:max-w-[1344px] mx-auto flex flex-col items-center justify-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-4xl text-center text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-6 gap-6 mt-16">
        {games.map(game => (
          <GameBanner
            key={game.id}
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsCount={game._count.ads}
          />
        ))}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}