const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

const generateCertificatePDF = async (certificateData) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([842, 595]); // A4 Landscape
    
    const { width, height } = page.getSize();
    
    // Load fonts
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const timesRomanItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
    
    // Draw border
    page.drawRectangle({
        x: 20,
        y: 20,
        width: width - 40,
        height: height - 40,
        borderColor: rgb(0.1, 0.3, 0.5),
        borderWidth: 3
    });
    
    // Inner border
    page.drawRectangle({
        x: 30,
        y: 30,
        width: width - 60,
        height: height - 60,
        borderColor: rgb(0.7, 0.6, 0.3),
        borderWidth: 1
    });
    
    // Title
    page.drawText('CERTIFICATE OF COMPLETION', {
        x: width / 2 - 180,
        y: height - 100,
        size: 28,
        font: timesRomanBold,
        color: rgb(0.1, 0.3, 0.5)
    });
    
    // Subtitle
    page.drawText('This is to certify that', {
        x: width / 2 - 80,
        y: height - 160,
        size: 16,
        font: timesRomanItalic,
        color: rgb(0.3, 0.3, 0.3)
    });
    
    // Student Name
    page.drawText(certificateData.studentName, {
        x: width / 2 - (certificateData.studentName.length * 8),
        y: height - 210,
        size: 32,
        font: timesRomanBold,
        color: rgb(0.1, 0.2, 0.4)
    });
    
    // Underline for name
    page.drawLine({
        start: { x: width / 2 - 150, y: height - 220 },
        end: { x: width / 2 + 150, y: height - 220 },
        thickness: 1,
        color: rgb(0.5, 0.5, 0.5)
    });
    
    // Description
    const description = `has successfully completed the internship program in`;
    page.drawText(description, {
        x: width / 2 - 170,
        y: height - 270,
        size: 14,
        font: timesRomanFont,
        color: rgb(0.3, 0.3, 0.3)
    });
    
    // Domain
    page.drawText(certificateData.internshipDomain, {
        x: width / 2 - (certificateData.internshipDomain.length * 6),
        y: height - 310,
        size: 24,
        font: timesRomanBold,
        color: rgb(0.2, 0.4, 0.6)
    });
    
    // Duration
    const startDate = new Date(certificateData.startDate).toLocaleDateString('en-US', { 
        year: 'numeric', month: 'long', day: 'numeric' 
    });
    const endDate = new Date(certificateData.endDate).toLocaleDateString('en-US', { 
        year: 'numeric', month: 'long', day: 'numeric' 
    });
    
    page.drawText(`Duration: ${startDate} to ${endDate}`, {
        x: width / 2 - 150,
        y: height - 360,
        size: 12,
        font: timesRomanFont,
        color: rgb(0.4, 0.4, 0.4)
    });
    
    // Certificate ID
    page.drawText(`Certificate ID: ${certificateData.certificateId}`, {
        x: 60,
        y: 60,
        size: 10,
        font: timesRomanFont,
        color: rgb(0.5, 0.5, 0.5)
    });
    
    // Issue Date
    const issueDate = new Date(certificateData.issueDate).toLocaleDateString('en-US', { 
        year: 'numeric', month: 'long', day: 'numeric' 
    });
    page.drawText(`Issue Date: ${issueDate}`, {
        x: width - 180,
        y: 60,
        size: 10,
        font: timesRomanFont,
        color: rgb(0.5, 0.5, 0.5)
    });
    
    // Signature line
    page.drawLine({
        start: { x: width / 2 - 80, y: 120 },
        end: { x: width / 2 + 80, y: 120 },
        thickness: 1,
        color: rgb(0.3, 0.3, 0.3)
    });
    
    page.drawText('Authorized Signature', {
        x: width / 2 - 55,
        y: 100,
        size: 10,
        font: timesRomanItalic,
        color: rgb(0.4, 0.4, 0.4)
    });
    
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
};

module.exports = { generateCertificatePDF };