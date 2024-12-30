import { useState } from "react";
import classNames from "classnames";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { SkipBack, Pause, Play, SkipForward } from "lucide-react";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Marquee from "react-fast-marquee";

import { vinylImg } from "@/assets/images";
import { pixSong, pouSong, rojaoSong } from "@/assets/songs";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHoveringMarquee, setIsHoveringMarquee] = useState(false);

  const songs = [
    {
      title: "The Song Remains the Same",
      author: "Led Zeppelin",
      audio: rojaoSong,
      authorPost: "https://youtube.com/?query=ledzeppelin",
    },
    {
      title: "pou estourado",
      author: "mojang",
      audio: pouSong,
      authorPost: "https://youtube.com/?query=slashsnakepit",
    },
    {
      title: "e o pix nada",
      author: "nubank",
      audio: pixSong,
      authorPost: "https://youtube.com/?query=gunsnroses",
    },
  ];

  const currentSong = songs[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
  };

  const toggleIsHoveringMarquee = () =>
    setIsHoveringMarquee((prevValue) => {
      return prevValue === true ? false : true;
    });

  return (
    <Card className="w-[200px] card-shadow-lg">
      <CardHeader className="flex flex-col items-center justify-between p-4 m-2 border rounded-[8px] h-[150px]">
        <img
          src={vinylImg}
          className={classNames({
            "select-none w-20 h-20": true,
            "animate-spin duration-1000": isPlaying,
          })}
          draggable={false}
        />

        <div
          className="max-w-full text-sm text-gray-400 select-none"
          onMouseEnter={toggleIsHoveringMarquee}
          onMouseLeave={toggleIsHoveringMarquee}
        >
          <Marquee
            play={isPlaying || isHoveringMarquee}
            pauseOnHover={isPlaying}
          >
            <span className="mr-1">{currentSong.title} -</span>
            <span className="mr-1">
              <a
                href={currentSong.authorPost}
                target="_blank"
                className="hover:text-[hsl(var(--primary))] hover:underline"
              >
                {currentSong.author}
              </a>{" "}
              -
            </span>
          </Marquee>
        </div>
      </CardHeader>

      <CardFooter className="flex justify-center items-center pb-0">
        <AudioPlayer
          src={currentSong.audio}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          autoPlay={false}
          loop={false}
          muted={false}
          volume={0.5}
          onClickNext={handleNext}
          onClickPrevious={handlePrevious}
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
