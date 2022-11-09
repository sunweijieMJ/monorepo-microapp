import type { MicroApp } from 'qiankun';

export {};

type CustomMicroApp = MicroApp & {
  name: string;
};

declare global {
  interface Window {
    activeMicroApp: CustomMicroApp | null;
    activatedMicroApp: CustomMicroApp[];
  }
}
