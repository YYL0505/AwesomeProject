
initialState = {
    isLoading: true
};

const loading = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_LOADING_ON':
            return Object.assign({}, state, {
                isLoading: true,
            });
        case 'TOGGLE_LOADING_OFF':
            return Object.assign({}, state, {
                isLoading: false,
            });
        default:
            return state;
    }
};

export default loading;