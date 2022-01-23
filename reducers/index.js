import {combineReducers} from 'redux';
import {HYDRATE} from 'next-redux-wrapper';
import waitingList from './waitingList';
import callList from './callList';
import calling from './calling';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        waitingList,
        callList,
        calling,
      });
      return combinedReducer(state, action);
    }
  }
};
export default rootReducer;
