import {ActionIcon, Button, InputWrapper} from "@mantine/core";
import {Trash} from "tabler-icons-react";
import {ImageUploader} from "../../../components/ImageUploader";
import React, {useState} from "react";

type MultiImageControl = {
    errorMessage: any,
    propsOnChange?: any,
    defaultImageUrl?: any,
    defaultImage?: any
}

export const MultiImageControl = (props: MultiImageControl) => {
    const {errorMessage, propsOnChange, defaultImageUrl, defaultImage} = props

    const [imageList, setImageList] = useState<any>(defaultImage ? defaultImage : [""])
    const [imageListUrl, setImageListUrl] = useState<any>(defaultImageUrl ? defaultImageUrl : "")

    const handleAddImage = () => {
        const array = [...imageList]
        array.splice(imageList.length + 1, 0, "")

        setImageList(array)

        // console.log(imageList)
    }

    const handleDeleteImage = () => {
        // console.log(index)
        const length = imageList.length - 1
        const array = imageList
        const arrayUrl = imageListUrl
        // console.log(array)
        // if (index >= 0) {
        array.splice(length, 1)
        arrayUrl.splice(length, 1)
        setImageList(array)
        setImageListUrl(arrayUrl)
        propsOnChange(imageList)
        // }

        // for (let i = length; i >= 0; i--) {
        //     if (!i == index)
        // }
        // console.log(imageList)
    }


    // console.log(defaultImageUrl[5])
    return (
        <>
            {imageList.map((item: any, index: number) => {
                return (
                    <InputWrapper
                        required
                        label="Featured Image"
                        error={errorMessage}
                        key={item}
                    >
                        <ImageUploader
                            defaultImage={defaultImageUrl[index] ? defaultImageUrl[index]: [""]}
                            propsOnChange={(value:any) => {
                                let imgTemp: any;
                                imgTemp = imageList;
                                imgTemp[index] = value[0]
                                setImageList(imgTemp)
                                propsOnChange(imageList)
                                console.log(imageList)
                            }
                            }
                        />
                    </InputWrapper>
                )
            })}

            {/*<ActionIcon*/}
            {/*    color="red"*/}
            {/*    sx={{*/}
            {/*        background: "white"*/}
            {/*    }}*/}
            {/*    onClick={() => handleDeleteImage()}*/}
            {/*>*/}
            {/*    <Trash/>*/}
            {/*</ActionIcon>*/}

            <div>
                <Button color="red" onClick={() => handleDeleteImage()}>Delete Image</Button>

                <Button onClick={handleAddImage}>Add Image</Button>
            </div>

        </>
    )
}