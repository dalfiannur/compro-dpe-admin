import { ActionIcon, Box, Image } from "@mantine/core";
import { useEffect, useState } from "react";
import { Crop, Trash } from "tabler-icons-react";
import { useModal } from "../../hooks/useModal";
import { FileInput } from "./FileInput";
import { ImageCropper } from "./ImageCropper";
import { url } from "inspector";

type ImagePickerProp = {
    propsOnChange?: any;
    imgRatio: any;
    defaultImage?: any;
};

export const InputImage = (props: ImagePickerProp) => {
    const { propsOnChange, imgRatio, defaultImage } = props;
    const [image, setImage] = useState<any>(null);
    const [isImage, setIsImage] = useState<boolean>(false);
    const [urlImg, setUrlImg] = useState("");
    const [modal, setModal] = useModal();

    const [currentPage, setCurrentPage] =
        useState<String>("choose-img");

    //When Image is Selected
    const onImageSelected = (selectedImg: string) => {
        setImage(selectedImg);
        setModal("edit", true);
    };

    //Callback Function Cropping Finished
    const showImageFile = (imageFile: any) => {
        setImage(imageFile);
    };

    //Callback Function Cropping Canceled
    const onCropCancel = () => {
        setModal("edit", false);
    };

    const ImageActionButton = (props: {
        activeImage: any;
    }) => {
        return (
            <div>
                <Image src={props.activeImage} />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "end",
                    }}
                >
                    <ActionIcon
                        color="blue"
                        onClick={() => {
                            setModal("edit", true);
                        }}
                    >
                        <Crop />
                    </ActionIcon>

                    <ActionIcon
                        color="red"
                        onClick={() => {
                            setImage(null);
                            setUrlImg("");
                        }}
                    >
                        <Trash />
                    </ActionIcon>
                </div>
            </div>
        );
    };

    useEffect(() => {
        const getImage = async () => {
            if (defaultImage || defaultImage != null) {
                try {
                    fetch(defaultImage)
                        .then((response) => response.blob())
                        .then((result) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(result);
                            reader.onloadend = () => {
                                setImage(reader.result as string);
                            };
                        });
                } catch (e) {
                    console.log("error fetch image")
                }
            }
        };

        getImage();
    }, [defaultImage]);

    return (
        <Box>
            {!image ? (
                <FileInput
                    onImageSelected={onImageSelected}
                />
            ) : (
                <ImageActionButton activeImage={image} />
            )}

            <ImageCropper
                open={modal.edit}
                image={image}
                onCropCancel={onCropCancel}
                onClose={() => setModal("edit", false)}
                aspectRatio={imgRatio}
                setUrlImg={setUrlImg}
                showImageFile={showImageFile}
                propsOnChange={propsOnChange}
            />
        </Box>
    );
};
