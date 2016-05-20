import {Component, ViewEncapsulation} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';

import {Store} from '@ngrx/store';
import {INCREMENT, DECREMENT, RESET, GOTO_ABOUT} from './../actions';
import {Observable} from 'rxjs';

interface AppState {
  counter: number;
}

@Component({
  template: `
    <button (click)="increment()">Increment</button>
    <div>Current Count: {{ counter | async }}</div>

    <hr>
    <p> Below button results in action being intercepted/caught by a saga
      and then saga emits Increment action after making an http call
    </p>
    <button (click)="decrement()">Decrement</button>

    <hr>
    <p> Below button results in action being caught by a saga and then
    saga uses router to go to about page </p>
    <button (click)="gotoAbout()">Go to About using Saga</button>

  `
})
export class HomeComponent {
  counter: Observable<number>;

  constructor(public store: Store<AppState>) {
    this.counter = store.select<number>('counter');
  }

  increment() {
    this.store.dispatch({ type: INCREMENT });
  }

  decrement() {
    this.store.dispatch({ type: DECREMENT });
  }

  reset() {
    this.store.dispatch({ type: RESET });
  }

  gotoAbout() {
    this.store.dispatch({ type: GOTO_ABOUT });
  }
}
