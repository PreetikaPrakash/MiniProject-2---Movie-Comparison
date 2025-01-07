const debounce = (func, delay = 1000) => {
  let timeoutID;
  return (...args) => {
    if (timeoutID) {
      clearInterval(timeoutID); // clears old timeoutID of previous letter typed
    }
    timeoutID = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
