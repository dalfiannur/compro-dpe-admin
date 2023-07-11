import React, {useCallback, useEffect, useRef, useState} from "react";
import {ActionIcon, Box, Button, Image, Input, Modal, Slider, useMantineTheme} from "@mantine/core";
import {Pencil, Trash} from "tabler-icons-react";
import Cropper from "react-easy-crop";
import "./cropper.min.css";
import {useDisclosure} from "@mantine/hooks";
import {DialogActions, DialogContent, Typography} from "@mui/material";

type ImagePickerProp = {
    width?: number | string;
    result?: (result: string) => void;
    aspectRatio?: number;
    defaultImage?: string;
};

export const ImagePicker = (props: ImagePickerProp) => {

    const theme = useMantineTheme();

    const {width, result, aspectRatio = 1, defaultImage} = props;

    const inputRef = useRef<any>();

    const [dataUrl, setDataUrl] = useState<string>();
    const [fetchImageStatus, setFetchImageStatus] = useState<boolean>();
    const [isTooLarge, setIsToLarge] = useState<boolean>(false);


    const [croppedImage, setCroppedImage] = useState<string>();

    const cropperRef = useRef<HTMLImageElement>(null);

    const [crop, setCrop] = useState({x: 0, y: 0})
    const [zoom, setZoom] = useState(1)

    const [opened, { open, close }] = useDisclosure(false);

    function onCropComplete(data: any, propsDataUrl: any){
        // console.log(croppedArea, croppedAreaPixels)
        // console.log(data, propsDataUrl)

        const {x, y, width, height} = data

        let img: any = new window.Image()

        img.src = propsDataUrl

        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        if (context) context.drawImage(img, x, y, width, height, 0, 0, width, height);

        let croppedImageData = canvas.toDataURL();

        setCroppedImage(croppedImageData)
        // console.log(croppedImageData)
    }

    // const onCrop = () => {
    //   const imageElement: any = cropperRef?.current;
    //   const cropper: any = imageElement?.cropper;
    //   result && result(cropper.getCroppedCanvas().toDataURL());
    // };

    const handleOnClick = () => {
        if (inputRef.current) inputRef.current.click();
    };

// ------------------- BELUM TERINTEGRASI ------------------------------------------------------------------------
    const handleImageCropClick = () => {
        setDataUrl(croppedImage)
    }

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
                if (file.size < 5000000) {
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



    return (
        // @ts-ignore
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
                    <>
                        <Image src={dataUrl} />
                        {/*<Cropper*/}
                        {/*    image={dataUrl}*/}
                        {/*    crop={crop}*/}
                        {/*    zoom={zoom}*/}
                        {/*    aspect={aspectRatio}*/}
                        {/*    onCropChange={setCrop}*/}
                        {/*    onCropComplete={onCropComplete}*/}
                        {/*    onZoomChange={setZoom}*/}

                        {/*    // src={dataUrl}*/}
                        {/*    // style={{ height: 400, width: "100%" }}*/}
                        {/*    // // Cropper.js options*/}
                        {/*    // initialAspectRatio={aspectRatio}*/}
                        {/*    // aspectRatio={aspectRatio}*/}
                        {/*    // guides={false}*/}
                        {/*    // crop={onCrop}*/}
                        {/*    // ref={cropperRef}*/}
                        {/*/>*/}

                        <ActionIcon
                            color="blue"
                            sx={{
                                position: "absolute",
                                top: 5,
                                right: 35,
                                background: "white"
                            }}
                            onClick={open}
                        >
                            <Pencil/>
                        </ActionIcon>


{/*-------------------------- MODAL CROPING OVERLAY -----------------------------------------------------------*/}
                        <Modal opened={opened} onClose={close} size="xl">
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
                                    onCropComplete={(data) => {onCropComplete(data, dataUrl)}}
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
                                    onClick={close}
                                    variant="outline"
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
                    </>
                ) : (
                    <Button
                        color={isTooLarge ? "error" : "primary"}
                        onClick={handleOnClick}
                    >
                        Pick Image
                    </Button>
                ) : setFetchImageStatus(true)
            }
        </div>
    );
};
