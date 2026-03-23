const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

const generateCertificatePDF = async (certificateData) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([842, 595]); // A4 Landscape
    
    const { width, height } = page.getSize();
    
    // Load fonts
    const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const timesItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    // Background Color (very light warm gray)
    page.drawRectangle({
        x: 0, y: 0,
        width, height,
        color: rgb(0.98, 0.98, 0.98),
    });

    // Decorative corner shapes with opacity
    // Bottom Left Abstract Circle
    page.drawCircle({
        x: 0, y: 0,
        size: 350,
        color: rgb(0.96, 0.22, 0.14), // #f53924
        opacity: 0.05,
    });
    
    // Top right abstract circle
    page.drawCircle({
        x: width, y: height,
        size: 450,
        color: rgb(0.1, 0.2, 0.4),
        opacity: 0.04,
    });

    // Outer Border
    page.drawRectangle({
        x: 25, y: 25,
        width: width - 50, height: height - 50,
        borderColor: rgb(0.96, 0.22, 0.14),
        borderWidth: 2,
    });

    // Inner Border
    page.drawRectangle({
        x: 32, y: 32,
        width: width - 64, height: height - 64,
        borderColor: rgb(0.2, 0.2, 0.2),
        borderWidth: 1,
    });

    // Certificate Title
    const titleText = 'CERTIFICATE OF ACHIEVEMENT';
    const titleWidth = timesBold.widthOfTextAtSize(titleText, 36);
    page.drawText(titleText, {
        x: (width - titleWidth) / 2,
        y: height - 120,
        size: 36,
        font: timesBold,
        color: rgb(0.1, 0.15, 0.3)
    });
    
    // Line under title
    page.drawLine({
        start: { x: (width - titleWidth) / 2 + 50, y: height - 135 },
        end: { x: (width + titleWidth) / 2 - 50, y: height - 135 },
        thickness: 2,
        color: rgb(0.96, 0.22, 0.14) // Brand red
    });

    // Display Text
    const presentText = 'This is proudly presented to:';
    const presentWidth = timesItalic.widthOfTextAtSize(presentText, 18);
    page.drawText(presentText, {
        x: (width - presentWidth) / 2,
        y: height - 200,
        size: 18,
        font: timesItalic,
        color: rgb(0.4, 0.4, 0.4)
    });

    // Student Name
    const name = certificateData.studentName || 'Student Name';
    const nameWidth = timesBold.widthOfTextAtSize(name, 48);
    page.drawText(name, {
        x: (width - nameWidth) / 2,
        y: height - 270,
        size: 48,
        font: timesBold,
        color: rgb(0.8, 0.2, 0.1) // slightly darker red
    });
    
    // Underline for name
    page.drawLine({
        start: { x: (width - nameWidth) / 2 - 20, y: height - 280 },
        end: { x: (width + nameWidth) / 2 + 20, y: height - 280 },
        thickness: 1,
        color: rgb(0.7, 0.7, 0.7)
    });

    // Description text
    const descText = 'for successfully completing the rigorous requirements of the program in:';
    const descWidth = helvetica.widthOfTextAtSize(descText, 14);
    page.drawText(descText, {
        x: (width - descWidth) / 2,
        y: height - 330,
        size: 14,
        font: helvetica,
        color: rgb(0.3, 0.3, 0.3)
    });

    // Domain
    const domain = certificateData.domain || 'Domain Description';
    const domainWidth = timesBold.widthOfTextAtSize(domain, 28);
    page.drawText(domain, {
        x: (width - domainWidth) / 2,
        y: height - 380,
        size: 28,
        font: timesBold,
        color: rgb(0.1, 0.15, 0.3)
    });

    // Timeline Text
    const startDate = new Date(certificateData.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const endDate = new Date(certificateData.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const durationText = `From ${startDate} to ${endDate}`;
    const durationWidth = helvetica.widthOfTextAtSize(durationText, 12);
    
    page.drawText(durationText, {
        x: (width - durationWidth) / 2,
        y: height - 420,
        size: 12,
        font: helvetica,
        color: rgb(0.5, 0.5, 0.5)
    });

    // Metadata & Signatures area
    const bottomY = 90;
    
    // Left side: Cert ID
    page.drawText(`Certificate ID`, {
        x: 80, y: bottomY + 20, size: 10, font: helveticaBold, color: rgb(0.3, 0.3, 0.3)
    });
    page.drawText(`${certificateData.certificateId || 'N/A'}`, {
        x: 80, y: bottomY + 5, size: 12, font: helvetica, color: rgb(0.4, 0.4, 0.4)
    });

    const issueDate = certificateData.createdAt ? new Date(certificateData.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';
    page.drawText(`Issue Date`, {
        x: 80, y: bottomY - 15, size: 10, font: helveticaBold, color: rgb(0.3, 0.3, 0.3)
    });
    page.drawText(`${issueDate}`, {
        x: 80, y: bottomY - 30, size: 12, font: helvetica, color: rgb(0.4, 0.4, 0.4)
    });

    // Center logo placeholder (CredCheck text)
    const logoText = 'CredCheck';
    const logoWidth = helveticaBold.widthOfTextAtSize(logoText, 24);
    page.drawText(logoText, {
        x: (width - logoWidth) / 2,
        y: bottomY - 5,
        size: 24,
        font: helveticaBold,
        color: rgb(0.85, 0.85, 0.85) // faint watermark style
    });

    // Right side: Signature
    const sigX = width - 230;
    page.drawLine({
        start: { x: sigX, y: bottomY + 20 },
        end: { x: sigX + 150, y: bottomY + 20 },
        thickness: 1,
        color: rgb(0.3, 0.3, 0.3)
    });
    
    page.drawText('Authorized Signature', {
        x: sigX + 25,
        y: bottomY + 5,
        size: 11,
        font: timesItalic,
        color: rgb(0.3, 0.3, 0.3)
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
};

module.exports = { generateCertificatePDF };