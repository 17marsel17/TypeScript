import { of, from, timer, range, Observable, observable } from "rxjs";
import { map } from "rxjs/operators";
import axios from "axios";

const githubStream$ = new Observable((observer) => {
  const source = axios.CancelToken.source();
  axios
    .get("https://api.github.com/search/repositories?q=$ndtnf-homeworks", {
      cancelToken: source.token,
    })
    .then((response) => {
      observer.next(response.data);
      observer.complete();
    })
    .catch(function (thrown) {
      if (!axios.isCancel(thrown)) {
        observer.error(thrown);
      }
    });

  return () => {
    source.cancel("Cancelled");
  };
});

githubStream$.subscribe({
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
