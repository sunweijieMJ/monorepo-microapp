export type MicroApp = {
  name: 'micro-vue' | 'micro-react';
  activeRule: string | string[];
  container: string;
  entry: string;
  props?: any;
};

export const microApps: MicroApp[] = [
  {
    name: 'micro-vue',
    activeRule: ['/micro-vue'],
    container: '#micro-vue',
    entry: 'http://localhost:3001/',
  },
  {
    name: 'micro-react',
    activeRule: ['/micro-react'],
    container: '#micro-react',
    entry: 'http://localhost:3002/',
  },
];

export default microApps;
