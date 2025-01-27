import { AtSign } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

import { type Arts as ArtsType, useArts } from "./api/getArts";
import Image from "./components/Image";
import "./style/index.css";
import "./style/lineOne.css";
import "./style/lineThree.css";
import "./style/lineTwo.css";

const Arts = () => {
  const [openImage, setOpenImage] = useState<boolean | null>(false);
  const [imageData, setImageData] = useState<Partial<
    ArtsType["arts"][number]
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

        <Sheet>
          <SheetTrigger asChild>
            <p className="z-[30] mb-4 inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-2xl font-medium text-slate-50 transition-colors hover:cursor-pointer hover:bg-transparent hover:font-bold hover:text-slate-50 hover:underline focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:hover:text-slate-50">
              [Criar uma nova arte]
            </p>
          </SheetTrigger>
          <SheetContent className="space-between mt-[30px] flex h-full w-[400px] flex-col sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="name" className="text-left">
                  Name
                </Label>
                <Input
                  id="name"
                  value="Pedro Duarte"
                  className="col-span-3"
                  onChange={() => {}}
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="username" className="text-left">
                  Username
                </Label>
                <div className="flex">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-r-0 rounded-r-none"
                  >
                    <AtSign />
                  </Button>
                  <Input
                    id="username"
                    value="@peduarte"
                    onChange={() => {}}
                    className="col-span-3 rounded-l-none"
                  />
                </div>
              </div>
            </div>
            <SheetFooter className="pb-4 mt-auto">
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

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
