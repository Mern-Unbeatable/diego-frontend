export const hasRole = (userRole, allowedRoles = []) => {
  return allowedRoles.includes(userRole);
};

export const hasPermission = (permissions = [], permission) => {
  return permissions.includes(permission);
};
