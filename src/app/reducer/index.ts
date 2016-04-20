import {Reducer, Action} from '@ngrx/store';
import * as actions from './../actions';

export const counter: Reducer<number> = (state:number = 0, action:Action) => {

    switch (action.type) {
        case actions.INCREMENT:
            return state + 1;

        case actions.DECREMENT:
            return state - 1;

        case actions.RESET:
            return 0;

        default:
            return state;
    }
}
