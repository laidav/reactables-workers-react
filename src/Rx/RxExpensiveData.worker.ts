import { RxExpensiveData } from "./RxExpensiveData";
import DataService from "../DataService";
import { toWorker } from "@reactables/web-workers";

toWorker(RxExpensiveData, {
  // Provide dependencies
  dataService: new DataService(),
});
