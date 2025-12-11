


import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import './ReportForm.css';
import axios from 'axios';
import { FaCode, FaTimes } from 'react-icons/fa';

const categoryOptions = {
  "Online Financial Fraud": [
    "Aadhar Enabled Payment System (AEPS)",
    "Business Email Compromise/Email Takeover",
    "Debit/Credit Card Fraud/Sim Swap Fraud",
    "Demat/Depository Fraud",
    "E-Wallet Related Fraud",
    "Fraud Call/Vishing",
    "Internet Banking Related Fraud",
    "UPI Related Frauds",
  ],
  "Cyber Harassment": [
    "Cyber Bullying/Stalking",
    "Cyber Defamation",
    "Morphing",
    "Email Abuse",
    "Online Threat/Blackmail",
    "Social Media Abuse",
  ],
  "Cyber Crime Against Women": [
    "Sexual Harassment",
    "Obscene Content",
    "Voyeurism",
    "Non-consensual Sharing of Images",
  ],
  "Hacking/Unauthorized Access": [
    "Website Hacking",
    "Email Hacking",
    "Social Media Account Hacking",
    "Data Breach",
  ],
  "Cryptocurrency Scam": ["Cryptocurrency Scam"],
};

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const cities = {
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad"],
  "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Hubli-Dharwad"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "Delhi": ["New Delhi", "Dwarka", "Saket", "Rohini"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
  "Telangana": ["Hyderabad", "Warangal"],
  "Haryana": ["Chandigarh", "Gurugram", "Faridabad", "Ambala"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Noida"],
  "West Bengal": ["Kolkata", "Howrah", "Darjeeling", "Durgapur"]
};

const ReportForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phone: '',
    state: '',
    city: '',
    mainCategory: '',
    subCategory: '',
    incidentDateTime: '',
    delay: 'No',
    platform: '',
    description: '',
    evidenceFile: null,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchParams] = useSearchParams();
  const [isJsonPanelVisible, setIsJsonPanelVisible] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  useEffect(() => {
    const fetchMaintenanceStatus = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/maintenance-status`);
        setIsMaintenanceMode(response.data.maintenance_mode);
      } catch (error) {
        console.error("Could not fetch maintenance status:", error);
        setIsMaintenanceMode(false); // Default to not showing the button if API fails
      }
    };
    fetchMaintenanceStatus();
  }, []);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category && categoryOptions[category]) {
      setFormData(prev => ({ ...prev, mainCategory: category }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mainCategory') {
      setFormData(prev => ({ ...prev, [name]: value, subCategory: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, evidenceFile: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
        alert("You must be logged in to submit a report.");
        return;
    }

    const reportData = new FormData();
    reportData.append('first_name', formData.firstName);
    reportData.append('last_name', formData.lastName);
    reportData.append('address', formData.address);
    reportData.append('email', formData.email);
    reportData.append('phone', formData.phone);
    reportData.append('state', formData.state);
    reportData.append('city', formData.city);
    reportData.append('complaint_category', formData.subCategory);
    reportData.append('incident_date', formData.incidentDateTime);
    reportData.append('delay_in_reporting', formData.delay);
    reportData.append('platform', formData.platform);
    reportData.append('description', formData.description);

    if (formData.evidenceFile) {
        reportData.append('evidence_file', formData.evidenceFile);
    }

    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/submit-report`,
            reportData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log('Report submitted successfully:', response.data);
        alert("Report submitted successfully! The AI analysis has started and will appear on your dashboard shortly.");
        setIsSubmitted(true);

    } catch (error) {
        console.error('Error submitting report:', error);
        const errorMessage = error.response?.data?.error || "An unexpected error occurred.";
        alert(`Submission Failed: ${errorMessage}`);
    }
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    const logo = new Image();
    logo.src = '/logo.png';

    logo.onload = () => {
      doc.addImage(logo, 'PNG', 75, 10, 60, 25);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text("Cybercrime Complaint Report", 20, 45);

      const filingDate = new Date().toLocaleDateString();
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`Date of Filing: ${filingDate}`, 20, 50);

      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text("Complainant Details", 20, 65);

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Name: ${formData.firstName} ${formData.lastName}`, 20, 75);
      doc.text(`Email: ${formData.email}`, 20, 83);
      doc.text(`Phone: +91 ${formData.phone}`, 20, 91);
      doc.text(`Address: ${formData.address}`, 20, 99);
      doc.text(`State: ${formData.state}`, 20, 107);
      doc.text(`City: ${formData.city}`, 20, 115);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text("Complaint Details", 20, 130);

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Category: ${formData.mainCategory}`, 20, 140);
      doc.text(`Sub-Category: ${formData.subCategory}`, 20, 148);
      doc.text(`Incident Date/Time: ${formData.incidentDateTime}`, 20, 156);
      doc.text(`Delay in Reporting: ${formData.delay}`, 20, 164);
      doc.text(`Platform: ${formData.platform}`, 20, 172);

      doc.text("Description:", 20, 187);
      const wrappedDesc = doc.splitTextToSize(formData.description, 170);
      doc.text(wrappedDesc, 20, 194);

      const finalizePDF = () => {
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text("Generated by JusticeAssist | www.justiceassist.in", 105, 280, { align: "center" });
        doc.save("Cybercrime_Complaint_Report.pdf");
      };

      if (formData.evidenceFile && formData.evidenceFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const imgData = e.target.result;
          doc.addPage();
          doc.setFontSize(13);
          doc.setFont('helvetica', 'bold');
          doc.text("Uploaded Evidence", 20, 20);
          doc.addImage(imgData, 'JPEG', 15, 30, 180, 160);
          finalizePDF();
        };
        reader.readAsDataURL(formData.evidenceFile);
      } else {
        finalizePDF();
      }
    };
  };

  const handleFillFromJson = () => {
    try {
      if (!jsonInput.trim()) {
        alert("JSON input is empty.");
        return;
      }
      const parsedData = JSON.parse(jsonInput);
      setFormData(prev => ({ ...prev, ...parsedData }));
      setIsJsonPanelVisible(false);
    } catch (error) {
      alert(`Invalid JSON format. Please check your data.\n\nError: ${error.message}`);
    }
  };

  return (
    <div className="report-container">
      {isMaintenanceMode && (
        <button className="json-import-btn" onClick={() => setIsJsonPanelVisible(true)}>
            <FaCode /> Import JSON
        </button>
      )}

      {isJsonPanelVisible && (
        <div className={`json-panel ${isJsonPanelVisible ? 'open' : ''}`}>
          <div className="json-panel-header">
            <h3>Paste JSON Data</h3>
            <button className="close-panel-btn" onClick={() => setIsJsonPanelVisible(false)}>
              <FaTimes />
            </button>
          </div>
          <textarea
            placeholder='{ "firstName": "Rohan", ... }'
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
          <button className="fill-form-btn" onClick={handleFillFromJson}>
            Fill Form
          </button>
        </div>
      )}

      <h2 className="form-title">Cybercrime Guidance Form</h2>
      <form className="styled-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Name</label>
          <div className="form-split">
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <label>Address</label>
          <input type="text" name="address" placeholder="Your residential address" value={formData.address} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>Email</label>
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>Phone</label>
          <div className="form-split">
            <input type="text" placeholder="+91" className="short-input" readOnly/>
            <input type="text" name="phone" placeholder="Enter your mobile number" value={formData.phone} onChange={handleChange}/>
          </div>
        </div>
        <div className="form-row">
          <label>State</label>
          <select name="state" value={formData.state} onChange={handleChange}>
            <option value="">Select State</option>
            {states.map((s) => (<option key={s} value={s}>{s}</option>))}
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="city">City</label>
          <div className="floating-input">
            <select id="city" name="city" value={formData.city} onChange={handleChange}>
              <option value="">-- Select City --</option>
              {(cities[formData.state] || []).map((city, index) => (<option key={index} value={city}>{city}</option>))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <label>Complaint Category</label>
          <select name="mainCategory" value={formData.mainCategory} onChange={handleChange}>
            <option value="">Select Category</option>
            {Object.keys(categoryOptions).map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
          </select>
        </div>
        {formData.mainCategory && (
          <div className="form-row">
            <label>Sub-Category</label>
            <select name="subCategory" value={formData.subCategory} onChange={handleChange}>
              <option value="">Select Sub-Category</option>
              {categoryOptions[formData.mainCategory].map((sub) => (<option key={sub} value={sub}>{sub}</option>))}
            </select>
          </div>
        )}
        <div className="form-row">
          <label>Incident Date and Time</label>
          <input type="datetime-local" name="incidentDateTime" value={formData.incidentDateTime} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>Is there any delay in reporting?</label>
          <div className="toggle-container">
            <input type="checkbox" id="delay" name="delay" className="toggle-input" checked={formData.delay === 'Yes'} onChange={(e) => setFormData(prev => ({ ...prev, delay: e.target.checked ? 'Yes' : 'No' }))} />
            <label htmlFor="delay" className="toggle-switch"></label>
            <span className="toggle-status">{formData.delay}</span>
          </div>
        </div>
        <div className="form-row">
          <label>Platform (e.g. Instagram, UPI app, Email, etc.)</label>
          <input type="text" name="platform" placeholder="Platform where incident occurred" value={formData.platform} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>Description</label>
          <textarea name="description" rows="4" placeholder="Describe the incident in detail" value={formData.description} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>Upload Evidence (Image, etc.)</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">SUBMIT</button>
          {isSubmitted && (<button type="button" className="download-btn" onClick={handleGeneratePDF}>DOWNLOAD PDF</button>)}
        </div>
      </form>
    </div>
  );
};

export default ReportForm;