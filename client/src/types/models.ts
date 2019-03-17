export type ID = string;

export interface Student {
  id?: ID;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ConfigEditor {
  lang?: string;
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
}

export interface MenuGroup {
	action?: string;
	title: string;
	active?: boolean;
	items?: MenuGroup[];
}

export interface CursorPosotion {
  row: number;
  column: number;
}
