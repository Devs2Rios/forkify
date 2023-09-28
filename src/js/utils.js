export const fetchData = async url => {
  const res = await fetch(url);
  if (!res.ok) return res.status;
  const { data } = await res.json();
  return data;
};
