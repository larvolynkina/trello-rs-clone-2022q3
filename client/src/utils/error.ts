import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { ErrorMessage } from '../types/Error';

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export const isFetchBaseQueryErrorWithMsg = (
  err: unknown,
): err is FetchBaseQueryError & {
  data: ErrorMessage;
} =>
  isFetchBaseQueryError(err) &&
  'data' in err &&
  typeof err.data === 'object' &&
  err.data !== null &&
  'message' in err.data;
