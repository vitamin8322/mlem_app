
export const handleInputChange = (text: string) => {
    const sanitizedText = text.replace(/\s/g, ""); // Remove spaces from input value
    return sanitizedText;
  };