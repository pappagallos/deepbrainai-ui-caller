/**
 * 리듀서 정의
 * @/reducer/cart.js
 */

// 리듀서 호출 타입 정의
export const RDU_SAVE_CALLING = 'RDU_SAVE_CALLING';

/**
 * 리듀서의 액션 타입 정의
 * @/actions/cart.js
 */

// 액션 타입 정의
export const ACT_SAVE_CALLING = 'ACT_SAVE_CALLING';

// 리듀서가 가질 상태 정의
const initialState = {
  calling: {
    counterNumber: '',
    name: '',
    value: '',
  },
};

// 리듀서 정의
const calling = (state = initialState, action) => {
  const newState = {...state};

  switch (action.type) {
    case RDU_SAVE_CALLING: {
      newState.calling = action.payload;

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
export const saveCalling = payload => {
  return {
    type: ACT_SAVE_CALLING,
    payload,
  };
};

export default calling;
