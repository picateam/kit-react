import { API_REQUEST } from '../constants/cgiPath';

export function request(cgiName, params, opts = {}) {
    return (dispatch, getState) => {
        let action = {
            'API': {
                cgiName: cgiName,
                params: params,
                opts: opts
            },
            type: API_REQUEST
        };

        return dispatch(action);
    };
}
