const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

// Email template for certificate notification
const getCertificateEmailTemplate = (studentName, certificateId, domain, startDate, endDate) => {
    const verificationLink = `${process.env.FRONTEND_URL}/certificate/${certificateId}`;
    
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
            .certificate-box { background: white; border: 2px solid #667eea; border-radius: 10px; padding: 20px; margin: 20px 0; }
            .btn { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { background: #333; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; }
            .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .label { font-weight: bold; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎉 Congratulations!</h1>
                <p>Your Internship Certificate is Ready</p>
            </div>
            <div class="content">
                <p>Dear <strong>${studentName}</strong>,</p>
                <p>We are pleased to inform you that your internship certificate has been generated and is now available for download.</p>
                
                <div class="certificate-box">
                    <h3 style="color: #667eea; margin-top: 0;">Certificate Details</h3>
                    <div class="info-row">
                        <span class="label">Certificate ID:</span>
                        <span>${certificateId}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Domain:</span>
                        <span>${domain}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Duration:</span>
                        <span>${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}</span>
                    </div>
                </div>
                
                <center>
                    <a href="${verificationLink}" class="btn">View & Download Certificate</a>
                </center>
                
                <p style="color: #666; font-size: 14px;">
                    You can also verify your certificate anytime by visiting our portal and entering your Certificate ID: <strong>${certificateId}</strong>
                </p>
            </div>
            <div class="footer">
                <p>This is an automated message. Please do not reply to this email.</p>
                <p>© ${new Date().getFullYear()} Certificate Verification System</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

// Send single certificate email
const sendCertificateEmail = async (studentEmail, studentName, certificateId, domain, startDate, endDate) => {
    const transporter = createTransporter();
    
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: studentEmail,
        subject: `🎓 Your Internship Certificate is Ready - ${certificateId}`,
        html: getCertificateEmailTemplate(studentName, certificateId, domain, startDate, endDate),
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${studentEmail}: ${info.messageId}`);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error(`Failed to send email to ${studentEmail}:`, error.message);
        return { success: false, error: error.message };
    }
};

// Send bulk emails
const sendBulkCertificateEmails = async (certificates) => {
    const results = {
        success: [],
        failed: []
    };

    for (const cert of certificates) {
        const result = await sendCertificateEmail(
            cert.studentEmail,
            cert.studentName,
            cert.certificateId,
            cert.domain,
            cert.startDate,
            cert.endDate
        );

        if (result.success) {
            results.success.push(cert.certificateId);
        } else {
            results.failed.push({ certificateId: cert.certificateId, error: result.error });
        }

        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    return results;
};

module.exports = {
    sendCertificateEmail,
    sendBulkCertificateEmails
};