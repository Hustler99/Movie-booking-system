const now = new Date();

export  function getEgyptTime(): string {
  const now = new Date();
  return  now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Africa/Cairo",
  });
}

export  function getTodayDate(): string {
  const now = new Date();
  return now.toDateString();
}