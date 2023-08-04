/**
 * This function is used to get today's date as a string with the format
 * DD/MM/YYYY. No parameters are required.
 * @returns A string of today's date formatted as DD/MM/YYYY.
 */
export const getToday = () => {
  const date = new Date();
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${dd.toString().padStart(2, '0')}/${mm.toString().padStart(2, '0')}/${year}`;
}