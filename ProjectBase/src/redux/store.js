/**
 * Created by Hong HP on 3/9/20.
 */

import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import initialState from './initialState'
import rootSaga from '../saga/sagas'

/**
 *  Redux Store configuration
 */
const sagaMiddleware = createSagaMiddleware()

// create store
const store = createStore(reducers, initialState, compose(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga)
export default store
