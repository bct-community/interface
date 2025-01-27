import { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import { type Arts, useArts } from "./api/getArts";
import Image from "./components/Image";
import "./style/index.css";
import "./style/lineOne.css";
import "./style/lineThree.css";
import "./style/lineTwo.css";

const Arts = () => {
  const [openImage, setOpenImage] = useState<boolean | null>(false);
  const [imageData, setImageData] = useState<Partial<
    Arts["arts"][number]
  > | null>(null);

  useEffect(() => {
    document.title = "Comunidade $BCT – Artes";
    return () => {
      document.title = "Comunidade $BCT";
    };
  }, []);

  const { data, isFetching } = useArts();

  const arts = data?.arts || [];

  return (
    <>
      <div className="mt-[20px] flex flex-col items-center justify-center">
        <div className="brinks" id="text-container">
          <div className="brinks" id="line-one">
            <h1>Artes & Memes</h1>
          </div>
          <div className="brinks" id="line-two">
            <h1>Comunidade</h1>
          </div>
          <div className="brinks" id="line-three">
            <h1>$BCT</h1>
          </div>
        </div>

        <p className="z-[100] mb-4 inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-2xl font-medium text-slate-50 transition-colors hover:cursor-pointer hover:bg-transparent hover:font-bold hover:text-slate-50 hover:underline focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:hover:text-slate-50">
          [Criar uma nova arte]
        </p>

        <div className="grid grid-cols-1 gap-8 px-8 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, colIndex) => (
            <div key={colIndex} className="flex min-w-[250px] flex-col gap-8">
              {isFetching
                ? Array.from({ length: 3 }).map((_, index) => (
                    <ImageSkeleton height={350} key={index} />
                  ))
                : arts
                    .filter((_, index) => index % 3 === colIndex) // Distribui as imagens entre as colunas
                    .map((art, index) => (
                      <Image
                        key={index}
                        url={art.url}
                        creator={art.creator}
                        xProfile={art.xProfile}
                        description={art.description}
                        openFullscreen={() => setOpenImage(true)}
                        setImageData={setImageData}
                      />
                    ))}
            </div>
          ))}
        </div>
      </div>

      {openImage && imageData && (
        <FullscreenCarrousel
          src={imageData.url || ""}
          creator={imageData.creator || ""}
          xLink={imageData.xProfile || ""}
          description={imageData.description || ""}
          closeFullscreen={() => setOpenImage(false)}
        />
      )}
    </>
  );
};

export default Arts;

const FullscreenCarrousel = ({
  src,
  creator,
  xLink,
  description,
  closeFullscreen,
}: {
  src: string;
  creator: string;
  xLink: string;
  description: string;
  closeFullscreen: () => void;
}) => {
  return (
    <div className="fixed left-0 top-0 z-[1001] flex h-screen w-screen items-center justify-center bg-black/80">
      <div
        className="fixed right-0 top-0 z-[1000] h-screen w-screen"
        onClick={closeFullscreen}
      />

      <div className="relative z-[1002] flex max-h-[90vh] max-w-[90vw] items-center justify-center">
        <Image
          url={src}
          creator={creator}
          xProfile={xLink}
          isFullscreen={true}
          description={description}
          closeFullscreen={closeFullscreen}
          setImageData={() => {}}
        />
      </div>
    </div>
  );
};

const ImageSkeleton = ({ height }: { height: number }) => {
  return (
    <Skeleton
      style={{
        height: `${height}px`,
        minWidth: "330px",
        width: "100%",
        maxWidth: "600px",
      }}
      className="rounded-2xl"
    />
  );
};
