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
    container: '#micro-app',
    entry: 'http://localhost:3001/',
  },
  {
    name: 'micro-react',
    activeRule: ['/micro-react'],
    container: '#micro-app',
    entry: 'http://localhost:3002/',
  },
];

export default microApps;
