import axios from "axios";

const DeleteItem = async (itemId) => {
    
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8000/checklist/template/item/${itemId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

  };
  export default DeleteItem;