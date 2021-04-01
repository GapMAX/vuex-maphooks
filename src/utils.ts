const keyWithNamespace = (key : string, ns : string) => {
  return ns ? ns.endsWith('/') ? ns + key : ns + '/' + key : key;
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