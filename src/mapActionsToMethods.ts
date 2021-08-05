import {
  Dispatch
} from "vuex";
import {
  mapArrayToMethods,
  mapObjToMethods,
  MapObjToMethodReturnType,
  MapArrToMethodReturnType
} from "./mapToComponent";
import { useStore } from "./utils";

export interface MapActionsToMethods {
  [key : string] : string
}

function mapActionsToMethods<T extends MapActionsToMethods>(param1 : string, param? : T) : MapObjToMethodReturnType<T, Dispatch>;
function mapActionsToMethods<T extends MapActionsToMethods>(param1 : T) : MapObjToMethodReturnType<T, Dispatch>;
function mapActionsToMethods(param1 : string, param? : string[]) : MapArrToMethodReturnType<string, Dispatch>;
function mapActionsToMethods(param1 : string[]) : MapArrToMethodReturnType<string, Dispatch>;
function mapActionsToMethods(param1 : any, param? : any){
  const store = useStore();
  let namespace = "";
  if(!param) {
    param = param1;
  } else {
    namespace = param1;
  }

  const options = {
    method : store.dispatch,
    namespace
  };
  if(typeof param === "object" && Array.isArray(param)){
    return mapArrayToMethods(options)(param);
  } else {
    return mapObjToMethods(options)(param);
  }
}

export {
  mapActionsToMethods
}