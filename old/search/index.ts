import { EMPTY, fromEvent, of } from "rxjs";
import {
    bufferCount, catchError,
    concatAll,
    debounceTime,
    distinctUntilChanged,
    filter, last,
    map,
    pluck, reduce, scan,
    switchMap
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";

const container = document.querySelector('.container');
const inputElement = document.querySelector('input');
fromEvent<InputEvent>(inputElement, 'input')
    .pipe(
        debounceTime(300),
        pluck('target', 'value'),
        filter(Boolean),
        map((text: string) => text.trim()),
        filter((text: string) => text.length > 3),
        distinctUntilChanged(),
        switchMap((text: string) => {
            return ajax(` https://api.github.com/search/repositories?q=${text}`)
                .pipe(
                    pluck('response', 'items'), // [1,2,3]
                    concatAll(), // 1,2,3
                    map(createCard),
                    bufferCount(3), // [1,2,3], [2,3,4],
                    reduce((resultStr, htmlString) => {
                        return resultStr += createRow(htmlString);
                    }, ''),
                    catchError((err) => {
                        return EMPTY;
                    })
                )
        })
    )
    .subscribe((html) => {
        container.innerHTML = html
    })

function createCard({name, description, owner: {avatar_url}}) {
    return `<div class="col-md-4">
   <div class="card">
   <img class="card-img-top" src=${avatar_url} alt="">
   <div class="card-body">
   <h5 class="card-title">${name}</h5>
   <p class="card-text">${description}</p>
</div>
</div>
</div>`
}

function createRow(htmlStringArr) {
    return `<div class="row">${htmlStringArr.join(' ')}</div>`
}
