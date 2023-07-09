export const parseFirebaseError = (error: string) => error.split('/').join('.').split('-').join('_');
