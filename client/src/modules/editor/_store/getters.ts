import { IDEState, TypedGettersTree } from '@/types/state';
import { SettingsIDE } from '@/types/models';

export interface SettingsIDEGetters {
  bySettings: SettingsIDE;
  getCode: string[];
  error: Error;
}

export default {
  bySettings: ({ settings }) => {
    if (settings) {
      return settings;
    }
    return null;
  },
  getCode: ({ code }) => {
    return code;
  },
  error: ({ error }) => {
    return error;
  },
} as TypedGettersTree<IDEState, SettingsIDEGetters>;
