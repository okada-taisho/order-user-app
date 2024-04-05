export const createCurrentDate = () => {
  const currentDate: Date = new Date();
  const uid = String(currentDate.getTime());
  return { uid, currentDate };
};
