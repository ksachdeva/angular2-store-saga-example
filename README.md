# angular2-store-saga-example
Example application showing how to use @ngrx/store &amp; store-saga

# setup
npm install

# run
npm start

# test
http://localhost:3000

``` typescript
// a saga using angular 2 http service to get the posts
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
```

```typescript
// a saga using angular 2 Router to navigate to a page 
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
```
