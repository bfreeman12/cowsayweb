const getFortune = async () => {
  try {
    const response = await fetch("https://example.com/fortune");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getFortune;
