import {Http} from 'angular2/http';
import {Observable} from 'rxjs';
import {createSaga} from 'store-saga';
import {INCREMENT, DECREMENT} from './../actions';

const BASE_WEB_URL = 'http://jsonplaceholder.typicode.com/';

const increment = createSaga(function(){
  return iteration$ => iteration$
    .filter(iter => iter.action.type === DECREMENT)
    .map(() => {
      return { type: INCREMENT}
    });
});

const remoteMethod = () => new Promise((res, rej) => {
  setTimeout(() => res(20), 1000);
});

const asyncEffect = createSaga(function sagaFactory(http: Http) {

  return function loginSaga(iteration$: Observable<any>) {
    return iteration$
      .filter(iteration => iteration.action.type === DECREMENT)
      .map(iteration => iteration.action.payload)
      .mergeMap(payload => {
        return Observable.fromPromise(remoteMethod())
          .map(res => {
            return {
              type: INCREMENT
            }
          })
          .catch(err => {
            return Observable.of({
              type: 'DECREMENT'
            });
          });
      });
  };

}, [Http]);


const asyncEffect2 = createSaga(function sagaFactory(http: Http) {

  return function loginSaga(iteration$: Observable<any>) {
    return iteration$
      .filter(iteration => iteration.action.type === DECREMENT)
      .map(iteration => iteration.action.payload)
      .mergeMap(payload => {
        return http.get(BASE_WEB_URL + 'posts/1')
          .map(res => {
            return {
              type: INCREMENT,
              payload: res.json()
            }
          })
          .catch(err => {
            return Observable.of({
              type: 'DECREMENT',
              payload: err.json()
            });
          });
      });
  };

}, [Http]);

export default [
  // increment,
  // asyncEffect,
  asyncEffect2
]
