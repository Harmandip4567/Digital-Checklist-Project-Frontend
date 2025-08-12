import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewTemplate() {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    fetchTemplate();
  }, []);

  const fetchTemplate = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/templates/${id}`);
      setTemplate(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!template) return <p>Loading...</p>;

  return (
    <div>
      <h2>{template.name}</h2>
      <p>{template.description}</p>

      <h3>Checklist Items</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Order</th>
            <th>Label</th>
            <th>Type</th>
            <th>Required</th>
            <th>Frequency</th>
            <th>Unit</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {template.items.map(item => (
            <tr key={item.id}>
              <td>{item.order}</td>
              <td>{item.label}</td>
              <td>{item.input_type}</td>
              <td>{item.required ? "Yes" : "No"}</td>
              <td>{item.frequency || "-"}</td>
              <td>{item.unit || "-"}</td>
              <td>{item.options?.join(", ") || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewTemplate;
