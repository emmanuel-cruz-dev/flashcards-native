// export const pluralize = ({ noun, number }) =>
//   `${number || "No"} ${noun}${number === 1 ? "" : "s"}`;

export const pluralize = ({ text = "", quantity = 0 }) =>
  `${quantity || "No"} ${text}${quantity === 1 ? "" : "s"}`;
