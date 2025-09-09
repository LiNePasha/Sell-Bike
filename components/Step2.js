import { useState } from "react";
import { motion } from "framer-motion";

export default function Step2({ formData, setFormData }) {
  const [errors, setErrors] = useState({});
  const currentYear = new Date().getFullYear();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // نمسح الرسالة لو كتب حاجة
  };

  const validateField = (name, value) => {
    let msg = "";
    if (name === "model" && !value) msg = "من فضلك أدخل الموديل";

    if (name === "year") {
      if (!value) msg = "أدخل سنة الصنع";
      else if (value < 1950) msg = "السنة لازم تكون بعد 1950";
      else if (value > currentYear) msg = `أقصى سنة مسموحة ${currentYear}`;
    }

    if (name === "km" && (!value || value <= 0)) msg = "أدخل عدد كيلومترات صالح";
    if (name === "license" && !value) msg = "أدخل مدة الرخصة";

    if (name === "price" && (!value || value <= 0)) msg = "أدخل سعر صالح";

    if (name === "phone") {
      if (!value) msg = "أدخل رقم الموبايل";
      else if (!/^01[0-2,5]{1}[0-9]{8}$/.test(value))
        msg = "رقم الموبايل غير صحيح (مثال: 01012345678)";
    }

    return msg;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800">
        تفاصيل الموتوسيكل
      </h2>

      {/* Model */}
      <div>
        <label className="block mb-2 text-gray-700 font-medium">الموديل</label>
        <input
          type="text"
          name="model"
          value={formData.model || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="مثال: CBR 600RR"
          className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
            errors.model ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-red-500"
          }`}
        />
        {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
      </div>

      {/* Year */}
      <div>
        <label className="block mb-2 text-gray-700 font-medium">سنة الصنع</label>
        <input
          type="number"
          name="year"
          value={formData.year || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="مثال: 2018"
          className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
            errors.year ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-red-500"
          }`}
        />
        {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
      </div>

      {/* KM */}
      <div>
        <label className="block mb-2 text-gray-700 font-medium">عدد الكيلومترات</label>
        <input
          type="number"
          name="km"
          value={formData.km || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="مثال: 25000"
          className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
            errors.km ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-red-500"
          }`}
        />
        {errors.km && <p className="text-red-500 text-sm mt-1">{errors.km}</p>}
      </div>

      {/* License */}
      <div>
        <label className="block mb-2 text-gray-700 font-medium">الرخصة سارية قد إيه؟</label>
        <input
          type="text"
          name="license"
          value={formData.license || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="مثال: 6 شهور"
          className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
            errors.license ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-red-500"
          }`}
        />
        {errors.license && <p className="text-red-500 text-sm mt-1">{errors.license}</p>}
      </div>

      {/* Price */}
      <div>
        <label className="block mb-2 text-gray-700 font-medium">السعر المطلوب</label>
        <input
          type="number"
          name="price"
          value={formData.price || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="مثال: 75000"
          className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
            errors.price ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-red-500"
          }`}
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block mb-2 text-gray-700 font-medium">رقم الموبايل</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="مثال: 01012345678"
          className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
            errors.phone ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-red-500"
          }`}
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>
    </motion.div>
  );
}
