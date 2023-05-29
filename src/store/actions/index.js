

function AddtoCart(data){

    return {
        type: "add",
        payload: data
    }

}

function clear(data){
    return {
        type: "clear",
        payload: data
    }
}

function Delete(data){
    return {
        type: "delete",
        payload: data
    }
}

export {AddtoCart,Delete,clear}