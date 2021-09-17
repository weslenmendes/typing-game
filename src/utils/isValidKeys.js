const isValidKeys = (key, word) => {
  if (!word) return false;

  const result = word.split('').includes(key);

  return result;
};

export default isValidKeys;
