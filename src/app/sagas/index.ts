import {Http} from 'angular2/http';
import {Observable} from 'rxjs';
import {createSaga} from 'store-saga';
import {INCREMENT, DECREMENT} from './../actions';

const increment = createSaga(function(){
  return iteration$ => iteration$
    .filter(iter => iter.action.type === DECREMENT)
    .map(() => {
      return { type: INCREMENT}
    });
});

const asyncEffect = createSaga(function sagaFactory(http: Http) {

  return function loginSaga(iteration$: Observable<any>) {
    return iteration$
      .filter(iteration => iteration.action.type === DECREMENT)
      .map(iteration => iteration.action.payload)
      .mergeMap(payload => {
        return Observable.of(20)
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

export default [
  // increment,
  asyncEffect
]
