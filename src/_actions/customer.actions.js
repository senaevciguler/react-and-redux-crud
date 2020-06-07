import { genericService } from '../_services/';
import { history } from '../_helpers';

export const customerAction = {
    getCustomer,
    getCustomerById,
    onChangeProps,
    editCustomerInfo,
    createCustomer,
    deleteCustomerById
};

function getCustomer(){
    return dispatch => {
        let apiEndpoint = 'customers';
        genericService.get(apiEndpoint)
        .then((response)=>{
            console.log(response);
            dispatch(changeCustomersList(response.data));
        }).catch((err)=>{
            console.log("Error");
            console.log(err);
        })
    };
}


function createCustomer(payload){
    return dispatch => {
        let apiEndpoint = 'customers/';
        genericService.post(apiEndpoint, payload)
        .then((response)=>{
            dispatch(createCustomerInfo());
            history.push('/customer');
        }) 
    }
}

function getCustomerById(id){

    return dispatch => {
        let apiEndpoint = 'customers/'+ id;
        genericService.get(apiEndpoint)
        .then((response)=>{
            dispatch(editCustomersDetails(response.data));
        })
    };
}

function onChangeProps(props, event){
    return dispatch =>{
        dispatch(handleOnChangeProps(props, event.target.value));
    }
}

function editCustomerInfo(id, payload){
    return dispatch => {
        let apiEndpoint = 'customers/'+ id;
        genericService.put(apiEndpoint, payload)
        .then((response)=>{
            dispatch(updatedCustomerInfo());
            history.push('/customer');
        }) 
    }
}

function deleteCustomerById(id){
    return dispatch => {
        let apiEndpoint = 'customers/'+ id;
        genericService.deleteDetail(apiEndpoint)
        .then((response)=>{
            dispatch(deleteCustomersDetails());
            dispatch(customerAction.getCustomer());
        })
    };
}

export function changeCustomersList(customer){
    return{
        type: "FETECHED_ALL_CUSTOMER",
        customer: customer
    }
}

export function handleOnChangeProps(props, value){
    return{
        type: "HANDLE_ON_CHANGE",
        props: props,
        value: value
    }
}

export function editCustomersDetails(customer){
    return{
        type: "CUSTOMER_DETAIL",
        id: customer.id,
        name: customer.name,
        lastname: customer.lastname,
        mail: customer.mail,
        gsm: customer.gsm,
        address: customer.address
    }
}

export function updatedCustomerInfo(){
    return{
        type: "CUSTOMER_UPDATED"
    }
}

export function createCustomerInfo(){
    return{
        type: "CUSTOMER_CREATED_SUCCESSFULLY"
    }
}

export function deleteCustomersDetails(){
    return{
        type: "DELETED_CUSTOMER_DETAILS"
    }
}