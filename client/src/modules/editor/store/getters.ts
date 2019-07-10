import { SettingsIDEState, TypedGettersTree } from '@/types/state';
import { SettingsIDE } from '@/types/models';

export interface SettingsIDEGetters {
  bySettings: SettingsIDE;
}

export default {
  bySettings: ({ settings }) => {
    if (settings) {
      return settings;
    }
    return null;
  }

} as TypedGettersTree<SettingsIDEState, SettingsIDEGetters>