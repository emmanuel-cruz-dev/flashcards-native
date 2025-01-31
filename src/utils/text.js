export const pluralize = ({ text = "", quantity = 0 }) =>
  `${quantity || "No"} ${text}${quantity === 1 ? "" : "s"}`;
