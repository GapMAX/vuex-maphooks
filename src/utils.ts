import { useStore as sourceUseStore } from "vuex";

const keyWithNamespace = (key : string, ns : string) => {
  const result = ns ? ns.endsWith('/') ? ns + key : ns + '/' + key : key;
  return result.split('/').filter(v => v).join('/');
}

export type GanValueWithArrayKeysType = (value : {
  [key : string] : any
}, keys : string[]) => GanValueWithArrayKeysType | any;

const ganValueWithArrayKeys : GanValueWithArrayKeysType = (value, keys) => {
  const [key, ...rest] = keys;
  if(rest.length) return ganValueWithArrayKeys(value[key], rest);
  return value[key];
}

export {
  keyWithNamespace,
  ganValueWithArrayKeys
}

export const keyOperation = {
  key : void 0,
  register(key : any){
    this.key = key;
  }
}

export const useStore = () => {
  return sourceUseStore(keyOperation.key);
}