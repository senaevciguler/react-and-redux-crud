const initialState = { anchor: 'left',
    customer: [],
    open: false,
    id: '',  
    name: '',
    lastname: '',
    mail: '',
    gsm: '',
    address: ''
 };


export function customer(state = initialState, action) {
    switch (action.type) {
        case 'FETECHED_ALL_CUSTOMER':
            return {
            ...state,
            customer: action.customer
            };
        case 'CUSTOMER_DETAIL':
            return {
                ...state,
                id: action.id,  
                name: action.name,
                lastname: action.lastname,
                mail: action.mail,
                gsm: action.gsm,
                address: action.address
            };
        case "CUSTOMER_UPDATED":
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