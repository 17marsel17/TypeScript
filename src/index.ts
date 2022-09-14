import { of, from, timer, range, Observable, observable } from "rxjs";
import { map } from "rxjs/operators";
import axios from "axios";

const githubStream$ = from(
  axios.get("https://api.github.com/search/repositories?q=ndtnf-homeworks")
).pipe(
  map((response) => {
    return response.data.items;
  })
);

const githubStream2$ = from(githubStream$);

githubStream2$.subscribe({
  next: console.log,
  error: console.log,
  complete: () => {
    console.log("completed");
  },
});

const ipinfo$ = from(axios.get("https://api.ipify.org?format=json"));

ipinfo$.subscribe({
  next: console.log,
  error: console.log,
  complete: () => {
    console.log("completed");
  },
});
