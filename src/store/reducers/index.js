import { CartReducer } from "./cartReducer"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
    CartReducer: CartReducer
})

export default rootReducer