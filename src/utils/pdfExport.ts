import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToPDF = async (elementId: string, filename: string = 'resume.pdf') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    // Configure html2canvas options for better quality
    const canvas = await html2canvas(element, {
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Calculate dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
};

export const generateAIContent = (type: 'summary' | 'experience' | 'skills', context?: any): string => {
  const templates = {
    summary: [
      "Experienced professional with proven track record of delivering results in fast-paced environments. Strong analytical and problem-solving skills with ability to work effectively both independently and as part of a team.",
      "Results-driven professional with expertise in strategic planning and execution. Demonstrated ability to lead cross-functional teams and drive innovation while maintaining focus on business objectives.",
      "Dynamic professional with strong communication and leadership skills. Proven ability to adapt to changing environments and deliver high-quality solutions that meet stakeholder requirements.",
      "Dedicated professional with extensive experience in project management and team collaboration. Strong analytical mindset with focus on continuous improvement and operational excellence.",
    ],
    experience: [
      "Led strategic initiatives that improved operational efficiency by 25% while maintaining high quality standards and customer satisfaction.",
      "Managed cross-functional teams of 5-15 members to deliver complex projects on time and within budget constraints.",
      "Developed and implemented processes that reduced costs by 20% while improving service delivery and team productivity.",
      "Collaborated with stakeholders to identify requirements and deliver solutions that exceeded expectations and business goals.",
    ],
    skills: [
      "Project Management, Team Leadership, Strategic Planning, Process Improvement, Stakeholder Management",
      "Data Analysis, Problem Solving, Communication, Collaboration, Time Management",
      "Leadership, Innovation, Customer Service, Quality Assurance, Risk Management",
      "Strategic Thinking, Team Building, Process Optimization, Change Management, Performance Management",
    ]
  };

  const randomIndex = Math.floor(Math.random() * templates[type].length);
  return templates[type][randomIndex];
};