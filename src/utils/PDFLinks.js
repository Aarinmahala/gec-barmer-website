import pdfLinks from '../data/pdf-links.json';

/**
 * Utility for accessing PDF file links
 */
const PDFLinks = {
  /**
   * Get a link for a student support PDF
   * @param {string} type - The type of student support (grievanceRedressal, antiRagging, womenGenderCell, scstCell)
   * @returns {string} The URL to the PDF
   */
  getStudentSupportLink: (type) => {
    return pdfLinks.studentSupport[type] || '#';
  },

  /**
   * Get a link for an academic resource PDF
   * @param {string} type - The type of academic resource (syllabus, academicCalendar, results)
   * @returns {string} The URL to the PDF
   */
  getAcademicResourceLink: (type) => {
    return pdfLinks.academicResources[type] || '#';
  },

  /**
   * Get a link for a national program PDF
   * @param {string} type - The type of national program (nss, ncc)
   * @returns {string} The URL to the PDF
   */
  getNationalProgramLink: (type) => {
    return pdfLinks.nationalPrograms[type] || '#';
  },

  /**
   * Get all PDF links
   * @returns {Object} All PDF links
   */
  getAllLinks: () => {
    return pdfLinks;
  }
};

export default PDFLinks; 