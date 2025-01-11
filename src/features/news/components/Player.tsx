import classNames from "classnames";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useState } from "react";
import Marquee from "react-fast-marquee";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import { vinylImg } from "@/assets/images";
import { pixSong, pouSong, rojaoSong } from "@/assets/songs";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

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
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length,
    );
  };

  const toggleIsHoveringMarquee = () =>
    setIsHoveringMarquee((prevValue) => {
      return prevValue === true ? false : true;
    });

  return (
    <Card className="card-shadow-lg w-[200px]">
      <CardHeader className="m-2 flex h-[150px] flex-col items-center justify-between rounded-[8px] border p-4">
        <img
          src={vinylImg}
          className={classNames({
            "h-20 w-20 select-none": true,
            "animate-spin duration-1000": isPlaying,
          })}
          draggable={false}
        />

        <div
          className="max-w-full select-none text-sm text-gray-400"
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

      <CardFooter className="flex items-center justify-center pb-0">
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
