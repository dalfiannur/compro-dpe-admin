export function base64ToBlob(base64String:string, type = 'image/png') {
    const base64Data = base64String.split(';base64,').pop() || "";
    const imageData = atob(base64Data);
    const arrayBuffer = new Uint8Array(imageData.length);

    for (let i = 0; i < imageData.length; i++) {
        arrayBuffer[i] = imageData.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type });
}
