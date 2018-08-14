/**
 * 频率总览
 * by WangChuan
 */
const type = utils.creator('Publishlist');

export default (state = { listData: [] }, action) => {
    switch (action.type) {
        case type('GET_ALL_PUBLISH'): {
            return {
                ...state,
                listData: action.list
            };
        }
        default: {
            return state;
        }
    }
};
