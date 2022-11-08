import type { PageList } from './index';

export interface SystemParamValueList extends PageList {
  queryParam?: Partial<{
    systemParamCode: string;
    availableStatus: boolean;
  }>;
}
