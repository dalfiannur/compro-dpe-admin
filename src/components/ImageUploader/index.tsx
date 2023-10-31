import React, {useRef, useState} from "react";
import {usePostImgMutation} from "../../services";
import {Button, Image, Modal} from "@mantine/core";
import {useFormik} from "formik";
import * as y from "yup";
import {useModal} from "../../hooks/useModal";

type ImageUploader = {
    propsOnChange?: any
    defaultImage?: any
};

const validationSchema = y.object({
    images: y.array().required(),
});

export const ImageUploader = (props: ImageUploader) => {
    const {propsOnChange, defaultImage} = props;
    const [imageUrl, setImageUrl] = useState<string>("")
    const [createObjectURL, setCreateObjectURL] = useState<string>("")
    const inputRef = useRef<any>()
    const [urlLocal, setUrlLocal] = useState<string>("")
    const [onSubmit, {data: resultImg}] = usePostImgMutation();
    const [modal, setModal] = useModal();

    const handleUploaderImage = (item: any) => {
        setModal("edit", true);
    };

    const handleSubmit = (values: { images: any; }) => {
        if (createObjectURL) {
            console.log("change")
            onSubmit({ images: values.images })
                .then((result:any) => {
                    // console.log(result?.data.data)
                    setCreateObjectURL(result?.data.data)
                    propsOnChange(result?.data.data)
                    setUrlLocal(imageUrl)
                    setModal("edit", false);
                })
                .catch((error) => {
                    console.error('API call error!', error);
                });
        } else {
            console.log("elseChange")
            propsOnChange(createObjectURL)
        }
    };

    const {values, errors, submitForm, setFieldValue} = useFormik({
        validationSchema,
        initialValues: {
            images: [],
        },
        onSubmit: handleSubmit,
    })

    const handleOnClickUpload = (event: any) => {
        if (inputRef.current) inputRef.current.click()
    }

    const uploadToClient = (event: any) => {
        if (inputRef.current) {
            const reader = new FileReader()

            reader.onload = () => {
                const result = reader.result as string
                setCreateObjectURL(result)
                setImageUrl(result)
            }

            if (inputRef.current.files) {
                const file = inputRef.current.files[0]
                setFieldValue("images", [file])
                reader.readAsDataURL(file)
                console.log("upload success", file)
            }
        }
    };

    // console.log(!urlLocal ? defaultImage : urlLocal)

    return (
        <div style={{
            position: "relative",
            border: `1px solid #cecece`,
            borderRadius: 4,
            width: "100%",
            minHeight: 400,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
        }}>
            <Image src={urlLocal ? urlLocal : defaultImage} />
            <Modal opened={modal.edit} onClose={() => setModal("edit", false)} size="xl" title="Image Editor">
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 20
                }}>
                    <Image src={imageUrl}/>
                    <input ref={inputRef} style={{display: "none"}} type="file" name="Image" onChange={uploadToClient}/>

                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <Button onClick={handleOnClickUpload}>Choose Image</Button>
                        {imageUrl ? (
                            <Button onClick={submitForm}>Upload To Server</Button>
                        ):(
                            <Button disabled onClick={submitForm}>Upload To Server</Button>
                        )}
                    </div>
                </div>
            </Modal>
            <Button style={{width: 200}} onClick={handleUploaderImage}>Change Image Here</Button>
        </div>
    )
}