import classNames from "classnames";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Arts } from "../api/getArts";

const DownloadButton = ({
  downloadImage,
  placeholder = "download",
}: {
  downloadImage: () => void;
  placeholder?: string;
}) => (
  <button
    className="mt-auto flex h-8 min-h-8 min-w-8 items-center justify-center rounded-full bg-white px-2 transition-all duration-300 [filter:drop-shadow(0px_0px_2px_var(--coin-pink))] hover:scale-105 hover:[filter:drop-shadow(0px_0px_4px_var(--coin-pink))]"
    onClick={downloadImage}
  >
    <span className="arts-text text-[var(--coin-pink)]">{placeholder}</span>
  </button>
);

const Image = ({
  url,
  creator,
  xProfile,
  description,
  openFullscreen,
  closeFullscreen,
  setImageData,
  isFullscreen,
}: {
  url: string;
  creator: string;
  xProfile: string;
  description: string;
  openFullscreen?: () => void;
  closeFullscreen?: () => void;
  setImageData: (data: Partial<Arts["arts"][number]>) => void;
  isFullscreen?: boolean;
}) => {
  const openLink = () => {
    window.open(xProfile, "_blank");
  };

  const downloadImage = async () => {
    try {
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) throw new Error("Failed to fetch image");

      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = objectURL;
      link.download = "image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectURL);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const openImage = () => {
    if (!openFullscreen) return;
    openFullscreen();
    setImageData({ url, creator, xProfile, description });
  };

  return (
    <>
      <div
        className={classNames({
          "group relative flex max-h-[600px] max-w-[600px] cursor-pointer select-none items-center justify-center overflow-hidden rounded-2xl":
            true,
          "h-[500px] rounded-l-2xl bg-background md:rounded-r-none":
            isFullscreen,
        })}
        onClick={openImage}
      >
        <img
          className={classNames({
            "select-none object-cover transition-all duration-1000": true,
            "group-hover:scale-110": !isFullscreen,
            "group-hover:opacity-75": isFullscreen,
          })}
          style={{ color: "transparent" }}
          src={url}
          draggable={false}
        />

        {!isFullscreen && (
          <div className="absolute inset-0 hidden flex-col-reverse justify-between bg-[#0001] p-4 transition-colors duration-500 group-hover:flex dark:bg-[#0004]">
            <div className="flex flex-row items-center justify-between w-full">
              <p
                className="arts-text max-w-[125px] truncate text-[var(--coin-pink)] transition-all hover:underline dark:text-white dark:hover:text-[var(--coin-pink)]"
                onClick={openLink}
              >
                {creator}
              </p>

              <DownloadButton downloadImage={downloadImage} />
            </div>
          </div>
        )}
      </div>

      {isFullscreen && closeFullscreen && (
        <div className="hidden h-[500px] max-h-[500px] flex-col gap-4 overflow-hidden rounded-r-2xl border-l bg-background p-4 md:flex">
          <div className="flex items-center justify-between w-full">
            <p
              className="arts-text max-w-[125px] truncate text-[var(--coin-pink)] hover:cursor-pointer hover:underline"
              onClick={openLink}
            >
              {creator}
            </p>
            <Button
              onClick={closeFullscreen}
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              <X />
            </Button>
          </div>
          <p className="arts-description m-0 w-[180px] select-none overflow-y-auto text-pretty break-words pb-1 align-middle text-sm">
            {description}
          </p>

          <DownloadButton downloadImage={downloadImage} />
        </div>
      )}
    </>
  );
};

export default Image;
