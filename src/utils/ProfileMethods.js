import axios from "axios";

export const userAlreadyFollowing = (user, id) => user.followers.includes(id);

export const PostRequest = async (URL, data, config) => {
  try {
    const res = await axios.post(URL, { data }, config);
    return [res.data, null];
  } catch (err) {
    return [null, err];
  }
};
export const putRequest = async (URL, config) => {
  try {
    const res = await axios.put(URL, config);
    return [res.data, null];
  } catch (err) {
    return [null, err];
  }
};
export const getRequest = async (URL, config) => {
  try {
    const res = await axios.get(URL, config);

    return [res.data, null];
  } catch (err) {
    return [null, err];
  }
};
