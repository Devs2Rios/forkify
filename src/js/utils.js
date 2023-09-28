export const fetchData = async (url, errorMessage) => {
  try {
    const res = await fetch(url);
    if (!res.ok)
      throw new Error(errorMessage || `Something went wrong ${res.status}`);
    const { data } = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};
