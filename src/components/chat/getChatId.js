import axios from "axios";

export const getChatId = async (id) => {
  try {
    const { data } = await axios.get(`/chat/${id}`);
    return data;
  } catch (error) {}
};
