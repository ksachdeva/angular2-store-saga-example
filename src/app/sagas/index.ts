import {Http} from 'angular2/http';
import {Router} from 'angular2/router';
import {Observable} from 'rxjs';
import {createSaga} from 'store-saga';
import {INCREMENT, DECREMENT, GOTO_ABOUT} from './../actions';

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

const gotoAboutPageEffect = createSaga(function sagaFactory(router: Router) {
  console.log(router);
  return function aboutSaga(iteration$: Observable<any>) {
    return iteration$
      .filter(iteration => iteration.action.type === GOTO_ABOUT)
      .map(iteration => iteration.action.payload)
      .mergeMap(payload => {
        return Observable.fromPromise(router.navigate(['About']))
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

}, [Router]);

export default [
  // increment,
  // asyncEffect,
  asyncEffect2,
  gotoAboutPageEffect
]
