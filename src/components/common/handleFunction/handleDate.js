// eslint-disable-next-line import/prefer-default-export
export const handleDateTime = (dateValueof) => {
  const date = new Date(dateValueof);
  return `${date.toLocaleDateString("en-us", {
    month: "short",
  })} ${date.getDay()}`;
};
