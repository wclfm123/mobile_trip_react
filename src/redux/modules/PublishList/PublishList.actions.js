/**
 * 结伴列表
 * by WangChuan
 */
const type = utils.creator('Publishlist');

/**
 * 获取结伴列表
 */
export function getAllList(params) {
    return {
        types: [type('GET_ALL_PUBLISH')],
        promise: (client) => client.get('/mate/getAll', { params })
    };
}
