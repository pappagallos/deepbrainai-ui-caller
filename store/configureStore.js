import {createStore, applyMiddleware, compose} from 'redux';
import {createWrapper} from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootSaga from '../sagas';

const configureStore = () => {
  // saga middleware 생성
  const sagaMiddleware = createSagaMiddleware();

  // middleware 배열 생성
  const middlewares = [sagaMiddleware];

  // enhancer 생성
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));

  // 스토어 생성
  const store = createStore(reducer, enhancer);

  // rootSaga 연결
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
