import {HTTP_PROVIDERS} from 'angular2/http';
import {provideStore, usePreMiddleware, usePostMiddleware, Middleware} from "@ngrx/store";
import {installSagaMiddleware} from 'store-saga';
import {counter} from './reducer';
import sagas from './sagas';

const actionLog: Middleware = action => {
    return action.do(val => {
        console.warn('DISPATCHED ACTION: ', val)
    });
};

const stateLog: Middleware = state => {
    return state.do(val => {
        console.log('NEW STATE: ', val)
    });
};

export const APP_PROVIDERS = [
  HTTP_PROVIDERS,
  provideStore({counter}, {counter: 0}),
  usePreMiddleware(actionLog),
  usePostMiddleware(stateLog),
  installSagaMiddleware(...sagas)
];

export * from './app.component';
