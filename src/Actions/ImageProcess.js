import {IMAGEPROCESS_SET_IMAGEINFO} from './Types'; 

export const setImageInfo = (info) => {
     return (dispath, getState) => {
        return dispath({
            type: IMAGEPROCESS_SET_IMAGEINFO,
            info
        });
    }
}