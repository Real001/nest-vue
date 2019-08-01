export type ID = string;

export interface User {
  _id?: ID;
  firstName: string;
  lastName: string;
  email: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  avatarUrl?: string;
  role: string;
  group: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ConfigEditor {
  settings: {
    lang: string;
    theme?: string;
    readOnly?: boolean;
    autoCompletion?: boolean;
    showPrintMargin?: boolean;
    useWrapMode?: boolean;
    useSoftTabs?: boolean;
    tabSize?: number;
    useVim?: boolean;
    useEmmet?: boolean;
    useBeautifyCode?: boolean;
    cursorPosition?: CursorPosotion;
    pagePosition?: number;
  };
}

export interface MenuGroup {
  action?: string;
  title: string;
  active?: boolean;
  items?: MenuGroup[];
  click?: () => void;
  key?: string;
}

export interface Select {
  value: string;
  label: string;
}

export interface CursorPosotion {
  row: number;
  column: number;
}

export interface SettingsIDE {
  language: string;
}

export interface LoginResponse {
  createUser: {
    code_student_token: string;
    expires_in: number;
    status: number;
  };
}

export interface ListItems {
  title: string;
  iconClass?: string;
  icon: string;
  subtitle: string;
  key: string;
}

export interface ListCode {
  _id: string;
  name: string;
  lang: string;
  updatedAt: Date;
}
