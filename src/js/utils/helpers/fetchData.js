import { timeoutSeconds } from '../config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const fetchData = async (url, errorMessage) => {
  try {
    const res = await Promise.race([fetch(url), timeout(timeoutSeconds)]);
    const data = await res.json();
    if (!res.ok)
      throw new Error(errorMessage || `${data.message} ${res.status}`);
    return data.data;
  } catch (err) {
    throw err; // This will send the error to the parent request
  }
};
