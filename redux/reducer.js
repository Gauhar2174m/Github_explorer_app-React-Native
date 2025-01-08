import { ADD_TO_FAVORITES,REMOVE_FROM_FAVORITES } from "./action";

// Initial state of the d=favorites 
const initialState={
    favorites:[],
};

// reducer function 
const rootReducer=(state=initialState, action)=>{
    switch(action.type){
        case ADD_TO_FAVORITES:
            // Check if repo is already in favorites to avoid duplicates
            if (!state.favorites.find((repo)=>repo.id === action.payload.id)) {
return{...state, favorites:[...state.favorites,action.payload]};
            }
            return state;

            case REMOVE_FROM_FAVORITES:
                //Filter out the repo from favorites 
                return{
                    ...state,
                    favorites:state.favorites.filter((repo)=>repo.id !==action.payload.id)
                };
                default:
                    return state;
    }
};
export default rootReducer;