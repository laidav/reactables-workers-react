import { RxExpensiveData } from "./RxExpensiveData";
import DataService from "../DataService";
import { toWorker } from "@reactables/web-workers";

toWorker(RxExpensiveData, {
  deps: { dataService: new DataService() },
});
