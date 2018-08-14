/**
 * 结伴列表
 * by WangChuan
 */
const type = utils.creator('PUBLISH');

/**
 * 获取结伴列表
 */
export function uploadFile(data, callback) {
    return {
        types: [type('UPLOAD_PIC')],
        promise: (client) => client.post(`/photo/uploadFile/`, { data }),
        callback
    };
}

export function addMate(data, callback) {
    return {
        types: [type('ADD_MATE')],
        promise: (client) => client.post(`/mate/add/`, { data }),
        callback
    };
}
