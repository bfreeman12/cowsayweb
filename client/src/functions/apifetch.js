import axios from "axios";
const getFortune = async () => {
  try {
    const response = await axios.get("/fortune");
    const data = response.data.message;
    return data;
  } catch (error) {
    console.error("error fetching fortune: ", error);
  }
};

export default getFortune;
