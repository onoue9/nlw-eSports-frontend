import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import logoImg from '../../assets/logo-nlw-esports.svg';
import { DuoBanner } from '../../components/DuoBanner';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

interface Duo {
  id: string;
  name: string;
  yearsPlaying: number;
  hourStart: string;
  hourEnd: string;
  weekDays: string[];
  useVoiceChannel: boolean;
}

export function Game() {
  const { gameName } = useParams();
  const [duos, setDuos] = useState<Duo[]>([]);
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    axios('https://nlw-esports-backend.onrender.com/games')
      .then(response => setGame(
        response.data.find(
          (game: Game) => game.title === gameName
        )))
  }, []);

  useEffect(() => {
    const id = game?.id;
    if (id) {
      console.log(id)
      axios(`https://nlw-esports-backend.onrender.com/games/${id}/ads`)
        .then(response => setDuos(response.data))
    }
  }, [game])

  
  
  return (
    <div className="w-screen sm:max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <NavLink to="/nlw-esports-frontend/">
        <img src={logoImg} alt="" />
      </NavLink>

      <div className="flex flex-col items-center justify-center mt-20">
        <div className="w-auto">
          <img
            className="rounded-md"
            src={game?.bannerUrl}
            alt="Game banner"
          />
        </div>
        <div className="flex flex-col items-center justify-center my-10">
          <strong className="text-2xl text-white font-black bloack">
            {gameName}
          </strong>
          <span className="text-zinc-400 block">
            Conecte-se e comece a jogar!
          </span>
        </div>
      </div>

      <div className="flex flex-row">
        {duos.length > 0 ? duos.map(duo => (
          <DuoBanner 
            key={duo.id}
            id={duo.id}
            name={duo.name}
            yearsPlaying={duo.yearsPlaying}
            hourStart={duo.hourStart}
            hourEnd={duo.hourEnd}
            weekDays={duo.weekDays}
            useVoiceChannel={duo.useVoiceChannel}
            bannerUrl={game?.bannerUrl}
            title={gameName}
            adsCount={game?._count.ads}
          />
        )) : <p className="w-52 h-8 rounded-md flex justify-center items-center bg-zinc-700 text-white">Nenhum anúncio</p>
      }
      </div>
    </div>
  )
}