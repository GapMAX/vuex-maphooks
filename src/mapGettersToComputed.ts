import {
  ComputedRef
} from "vue";
import { useStore } from "./utils";
import {
  mapArrayToComputed,
  mapObjToComputed,
  MapObjToComputedReturnType
} from "./mapToComponent";

export interface MapGettersToComputed {
  [key : string] : string
}

function mapGettersToComputed(param1 : string | MapGettersToComputed, param? : MapGettersToComputed) : MapObjToComputedReturnType<MapGettersToComputed>;
function mapGettersToComputed(param1 : string | string[], param? : string[]) : {[key : string] : ComputedRef<any>};
function mapGettersToComputed(param1 : any, param? : any){
  const store = useStore();
  let namespace = "";
  if(!param) {
    param = param1;
  } else {
    namespace = param1;
  }

  const options = {
    storeProp : store.getters,
    namespace
  };
  if(typeof param === "object" && Array.isArray(param)){
    return mapArrayToComputed(options)(param);
  } else {
    return mapObjToComputed(options)(param);
  }
}

export {
  mapGettersToComputed
}