export const extractErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  if (error instanceof Object) {
    if ('message' in error) {
      return error['message'] as string;
    }
    if ('detail' in error) {
      return error['detail'] as string;
    }
  }
  return 'Something went wrong';
};
