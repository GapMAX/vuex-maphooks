import {
  Commit
} from "vuex";
import { useStore } from "./utils";
import {
  mapArrayToMethods,
  mapObjToMethods,
  MapObjToMethodReturnType,
  MapArrToMethodReturnType
} from "./mapToComponent";

export interface MapMutationsToMethods {
  [key : string] : string
}

function mapMutationsToMethods<T extends MapMutationsToMethods>(param1 : string, param : T) : MapObjToMethodReturnType<T, Commit>;
function mapMutationsToMethods<T extends MapMutationsToMethods>(param1 : T) : MapObjToMethodReturnType<T, Commit>;
function mapMutationsToMethods(param1 : string, param : string[]) : MapArrToMethodReturnType<string, Commit>;
function mapMutationsToMethods(param1 : string[]) : MapArrToMethodReturnType<string, Commit>;
function mapMutationsToMethods(param1 : any, param? : any){
  const store = useStore();
  let namespace = "";
  if(!param) {
    param = param1;
  } else {
    namespace = param1;
  }

  const options = {
    method : store.commit,
    namespace
  };

  if(typeof param === "object" && Array.isArray(param)){
    return mapArrayToMethods(options)(param);
  } else {
    return mapObjToMethods(options)(param);
  }
}

export {
  mapMutationsToMethods
}