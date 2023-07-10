import { useEffect, useRef, useState } from "react";
import { ActionIcon, Button } from "@mantine/core";
import { Trash } from "tabler-icons-react";
import Cropper from "react-cropper";
import "./cropper.min.css";
import {promise} from "zod";

type ImagePickerProp = {
  width?: number | string;
  result?: (result: string) => void;
  aspectRatio?: number;
  defaultImage?: string;
};

export const ImagePicker = (props: ImagePickerProp) => {
  const { width, result, aspectRatio = 1, defaultImage } = props;

  const inputRef = useRef<any>();

  const [dataUrl, setDataUrl] = useState<string>();
  const [fetchImageStatus, setFetchImageStatus] = useState<boolean>();
  const [isTooLarge, setIsToLarge] = useState<boolean>(false);

  const cropperRef = useRef<HTMLImageElement>(null);
  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    result && result(cropper.getCroppedCanvas().toDataURL());
  };

  const handleOnClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleOnChange = () => {
    setIsToLarge(false);
    if (inputRef.current) {
      const reader = new FileReader();

      reader.onload = () => {
        setIsToLarge(false);
        const result = reader.result as string;
        setDataUrl(result);
          setFetchImageStatus(true)
      };

      if (inputRef.current.files) {
        const file = inputRef.current.files[0];
        if (file.size < 1000000) {
          reader.readAsDataURL(file);
        } else {
          setIsToLarge(true);
        }
      }
    }
  };

  useEffect(() => {
    const getImage = async () => {
        console.log(defaultImage)
      if (defaultImage) {
          try {
              fetch(defaultImage)
                  .then((response) => {
                      if(response.ok) {
                          return response.blob()}else {
                          throw new Error("Oops, something went wrong!");
                      }
                    }
                  )
                  .then((result) => {
                      const reader = new FileReader();
                      reader.readAsDataURL(result);
                      reader.onloadend = () => {
                          setDataUrl(reader.result as string);
                      };
                      setFetchImageStatus(true)
                  });
          } catch (e) {
              setFetchImageStatus(false)
              setDataUrl("failed to fetch image")
          }
      }
    };

    getImage();
  }, []);

  return (
    <div
      style={{
        position: "relative",
        border: `1px solid ${isTooLarge ? "#ff0000" : "#cecece"}`,
        borderRadius: 4,
        width: width ?? "100%",
        minHeight: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleOnChange}
        accept="image/*"
      />
        {!fetchImageStatus && (
            <>
                <p>Gagal memuat gambar! Unggah ulang dengan Ukuran Maksimal adalah 1MB</p>
                <Button
                    color={isTooLarge ? "error" : "primary"}
                    onClick={handleOnClick}
                >
                    Pick Image
                </Button>
            </>
        )}
        {fetchImageStatus && (
            isTooLarge ? (
            <p style={{ color: "red" }}>Ukuran file terlalu besar. Max: 1MB</p>
            ) : (
            !dataUrl && <p>Ukuran Maksimal adalah 1MB</p>
            )
        )}
        {fetchImageStatus && (
            dataUrl ? (
                <>
                    <Cropper
                        src={dataUrl}
                        style={{ height: 400, width: "100%" }}
                        // Cropper.js options
                        initialAspectRatio={aspectRatio}
                        aspectRatio={aspectRatio}
                        guides={false}
                        crop={onCrop}
                        ref={cropperRef}
                    />

                    <ActionIcon
                        color="red"
                        sx={{
                            position: "absolute",
                            top: 5,
                            right: 5,
                            background: "white"
                        }}
                        onClick={() => setDataUrl(undefined)}
                    >
                        <Trash />
                    </ActionIcon>
                </>
            ) : (
                <Button
                    color={isTooLarge ? "error" : "primary"}
                    onClick={handleOnClick}
                >
                    Pick Image
                </Button>
                )
            )
        }
    </div>
  );
};
