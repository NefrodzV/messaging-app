import { Buffer } from "buffer"
export default function useUtils() {
    function imageHandler(image) {
        const buff = Buffer.from(image.binData.data)
        const url = `data:${image.mimeType};base64,${buff.toString('base64')}`
        return url
    }

    return {
        imageHandler
    }
}