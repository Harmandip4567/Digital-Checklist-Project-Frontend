import axios from "axios";

const RemoveExistingTemplate = async (
  Template_id: number | string
): Promise<boolean> => {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(
      `http://localhost:8000/checklist/template/${Template_id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return true;
  } catch (error) {
    console.error("Error deleting template:", error);
    return false;
  }
};

export default RemoveExistingTemplate;
