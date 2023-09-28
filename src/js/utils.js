export const fetchData = async (url, errorMessage) => {
  try {
    const request = await fetch(url);
    if (!request.ok)
      throw new Error(errorMessage || `Something went wrong ${request.status}`);
    const { data } = await request.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
};
