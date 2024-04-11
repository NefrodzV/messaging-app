import { Buffer } from "buffer"
import userIcon from "../assets/user.svg"
export default function useUtils() {
    function imageHandler(image) {
        if(!image || image === undefined) return userIcon
        for(const [key, value] of Object.entries(image)) {
            if(!key || key === undefined) return userIcon
            if(!value || value === undefined) return userIcon
        }  
         
        const buff = Buffer.from(image.binData.data)
        const url = `data:${image.mimeType};base64,${buff.toString('base64')}`
        return url
    }

    return {
        imageHandler
    }
}