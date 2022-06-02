import { PageList } from './index';

export interface SystemParamValueList {
  queryParam?: Partial<{
    systemParamCode: string;
    availableStatus: boolean;
  }>;
}

export interface TranslateMultipleWord {
  word: string;
  form: string;
  toList: string[];
}

export interface AuthLogin {
  account: string;
  password: string;
  captchaCode: string;
  captchaCodeToken: string;
}

export interface ModifyPass {
  password: string;
  newPassword: string;
}

export interface TaskList extends PageList {
  queryParam?: Partial<{
    taskName: string;
    taskStatus: string;
    createTimeStart: string;
    createTimeEnd: string;
  }>;
}

export interface TaskDetailList extends PageList {
  queryParam?: Partial<{
    taskCode: string;
    resultEnum: string;
  }>;
}

export interface MessageList extends PageList {
  queryParam?: Partial<{
    priority: string | number;
    keyword: string;
    receiveUser: string;
    sendStatus: string;
    startTime: string;
    endTime: string;
  }>;
}

export interface AssetList extends PageList {
  queryParam?: Partial<{
    id: string | number;
    cataLogId: string | number;
    mediaName: string;
    fileSizeMin: string | number;
    fileSizeMax: string | number;
    approvalStatus: string | number;
    updateUserName: string | number;
    suffixType: string | number;
    updateTimeStart: string;
    updateTimeEnd: string;
  }>;
}

export interface GetDirectoryList extends PageList {
  queryParam: Partial<{
    catalogCode: string;
    catalogName: string;
    contentFlag: string | boolean;
  }>;
}

export interface UpdateUser {
  account: string;
  accountName?: string;
  dataGroupIds?: number[];
  description?: string;
  email?: string;
  gender?: boolean | string;
  mobile?: number | string;
  roleIds?: (string | number)[];
  assignType?: number | string;
  departmentIdList?: number[];
  superiorId?: string | number;
  imageUrl?: string;
}
