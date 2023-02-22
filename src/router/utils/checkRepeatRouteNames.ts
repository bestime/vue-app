import type { RouteRecordRaw } from 'vue-router';

function recursionArray(
  data: RouteRecordRaw[],
  countCache?: {
    [key: string]: number;
  },
  errorList?: string[],
  path?: string[]
) {
  countCache = countCache || {};
  errorList = errorList || [];
  path = path || [];

  let item: RouteRecordRaw;
  for (let index = 0; index < data.length; index++) {
    item = data[index];

    if (!item.name) {
      errorList.push(`路由项【${path.concat(item.path).join('/')}】没有配置name字段`);
    } else if (!/^ROUTE_/.test(String(item.name))) {
      errorList.push(`路由【${item.path}】的路由名必须 "ROUTE_" 开头`);
    } else {
      countCache[String(item.name)] = Number(countCache[String(item.name)]) + 1;
    }

    if (item.children && item.children.length) {
      recursionArray(item.children, countCache, errorList, path.concat(item.path));
    }
  }

  return {
    countCache,
    errorList,
  };
}

/**
 * 对路由表进行验证："重复路由名"
 * @param data - 用户路由表
 * @returns 验证成功的路由表
 */
export default function checkRepeatRouteNames(data: RouteRecordRaw[]): RouteRecordRaw[] {
  const { countCache, errorList } = recursionArray(data);
  for (const key in countCache) {
    if (countCache[key] > 1) {
      errorList.push(`路由名【${key}重复】${countCache[key]} 次`);
    }
  }

  if (errorList.length > 0) {
    console.error('路由表配置错误', errorList);
  }

  return data;
}
