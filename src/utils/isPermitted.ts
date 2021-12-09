export const isPermitted = (user: any, permission: string): boolean => {
  const perms = user?.role?.permissions.find(
    (p: any) => p.alias === permission
  );
  return !!perms;
};
