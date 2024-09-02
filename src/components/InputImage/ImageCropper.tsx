import { Box, Button, Modal, Slider } from "@mantine/core";
import { DialogContent } from "@mui/material";
import * as y from "yup";
import { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import base64ToImageFile from "../../../helpers/helper";
import { useFormik } from "formik";
import { usePostImgMutation } from "../../services";
import Compressor from "compressorjs";

const validationSchema = y.object({
    images: y.array().required(),
});

type ImageCropperProp = {
    open: any;
    image: any;
    onClose: any;
    onCropCancel: any;
    aspectRatio: any;
    setUrlImg: any;
    showImageFile: any;
    propsOnChange: any;
};

export const ImageCropper = (props: ImageCropperProp) => {
    const {
        image,
        onClose,
        onCropCancel,
        open,
        aspectRatio,
        setUrlImg,
        showImageFile,
        propsOnChange
    } = props;
    const defaultCrop = { x: 0, y: 0 };
    const defaultZoom = 1;
    const [crop, setCrop] = useState(defaultCrop);
    const [zoom, setZoom] = useState(defaultZoom);
    const [imageFile, setImageFile] = useState<any>();
    const [croppedAreaPixels, setCroppedAreaPixels] =
        useState(null);
    const [onSubmit, { data: resultImg }] =
        usePostImgMutation();

    const handleSubmit = (values: { images: any }) => {
        onSubmit({ images: values.images })
            .then((result: any) => {
                setUrlImg(result?.data.data);
                showImageFile(imageFile);
                propsOnChange(result?.data.data)
            })
            .catch((error) => {
                console.error("API call error!", error);
            });
    };

    const { values, errors, submitForm, setFieldValue } =
        useFormik({
            validationSchema,
            initialValues: {
                images: null,
            },
            onSubmit: handleSubmit,
        });

    const compressBase64Image = (
        base64Str: string,
        quality: number = 0.6
    ): Promise<string> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = base64Str;

            img.onload = () => {
                const canvas =
                    document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx?.drawImage(img, 0, 0);

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            new Compressor(blob, {
                                quality,
                                success(result) {
                                    const reader =
                                        new FileReader();
                                    reader.readAsDataURL(
                                        result
                                    );
                                    reader.onloadend =
                                        () => {
                                            resolve(
                                                reader.result as string
                                            );
                                        };
                                },
                                error(err) {
                                    reject(err);
                                },
                            });
                        } else {
                            reject(
                                new Error(
                                    "Failed to create blob"
                                )
                            );
                        }
                    },
                    "image/jpeg", // Specify the format you want
                    quality // Specify the quality of the image (0 to 1)
                );
            };

            img.onerror = () => {
                reject(new Error("Failed to load image"));
            };
        });
    };

    const [croppedArea, setCroppedArea] =
        useState<any>(null);

    const onCropComplete = (
        croppedArea: any,
        croppedAreaPixels: any
    ) => {
        setCroppedArea(croppedAreaPixels);
    };

    const onCropDone = (croppedAreaPixel: any) => {
        let imageObj = new window.Image();
        imageObj.src = image;

        imageObj.onload = async () => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = croppedAreaPixel.width;
            canvas.height = croppedAreaPixel.height;

            if (context) {
                context.drawImage(
                    imageObj,
                    croppedAreaPixel.x,
                    croppedAreaPixel.y,
                    croppedAreaPixel.width,
                    croppedAreaPixel.height,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
                let croppedImageData = canvas.toDataURL();

                const compressedImage =
                    await compressBase64Image(
                        croppedImageData,
                        0.6
                    );
                const fileCropped = base64ToImageFile(
                    compressedImage,
                    "images"
                );

                setImageFile(compressedImage);

                setFieldValue("images", [fileCropped]);
            }
        };
    };

    const handleImageCropClick = (
        croppedAreaPixels: any
    ) => {
        onCropDone(croppedAreaPixels);
        onClose();
    };

    useEffect(() => {
        if (values.images != null) {
            submitForm();
        }
    }, [values.images]);

    return (
        <Modal
            transition="fade"
            opened={open}
            onClose={onCropCancel}
            size="xl"
        >
            <DialogContent
                sx={{
                    background: "#fff",
                    position: "relative",
                    height: 400,
                    width: "100%",
                }}
            >
                <Cropper
                    image={image}
                    aspect={aspectRatio}
                    crop={crop}
                    zoom={zoom}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    style={{
                        containerStyle: {
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#fff",
                        },
                    }}
                />
            </DialogContent>
            <DialogContent>
                <Box sx={{ width: "100%", mb: 1 }}>
                    <Slider
                        value={zoom}
                        min={1}
                        max={5}
                        step={0.01}
                        label={null}
                        onChange={(zoom: any) => {
                            setZoom(zoom);
                        }}
                    />
                </Box>
            </DialogContent>
            <Box
                sx={{
                    display: "flex",
                }}
            >
                <Button
                    variant="outline"
                    onClick={() => {
                        setCrop(defaultCrop);
                        setZoom(defaultZoom);
                        onCropCancel();
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        handleImageCropClick(croppedArea);
                    }}
                >
                    Saves
                </Button>
            </Box>
        </Modal>
    );
};
