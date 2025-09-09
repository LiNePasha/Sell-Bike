import { useState } from "react";
import Stepper from "@/components/Stepper";
import Step1 from "@/components/Step1";
import Step2 from "@/components/Step2";
import Step3 from "@/components/Step3";
import Step4 from "@/components/Step4";
import { motion, AnimatePresence } from "framer-motion";
import { NextSeo } from "next-seo";

export default function Sell() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({ type: "" });

  const totalSteps = 4;

  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));
  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, totalSteps));

  const validatePhone = (phone) => {
    return /^01[0-2,5]{1}[0-9]{8}$/.test(phone);
  };
  const currentYear = new Date().getFullYear();

  // ✅ Validation لكل Step
  const isStepValid = () => {
    if (currentStep === 1) {
      return formData.type && formData.type.trim() !== "";
    }
    if (currentStep === 2) {
      return (
        formData.model &&
        formData.model.trim() !== "" &&
        formData.year &&
        formData.year > 1900 &&
        formData.year <= currentYear &&
        formData.price &&
        formData.price > 0 &&
        formData.phone &&
        validatePhone(formData.phone)
      );
    }
    if (currentStep === 3) {
      return formData.images && formData.images.length > 0; // لازم يرفع صورة
    }
    return true;
  };

  return (
    <>
       <NextSeo
        title="بايكر بويز | بيع موتوسيكل ياباني جديد ومستعمل في مصر"
        description="بايكر بويز أكبر منصة في مصر لبيع وشراء الموتوسيكلات الياباني الجديدة والمستعملة. اعرض موتوسيكل للبيع بسهولة أو دور على أفضل العروض بأسعار مميزة."
        openGraph={{
          url: "https://bikerboyzstore.com/",
          title: "بايكر بويز | بيع موتوسيكل ياباني جديد ومستعمل في مصر",
          description:
            "بايكر بويز أكبر منصة في مصر لبيع وشراء الموتوسيكلات الياباني الجديدة والمستعملة. اعرض موتوسيكل للبيع بسهولة أو دور على أفضل العروض بأسعار مميزة.",
          images: [
            {
              url: "https://bikerboyzstore.com/og-image.jpg", // اعمل صورة 1200x630
              width: 1200,
              height: 630,
              alt: "بايكر بويز بيع موتوسيكلات ياباني",
            },
          ],
          siteName: "Biker Boyz Store",
        }}
        twitter={{
          handle: "@bikerboyz",
          site: "@bikerboyz",
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "بيع موتوسيكلات ياباني, شراء موتوسيكل, موتوسيكلات مستعملة, موتوسيكل ياماها, موتوسيكل هوندا, موتوسيكلات مصر, Biker Boyz Store",
          },
        ]}
      />

      <div
        dir="rtl"
        className="min-h-screen bg-gray-100 flex items-center justify-center p-6"
      >
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8">
          {/* Stepper */}
          <Stepper currentStep={currentStep} />

          {/* Step Content */}
          <div className="mt-10 min-h-[350px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <Step1
                  formData={formData}
                  setFormData={setFormData}
                  key="step1"
                />
              )}
              {currentStep === 2 && (
                <Step2
                  formData={formData}
                  setFormData={setFormData}
                  key="step2"
                />
              )}
              {currentStep === 3 && (
                <Step3
                  formData={formData}
                  setFormData={setFormData}
                  key="step3"
                />
              )}
              {currentStep === 4 && (
                <Step4
                  formData={formData}
                  onSubmit={() => alert("🚀 تم إرسال البيانات لوردبريس")}
                  key="step4"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-10 flex justify-between">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 cursor-pointer rounded-xl font-semibold transition-all duration-200 ${
                currentStep === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              السابق
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={nextStep}
              disabled={!isStepValid() || currentStep === totalSteps}
              className={`px-6 py-3 cursor-pointer rounded-xl font-semibold text-white transition-all duration-200 ${
                !isStepValid() || currentStep === totalSteps
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              التالي
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}
