import { Buffer } from 'buffer';
import userIcon from '../assets/svgs/user.svg';
export default function useUtils() {
    function imageHandler(image) {
        if (!image || image === undefined) return userIcon;
        if (image.mimeType === undefined || !image.mimeType) return userIcon;
        if (image.binData === undefined || !image.binData) return userIcon;
        if (!image.binData.data || image.binData.data === undefined)
            return userIcon;
        const buff = Buffer.from(image.binData.data);
        const url = `data:${image.mimeType};base64,${buff.toString('base64')}`;
        return url;
    }

    return {
        imageHandler,
    };
}
