export const verify = (args: string[]) => {
  for (const arg of args) {
    if (arg === "") {
      return false;
    }
  }
  return true;
};
