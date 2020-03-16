export const createLoadingSelector = actions => state => actions.some(action => {
    return state.loading[action] === 'request';
});

export const createErrorSelector = actions => state => actions.some(action => {
    return state.loading[action] === 'error';
});