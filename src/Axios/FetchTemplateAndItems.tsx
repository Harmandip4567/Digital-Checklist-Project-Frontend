import axios, { AxiosResponse } from "axios";

const FetchTemplateAndItems = async (
  id: number | string
): Promise<any | undefined> => {
  try {
    const token = localStorage.getItem("token");
    const res: AxiosResponse<any> = await axios.get(
      `http://localhost:8000/checklist/template_with_items/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching template items:", err);
  }
};

export default FetchTemplateAndItems;
