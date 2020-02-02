import { BehaviorSubject, EMPTY, Observable, ReplaySubject, Subject, timer } from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError, concatAll, map, pluck, shareReplay, switchMap, toArray } from "rxjs/operators";

class UserService {
    public uniqNameSequence$: Observable<any>;

    public constructor() {
        this.uniqNameSequence$ = timer(0, 16000)
            .pipe(
                switchMap(() =>
                    ajax('http://learn.javascript.ru/courses/groups/api/participants?key=1i7qske')
                        .pipe(
                            map((res) => res.response),
                            concatAll(),
                            pluck('profileName'),
                            toArray(),
                            map((usersNames) => [...new Set(usersNames)]),
                            catchError((err) => {
                                console.log(err);
                                return EMPTY
                            }),
                        )),
                shareReplay()
            )
    }
}

export const userService = new UserService();
