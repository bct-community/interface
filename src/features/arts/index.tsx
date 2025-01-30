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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

import { type Arts as ArtsType, useArts } from "./api/getArts";
import { NewArtData, useRegisterArt } from "./api/registerArt";
import { useRegisterArtMetrics } from "./api/registerArtMetric";
import Image from "./components/Image";
import "./style/index.css";
import "./style/lineOne.css";
import "./style/lineThree.css";
import "./style/lineTwo.css";

const Arts = () => {
  const { toast } = useToast();
  const { data, isFetching, isFetchingNextPage } = useArts();
  const { mutate: registerArtMutate, isSuccess, isError } = useRegisterArt();
  const { mutate: registerArtMetricsMutate } = useRegisterArtMetrics();

  const [openImage, setOpenImage] = useState<boolean | null>(false);
  const [imageData, setImageData] = useState<Partial<
    ArtsType["arts"][number]
  > | null>(null);
  const [newArt, setNewArt] = useState<NewArtData>({
    creator: "",
    xProfile: "",
    description: "",
    file: null,
  });

  const arts = data?.pages.flatMap((page) => page.arts) || [];

  const lastArtId = arts[arts.length - 1]?._id;

  useEffect(() => {
    document.title = "Comunidade $BCT – Artes";
    window.scrollTo(0, 0);
    return () => {
      document.title = "Comunidade $BCT";
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Arte registrada com sucesso!",
        description: "A arte será submetida para aprovação.",
      });
    }

    if (isError) {
      toast({
        title: "Erro ao registrar arte.",
        description: "Tente novamente mais tarde.",
      });
    }
  }, [isSuccess, isError]);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNewArt((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const maxSize = 10 * 1024 * 1024;
      const allowedTypes = /^image\//;

      if (!allowedTypes.test(file.type)) {
        toast({
          title: "Erro ao enviar imagem.",
          description: "O arquivo deve ser uma imagem.",
        });

        event.target.value = "";
        return;
      }

      if (file.size > maxSize) {
        toast({
          title: "Erro ao enviar imagem.",
          description: "A imagem deve ter no máximo 10MB.",
        });

        event.target.value = "";
        return;
      }

      setNewArt((prev) => ({ ...prev, file }));
    }
  };

  const registerArt = () => {
    registerArtMutate(newArt);
    registerArtMetricsMutate({ xProfile: newArt.xProfile });
  };

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
            <p className="z-[30] mb-4 inline-flex h-10 select-none items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-2xl font-medium transition-colors hover:cursor-pointer hover:bg-transparent hover:font-bold hover:underline focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:hover:text-slate-50">
              [Criar uma nova arte]
            </p>
          </SheetTrigger>
          <SheetContent className="space-between mt-[30px] flex h-full w-[400px] select-none flex-col sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Criar nova arte</SheetTitle>
              <SheetDescription>
                A arte será submetida para aprovação.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="creator" className="text-left">
                  Criador
                </Label>
                <div className="flex">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-r-0 rounded-r-none"
                    disabled
                  >
                    <AtSign />
                  </Button>
                  <Input
                    id="creator"
                    value={newArt.creator}
                    placeholder="Criador"
                    onChange={onChange}
                    className="col-span-3 rounded-l-none"
                  />
                </div>
              </div>

              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="xProfile" className="text-left">
                  Link do X
                </Label>
                <div className="flex">
                  <Button
                    variant="outline"
                    className="border-r-0 rounded-r-none"
                    disabled
                  >
                    https://x.com/
                  </Button>
                  <Input
                    id="xProfile"
                    value={newArt.xProfile}
                    placeholder="Perfil do X"
                    onChange={onChange}
                    className="col-span-3 rounded-l-none"
                  />
                </div>
              </div>

              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="description" className="text-left">
                  Descrição
                </Label>
                <Textarea
                  placeholder="Escreva a descrição aqui"
                  value={newArt.description}
                  id="description"
                  maxLength={200}
                  onChange={onChange}
                  className="max-h-[100px]"
                />
              </div>

              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="image" className="text-left">
                  Imagem
                </Label>
                <Input
                  id="image"
                  type="file"
                  className="col-span-3"
                  onChange={onFileChange}
                  accept="image/*"
                />
              </div>
            </div>
            <SheetFooter className="pb-4 mt-auto">
              <SheetClose asChild>
                <Button type="submit" onClick={registerArt}>
                  Enviar
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <div className="grid grid-cols-1 gap-8 px-8 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, colIndex) => (
            <div key={colIndex} className="flex min-w-[250px] flex-col gap-8">
              {arts
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
