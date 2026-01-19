const isRouteActive = (currentPath: string, targetPath: string) => {
  return (
    currentPath === targetPath ||
    currentPath.startsWith(`${targetPath}/`)
  );
};

export { isRouteActive }