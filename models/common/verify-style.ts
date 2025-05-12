export const verify_style_all = (arg: string) => {
  if (arg.split(",").length !== 23) {
    return false;
  }
  return true;
};

export const verify_style_part = (arg: string) => {
  if (arg.split(",").length !== 22) {
    return false;
  }
  return true;
};
