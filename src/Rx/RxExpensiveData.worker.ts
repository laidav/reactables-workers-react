import { RxExpensiveData } from "./RxExpensiveData";
import DataService from "../DataService";
import { toWorker } from "@reactables/web-workers";

toWorker(RxExpensiveData, {
  dataService: new DataService(),
});
