import { motion } from "framer-motion";
import { useRef } from "react";

export default function Step3({ formData, setFormData }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const handleNotesChange = (e) => {
    setFormData({ ...formData, notes: e.target.value });
  };

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
        صور وملاحظات إضافية
      </h2>

      {/* Upload Images */}
      <div
        className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition"
        onClick={() => fileInputRef.current.click()}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-gray-400 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 8v-4m0 0l4 4m-4-4l-4 4"
          />
        </svg>
        <p className="text-gray-600">اضغط هنا لرفع صور الموتوسيكل</p>
      </div>

      {/* Preview Images */}
      {formData.images && formData.images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {formData.images.map((file, idx) => (
            <div
              key={idx}
              className="relative rounded-xl overflow-hidden border border-gray-200 shadow-md group"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${idx}`}
                className="w-full h-32 object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  const newFiles = formData.images.filter((_, i) => i !== idx);
                  setFormData({ ...formData, images: newFiles });
                }}
                className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Notes */}
      <div>
        <label className="block mb-2 text-gray-700 font-medium">
          ملاحظات إضافية
        </label>
        <textarea
          name="notes"
          value={formData.notes || ""}
          onChange={handleNotesChange}
          placeholder="مثال: محتاج رشة، في خدوش بسيطة..."
          rows="4"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none resize-none"
        />
      </div>
    </motion.div>
  );
}
