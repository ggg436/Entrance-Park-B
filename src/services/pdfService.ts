import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Add font handling
import 'jspdf-autotable';

export const generatePDF = async (elementId: string, filename: string = 'resume.pdf') => {
  try {
    // Get the CV container element
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    // Create a canvas from the element with higher quality settings
    const canvas = await html2canvas(element, {
      scale: 3, // Higher scale for better quality
      useCORS: true, // Enable CORS for images
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true, // Allow cross-origin images to taint canvas
      windowWidth: 1200, // Set a fixed width to ensure proper rendering
    });

    // Calculate dimensions to fit in A4
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png', 1.0); // Highest quality

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Handle multiple pages if needed
    let heightLeft = imgHeight - pageHeight;
    let position = -pageHeight;

    while (heightLeft > 0) {
      position = -heightLeft;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};

export const generatePDFFromTemplate = async (
  cvData: any,
  templateStyle: string,
  filename: string = 'resume.pdf'
) => {
  try {
    // Create PDF document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });
    
    // Normalize data to prevent rendering issues
    const normalizedData = normalizeData(cvData);
    
    // Select the template to use
    if (templateStyle === 'modern') {
      createModernTemplate(pdf, normalizedData);
    } else if (templateStyle === 'classic') {
      createClassicTemplate(pdf, normalizedData);
    } else if (templateStyle === 'creative') {
      createCreativeTemplate(pdf, normalizedData);
    } else {
      createMinimalTemplate(pdf, normalizedData); // default
    }
    
    // Save the PDF
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating PDF from template:', error);
    return false;
  }
};

// Function to normalize data and prevent rendering issues
function normalizeData(data: any) {
  const normalized = JSON.parse(JSON.stringify(data)); // Deep clone
  
  // Ensure personal info exists
  if (!normalized.personalInfo) normalized.personalInfo = {};
  
  // Ensure all text fields are strings and not undefined
  const textFields = ['fullName', 'title', 'email', 'phone', 'location', 'website', 'summary'];
  textFields.forEach(field => {
    if (!normalized.personalInfo[field]) normalized.personalInfo[field] = '';
    // Sanitize text by replacing problematic characters
    normalized.personalInfo[field] = String(normalized.personalInfo[field])
      .replace(/[\u2018\u2019]/g, "'") // Replace smart quotes
      .replace(/[\u201C\u201D]/g, '"'); // Replace smart double quotes
  });
  
  // Ensure experiences array exists and is valid
  if (!Array.isArray(normalized.experiences)) normalized.experiences = [];
  
  // Sanitize experience data
  normalized.experiences.forEach((exp: any) => {
    if (!exp.position) exp.position = '';
    if (!exp.company) exp.company = '';
    if (!exp.startDate) exp.startDate = '';
    if (!exp.endDate) exp.endDate = '';
    if (!exp.description) exp.description = '';
    
    // Sanitize text
    exp.position = String(exp.position).replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
    exp.company = String(exp.company).replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
    exp.startDate = String(exp.startDate).replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
    exp.endDate = String(exp.endDate).replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
    exp.description = String(exp.description).replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
  });
  
  // Ensure skills array exists
  if (!Array.isArray(normalized.skills)) normalized.skills = [];
  
  // Sanitize skill data
  normalized.skills.forEach((skill: any) => {
    if (!skill.name) skill.name = '';
    if (typeof skill.level !== 'number') skill.level = 3;
    
    // Sanitize text
    skill.name = String(skill.name).replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
  });
  
  return normalized;
}

// Helper function to handle circular image clipping in PDF
function addCircularImage(pdf: jsPDF, imgData: string, x: number, y: number, size: number) {
  try {
    // Create a temporary canvas for circular cropping
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;
    
    // Set canvas dimensions (larger for better quality)
    const canvasSize = size * 4; // 4x size for higher resolution
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    
    // Create circular clipping path
    ctx.beginPath();
    ctx.arc(canvasSize / 2, canvasSize / 2, canvasSize / 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    
    // Load the image
    const img = new Image();
    img.onload = () => {
      // Calculate dimensions to maintain aspect ratio and center the image
      const imgRatio = img.width / img.height;
      let drawWidth, drawHeight, offsetX, offsetY;
      
      if (imgRatio >= 1) { // Width >= Height
        drawHeight = canvasSize;
        drawWidth = drawHeight * imgRatio;
        offsetX = (canvasSize - drawWidth) / 2;
        offsetY = 0;
      } else { // Height > Width
        drawWidth = canvasSize;
        drawHeight = drawWidth / imgRatio;
        offsetX = 0;
        offsetY = (canvasSize - drawHeight) / 2;
      }
      
      // Draw the image centered in the circle
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      
      // Get the circular image data
      const circularImgData = canvas.toDataURL('image/png');
      
      // Add to PDF
      pdf.addImage(circularImgData, 'PNG', x, y, size, size, undefined, 'FAST');
    };
    
    img.src = imgData;
    return true;
  } catch (error) {
    console.error('Error creating circular image:', error);
    return false;
  }
}

// Improved Modern template with blue header
function createModernTemplate(pdf: jsPDF, cvData: any) {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  let yPos = margin;
  
  // Add blue header
  pdf.setFillColor(41, 98, 255); // Bright blue
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  // Add photo if available
  if (cvData.personalInfo.photo) {
    try {
      // Position for photo on the right side of the header
      const photoSize = 30; // 30mm diameter
      const photoX = pageWidth - margin - photoSize;
      const photoY = 5;
      
      // Add circular photo with proper cropping
      addCircularImage(pdf, cvData.personalInfo.photo, photoX, photoY, photoSize);
      
      // Draw white border around photo
      pdf.setDrawColor(255, 255, 255);
      pdf.setLineWidth(1);
      pdf.circle(photoX + photoSize/2, photoY + photoSize/2, photoSize/2, 'S');
    } catch (error) {
      console.error('Error adding photo to PDF:', error);
    }
  }
  
  // Name and title
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont("helvetica", "bold");
  yPos += 15;
  pdf.text(cvData.personalInfo.fullName || 'Your Name', margin, yPos);
  
  yPos += 10;
  pdf.setFontSize(13);
  pdf.setFont("helvetica", "normal");
  pdf.text(cvData.personalInfo.title || 'Professional Title', margin, yPos);
  yPos = 50;
  
  // Contact information with bullets
  yPos += 10;
  let contactY = yPos;
  pdf.setTextColor(80, 80, 80);
  pdf.setFontSize(9);
  
  if (cvData.personalInfo.email) {
    pdf.text('• ' + cvData.personalInfo.email, margin, contactY);
    pdf.text('• ' + (cvData.personalInfo.phone || ''), margin + 70, contactY);
    contactY += 5;
  }
  
  if (cvData.personalInfo.location) {
    pdf.text('• ' + cvData.personalInfo.location, margin, contactY);
    if (cvData.personalInfo.website) {
      pdf.text('• ' + cvData.personalInfo.website, margin + 70, contactY);
    }
    contactY += 5;
  }
  
  yPos = contactY + 5;
  
  // Horizontal line separator
  pdf.setDrawColor(220, 220, 220);
  pdf.setLineWidth(0.5);
  pdf.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;
  
  // Professional Summary
  if (cvData.personalInfo.summary) {
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(41, 98, 255);
    pdf.setFontSize(12);
    pdf.text("PROFESSIONAL SUMMARY", margin, yPos);
    yPos += 7;
    
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(80, 80, 80);
    pdf.setFontSize(10);
    
    const splitSummary = pdf.splitTextToSize(cvData.personalInfo.summary, pageWidth - (margin * 2) - 5);
    pdf.text(splitSummary, margin, yPos);
    yPos += splitSummary.length * 5 + 10;
  }
  
  // Experience Section
  if (cvData.experiences && cvData.experiences.length > 0) {
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(41, 98, 255);
    pdf.setFontSize(12);
    pdf.text("EXPERIENCE", margin, yPos);
    yPos += 7;
    
    // Line separator under section header
    pdf.setDrawColor(41, 98, 255);
    pdf.setLineWidth(0.3);
    pdf.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 7;
    
    cvData.experiences.forEach((exp: any, index: number) => {
      // Add spacing between experiences
      if (index > 0) yPos += 5;
      
      // Check if we need a new page
      if (yPos > pageHeight - 50) {
        pdf.addPage();
        yPos = margin + 10;
      }
      
      // Position
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(60, 60, 60);
      pdf.setFontSize(11);
      pdf.text(exp.position, margin, yPos);
      yPos += 5;
      
      // Company and date
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(80, 80, 80);
      pdf.setFontSize(10);
      pdf.text(exp.company, margin, yPos);
      
      // Date text right-aligned
      const dateText = `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`;
      const dateWidth = pdf.getStringUnitWidth(dateText) * pdf.getFontSize() / pdf.internal.scaleFactor;
      pdf.text(dateText, pageWidth - margin - dateWidth, yPos);
      yPos += 6;
      
      // Description
      if (exp.description) {
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(100, 100, 100);
        pdf.setFontSize(9);
        const splitDesc = pdf.splitTextToSize(exp.description, pageWidth - (margin * 2) - 5);
        pdf.text(splitDesc, margin, yPos);
        yPos += splitDesc.length * 4.5 + 8;
      } else {
        yPos += 5;
      }
    });
  }
  
  // Skills Section
  if (cvData.skills && cvData.skills.length > 0) {
    // Check if we need a new page
    if (yPos > pageHeight - 60) {
      pdf.addPage();
      yPos = margin + 10;
    }
    
    yPos += 5;
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(41, 98, 255);
    pdf.setFontSize(12);
    pdf.text("SKILLS", margin, yPos);
    yPos += 7;
    
    // Line separator under section header
    pdf.setDrawColor(41, 98, 255);
    pdf.setLineWidth(0.3);
    pdf.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;
    
    // Skills with bullet points in multiple columns
    const skillsPerRow = 2;
    const skillWidth = (pageWidth - (margin * 2)) / skillsPerRow;
    
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(80, 80, 80);
    pdf.setFontSize(10);
    
    for (let i = 0; i < cvData.skills.length; i += skillsPerRow) {
      // Check if we need a new page
      if (yPos > pageHeight - 15) {
        pdf.addPage();
        yPos = margin + 10;
      }
      
      // First skill in row
      if (i < cvData.skills.length) {
        pdf.text(`• ${cvData.skills[i].name}`, margin, yPos);
      }
      
      // Second skill in row
      if (i + 1 < cvData.skills.length) {
        pdf.text(`• ${cvData.skills[i + 1].name}`, margin + skillWidth, yPos);
      }
      
      yPos += 7; // Space between skill rows
    }
  }
}

// Improved Classic template with centered formatting
function createClassicTemplate(pdf: jsPDF, cvData: any) {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let yPos = margin + 5;
  
  // Add photo if available
  if (cvData.personalInfo.photo) {
    try {
      // Position photo centered above the name
      const photoSize = 35; // 35mm diameter
      const photoX = (pageWidth - photoSize) / 2;
      const photoY = yPos;
      
      // Add circular photo
      pdf.addImage(
        cvData.personalInfo.photo,
        'PNG',
        photoX,
        photoY,
        photoSize,
        photoSize,
        undefined,
        'FAST'
      );
      
      // Draw border around photo
      pdf.setDrawColor(0, 0, 0);
      pdf.setLineWidth(0.5);
      pdf.circle(photoX + photoSize/2, photoY + photoSize/2, photoSize/2, 'S');
      
      // Adjust the yPos to account for the photo
      yPos += photoSize + 10;
    } catch (error) {
      console.error('Error adding photo to PDF:', error);
    }
  }
  
  // Name
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(20);
  pdf.text(cvData.personalInfo.fullName.toUpperCase() || 'YOUR NAME', pageWidth / 2, yPos, { align: 'center' });
  yPos += 10;
  
  // Title
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(80, 80, 80);
  pdf.setFontSize(13);
  pdf.text(cvData.personalInfo.title || 'Professional Title', pageWidth / 2, yPos, { align: 'center' });
  yPos += 12;
  
  // Contact info centered on multiple lines for better readability
  pdf.setFontSize(9);
  pdf.setTextColor(90, 90, 90);
  
  // Email and phone on same line
  let emailPhone = '';
  if (cvData.personalInfo.email) emailPhone += cvData.personalInfo.email;
  if (cvData.personalInfo.phone) {
    emailPhone += emailPhone ? '  •  ' + cvData.personalInfo.phone : cvData.personalInfo.phone;
  }
  pdf.text(emailPhone, pageWidth / 2, yPos, { align: 'center' });
  yPos += 5;
  
  // Location and website on next line
  let locationWebsite = '';
  if (cvData.personalInfo.location) locationWebsite += cvData.personalInfo.location;
  if (cvData.personalInfo.website) {
    locationWebsite += locationWebsite ? '  •  ' + cvData.personalInfo.website : cvData.personalInfo.website;
  }
  if (locationWebsite) {
    pdf.text(locationWebsite, pageWidth / 2, yPos, { align: 'center' });
    yPos += 5;
  }
  
  yPos += 8;
  
  // Double divider for classic look
  pdf.setDrawColor(0, 0, 0);
  pdf.setLineWidth(0.2);
  pdf.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 1;
  pdf.setLineWidth(0.8);
  pdf.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 12;
  
  // Professional Summary
  if (cvData.personalInfo.summary) {
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.text("PROFESSIONAL SUMMARY", pageWidth / 2, yPos, { align: 'center' });
    yPos += 8;
    
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(40, 40, 40);
    pdf.setFontSize(10);
    
    const splitSummary = pdf.splitTextToSize(cvData.personalInfo.summary, pageWidth - (margin * 2) - 10);
    pdf.text(splitSummary, pageWidth / 2, yPos, { align: 'center' });
    yPos += splitSummary.length * 5 + 12;
  }
  
  // Experience Section
  if (cvData.experiences && cvData.experiences.length > 0) {
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.text("EXPERIENCE", pageWidth / 2, yPos, { align: 'center' });
    yPos += 8;
    
    // Single divider under section header
    pdf.setLineWidth(0.3);
    pdf.line(margin + 30, yPos, pageWidth - margin - 30, yPos);
    yPos += 8;
    
    cvData.experiences.forEach((exp: any, index: number) => {
      // Check if we need a new page
      if (yPos > pageHeight - 60) {
        pdf.addPage();
        yPos = margin + 10;
      }
      
      // Position
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(11);
      pdf.text(exp.position, margin, yPos);
      
      // Date text right-aligned
      const dateText = `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`;
      const dateWidth = pdf.getStringUnitWidth(dateText) * pdf.getFontSize() / pdf.internal.scaleFactor;
      pdf.setFont("helvetica", "italic");
      pdf.setTextColor(80, 80, 80);
      pdf.setFontSize(9);
      pdf.text(dateText, pageWidth - margin - dateWidth, yPos);
      yPos += 5;
      
      // Company
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(40, 40, 40);
      pdf.setFontSize(10);
      pdf.text(exp.company, margin, yPos);
      yPos += 7;
      
      // Description
      if (exp.description) {
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(80, 80, 80);
        pdf.setFontSize(9);
        const splitDesc = pdf.splitTextToSize(exp.description, pageWidth - (margin * 2) - 10);
        pdf.text(splitDesc, margin, yPos);
        yPos += splitDesc.length * 4.5 + 10;
      } else {
        yPos += 10;
      }
    });
  }
  
  // Skills Section
  if (cvData.skills && cvData.skills.length > 0) {
    // Check if we need a new page
    if (yPos > pageHeight - 60) {
      pdf.addPage();
      yPos = margin + 10;
    }
    
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.text("SKILLS", pageWidth / 2, yPos, { align: 'center' });
    yPos += 8;
    
    // Single divider under section header
    pdf.setLineWidth(0.3);
    pdf.line(margin + 30, yPos, pageWidth - margin - 30, yPos);
    yPos += 8;
    
    // Organize skills in three columns
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(40, 40, 40);
    pdf.setFontSize(10);
    
    const skillsPerColumn = Math.ceil(cvData.skills.length / 3);
    const columnWidth = (pageWidth - (margin * 2)) / 3;
    
    for (let i = 0; i < skillsPerColumn; i++) {
      // First column
      if (i < cvData.skills.length) {
        pdf.text(`• ${cvData.skills[i].name}`, margin, yPos);
      }
      
      // Second column
      if (i + skillsPerColumn < cvData.skills.length) {
        pdf.text(`• ${cvData.skills[i + skillsPerColumn].name}`, margin + columnWidth, yPos);
      }
      
      // Third column
      if (i + (skillsPerColumn * 2) < cvData.skills.length) {
        pdf.text(`• ${cvData.skills[i + (skillsPerColumn * 2)].name}`, margin + (columnWidth * 2), yPos);
      }
      
      yPos += 6;
    }
  }
}

// Improved Creative template with sidebar
function createCreativeTemplate(pdf: jsPDF, cvData: any) {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const sidebarWidth = 60; // Width of sidebar in mm
  const mainMargin = 15;
  const sidebarMargin = 10;
  let mainContentX = sidebarWidth + 5;
  let yPos = 30;
  
  // Draw sidebar background - full page height
  pdf.setFillColor(30, 41, 59); // Dark blue sidebar
  pdf.rect(0, 0, sidebarWidth, pageHeight, 'F');
  
  // Add photo if available
  if (cvData.personalInfo.photo) {
    try {
      // Position photo in sidebar
      const photoSize = 40; // 40mm diameter
      const photoX = (sidebarWidth - photoSize) / 2;
      const photoY = 10;
      
      // Add circular photo
      pdf.addImage(
        cvData.personalInfo.photo,
        'PNG',
        photoX,
        photoY,
        photoSize,
        photoSize,
        undefined,
        'FAST'
      );
      
      // Draw white border around photo
      pdf.setDrawColor(255, 255, 255);
      pdf.setLineWidth(0.8);
      pdf.circle(photoX + photoSize/2, photoY + photoSize/2, photoSize/2, 'S');
      
      // Push down the name and other content in sidebar
      yPos = photoY + photoSize + 15;
    } catch (error) {
      console.error('Error adding photo to PDF:', error);
    }
  }
  
  // Name in sidebar - with adjusted position if there's a photo
  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  
  // Split name into first and last name for styling
  const nameParts = cvData.personalInfo.fullName.split(' ');
  const firstName = nameParts[0] || 'Your';
  const lastName = nameParts.slice(1).join(' ') || 'Name';
  
  pdf.text(firstName, sidebarMargin, yPos);
  pdf.text(lastName, sidebarMargin, yPos + 10);
  
  // Title in sidebar
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.text(cvData.personalInfo.title || 'Professional Title', sidebarMargin, yPos + 20);
  
  // Divider in sidebar
  pdf.setDrawColor(100, 110, 130);
  pdf.setLineWidth(0.5);
  pdf.line(sidebarMargin, yPos + 25, sidebarWidth - sidebarMargin, yPos + 25);
  
  // Contact section header with adjusted position
  let sidebarY = yPos + 35;
  
  // Contact details
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  
  if (cvData.personalInfo.email) {
    pdf.text(cvData.personalInfo.email, sidebarMargin, sidebarY);
    sidebarY += 6;
  }
  
  if (cvData.personalInfo.phone) {
    pdf.text(cvData.personalInfo.phone, sidebarMargin, sidebarY);
    sidebarY += 6;
  }
  
  if (cvData.personalInfo.location) {
    pdf.text(cvData.personalInfo.location, sidebarMargin, sidebarY);
    sidebarY += 6;
  }
  
  // Skills section in sidebar
  if (cvData.skills && cvData.skills.length > 0) {
    sidebarY += 10;
    pdf.setDrawColor(100, 110, 130);
    pdf.setLineWidth(0.5);
    pdf.line(sidebarMargin, sidebarY - 5, sidebarWidth - sidebarMargin, sidebarY - 5);
    
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.text("SKILLS", sidebarMargin, sidebarY);
    sidebarY += 8;
    
    // Add skills with rating dots
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    
    cvData.skills.slice(0, 10).forEach((skill: any) => { // Limit to 10 skills
      // Check if skill would go off the page
      if (sidebarY > pageHeight - 20) {
        sidebarY = 20; // Reset to top of page
        
        // Continue sidebar background on new page
        pdf.addPage();
        pdf.setFillColor(30, 41, 59);
        pdf.rect(0, 0, sidebarWidth, pageHeight, 'F');
        pdf.setTextColor(255, 255, 255);
      }
      
      const displayName = skill.name.length > 15 ? skill.name.substring(0, 13) + '...' : skill.name;
      pdf.text(displayName, sidebarMargin, sidebarY);
      
      // Draw skill level dots
      for (let i = 0; i < 5; i++) {
        pdf.setFillColor(i < skill.level ? 255 : 100, 
                        i < skill.level ? 255 : 110, 
                        i < skill.level ? 255 : 130);
        pdf.circle(sidebarMargin + (i * 3), sidebarY + 3, 1, 'F');
      }
      
      sidebarY += 7;
    });
  }
  
  // Main content area - start from the top
  yPos = 25;
  
  // Profile/Summary section
  if (cvData.personalInfo.summary) {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(30, 41, 59); // Dark blue to match sidebar
    pdf.text("PROFILE", mainContentX, yPos);
    yPos += 7;
    
    pdf.setDrawColor(30, 41, 59);
    pdf.setLineWidth(0.5);
    pdf.line(mainContentX, yPos, pageWidth - mainMargin, yPos);
    yPos += 8;
    
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(60, 60, 60);
    pdf.setFontSize(10);
    
    const splitSummary = pdf.splitTextToSize(cvData.personalInfo.summary, pageWidth - mainContentX - mainMargin - 5);
    pdf.text(splitSummary, mainContentX, yPos);
    yPos += splitSummary.length * 5 + 12;
  }
  
  // Experience section
  if (cvData.experiences && cvData.experiences.length > 0) {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(30, 41, 59); // Dark blue to match sidebar
    pdf.text("EXPERIENCE", mainContentX, yPos);
    yPos += 7;
    
    pdf.setDrawColor(30, 41, 59);
    pdf.setLineWidth(0.5);
    pdf.line(mainContentX, yPos, pageWidth - mainMargin, yPos);
    yPos += 10;
    
    cvData.experiences.forEach((exp: any, index: number) => {
      // Check if we need a new page
      if (yPos > pageHeight - 50) {
        pdf.addPage();
        // Continue sidebar on new page
        pdf.setFillColor(30, 41, 59);
        pdf.rect(0, 0, sidebarWidth, pageHeight, 'F');
        yPos = 25;
      }
      
      // Position and company
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(50, 50, 50);
      pdf.setFontSize(11);
      pdf.text(exp.position, mainContentX, yPos);
      yPos += 6;
      
      pdf.setFont("helvetica", "italic");
      pdf.setTextColor(80, 80, 80);
      pdf.setFontSize(9);
      pdf.text(exp.company, mainContentX, yPos);
      
      // Date right aligned
      const dateText = `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`;
      const dateWidth = pdf.getStringUnitWidth(dateText) * pdf.getFontSize() / pdf.internal.scaleFactor;
      pdf.text(dateText, pageWidth - mainMargin - dateWidth, yPos);
      yPos += 7;
      
      // Description
      if (exp.description) {
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(80, 80, 80);
        pdf.setFontSize(9);
        
        const splitDesc = pdf.splitTextToSize(exp.description, pageWidth - mainContentX - mainMargin - 5);
        pdf.text(splitDesc, mainContentX, yPos);
        yPos += splitDesc.length * 4.5 + 10;
      } else {
        yPos += 10;
      }
    });
  }
}

// Improved Minimal template with clean design
function createMinimalTemplate(pdf: jsPDF, cvData: any) {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let yPos = margin + 5;
  
  // Layout with photo on the right if available
  if (cvData.personalInfo.photo) {
    try {
      // Photo on the right side
      const photoSize = 25; // 25mm square
      const photoX = pageWidth - margin - photoSize;
      const photoY = yPos;
      
      // Add square photo with rounded corners (simulated through clipping)
      pdf.addImage(
        cvData.personalInfo.photo,
        'PNG',
        photoX,
        photoY,
        photoSize,
        photoSize,
        undefined,
        'FAST'
      );
      
      // Draw border around photo
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.5);
      pdf.rect(photoX, photoY, photoSize, photoSize, 'S');
    } catch (error) {
      console.error('Error adding photo to PDF:', error);
    }
  }
  
  // Name
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(18);
  pdf.text(cvData.personalInfo.fullName || 'Your Name', margin, yPos);
  yPos += 7;
  
  // Title
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(80, 80, 80);
  pdf.setFontSize(11);
  pdf.text(cvData.personalInfo.title || 'Professional Title', margin, yPos);
  yPos += 10;
  
  // Contact info on one clean line with spacing
  pdf.setFontSize(9);
  pdf.setTextColor(100, 100, 100);
  
  let contactText = '';
  if (cvData.personalInfo.email) contactText += cvData.personalInfo.email;
  if (cvData.personalInfo.phone) contactText += contactText ? ' • ' + cvData.personalInfo.phone : cvData.personalInfo.phone;
  if (cvData.personalInfo.location) contactText += contactText ? ' • ' + cvData.personalInfo.location : cvData.personalInfo.location;
  
  pdf.text(contactText, margin, yPos);
  yPos += 8;
  
  // Thin divider
  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(0.5);
  pdf.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;
  
  // Professional Summary
  if (cvData.personalInfo.summary) {
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(60, 60, 60);
    pdf.setFontSize(10);
    
    const splitSummary = pdf.splitTextToSize(cvData.personalInfo.summary, pageWidth - (margin * 2) - 5);
    pdf.text(splitSummary, margin, yPos);
    yPos += splitSummary.length * 5 + 10;
  }
  
  // Experience Section
  if (cvData.experiences && cvData.experiences.length > 0) {
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(80, 80, 80);
    pdf.setFontSize(11);
    pdf.text("Experience", margin, yPos);
    yPos += 7;
    
    cvData.experiences.forEach((exp: any) => {
      // Check if we need a new page
      if (yPos > pageHeight - 50) {
        pdf.addPage();
        yPos = margin;
      }
      
      // Position and company on same line
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(10);
      pdf.text(exp.position + "  •  " + exp.company, margin, yPos);
      
      // Date text right-aligned
      const dateText = `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`;
      const dateWidth = pdf.getStringUnitWidth(dateText) * pdf.getFontSize() / pdf.internal.scaleFactor;
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(100, 100, 100);
      pdf.text(dateText, pageWidth - margin - dateWidth, yPos);
      yPos += 6;
      
      // Description
      if (exp.description) {
        pdf.setTextColor(80, 80, 80);
        pdf.setFontSize(9);
        const splitDesc = pdf.splitTextToSize(exp.description, pageWidth - (margin * 2) - 5);
        pdf.text(splitDesc, margin, yPos);
        yPos += splitDesc.length * 4 + 8;
      } else {
        yPos += 8;
      }
    });
  }
  
  // Skills Section
  if (cvData.skills && cvData.skills.length > 0) {
    // Check if we need a new page
    if (yPos > pageHeight - 40) {
      pdf.addPage();
      yPos = margin;
    }
    
    yPos += 5;
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(80, 80, 80);
    pdf.setFontSize(11);
    pdf.text("Skills", margin, yPos);
    yPos += 7;
    
    // Skills as a clean comma-separated paragraph
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(60, 60, 60);
    pdf.setFontSize(9);
    
    // Create comma-separated list with proper spacing
    const skillNames = cvData.skills.map((skill: any) => skill.name);
    const skillText = skillNames.join(' • ');
    
    const splitSkills = pdf.splitTextToSize(skillText, pageWidth - (margin * 2) - 5);
    pdf.text(splitSkills, margin, yPos);
  }
}

// Helper function to ensure text doesn't overflow page
export const splitTextToFitPage = (text: string, pdf: any, maxWidth: number): string[] => {
  return pdf.splitTextToSize(text, maxWidth);
}; 