import {
  ComputedRef
} from "vue";
import {
  useStore
} from "vuex";
import {
  mapArrayToComputed,
  mapObjToComputed,
  MapObjToComputedReturnType
} from "./mapToComponent";

type ExcludeType = string | string[];

function mapStateToComputed<T extends object>(param1 : string, param? : Exclude<T, ExcludeType>) : MapObjToComputedReturnType<T>;
function mapStateToComputed<T extends object>(param1 : Exclude<T, ExcludeType>) : MapObjToComputedReturnType<T>;
function mapStateToComputed(param1 : string, param? : string[]) : {[key : string] : ComputedRef<any>};
function mapStateToComputed(param1 : string[]) : {[key : string] : ComputedRef<any>};
function mapStateToComputed(param1 : any, param? : any){
  const store = useStore();
  let namespace = "";
  if(!param) {
    param = param1;
  } else {
    namespace = param1;
  }

  const options = {
    storeProp : store.state,
    namespace
  };
  if(typeof param === "object" && Array.isArray(param)){
    return mapArrayToComputed(options)(param);
  } else {
    return mapObjToComputed(options)(param);
  }
}

export {
  mapStateToComputed
}