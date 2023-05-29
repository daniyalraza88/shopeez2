// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore,persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"
// import rootReducer from "./reducers/combine";
// import CounterReducer from "./reducers";

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { persistStore,persistReducer } from "redux-persist";
// import { storage } from "redux-persist/lib/storage";
import storage from "redux-persist/lib/storage"



const persistConfig = {
    key: "root",
    storage,
  };


  const persistedReducer = persistReducer(persistConfig,rootReducer)
  
  const store = configureStore({
      reducer: persistedReducer
  })

  const persistor = persistStore(store)

export {store,persistor}


// const persistConfig = {
//     key: "root",
//     storage,
//   };

//   const persistedReducer = persistReducer(persistConfig,rootReducer)
  
//   const store = configureStore({
//     reducer:persistedReducer
//   })

//   const persistor = persistStore(store)
//   export {store,persistor}