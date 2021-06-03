import {
  computed,
  ComputedRef
} from "vue";
import {
  Commit,
  Dispatch,
  CommitOptions,
  DispatchOptions
} from "vuex";
import {
  keyWithNamespace,
  ganValueWithArrayKeys
} from "./utils"

const mapStringToComputed = <T extends object>(storeProp : T) => (key : string) => {
  return computed(() => storeProp[key as keyof T]);
}

export interface ComputedOptions<T> {
  storeProp : T,
  namespace? : string
}

const mapArrayToComputed = <T extends object>(options : ComputedOptions<T>) => (keys : string[]) => {
  const mapState : {
    [key : string] : ComputedRef<any>
  } = {};
  const {
    namespace = ""
  } = options;
  keys.forEach((key) => {
    const newKey = keyWithNamespace(key, namespace);
    const keyArray = newKey.split('/').filter(v => v);
    mapState[key] = computed(() => ganValueWithArrayKeys(options.storeProp, keyArray));
  })
  return mapState;
}

export type MapObjToComputedReturnType<T> = {
  [key in keyof T] : ComputedRef<any>
}

const mapObjToComputed = <K extends object>(options : ComputedOptions<K>) => <T extends object>(obj : T) => {
  const keys = Object.keys(obj);
  const mapState : MapObjToComputedReturnType<T> = {} as any;
  const {
    namespace = ""
  } = options;
  type keyType = keyof T;
  keys.forEach((key, index) => {
    const value = obj[key as keyType];
    switch(typeof value){
      case "function":
        mapState[key as keyType] = computed(() => value(options.storeProp));
        break;
      case "string":
        const keyArray = namespace ? namespace.split('/').filter(v => v) : [];
        keyArray.push(value);
        mapState[key as keyType] = computed(() => ganValueWithArrayKeys(options.storeProp, keyArray));
        break;
    }
  })
  return mapState;
}

export interface MapMethodOptions {
  method : Commit | Dispatch,
  namespace? : string
}

export type MapArrToMethodReturnType<O extends string, M> = {
  [key in O] : (payload? : any, options? : MethodOptions<M>) => M extends Dispatch ? Promise<any> : void
}

const mapArrayToMethods = (options : MapMethodOptions) => <K extends string>(keys : K[]) => {
  const mapMethod : MapArrToMethodReturnType<K, MapMethodOptions["method"]> = {} as any;
  const {
    namespace = ""
  } = options;
  keys.forEach((key) => {
    const newKey = keyWithNamespace(key, namespace);
    mapMethod[key] = (payload? : any, params? : MethodOptions<MapMethodOptions["method"]>) => options.method(newKey, payload, params)
  })
  return mapMethod;
}

export type MapObjToMethodReturnType<T, K> = {
  [key in keyof T] : (payload? : any, options? : MethodOptions<K>) => K extends Dispatch ? Promise<any> : void
}

export type MethodOptions<T> =  T extends Dispatch ? DispatchOptions : CommitOptions;

const mapObjToMethods = (options : MapMethodOptions) => (obj : {
  [key : string] : string
}) => {
  type MethodType = typeof options.method;
  const keys = Object.keys(obj);
  const mapMethods : MapObjToMethodReturnType<typeof obj, MethodType> = {};
  const {
    namespace = ""
  } = options;
  keys.forEach((key) => {
    const value = obj[key];
    const newValue = keyWithNamespace(value, namespace);
    mapMethods[key] = (payload? : any, param? : MethodOptions<MethodType>) => options.method(value, payload, param);
  })
  return mapMethods;
}

export {
  mapArrayToComputed,
  mapObjToComputed,
  mapArrayToMethods,
  mapObjToMethods
}