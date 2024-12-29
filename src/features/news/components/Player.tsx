import { useState } from "react";
import classNames from "classnames";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { SkipBack, Pause, Play, SkipForward } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import vinyl from "@/assets/lp.png";
import fogos from "@/assets/rojao-super-estourado.mp3";
import pou from "@/assets/pou-estourado_zIWCpMy.mp3";
import pix from "@/assets/e-o-pix-nada-ainda.mp3";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSong = {
    title: "xyz",
    author: "abcd",
    audio: fogos,
  };

  const songs = [
    {
      title: "xyz",
      author: "abcd",
      audio: fogos,
    },
    {
      title: "pou estourado",
      author: "mojang",
      audio: pou,
    },
    {
      title: "e o pix nada",
      author: "nubank",
      audio: pix,
    },
  ];

  return (
    <Card className="w-[20%]">
      <CardHeader>
        <div className="relative flex justify-center items-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center">
            <img
              src={vinyl}
              className={classNames({
                "animate-spin duration-1000": isPlaying,
              })}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="text-center">
        <h2 className="text-xl font-bold ">{currentSong.title}</h2>
        <p className="text-sm text-gray-400">{currentSong.author}</p>
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <AudioPlayer
          src={currentSong.audio}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          autoPlay={false}
          loop={false}
          muted={false}
          volume={0.5}
          // onClickNext={}
          // onClickPrevious={}
          showFilledProgress={false}
          showJumpControls={false}
          showSkipControls={true}
          customIcons={{
            next: <SkipForward size={24} />,
            previous: <SkipBack size={24} />,
            play: <Play size={24} />,
            pause: <Pause size={24} />,
          }}
          customAdditionalControls={[]}
        />
      </CardFooter>
    </Card>
  );
};

export default Player;
