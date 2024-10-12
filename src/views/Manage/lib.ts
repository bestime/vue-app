export interface IMenItem {
  id: string
  title: string,
  routeName?: string,
  children?: IMenItem[]
}





export function filterMenu (list: IMenItem[], routeNames: string[]) {
  const exportNames: string[] = []
  jUtilsBase.forEachTree(list, function (item) {
    if(item.routeName) {
      exportNames.push(item.routeName)
    }
  })
  
  return jUtilsBase.treeFilter(list, function (item) {
    let isSafeIn = routeNames.includes(item.routeName!)
    if(!isSafeIn && jUtilsBase.isArray(item.children)) {
      const it = jUtilsBase.deepFindItem(item.children, function (cd) {
        return routeNames.includes(cd.routeName!)
      })
      return !!it
    }

    return isSafeIn
  })
}

