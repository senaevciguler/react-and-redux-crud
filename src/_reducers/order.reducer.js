const initialState = { anchor: 'left',
    order: [],
    open: false,
    id: '',  
    quantity: '',
    subtotal: '',
    note: '',
    product: {
        id: '',  
        name: '',
        description: '',
        price: ''
    },
    customer: {
        id: '',  
        name: '',
        lastname: '',
        mail: '',
        gsm: '',
        address: ''
    }
 };


export function order(state = initialState, action) {
    switch (action.type) {
        case 'FETECHED_ALL_ORDER':
            return {
            ...state,
            order: action.order
            };
        case 'ORDER_DETAIL':
            return {
                ...state,
                id: action.id,  
                quantity: action.quantity,
                subtotal: action.subtotal,
                note: action.note,
                product: action.product,
                customer: action.customer
            };
        case "ORDER_UPDATED":
            return state;
        case "HANDLE_ON_CHANGE":
            return {
                ...state,
                [action.props]: action.value
            };    
        default:
            return state
    }
  }