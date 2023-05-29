import { useState } from "react";


const initial = {value:[]}
let arr = []

function CartReducer(state = initial, action){
    
   
    switch(action.type){
        case "add":
            let available = false
            state.value.map((val,ind)=>{
                if(val == action.payload){
                    available = true;
                }
            })
            if(!available){

                return {...state, value: [...state.value, action.payload]};
            } else{
                alert("The item is already in your cart")
                return  state
            }
            
            
        case "clear":
            return {value : []}
        default:
            return state
    }

}

export {CartReducer}