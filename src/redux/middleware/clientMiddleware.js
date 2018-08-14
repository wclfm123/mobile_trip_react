export default function clientMiddleware(client) {
    return ({ dispatch, getState }) => next => action => {
        if (typeof action === 'function') return action(dispatch, getState); // action为函数，直接执行

        const { promise, types, callback, ...rest } = action; // 从action获取type、异步请求，回调函数

        if (!promise) return next(action); // 如果没有异步请求，只执行dispaction

        const actionPromise = promise(client); // 如果存在异步请求，定义promise对象

        $.showPreloader(); // 显示loadding 层
        switch (types.length) {
            case 1: {
                const [SUCCESS] = types;
                actionPromise.then(
                    data => {
                        $.hidePreloader();
                        callback && callback(data.result);
                        if (data.success) {
                            next({ ...rest, ...data.result, type: SUCCESS });
                        } else {
                            $.alert(data.msg);
                        }
                    },
                    err => {
                        $.hidePreloader();
                        $.alert(err.message);
                    }
                );
                return actionPromise;
            }
            case 2: {
                const [SUCCESS, FAILURE] = types;
                actionPromise.then(
                    result => { $.hidePreloader(); next({ ...rest, result, type: SUCCESS }); },
                    error => { $.hidePreloader(); next({ ...rest, error, type: FAILURE }); }
                );
                return actionPromise;
            }
            case 3: {
                const [REQUEST, SUCCESS, FAILURE] = types;
                next({ ...rest, type: REQUEST });
                actionPromise.then(
                    result => { $.hidePreloader(); next({ ...rest, result, type: SUCCESS }); },
                    error => { $.hidePreloader(); next({ ...rest, error, type: FAILURE }); }
                );
                return actionPromise;
            }
            default: {
                console.error('参数types异常');
                return Promise.reject({ message: '参数types异常' });
            }
        }
    };
}
