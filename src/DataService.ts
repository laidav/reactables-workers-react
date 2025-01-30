import { of, delay } from "rxjs";

class DataService {
  getData() {
    return of("CRAZY DATA").pipe(delay(3000));
  }
}

export default DataService;
