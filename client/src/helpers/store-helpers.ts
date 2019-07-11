import { Commit } from 'vuex';
import NotAuthorizedError from '@/errors/notAuthorizedError';

export interface ActionConfig<T> {
  mutations: {
    start?: string;
    success?: string;
    fail?: string;
  };
  action: () => Promise<T>;
  commit: Commit;
  errorPayloadMapper?: (err: Error) => any;
  startPayloadMapper?: () => any;
}

export async function executeSafe<T>(
  config: ActionConfig<T>,
): Promise<T | null> {
  const {
    commit,
    action,
    mutations,
    errorPayloadMapper,
    startPayloadMapper,
  } = config;
  const { start, success, fail } = mutations;
  if (start) {
    commit(start, startPayloadMapper ? startPayloadMapper() : undefined);
  }
  try {
    const result = await action();
    if (success) {
      commit(success, result);
    }
    return result;
  } catch (err) {
    if (err instanceof NotAuthorizedError) {
      commitUserExpired(commit);
    } else {
      if (fail) {
        const payload = errorPayloadMapper ? errorPayloadMapper(err) : err;
        commit(fail, payload);
      }
    }
  }
  return null;
}

export function commitUserExpired(commit: Commit) {
  commit('auth/USER_EXPIRED', null, { root: true });
}
