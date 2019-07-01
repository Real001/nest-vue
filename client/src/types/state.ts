import { SettingsIDE } from '@/types/models';

export interface RootState { }

export type TypedGettersTree<TState, TGetters> = {
  [P in keyof TGetters]: (
    state: TState,
    getters: TGetters,
  ) => TGetters[P];
};

export interface SettingsIDEState {
  error: Error| null;
  settings: SettingsIDE;
}