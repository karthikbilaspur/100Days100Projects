const initialState = {
    menuItems: [],
};

const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_MENU_ITEMS':
            return { ...state, menuItems: action.payload };
        default:
            return state;
    }
};

export default menuReducer;