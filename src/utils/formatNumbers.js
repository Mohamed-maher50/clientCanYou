const formatter = Intl.NumberFormat("en", {
  notation: "compact",
});

export const formatNumbers = (num) => {
  return formatter.format(num);
};
