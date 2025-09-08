import axios from "axios";
const FetchTemplateAndItems = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:8000/checklist/template_with_items/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
     } catch (err) {
      console.error("Error fetching template items:", err);
    }
    
  };
export default FetchTemplateAndItems;