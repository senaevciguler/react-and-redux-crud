import { genericService } from '../_services/';
import { history } from '../_helpers';

export const orderAction = {
    getOrder,
    getOrderById,
    onChangeProps,
    editOrderInfo,
    createOrder,
    deleteOrderById
};

function getOrder(){
    return dispatch => {
        let apiEndpoint = 'orders';
        genericService.get(apiEndpoint)
        .then((response)=>{
            console.log(response);
            dispatch(changeOrdersList(response.data));
        }).catch((err)=>{
            console.log("Error");
            console.log(err);
        })
    };
}


function createOrder(payload){
    return dispatch => {
        let apiEndpoint = 'orders/';
        genericService.post(apiEndpoint, payload)
        .then((response)=>{
            dispatch(createOrderInfo());
            history.push('/order');
        }) 
    }
}

function getOrderById(id){

    return dispatch => {
        let apiEndpoint = 'orders/'+ id;
        genericService.get(apiEndpoint)
        .then((response)=>{
            dispatch(editOrdersDetails(response.data));
        })
    };
}

function onChangeProps(props, event){
    return dispatch =>{
        dispatch(handleOnChangeProps(props, event.target.value));
    }
}

function editOrderInfo(id, payload){
    return dispatch => {
        let apiEndpoint = 'orders/'+ id;
        genericService.put(apiEndpoint, payload)
        .then((response)=>{
            dispatch(updatedOrderInfo());
            history.push('/order');
        }) 
    }
}

function deleteOrderById(id){
    return dispatch => {
        let apiEndpoint = 'orders/'+ id;
        genericService.deleteDetail(apiEndpoint)
        .then((response)=>{
            dispatch(deleteOrdersDetails());
            dispatch(orderAction.getOrder());
        })
    };
}

export function changeOrdersList(order){
    return{
        type: "FETECHED_ALL_ORDER",
        order: order
    }
}

export function handleOnChangeProps(props, value){
    return{
        type: "HANDLE_ON_CHANGE",
        props: props,
        value: value
    }
}

export function editOrdersDetails(order){
    return{
        type: "ORDER_DETAIL",
        id: order.id,
        quantity: order.quantity,
        subtotal: order.subtotal,
        note: order.note,
        product: order.product,
        customer: order.customer
    }
}

export function updatedOrderInfo(){
    return{
        type: "ORDER_UPDATED"
    }
}

export function createOrderInfo(){
    return{
        type: "ORDER_CREATED_SUCCESSFULLY"
    }
}

export function deleteOrdersDetails(){
    return{
        type: "DELETED_ORDER_DETAILS"
    }
}