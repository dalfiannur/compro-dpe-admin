export const useDateTimeFormat = () => (text: string) => {
  const date = new Date(text);
  return Intl.DateTimeFormat("ID-id", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h24",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};
