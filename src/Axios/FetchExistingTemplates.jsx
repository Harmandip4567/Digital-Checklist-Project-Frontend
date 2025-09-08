
import axios from "axios";
 const FetchExistingTemplates = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:8000/checklist/templates", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("existing templates",res.data);
      return  res;
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };
export default FetchExistingTemplates;