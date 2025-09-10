import { FaMotorcycle, FaListAlt, FaImages, FaCheck } from "react-icons/fa";

export default function Stepper({ currentStep = 1 }) {
  const steps = [
    { label: "نوع الموتوسيكل", icon: <FaMotorcycle /> },
    { label: "التفاصيل", icon: <FaListAlt /> },
    { label: "الصور", icon: <FaImages /> },
    { label: "تأكيد", icon: <FaCheck /> },
  ];

  return (
    <div className="flex justify-between items-center relative">
      {steps.map((step, i) => {
        const active = currentStep === i + 1;
        const completed = currentStep > i + 1;

        return (
          <div key={step.label} className="flex flex-col items-center flex-1 relative">

            {/* الدائرة */}
            <div
              className={`z-10 w-12 h-12 flex items-center justify-center rounded-full text-xl transition-all duration-300 ${
                active
                  ? "bg-red-600 text-white shadow-lg scale-110"
                  : completed
                  ? "bg-red-400 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {step.icon}
            </div>

            <span
              className={`mt-2 text-[12px] md:text-base ${
                active ? "text-red-600 font-semibold" : "text-gray-600"
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
