import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from "react";
import {Grid, ActionIcon, Box, Button, Image, Modal, Slider, useMantineTheme} from "@mantine/core";
import {Pencil, Trash} from "tabler-icons-react";
import Cropper from "react-easy-crop";
import "./cropper.min.css";
import {DialogActions, DialogContent, Typography} from "@mui/material";
import {useModal} from "../../hooks/useModal";
import {usePostImgMutation, usePostProductCategoriesMutation} from "../../services";
import * as y from "yup";
import {useFormik} from "formik";
import base64ToImageFile from "../../../helpers/helper";

const validationSchema = y.object({
    images: y.array().required(),
});

type ImagePickerProp = {
    width?: number | string;
    result?: string;
    aspectRatio?: number;
    defaultImage?: string;
    propsOnChange?: any;
};

export const ImagePicker = (props: ImagePickerProp) => {
    const theme = useMantineTheme();
    const {width, result = "", aspectRatio = 1, defaultImage, propsOnChange} = props;
    const [onSubmit, {data: resultImg}] = usePostImgMutation();
    const inputRef = useRef<any>();
    const [dataUrl, setDataUrl] = useState<string>();
    const [fetchImageStatus, setFetchImageStatus] = useState<boolean>();
    const [isTooLarge, setIsToLarge] = useState<boolean>(false);
    const [modal, setModal] = useModal();
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState<string>();
    const [crop, setCrop] = useState({x: 0, y: 0})
    const [zoom, setZoom] = useState(1)
    const [resultUrl, setResultUrl] = useState("")
    const [name, setName] = useState("")
    const [urlImg, setUrlImg] = useState("")

    console.log(urlImg)

    const handleSubmit = (values: { images: any; }) => {
        if (!urlImg) {
            onSubmit({ images: values.images })
                .then((result:any) => {
                    console.log(result?.data.data)
                    setUrlImg(result?.data.data)
                    propsOnChange(result?.data.data)
                })
                .catch((error) => {
                    console.error('API call error!', error);
                });
        } else {
            propsOnChange(urlImg)
        }
    };

    const {values, errors, submitForm, setFieldValue} = useFormik({
        validationSchema,
        initialValues: {
            images: [],
        },
        onSubmit: handleSubmit,
    })

    const handleOnEditRequest = (item: any) => {
        setModal("edit", true);
    };
    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])
    function croppingImage(croppedAreaPixel: any, propsDataUrl: any) {
        let img = new window.Image();
        img.src = propsDataUrl;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = croppedAreaPixel.width;
            canvas.height = croppedAreaPixel.height;

            if (context) {
                context.drawImage(
                    img,
                    croppedAreaPixel.x,
                    croppedAreaPixel.y,
                    croppedAreaPixel.width,
                    croppedAreaPixel.height,
                    0,
                    0,
                    croppedAreaPixel.width,
                    croppedAreaPixel.height
                );
                let croppedImageData = canvas.toDataURL();

                const fileCropped = base64ToImageFile(croppedImageData, name)
                setCroppedImage(croppedImageData);
                setFieldValue("images", [fileCropped])
            }
        };

        return croppedImage;
    }
    const handleImageCropClick = async () => {
        await croppingImage(croppedAreaPixels, dataUrl)
        await setModal("edit", false)
    }
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
                if (file.size < 5242880) {
                    setName(file.name)
                    setFieldValue("images", [file])
                    reader.readAsDataURL(file);
                } else {
                    setIsToLarge(true);
                }
            }
        }
    };
    useEffect(() => {
        const getImage = async () => {
            if (defaultImage) {
                try {
                    fetch(defaultImage)
                        .then((response) => response.blob())
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

    useEffect(() => {
        setResultUrl(result)
    }, []);


    return (
        <div className="flex flex-col">
            <div
                className="imagaPicker"
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
                <>
                    {!resultUrl ? <>
                        <input
                            ref={inputRef}
                            type="file"
                            style={{display: "none"}}
                            onChange={handleOnChange}
                            accept="image/*"
                        />
                        {isTooLarge && fetchImageStatus ? (
                            <p style={{color: "red"}}>Ukuran file terlalu besar. Max: 5MB</p>
                        ) : (
                            !dataUrl && <p>Ukuran Maksimal adalah 5MB</p>
                        )}
                        {fetchImageStatus ?
                            dataUrl ? (
                                <div className={"flex flex-col"}>
                                    <Image src={croppedImage ? croppedImage : dataUrl} />
                                    <ActionIcon
                                        color="blue"
                                        sx={{
                                            position: "absolute",
                                            top: 5,
                                            right: 35,
                                            background: "white"
                                        }}
                                        onClick={handleOnEditRequest}
                                    >
                                        <Pencil/>
                                    </ActionIcon>

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
                                        <Trash/>
                                    </ActionIcon>
                                    <Modal
                                        opened={modal.edit}
                                        onClose={() => setModal("edit", false)}
                                        size="xl">
                                        <DialogContent
                                            dividers
                                            sx={{
                                                background: '#333',
                                                position: 'relative',
                                                height: 400,
                                                width: 'auto',
                                                minWidth: { sm: 500 },
                                            }}
                                        >

                                            <Cropper
                                                image={dataUrl}
                                                crop={crop}
                                                zoom={zoom}
                                                aspect={aspectRatio}
                                                onCropChange={setCrop}
                                                onCropComplete={onCropComplete}
                                                onZoomChange={setZoom}
                                            />
                                        </DialogContent>

                                        <DialogActions sx={{ flexDirection: 'column', mx: 3, my: 2 }}>
                                            <Box sx={{width: "100%", mb: 1}}>
                                                <Slider
                                                    value={zoom}
                                                    min={1}
                                                    max={3}
                                                    step={0.01}
                                                    aria-labelledby="Zoom"
                                                    onChange={(zoom: any) => {
                                                        setZoom(zoom)
                                                    }}
                                                />
                                            </Box>
                                        </DialogActions>


                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'end',
                                                marginTop: theme.spacing.md
                                            }}
                                        >
                                            <Button
                                                variant="outline"
                                                onClick={() => setModal("edit", false)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                // --------------------------------- BELUM TERINTEGRASI ---------------------------------------------------------
                                                onClick={handleImageCropClick}
                                                sx={{
                                                    marginLeft: theme.spacing.md
                                                }}
                                            >
                                                Saves
                                            </Button>
                                        </Box>
                                    </Modal>
                                </div>
                            ) : (
                                <Button
                                    color={isTooLarge ? "error" : "primary"}
                                    onClick={handleOnClick}
                                >
                                    Pick Image
                                </Button>
                            ) : setFetchImageStatus(true)
                        }
                    </> :
                        <>
                            <Image src={resultUrl} />
                            <ActionIcon
                                color="red"
                                sx={{
                                    position: "absolute",
                                    top: 5,
                                    right: 5,
                                    background: "white"
                                }}
                                onClick={() => setResultUrl("")}
                                >
                                <Trash/>
                            </ActionIcon>
                        </>
                    }
                    </>
            </div>
            <Grid
                mt={8}
                mr={1}
                justify={"flex-end"}
            >
                <Button
                    variant="outline"
                    color={"primary"}
                    size={"xs"}
                    onClick={submitForm}
                >
                    Upload
                </Button>
            </Grid>
        </div>
    );
};
