"use client";
import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      

      await new Promise((resolve) => setTimeout(resolve, 1000)); // محاكاة إرسال
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium block mb-1">الاسم</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">البريد الإلكتروني</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium block mb-1">الموضوع</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div>
        <label className="text-sm font-medium block mb-1">الرسالة</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-md font-medium disabled:opacity-60"
      >
        {status === "loading" ? "جاري الإرسال..." : "إرسال الرسالة"}
      </button>

      {status === "success" && (
        <p className="text-green-600 text-sm text-center">
          تم إرسال رسالتك بنجاح! هنتواصل معاك قريبًا.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-sm text-center">
          حصل خطأ، حاول تاني.
        </p>
      )}
    </form>
  );
};

export default ContactForm;