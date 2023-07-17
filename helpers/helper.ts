export default function base64ToImageFile(base64String: string, fileName: string): File {
    // Remove the data URI prefix
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');

    // Convert base64 to binary
    const binaryData = atob(base64Data);

    // Create a Uint8Array from the binary data
    const uint8Array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
    }

    // Create a Blob from the Uint8Array
    const blob = new Blob([uint8Array], { type: 'image/png' }); // Change the type accordingly if the image is not PNG

    // Create a File from the Blob
    const imageFile = new File([blob], fileName, {
        lastModified: new Date().getTime(),
    });

    return imageFile;
}
