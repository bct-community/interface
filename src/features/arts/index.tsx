import { useEffect, useState } from "react";

import { type Arts as ArtsType, useArts } from "./api/getArts";
import {
  CreateNewArtSheet,
  FullscreenCarrousel,
  Image,
  ImageSkeleton,
} from "./components";
import "./style/index.css";
import "./style/lineOne.css";
import "./style/lineThree.css";
import "./style/lineTwo.css";

const Arts = () => {
  const { data, isFetching, isFetchingNextPage } = useArts();

  const [colNumber, setColNumber] = useState(3);
  const [openImage, setOpenImage] = useState<boolean | null>(false);
  const [imageData, setImageData] = useState<Partial<
    ArtsType["arts"][number]
  > | null>(null);

  const arts = data?.pages.flatMap((page) => page.arts) || [];

  const lastArtId = arts[arts.length - 1]?._id;

  const calculateColNumber = () => {
    const mobile = window.innerWidth < 768;
    const tablet = window.innerWidth < 1024;

    const getColNumber = (): number => {
      if (mobile) return 1;
      if (tablet) return 2;
      return 3;
    };

    setColNumber(getColNumber());
  };

  useEffect(() => {
    calculateColNumber();

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calculateColNumber, 150);
    };

    let timeoutId: ReturnType<typeof setTimeout>;
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.title = "Comunidade $BCT – Artes";
    window.scrollTo(0, 0);
    return () => {
      document.title = "Comunidade $BCT";
    };
  }, []);

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

        <CreateNewArtSheet />

        {arts.length === 0 && !isFetching && (
          <p className="w-full select-none text-center text-sm">
            Nenhuma arte encontrada.
          </p>
        )}

        <div className="grid grid-cols-1 gap-8 px-8 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(colNumber)].map((_, colIndex) => (
            <div key={colIndex} className="flex min-w-[250px] flex-col gap-8">
              {arts
                .filter((_, index) => index % colNumber === colIndex) // Distribui as imagens entre as colunas
                .map((art, index) => (
                  <Image
                    key={index}
                    url={art.url}
                    creator={art.creator}
                    xProfile={art.xProfile}
                    description={art.description}
                    openFullscreen={() => setOpenImage(true)}
                    setImageData={setImageData}
                    isLast={art._id === lastArtId}
                  />
                ))}

              {(isFetching || isFetchingNextPage) &&
                Array.from({ length: 12 }).map((_, index) => (
                  <ImageSkeleton height={350} key={index} />
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
