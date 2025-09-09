import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Step4({ formData }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const data = new FormData();
      data.append("your-type", formData.type);
      data.append("your-model", formData.model);
      data.append("your-year", formData.year);
      data.append("your-km", formData.km);
      data.append("your-license", formData.license);
      data.append("your-price", formData.price);
      data.append("your-phone", formData.phone);
      data.append("your-subject", `طلب بيع موتوسيكل: ${formData.type} - ${formData.model}`);
      if (formData.notes) data.append("your-notes", formData.notes);

      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((img) => {
          data.append("your-images[]", img);
        });
      }

      // 🟢 ID الفورم الأساسي
      data.append("_wpcf7_unit_tag", "e9e5ada");

      const res = await fetch(
        "https://bikerboyzstore.com/wp-json/contact-form-7/v1/contact-forms/32244/feedback",
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) throw new Error("فشل في الإرسال");
      const result = await res.json();

      if (result.status === "mail_sent") {
        setSuccess(true);
      } else {
        throw new Error(result.message || "حصل خطأ غير متوقع");
      }
    } catch (err) {
      setError("❌ حصل خطأ أثناء إرسال الطلب.");
    } finally {
      setLoading(false);
    }
  };

  // 🟢 لو تم الإرسال بنجاح → بعد 5 ثواني نعمل redirect
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.location.href = "https://bikerboyzstore.com";
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  if (success) {
    return (
      <motion.div
        key="success"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-screen bg-green-50"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-green-700 text-center p-6">
          ✅ تم إرسال الطلب وهنتواصل معاك على رقمك لو لقينا الموتوسيكل مناسب لينا
          <br />
          <span className="block mt-4 text-gray-600 text-lg">
            سيتم تحويلك تلقائيًا لموقعنا خلال ثوانٍ...
          </span>
        </h2>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        ✅ مراجعة البيانات قبل الإرسال
      </h2>

      <div className="p-6 border rounded-2xl bg-gray-50 shadow-sm space-y-3">
        <p><strong>النوع:</strong> {formData.type}</p>
        <p><strong>الموديل:</strong> {formData.model}</p>
        <p><strong>سنة الصنع:</strong> {formData.year}</p>
        <p><strong>الكيلومترات:</strong> {formData.km}</p>
        <p><strong>الرخصة:</strong> {formData.license}</p>
        <p><strong>السعر:</strong> {formData.price} جنيه</p>
        {formData.notes && <p><strong>ملاحظات:</strong> {formData.notes}</p>}
      </div>

      {formData.images?.length > 0 && (
        <div>
          <p className="font-medium mb-2">📸 الصور:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {formData.images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                alt={`preview-${i}`}
                className="w-full h-32 object-cover rounded-lg border shadow-sm"
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center mt-6">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={loading}
          className={`px-8 py-3 rounded-xl font-semibold text-white shadow-md transition-all ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "⏳ جاري الإرسال..." : "🚀 إرسال الطلب"}
        </motion.button>
      </div>

      {error && <p className="text-red-600 font-medium text-center">{error}</p>}
    </motion.div>
  );
}
