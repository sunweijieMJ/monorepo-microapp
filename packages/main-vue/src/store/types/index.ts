export interface PopupType<T = any> {
  status: boolean;
  type: string;
  data: T;
}

export interface BasicState {
  errorPage: Partial<PopupType>;
}
