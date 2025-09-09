import { motion } from "framer-motion";
import Image from "next/image";

export default function Step1({ formData, setFormData }) {
  const motorcycleTypes = [
    "Honda",
    "Yamaha",
    "Suzuki",
    "Kawasaki",
    "Ducati",
    "BMW",
  ];

  const handleSelect = (type) => {
    setFormData({ ...formData, type });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col items-center mb-6">
        <Image
          aria-hidden
          src="/logo.webp"
          alt="Logo BikerBoyz"
          width={100}
          height={100}
        />
        <h2 className="text-xl md:text-xl font-bold text-center text-gray-800 mb-2">
          معاك موتوسيكل حالته وسعره كويسين وعايز تبيع ؟
        </h2>
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6">
        اختار نوع الموتوسيكل
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {motorcycleTypes.map((type) => (
          <button
            key={type}
            onClick={() => handleSelect(type)}
            className={`py-3 rounded-xl border-2 font-medium transition-all duration-300 ${
              formData.type === type
                ? "bg-red-600 text-white border-red-600 shadow-lg scale-105"
                : "bg-gray-50 hover:bg-gray-100 border-gray-300"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
