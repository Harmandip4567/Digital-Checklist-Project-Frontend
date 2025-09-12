import  { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Headerfile from "../../SharedComponents/Headerfile";
import Layout from "../../SharedComponents/Layout";

// Types for checklist items and template
interface ChecklistItem {
  id: number;
  order: number;
  label: string;
  input_type: "text" | "number" | "checkbox";
  required: boolean;
  frequency?: string;
  unit?: string;
  options?: string[];
}

interface Template {
  id: number;
  title: string;
  description: string;
  status?: string;
  delay_reason?: string;
  notes?: string;
}

interface ApiResponse {
  template: Template;
  items: ChecklistItem[];
}

function MaintainerTemplateAction() {
  const { id } = useParams<{ id: string }>();
  const [template, setTemplate] = useState<Template | null>(null);
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [delayReason, setDelayReason] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [status, setStatus] = useState<string>("pending");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [itemResponses, setItemResponses] = useState<Record<number, string | boolean>>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchTemplateDetails();
  }, [id]);

  const fetchTemplateDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get<ApiResponse>(
        `http://localhost:8000/checklist/template_with_items/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTemplate(res.data.template);
      setItems(res.data.items);
      setStatus(res.data.template.status || "pending");
      setDelayReason(res.data.template.delay_reason || "");
      setNotes(res.data.template.notes || "");
      setLoading(false);
    } catch (err) {
      console.error("Error fetching template details:", err);
      setLoading(false);
    }
  };

  const handleItemChange = (itemId: number, value: string | boolean) => {
    setItemResponses((prev) => ({ ...prev, [itemId]: value }));
  };

  const handleStatusToggle = () => {
    setStatus(status === "pending" ? "Submitted" : "pending");
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("status", status);
      formData.append("delay_reason", delayReason);
      formData.append("notes", notes);
      if (file) {
        formData.append("file", file);
      }
      formData.append("item_responses", JSON.stringify(itemResponses));

      await axios.put(
        `http://localhost:8000/checklist/details/${id}/status`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (template) {
        navigate(`/maintainer/template-Details/${template.id}`);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (!template) return <p className="text-red-500">Template not found</p>;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 font-sans py-8 px-6">
        <Headerfile title={"Maintainer Template Action"} />

        <form
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto space-y-8"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Template Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Title</label>
            <input
              type="text"
              value={template.title}
              disabled
              className="w-full bg-gray-100 rounded-xl px-4 py-2"
            />
          </div>

          {/* Template Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Description
            </label>
            <textarea
              value={template.description || ""}
              disabled
              className="w-full bg-gray-100 rounded-xl px-4 py-2"
            />
          </div>

          {/* Checklist Items */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Checklist Items
            </h3>
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-6 shadow hover:shadow-lg transition"
              >
                <label className="block font-medium text-gray-700 mb-2">
                  #{item.order} {item.label}{" "}
                  {item.required && <span className="text-red-500">*</span>}
                </label>

                {item.input_type === "text" && (
                  <input
                    type="text"
                    value={(itemResponses[item.id] as string) || ""}
                    onChange={(e) => handleItemChange(item.id, e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder={item.label}
                    required={item.required}
                  />
                )}

                {item.input_type === "number" && (
                  <input
                    type="number"
                    value={(itemResponses[item.id] as string) || ""}
                    onChange={(e) => handleItemChange(item.id, e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder={item.label}
                    required={item.required}
                  />
                )}

                {item.input_type === "checkbox" && (
                  <input
                    type="checkbox"
                    checked={!!itemResponses[item.id]}
                    onChange={(e) => handleItemChange(item.id, e.target.checked)}
                    className="w-5 h-5"
                    required={item.required}
                  />
                )}

                {/* Metadata */}
                <p className="text-sm text-gray-500 mt-3">
                  Frequency: {item.frequency || "-"} | Unit: {item.unit || "-"}
                </p>
                {item.options && item.options.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    Options: {item.options.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Extra Fields */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Delay Reason
            </label>
            <input
              type="text"
              value={delayReason}
              onChange={(e) => setDelayReason(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2"
              placeholder="Enter reason for delay (if any)"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Additional Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2"
              placeholder="Any additional notes"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Upload File
            </label>
            <input
              type="file"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-2"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Status
            </label>
            <button
              type="button"
              className={`px-5 py-2 rounded-xl text-white shadow transition ${
                status === "pending" ? "bg-blue-600" : "bg-green-600"
              }`}
              onClick={handleStatusToggle}
            >
              Mark as {status === "pending" ? "Submitted" : "Pending"}
            </button>
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="button"
              className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-indigo-700 shadow-lg transition"
              onClick={handleSubmit}
            >
              Submit Checklist
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default MaintainerTemplateAction;
