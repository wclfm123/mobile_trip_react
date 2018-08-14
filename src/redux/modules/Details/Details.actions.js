/**
 * 结伴列表
 * by WangChuan
 */
const type = utils.creator('DETAILS');

/**
 * 获取结伴列表
 */
export function getDetailsInfo(id) {
    return {
        types: [type('GET_DETAILS_INFO')],
        promise: (client) => client.get(`/mate/${id}`)
    };
}
