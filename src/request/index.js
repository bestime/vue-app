


const aliasMap = {
  '@local': process.env.VUE_APP_ROUTE_ROOT.replace(/\/+/, ''),
  '@host_01': process.env.VUE_APP_HOST_01_API
}
const aliasList = Object.keys(aliasMap)
console.log("routeMode", aliasMap)
export function serverURL (alias, path) {
  if(!aliasList.includes(alias)) {
    throw `${alias}未输入正确，合法选项为其中之一：${aliasList.join(' | ')}`
  }
  if(!/^\//.test(path)) {
    throw `path 必须由 "/" 开头，您目前输入的是："${path}"`
  }
  return aliasMap[alias] + path
}