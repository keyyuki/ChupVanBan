import { NAVIGATE, GOBACK} from './Types';

export const navigate = (page, params = null) => {
    return (dispath, getState) => {
        dispath({
            type: NAVIGATE,
            page: page,
            params: params
        });
    }
}

export const goBack = (page=null) => {
    return {
            type: GOBACK,
            page: page
            
        };
    
}