import { useRef, useState } from "react";
import { Button } from "@mui/material";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

type ImagePickerProp = {
  width?: number | string;
  result?: (result: string) => void;
};
export const ImagePicker = (props: ImagePickerProp) => {
  const { width, result } = props;

  const inputRef = useRef<any>();

  const [dataUrl, setDataUrl] = useState<string>();
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

  return (
    <div
      style={{
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
      {isTooLarge ? (
        <p style={{ color: "red" }}>Ukuran file terlalu besar. Max: 1MB</p>
      ) : (
        !dataUrl && <p>Ukuran Maksimal adalah 1MB</p>
      )}
      {dataUrl ? (
        <Cropper
          src={dataUrl}
          style={{ height: 400, width: "100%" }}
          // Cropper.js options
          initialAspectRatio={1}
          guides={false}
          crop={onCrop}
          ref={cropperRef}
        />
      ) : (
        <Button
          color={isTooLarge ? "error" : "primary"}
          variant="contained"
          onClick={handleOnClick}
        >
          Pick Image
        </Button>
      )}
    </div>
  );
};
