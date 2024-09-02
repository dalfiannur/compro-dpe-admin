import { Box, Button } from "@mantine/core"
import { useRef } from "react"

type FileInputProp = {
    onImageSelected : any
}

export const FileInput = (props : FileInputProp) => {
    const {onImageSelected} = props
    const inputRef = useRef<any>();

    //Handle when file is selected
    const handleOnChange = (event: any) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function (e) {
                onImageSelected(reader.result)
            }
        }
    }

    const onChooseImg = () => {
        inputRef.current.click();
    }

    return (
        <Box style={{zIndex: 50}}>
            <input 
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleOnChange}
                style={{display: "none"}}
            />
            <Button onClick={onChooseImg}>
                Upload Image Here
            </Button>
        </Box>

    )
}