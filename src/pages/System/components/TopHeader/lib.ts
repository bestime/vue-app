


export interface IMenuItem {
  /** 菜单的路由名称 */
  routeName: string,
  /** 菜单显示名称 */
  label: string,
  /** 不显示在菜单中的子页面 */
  hidden?: boolean
  children?: IMenuItem[],

  /** 权限ID（与后端约定） */
  permissionId?: string
}



export function getNormalMenuList () {
  const list: IMenuItem[] = [
    {
      routeName: 'ROUTE_SYSTEM_HOME',
      label: '概况介绍',
      children: [
        {
          routeName: 'ROUTE_SYSTEM_HOME',
          label: '企业概况',
        },
        {
          routeName: 'ROUTE_NORMALSCREEN_ABOUTCOMPANY_BUSSINESSDEVELOP',
          label: '业务发展',
        },
      ]
    },
    {
      routeName: 'ROUTE_SYSTEM_WHOLESALEBUSINESS',
      label: '批发业务',      
    },
  ]

  return list
}