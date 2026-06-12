import axios from "axios";

const API =
  "http://localhost:8080/api/modules";

export const getModules = async () => {

  const token =
    localStorage.getItem("token");

  const response =
    await axios.get(API, {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    });

  return response.data;
};

export const updateModule =
  async (id, module) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.put(
        `${API}/${id}`,
        module,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
};

export const addModule =
  async (module) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.post(
        API,
        module,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
};