import {configureStore} from "@reduxjs/toolkit";
import PlayerReducer from "./PlayerSlice";
import MenuSlice from "./MenuSlice.jsx";

export default configureStore({
    reducer: {
        player: PlayerReducer,
        menu: MenuSlice
    },
});
