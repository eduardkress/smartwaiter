export function omitDeep(value: any, key: any): any {
  if (Array.isArray(value)) {
    return value.map((i) => omitDeep(i, key));
  } else if (typeof value === 'object' && value !== null) {
    return Object.keys(value).reduce((newObject, k) => {
      if (k == key) return newObject;
      return Object.assign({ [k]: omitDeep(value[k], key) }, newObject);
    }, {});
  }
  return value;
}
