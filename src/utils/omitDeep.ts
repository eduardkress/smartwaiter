// https://github.com/patomation/omit-deep
export type ComplexObject = {
  [key: string]: ComplexObject;
};

export const omitDeep = <O extends unknown | Array<unknown> | Date, RO extends unknown | Array<unknown> | Date>(
  item: O,
  omitKey: string | number
): RO => {
  // Handle dates - prevents dates from getting converted into empty {}
  if (item instanceof Date) {
    return item as unknown as RO;

    // Handle arrays and walk them
  } else if (Array.isArray(item)) {
    return item.map((arrItem: O) => {
      return omitDeep<O, RO>(arrItem, omitKey);
    }) as unknown as RO;

    // Handle objects
  } else if (typeof item === 'object' && item !== null) {
    // Walk over each entry in object
    return Object.entries(item as unknown as Record<string, unknown>).reduce((acc, [key, value]) => {
      // FILTER OMIT KEY HERE
      if (key !== omitKey) {
        acc[key as keyof RO] = omitDeep(value, omitKey);
      }
      return acc;
    }, {} as RO) as RO;

    // Handle all other types
  } else {
    return item as unknown as RO;
  }
};

//OLD FUNCTION
// export function omitDeepOLD(value: any, key: any): any {
//   if (Array.isArray(value)) {
//     return value.map((i) => omitDeepOLD(i, key));
//   } else if (typeof value === 'object' && value !== null) {
//     return Object.keys(value).reduce((newObject, k) => {
//       if (k == key) return newObject;
//       return Object.assign({ [k]: omitDeepOLD(value[k], key) }, newObject);
//     }, {});
//   }
//   return value;
// }
