/**
 * 리듀서 정의
 * @/reducer/cart.js
 */

// 리듀서 호출 타입 정의
export const RDU_SAVE_CALL_LIST = 'RDU_SAVE_CALL_LIST';

/**
 * 리듀서의 액션 타입 정의
 * @/actions/cart.js
 */

// 액션 타입 정의
export const ACT_SAVE_CALL_LIST = 'ACT_SAVE_CALL_LIST';

// 리듀서가 가질 상태 정의
const initialState = {
  callList: [],
};

// 리듀서 정의
const callList = (state = initialState, action) => {
  const newState = {...state};

  switch (action.type) {
    case RDU_SAVE_CALL_LIST: {
      newState.callList = action.payload;

      return newState;
    }

    default: {
      return newState;
    }
  }
};

//================================================================================================

/**
 * 리듀서의 액션 정의
 * @/actions/cart.js
 */

// 액션 정의
export const saveCallList = payload => {
  return {
    type: ACT_SAVE_CALL_LIST,
    payload,
  };
};

export default callList;
