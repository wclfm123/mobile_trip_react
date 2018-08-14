/**
 * 频率总览
 * by WangChuan
 */
const type = utils.creator('PUBLISH');

export default (state = { }, action) => {
    switch (action.type) {
        case type('UPLOAD_PIC'): {
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
