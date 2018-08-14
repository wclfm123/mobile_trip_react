/**
 * 频率总览
 * by WangChuan
 */
const type = utils.creator('DETAILS');

export default (state = { }, action) => {
    switch (action.type) {
        case type('GET_DETAILS_INFO'): {
            return {
                ...state,
                detailsData: action
            };
        }
        default: {
            return state;
        }
    }
};
