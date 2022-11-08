import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../saga';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsDenylist, actionsCreators and other options
  });

  const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

  const store = createStore(rootReducer, enhancer);

  sagaMiddleware.run(rootSaga);

  return store;
}
