const FormattedTime = (decimalMinutes) => {
    const totalMinutes = Math.floor(decimalMinutes * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor((decimalMinutes * 60) % 60);
    const remainingSeconds = Math.round(((decimalMinutes * 60) % 1) * 60);
  
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minute${
        minutes !== 1 ? "s" : ""
      }`;
    } else if (minutes > 0) {
      return `${minutes} minute${
        minutes !== 1 ? "s" : ""
      } ${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`;
    } else {
      return `${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`;
    }
  };
  export { FormattedTime};