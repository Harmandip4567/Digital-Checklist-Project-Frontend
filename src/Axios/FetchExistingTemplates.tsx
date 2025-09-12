import axios, { AxiosResponse } from "axios";

const FetchExistingTemplates = async (): Promise<AxiosResponse | undefined> => {
  const token = localStorage.getItem("token");
  try {
    const res: AxiosResponse = await axios.get(
      "http://localhost:8000/checklist/templates",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("existing templates", res.data);
    return res;
  } catch (error) {
    console.error("Error fetching templates:", error);
  }
};

export default FetchExistingTemplates;
