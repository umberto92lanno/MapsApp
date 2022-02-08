import { retry, SagaGenerator, race, take, cancel, delay } from "typed-redux-saga";
import { CallEffect, SagaReturnType } from "redux-saga/effects";
import { bookActions } from "../ui/book/book.slice";

function* retryWithDelay<Fn extends (...args: any[]) => any>(fn: Fn, ...args: Parameters<Fn>) {
    // yield* delay(5000);
    return yield* retry<Fn>(3, 2000, fn, ...args)
}

export function* callApi<Fn extends (...args: any[]) => any>(fn: Fn, ...args: Parameters<Fn>) {
    const { callApi, interrupt } = yield* race(
        {
            callApi: retryWithDelay<Fn>(fn, ...args),
            interrupt: take(bookActions.interrupt.type)
        }
    )
    if (interrupt) {
        yield* cancel()
    }
    return callApi
    // return yield* retry<Fn>(3, 2000, fn, ...args);
}
