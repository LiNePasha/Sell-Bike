export async function sendToWordPress(formData) {
  try {
    const response = await fetch("https://YOUR-WP-SITE.com/wp-json/contact-form-7/v1/contact-forms/123/feedback", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: new FormData(Object.entries({
        "your-type": formData.type,
        "your-model": formData.model,
        "your-year": formData.year,
        "your-km": formData.km,
        "your-license": formData.license,
        "your-price": formData.price,
        "your-notes": formData.notes || "",
      })),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending form:", error);
    throw error;
  }
}
