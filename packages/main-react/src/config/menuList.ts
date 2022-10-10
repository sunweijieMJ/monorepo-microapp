export type MenuList = {
  name: string;
  title: string;
  routeName: string;
  routePath: string;
  children: MenuList[];
};

export const menuList = [
  {
    name: 'micro-vue',
    title: 'vue',
    routeName: 'micro-vue',
    routePath: '/micro-vue',
    children: [],
  },
  {
    name: 'micro-react',
    title: 'react',
    routeName: 'micro-react',
    routePath: '/micro-react',
    children: [],
  },
];

export default menuList;
