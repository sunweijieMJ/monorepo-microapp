import { RouteLocation } from 'vue-router';

export interface PopupType<T = any> {
  status: boolean;
  type: string;
  data: T;
}

export interface MenuList {
  tab: boolean;
  affix: boolean;
  noCache: boolean;
  iconCode: string;
  name: string;
  title: string;
  routeName: string;
  routePath: string;
  projectCode: string;
  permissions: string[];
  children: MenuList[];
  resourceId: number;
}

export interface UserInfoType {
  id: number;
  account: string;
  accountName: string;
}

export interface TagView extends RouteLocation {
  title: string;
}

export interface LanguageList {
  systemParamName: string;
  systemParamValue: string;
  systemParamDescription: string;
  defaultValue: boolean;
}

export interface MemberSystemOptionType {
  id: number;
  name: string;
}

export interface DirectoryList {
  id: number;
  catalogName: string;
}

export interface BasicState {
  errorPage: Partial<PopupType>;
  initLogin: boolean;
  modifyPass: Partial<PopupType>;
  userInfo: Partial<UserInfoType>;
  menuList: MenuList[];
  defaultLanguage: string;
  languageList: LanguageList[];
  routeArrList: [string, TagView[]][];
  permissionsMap: Map<string, string[]>;
  language: string;
  menuCollapse: boolean;
  messageCollapse: boolean;
  taskDotStatus: boolean;
  messageDotValue: number;
  visitedViews: TagView[];
  cachedViews: string[];
  noCachedViews: string[];
  visitedViewsOrder: TagView[];
  isSharePage: boolean;
  shareRouterWhiteList: string[];
  memberSystemOptions: MemberSystemOptionType[];
  curMemberSystem: MemberSystemOptionType;
  directoryList: DirectoryList[];
  activeDirectory: DirectoryList;
  fixedSideMenu: MenuList[];
  starMenu: { [x: number]: MenuList[] };
}
