import { SettingsIDE, User } from '@/types/models';

export interface RootState {}

export type TypedGettersTree<TState, TGetters> = {
  [P in keyof TGetters]: (state: TState, getters: TGetters) => TGetters[P]
};

export interface SettingsIDEState {
  error: Error | null;
  settings: SettingsIDE;
}

export interface AuthState {
  isLoading: boolean;
  isExpired: boolean;
  user: User | null;
  error: Error | null;
  loginInProgress: boolean;
  loginError: Error | null;
}
