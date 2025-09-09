// next-seo.config.js
export default {
  title: "Biker Boyz Store | بيع وشراء موتوسيكلات في مصر",
  description:
    "Biker Boyz Store أكبر منصة لبيع وشراء الموتوسيكلات في مصر. اعرض موتوسيكل للبيع أو اشتري جديد ومستعمل بسهولة.",
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://bikerboyzstore.com/",
    siteName: "Biker Boyz Store",
    images: [
      {
        url: "https://bikerboyzstore.com/og-image.jpg", // اعمل صورة مناسبة 1200x630
        width: 1200,
        height: 630,
        alt: "Biker Boyz Store",
      },
    ],
  },
  twitter: {
    handle: "@bikerboyz",
    site: "@bikerboyz",
    cardType: "summary_large_image",
  },
};
