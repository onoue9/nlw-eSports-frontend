import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import { useEffect, useState } from "react";

interface DuoBannerProps {
  id: string;
  name: string;
  yearsPlaying: number;
  hourStart: string;
  hourEnd: string;
  weekDays: string[];
  useVoiceChannel: boolean;
  bannerUrl?: string;
  title?: string;
  adsCount?: number;
}

interface Discord {
  discord: string;
}

export function DuoBanner(props: DuoBannerProps) {
  const [discord, setDiscord] = useState<Discord>();

  useEffect(() => {
    axios(`https://nlw-esports-backend-onoue9.herokuapp.com/ads/${props.id}/discord`)
      .then(response => setDiscord(response.data))
  })

  return (
    <div className="w-56 rounded-md p-5 mr-4 bg-zinc-700 flex flex-col gap-1">
    
      <p className="text-white">
        Nickname
      </p>
      <strong className="text-white">
        {props.name}
      </strong>
      

      <p className="text-white">
        Tempo de jogo
      </p>
      <strong className="text-white">
        {props.yearsPlaying} anos
      </strong>

      <p className="text-white">
        Disponibilidade
      </p>
      <strong className="text-white">
        {`${props.weekDays.length} dias \u2022 ${props.hourStart} - ${props.hourEnd}`} 
      </strong>

      <p className="text-white">
        Chamada de áudio
      </p>
      {props.useVoiceChannel ? <strong className="text-green-600">
        Sim
      </strong> : <strong className="text-red-600">
        Não
      </strong>}

      <Dialog.Root>
        <Dialog.Trigger className="w-full h-9 mt-2 rounded-md bg-violet-600 flex flex-row items-center justify-center hover:bg-violet-700">
          <p className="text-white">Conectar</p>
        </Dialog.Trigger>
        <Dialog.Portal className="relative rounded-lg overflow-hidden">
          <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>
          <Dialog.Content className="fixed bg-[#2A2634] py-8 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
            <div className="flex flex-col justify-center items-center">
              <Dialog.Title className="text-3xl font-black">Let's play!</Dialog.Title>
              <Dialog.Description className="text-zinc-300">
                Agora é só começar a jogar
              </Dialog.Description>
              <Dialog.Description className="mt-3">
                Adicione no Discord
              </Dialog.Description>
              <Dialog.Description
                className="h-10 w-52 bg-zinc-900 rounded-[4px] flex justify-center items-center"
              >
                {discord?.discord}
              </Dialog.Description>
              <Dialog.Close />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}