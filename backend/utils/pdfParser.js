import fs from "fs/promises";

/**
 * Extract text from PDF file
 * @param {string} filePath - Path to PDF file
 * @returns {Promise<{text: string, numPages: number}>}
 */
export const extractTextFromPDF = async (filePath) => {
  try {
    // Dynamic import to avoid loading in serverless cold start
    const { default: pdfParse } = await import('pdf-parse/lib/pdf-parse.js');
    
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdfParse(dataBuffer);

    return {
      text: data.text,
      numPages: data.numpages,
      info: data.info,
    };
  } catch (error) {
    console.error("PDF parsing error:", error);
    
    // If pdf-parse fails in serverless, provide helpful error
    if (error.message?.includes('DOMMatrix') || error.message?.includes('canvas')) {
      throw new Error('PDF parsing is not supported in serverless environment. Please use a different deployment method or external service.');
    }
    
    throw new Error(`Failed to extract text from PDF: ${error.message}`);
  }
};


