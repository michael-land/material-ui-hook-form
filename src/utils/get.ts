// TODO: remove this when RHF expose helper functions
export function get<T>(
  obj: Record<string, any>,
  path: string | string[],
  defaultValue?: T
): T | undefined {
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return (result === undefined || result === obj ? defaultValue : result) as any;

  function travel(regexp: RegExp): any {
    return String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  }
}
