import { genericService } from '../_services/';
import { history } from '../_helpers';

export const productAction = {
    getProduct,
    getProductById,
    onChangeProps,
    editProductInfo,
    createProduct,
    deleteProductById
};

function getProduct(){
    return dispatch => {
        let apiEndpoint = 'products';
        genericService.get(apiEndpoint)
        .then((response)=>{
            console.log(response);
            dispatch(changeProductsList(response.data));
        }).catch((err)=>{
            console.log("Error");
            console.log(err);
        })
    };
}


function createProduct(payload){
    return dispatch => {
        let apiEndpoint = 'products/';
        genericService.post(apiEndpoint, payload)
        .then((response)=>{
            dispatch(createProductInfo());
            history.push('/product');
        }) 
    }
}

function getProductById(id){

    return dispatch => {
        let apiEndpoint = 'products/'+ id;
        genericService.get(apiEndpoint)
        .then((response)=>{
            dispatch(editProductsDetails(response.data));
        })
    };
}

function onChangeProps(props, event){
    return dispatch =>{
        dispatch(handleOnChangeProps(props, event.target.value));
    }
}

function editProductInfo(id, payload){
    return dispatch => {
        let apiEndpoint = 'products/'+ id;
        genericService.put(apiEndpoint, payload)
        .then((response)=>{
            dispatch(updatedProductInfo());
            history.push('/product');
        }) 
    }
}

function deleteProductById(id){
    return dispatch => {
        let apiEndpoint = 'products/'+ id;
        genericService.deleteDetail(apiEndpoint)
        .then((response)=>{
            dispatch(deleteProductsDetails());
            dispatch(productAction.getProduct());
        })
    };
}

export function changeProductsList(product){
    return{
        type: "FETECHED_ALL_PRODUCT",
        product: product
    }
}

export function handleOnChangeProps(props, value){
    return{
        type: "HANDLE_ON_CHANGE",
        props: props,
        value: value
    }
}

export function editProductsDetails(product){
    return{
        type: "PRODUCT_DETAIL",
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price
    }
}

export function updatedProductInfo(){
    return{
        type: "PRODUCT_UPDATED"
    }
}

export function createProductInfo(){
    return{
        type: "PRODUCT_CREATED_SUCCESSFULLY"
    }
}

export function deleteProductsDetails(){
    return{
        type: "DELETED_PRODUCT_DETAILS"
    }
}