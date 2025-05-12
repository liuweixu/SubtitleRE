export const verify_suffix = (args: string, suffix: string) => {
  // 验证后缀名是否为srt或ass
  const splits = args.split(".");
  if (args === "") {
    return false;
  }
  if (args[0] !== ".") {
    return false;
  }
  if (splits[splits.length - 1] !== suffix) {
    return false;
  }
  return true;
};
