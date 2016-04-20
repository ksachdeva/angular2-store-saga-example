import {Component, ViewEncapsulation} from 'angular2/core';
import {Store} from '@ngrx/store';
import {INCREMENT, DECREMENT, RESET} from './actions';
import {Observable} from 'rxjs';

interface AppState {
  counter: number;
}

@Component({
  selector: 'app',
  providers: [ ],
  template: `
      <button (click)="increment()">Increment</button>
        <div>Current Count: {{ counter | async }}</div>
        <button (click)="decrement()">Decrement</button>
    `
})
export class App {
    counter: Observable<number>;

    constructor(public store: Store<AppState>){
        this.counter = store.select<number>('counter');
    }

    increment(){
        this.store.dispatch({ type: INCREMENT });
    }

    decrement(){
        this.store.dispatch({ type: DECREMENT });
    }

    reset(){
        this.store.dispatch({ type: RESET });
    }
}
