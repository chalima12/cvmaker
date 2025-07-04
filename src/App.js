// src/App.js
import React, { useState, useRef } from 'react';
import DelayedInput from './DelayedInput'; // Import the DelayedInput component
import DelayedTextarea from './DelayedTextarea'; // Import the DelayedTextarea component
import CVPreview from './CVPreview'; // Import the CVPreview component

// Main App Component
const App = () => {
    // State to hold all CV data, initialized with example data
    const [cvData, setCvData] = useState({
        profilePicture: '',
        name: 'CHALCHISA TAMIRU MOLA',
        title: 'Junior Software Engineering',
        email: 'chalchisatamiru10@gmail.com',
        phone: '+251934393116',
        linkedin: '',
        github: '',
        objective: 'To enhance my professional skills, capabilities and knowledge in an organization which recognizes the value of hard work and trusts me with responsibilities and challenges.',
        experience: [
            {
                title: 'Junior Software Engineering',
                company: 'Moti Engineering PLC',
                years: 'Mar 2023-Still',
                description: [
                    'POS-Machine Customization and Software Development',
                    'Website Development',
                ],
            },
        ],
        education: [
            { degree: 'BSc in Computer Science and Engineering', university: 'Adama Science and Technology University', year: '2022' },
        ],
        projects: [
            {
                name: 'Digitally Automated Auction, Procurement, and Delivery Platform (DAAPDP)',
                description: 'Integrate three System into one platform. It is online digital marketing platform.',
                technologies: ['Laravel', 'React Js'],
            },
            {
                name: 'Workshop Management System',
                description: 'Register item, Assign technician, Generate report in table and charts to visualize data.',
                technologies: ['Django', 'React'],
            },
        ],
        certificates: [
            { name: 'Certificate of Cisco CCNA', obtained: '2022', issuedBy: 'Adama Science and Technology University' },
            { name: 'Certificate of General customer skills', obtained: '2022', issuedBy: 'Talent firm' },
        ],
        interests: ['Watching documentaries and sports over weekend', 'Volunteer at UN through online platform', 'Reading Noble', 'Surfing through Internet', 'Doing physically exercise'],
        skills: [
            { categoryName: 'Programming Languages skills', skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Python', 'C++'] },
            { categoryName: 'Frameworks skills', skills: ['Laravel', 'React.js', 'Django'] },
            { categoryName: 'Network skill', skills: ['troubleshooting/problem resolution', 'Ethernet', 'TCP/IP', 'DNS', 'Switches and router'] },
            { categoryName: 'Soft Skills', skills: ['Team building', 'decision making', 'time management'] },
        ],
        languages: [
            { name: 'English', proficiency: 'Professional' },
            { name: 'Amharic', proficiency: 'Native' },
            { name: 'Oromo', proficiency: 'Native', },
        ],
        personalDetails: {
            dateOfBirth: 'may/20/1998',
            nationality: 'Ethiopia',
            gender: 'Male',
            address: 'Addis Ababa, Ethiopia',
        },
        references: [
            { name: 'Dr. Bruk Yirga Nidaw', title: 'Department Head', organization: 'Adama Science and Technology University', email: 'birukyirga@73gmail.com', phone: '0949807337' },
            { name: 'Dereje Tekilu Aseffa', title: 'School Dean', organization: 'Adama Science and Technology University', email: 'Dereje.tekilu@astu.edu.et', phone: '0985237103' },
        ],
        activities: ['Watching documentaries and sports over weekend', 'Volunteer at UN through online platform'],
    });

    // State to manage the visibility of each section
    const [sectionVisibility, setSectionVisibility] = useState({
        objective: true,
        experience: true,
        education: true,
        projects: true,
        certificates: true,
        interests: true,
        skills: true,
        languages: true,
        personalDetails: true,
        references: true,
        activities: true,
    });

    // State for selected CV design template (defaulting to 'resume')
    const [selectedTemplate, setSelectedTemplate] = useState('resume');
    // State for displaying loading messages during PDF processing
    const [loadingMessage, setLoadingMessage] = useState('');

    // Ref for the CV preview element, used by html2pdf.js for PDF generation
    const cvPreviewRef = useRef(null);

    // Function to trigger the download of the CV as a PDF
    const downloadCv = () => {
        if (cvPreviewRef.current) {
            const element = cvPreviewRef.current; // The DOM element to convert to PDF
            const opt = {
                margin: 0.5, // Margin around the PDF content
                filename: `${cvData.name.replace(/\s/g, '_')}_CV.pdf`, // Dynamic filename
                image: { type: 'jpeg', quality: 0.98 }, // Image quality for canvas rendering
                html2canvas: { scale: 2, useCORS: true }, // Scale for better resolution, enable CORS
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' } // PDF unit, format, and orientation
            };
            // Use window.html2pdf as it's loaded globally via CDN
            window.html2pdf().set(opt).from(element).save(); // Generate and save the PDF
        }
    };

    // Generic handler for direct changes to top-level cvData properties
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCvData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handler for changes within nested arrays (e.g., experience, education)
    const handleArrayChange = (section, index, field, value) => {
        setCvData(prevData => {
            const newArray = [...prevData[section]];
            // Special handling for fields that are themselves arrays of strings (like description, technologies, skills)
            if (field === 'description' || field === 'technologies' || field === 'skills') {
                newArray[index] = { ...newArray[index], [field]: value.split(',').map(s => s.trim()) };
            } else {
                newArray[index] = { ...newArray[index], [field]: value };
            }
            return { ...prevData, [section]: newArray };
        });
    };

    // Function to add a new item to an array section (e.g., add new experience)
    const addArrayItem = (section, defaultItem) => {
        setCvData(prevData => ({
            ...prevData,
            [section]: [...prevData[section], defaultItem],
        }));
        // Ensure the section is visible when an item is added
        setSectionVisibility(prev => ({ ...prev, [section]: true }));
    };

    // Function to remove an item from an array section
    const removeArrayItem = (section, index) => {
        setCvData(prevData => ({
            ...prevData,
            [section]: prevData[section].filter((_, i) => i !== index),
        }));
    };

    // Handler for changes within the skills section (which has nested objects for categories)
    const handleSkillCategoryChange = (categoryIndex, field, value) => {
        setCvData(prevData => {
            const newSkills = [...prevData.skills];
            if (field === 'skills') {
                newSkills[categoryIndex] = { ...newSkills[categoryIndex], [field]: value.split(',').map(s => s.trim()) };
            } else {
                newSkills[categoryIndex] = { ...newSkills[categoryIndex], [field]: value };
            }
            return { ...prevData, skills: newSkills };
        });
    };

    // Function to add a new skill category
    const addSkillCategory = () => {
        setCvData(prevData => ({
            ...prevData,
            skills: [...prevData.skills, { categoryName: '', skills: [] }],
        }));
        setSectionVisibility(prev => ({ ...prev, skills: true }));
    };

    // Function to remove a skill category
    const removeSkillCategory = (categoryIndex) => {
        setCvData(prevData => ({
            ...prevData,
            skills: prevData.skills.filter((_, i) => i !== categoryIndex),
        }));
    };

    // Handler for changes in personal details (nested object)
    const handlePersonalDetailsChange = (field, value) => {
        setCvData(prevData => ({
            ...prevData,
            personalDetails: {
                ...prevData.personalDetails,
                [field]: value,
            },
        }));
        setSectionVisibility(prev => ({ ...prev, personalDetails: true }));
    };

    // Handler for profile picture file upload
    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCvData(prevData => ({
                    ...prevData,
                    profilePicture: reader.result, // Store image as Data URL
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Handler for changes in individual interest items
    const handleInterestChange = (index, value) => {
        setCvData(prevData => {
            const newInterests = [...prevData.interests];
            newInterests[index] = value;
            return { ...prevData, interests: newInterests };
        });
        setSectionVisibility(prev => ({ ...prev, interests: true }));
    };

    // Function to add a new empty interest
    const addInterest = () => {
        setCvData(prevData => ({
            ...prevData,
            interests: [...prevData.interests, ''],
        }));
        setSectionVisibility(prev => ({ ...prev, interests: true }));
    };

    // Function to remove an interest item
    const removeInterest = (index) => {
        setCvData(prevData => ({
            ...prevData,
            interests: prevData.interests.filter((_, i) => i !== index),
        }));
    };

    // Handler for changes in individual activity items
    const handleActivityChange = (index, value) => {
        setCvData(prevData => {
            const newActivities = [...prevData.activities];
            newActivities[index] = value;
            return { ...prevData, activities: newActivities };
        });
        setSectionVisibility(prev => ({ ...prev, activities: true }));
    };

    // Function to add a new empty activity
    const addActivity = () => {
        setCvData(prevData => ({
            ...prevData,
            activities: [...prevData.activities, ''],
        }));
        setSectionVisibility(prev => ({ ...prev, activities: true }));
    };

    // Function to remove an activity item
    const removeActivity = (index) => {
        setCvData(prevData => ({
            ...prevData,
            activities: prevData.activities.filter((_, i) => i !== index),
        }));
    };

    // Function to toggle section visibility and clear/re-initialize data
    const toggleSectionVisibility = (sectionName) => {
        setSectionVisibility(prevVisibility => {
            const isCurrentlyVisible = prevVisibility[sectionName];
            const newVisibility = { ...prevVisibility, [sectionName]: !isCurrentlyVisible };

            setCvData(prevData => {
                const newCvData = { ...prevData };
                if (isCurrentlyVisible) {
                    // If hiding, clear the data
                    if (Array.isArray(prevData[sectionName])) {
                        newCvData[sectionName] = [];
                    } else if (typeof prevData[sectionName] === 'object' && prevData[sectionName] !== null) {
                        newCvData[sectionName] = {};
                    } else {
                        newCvData[sectionName] = '';
                    }
                } else {
                    // If showing, re-initialize with default data
                    switch (sectionName) {
                        case 'objective':
                            newCvData.objective = 'To enhance my professional skills, capabilities and knowledge in an organization which recognizes the value of hard work and trusts me with responsibilities and challenges.';
                            break;
                        case 'experience':
                            newCvData.experience = [{ title: '', company: '', years: '', description: [] }];
                            break;
                        case 'education':
                            newCvData.education = [{ degree: '', university: '', year: '' }];
                            break;
                        case 'projects':
                            newCvData.projects = [{ name: '', description: '', technologies: [] }];
                            break;
                        case 'certificates':
                            newCvData.certificates = [{ name: '', obtained: '', issuedBy: '' }];
                            break;
                        case 'interests':
                            newCvData.interests = ['Reading', 'Hiking'];
                            break;
                        case 'skills':
                            newCvData.skills = [{ categoryName: 'Technical Skills', skills: ['JavaScript', 'React'] }];
                            break;
                        case 'languages':
                            newCvData.languages = [{ name: 'English', proficiency: 'Fluent' }];
                            break;
                        case 'personalDetails':
                            newCvData.personalDetails = { dateOfBirth: '', nationality: '', gender: '', address: '' };
                            break;
                        case 'references':
                            newCvData.references = [{ name: '', title: '', organization: '', email: '', phone: '' }];
                            break;
                        case 'activities':
                            newCvData.activities = ['Volunteering', 'Sports'];
                            break;
                        default:
                            break;
                    }
                }
                return newCvData;
            });
            return newVisibility;
        });
    };


    // Function to extract structured CV information from raw text (e.g., from PDF)
    const extractCvInformation = (text) => {
        const extracted = {};

        // Helper function to find the first match for a regex and trim it
        const findMatch = (regex) => {
            const match = text.match(regex);
            return (match && match[1] !== undefined && match[1] !== null) ? match[1].trim() : '';
        };

        // Extracting Name (assumes it's a prominent capitalized phrase at the start)
        const nameMatch = text.match(/^([A-Z][a-z]+(?: [A-Z][a-z]+){1,3})\s*\n/m);
        extracted.name = nameMatch ? nameMatch[1].trim() : '';

        // Extracting Contact Information
        extracted.email = findMatch(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
        // Corrected regex: removed unnecessary escape for '.' inside character class
        extracted.phone = findMatch(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4,9}/);
        extracted.linkedin = findMatch(/(linkedin\.com\/in\/[a-zA-Z0-9_-]+)/i);
        extracted.github = findMatch(/(github\.com\/[a-zA-Z0-9_-]+)/i);

        // Extracting Objective/Summary section
        const objectiveMatch = text.match(/(OBJECTIVE|SUMMARY|PROFILE)\s*([\s\S]*?)(?:EXPERIENCE|EDUCATION|SKILLS|PROJECTS|CERTIFICATES|CONTACT|$)/i);
        extracted.objective = objectiveMatch ? objectiveMatch[2].trim().split('\n').filter(line => line.trim() !== '').join(' ') : '';

        // Extracting Experience section
        const experienceSectionMatch = text.match(/(EXPERIENCE|WORK EXPERIENCE)\s*([\s\S]*?)(?:EDUCATION|SKILLS|PROJECTS|CERTIFICATES|CONTACT|$)/i);
        extracted.experience = [];
        if (experienceSectionMatch) {
            const expText = experienceSectionMatch[2];
            const jobEntries = expText.split(/(?=\n[A-Z][a-zA-Z\s]+ at [A-Z][a-zA-Z\s]+)/).filter(Boolean);
            jobEntries.forEach(entry => {
                const titleCompanyMatch = entry.match(/([A-Z][a-zA-Z\s]+) at ([A-Z][a-zA-Z\s]+)/);
                const yearsMatch = entry.match(/(\w{3}\s*\d{4}[-—]\s*(?:Still|\w{3}\s*\d{4}))/i);
                const descriptionMatch = entry.match(/(?:-|\*)\s*([^\n]+)/g);

                if (titleCompanyMatch) {
                    extracted.experience.push({
                        title: titleCompanyMatch[1].trim(),
                        company: titleCompanyMatch[2].trim(),
                        years: yearsMatch ? yearsMatch[1].trim() : '',
                        description: descriptionMatch ? descriptionMatch.map(d => d.replace(/^(-|\*)\s*/, '').trim()) : [],
                    });
                }
            });
        }

        // Extracting Education section
        const educationSectionMatch = text.match(/(EDUCATION)\s*([\s\S]*?)(?:EXPERIENCE|SKILLS|PROJECTS|CERTIFICATES|CONTACT|$)/i);
        extracted.education = [];
        if (educationSectionMatch) {
            const eduText = educationSectionMatch[1];
            const eduEntries = eduText.split(/(?=\n[A-Z][a-zA-Z\s]+ in [A-Z][a-zA-Z\s]+)/).filter(Boolean);
            eduEntries.forEach(entry => {
                const degreeMatch = entry.match(/([A-Z][a-zA-Z\s]+ in [A-Z][a-zA-Z\s]+)/);
                const universityYearMatch = entry.match(/([A-Z][a-zA-Z\s]+ University),\s*(\d{4})/);
                if (degreeMatch && universityYearMatch) {
                    extracted.education.push({
                        degree: degreeMatch[1].trim(),
                        university: universityYearMatch[1].trim(),
                        year: universityYearMatch[2].trim(),
                    });
                }
            });
        }

        // Extracting Projects section
        const projectsSectionMatch = text.match(/(PROJECTS)\s*([\s\S]*?)(?:CERTIFICATES|SKILLS|INTERESTS|CONTACT|$)/i);
        extracted.projects = [];
        if (projectsSectionMatch) {
            const projText = projectsSectionMatch[2];
            const projectEntries = projText.split(/(?=\n[A-Z][a-zA-Z\s]+)/).filter(Boolean);
            projectEntries.forEach(entry => {
                const nameMatch = entry.match(/^([A-Z][a-zA-Z\s]+)/);
                const descriptionMatch = entry.match(/Description:\s*([^\n]+)/i);
                const technologiesMatch = entry.match(/Technologies:\s*([^\n]+)/i);
                if (nameMatch) {
                    extracted.projects.push({
                        name: nameMatch[1].trim(),
                        description: descriptionMatch ? descriptionMatch[1].trim() : '',
                        technologies: technologiesMatch ? technologiesMatch[1].split(',').map(t => t.trim()) : [],
                    });
                }
            });
        }

        // Extracting Certificates section
        const certificatesSectionMatch = text.match(/(CERTIFICATE|CERTIFICATES)\s*([\s\S]*?)(?:INTERESTS|SKILLS|CONTACT|$)/i);
        extracted.certificates = [];
        if (certificatesSectionMatch) {
            const certText = certificatesSectionMatch[2];
            const certEntries = certText.split(/(?=\nCertificate of [A-Z][a-zA-Z\s]+)/).filter(Boolean);
            certEntries.forEach(entry => {
                const nameMatch = entry.match(/Certificate of ([^\n]+)/);
                const obtainedMatch = entry.match(/Obtained in (\d{4})/);
                const issuedByMatch = entry.match(/Issued by ([^\n]+)/);
                if (nameMatch) {
                    extracted.certificates.push({
                        name: `Certificate of ${nameMatch[1].trim()}`,
                        obtained: obtainedMatch ? obtainedMatch[1].trim() : '',
                        issuedBy: issuedByMatch ? issuedByMatch[1].trim() : '',
                    });
                }
            });
        }

        // Extracting Skills section with categories
        const skillsSectionMatch = text.match(/(SKILLS)\s*([\s\S]*?)(?:LANGUAGES|INTERESTS|REFERENCE|CONTACT|$)/i);
        extracted.skills = [];
        if (skillsSectionMatch) {
            const skillsText = skillsSectionMatch[2];
            const categoryMatches = skillsText.match(/([A-Z][a-zA-Z\s]+ skills):\s*([^\n]+(?:\s*,\s*[^\n]+)*)/g);
            if (categoryMatches) {
                categoryMatches.forEach(match => {
                    const parts = match.split(':', 2);
                    if (parts.length === 2) {
                        extracted.skills.push({
                            categoryName: parts[0].trim(),
                            skills: parts[1].split(',').map(s => s.trim()),
                        });
                    }
                });
            }
        }

        // Extracting Languages section
        const languagesSectionMatch = text.match(/(LANGUAGES)\s*([\s\S]*?)(?:REFERENCE|INTERESTS|CONTACT|$)/i);
        extracted.languages = [];
        if (languagesSectionMatch) {
            const langText = languagesSectionMatch[2];
            const langEntries = langText.split('\n').filter(line => line.includes('-')).map(line => line.trim());
            langEntries.forEach(entry => {
                const parts = entry.split('-');
                if (parts.length === 2) {
                    extracted.languages.push({
                        name: parts[0].trim(),
                        proficiency: parts[1].trim(),
                    });
                }
            });
        }

        // Extracting Personal Details
        extracted.personalDetails = {};
        const personalDetailsSectionMatch = text.match(/(PERSONAL DETAILS)\s*([\s\S]*?)(?:ACTIVITIES|INTERESTS|CONTACT|$)/i);
        if (personalDetailsSectionMatch) {
            extracted.personalDetails = {
                dateOfBirth: findMatch(/Date of Birth:\s*([^\n]+)/i),
                nationality: findMatch(/Nationality\s*([^\n]+)/i),
                gender: findMatch(/Gender\s*:\s*([^\n]+)/i),
                address: findMatch(/Addis Ababa, Ethiopia/i), // Specific to provided CV
            };
        }

        // Extracting References section
        const referencesSectionMatch = text.match(/(REFERENCE|REFERENCES)\s*([\s\S]*?)(?:ACTIVITIES|INTERESTS|CONTACT|$)/i);
        extracted.references = [];
        if (referencesSectionMatch) {
            const refText = referencesSectionMatch[2];
            const refEntries = refText.split(/(?=\nDr\.|Dereje|Mr\.|Ms\.)/).filter(Boolean);
            refEntries.forEach(entry => {
                const nameMatch = entry.match(/([A-Z][a-zA-Z\s.]+)\s*-\s*([^\n]+)/);
                const titleMatch = entry.match(/Department Head|School Dean/i);
                const emailMatch = entry.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
                const phoneMatch = entry.match(/(09\d{8})/);

                if (nameMatch) {
                    extracted.references.push({
                        name: nameMatch[1].trim(),
                        organization: nameMatch[2].trim(),
                        title: titleMatch ? titleMatch[0].trim() : '',
                        email: emailMatch ? emailMatch[1].trim() : '',
                        phone: phoneMatch ? phoneMatch[1].trim() : '',
                    });
                }
            });
        }

        // Extracting Interests
        // Updated to handle array of strings
        const interestsSectionMatch = text.match(/(INTERESTS)\s*([\s\S]*?)(?:ACTIVITIES|CONTACT|$)/i);
        extracted.interests = interestsSectionMatch ? interestsSectionMatch[2].split('\n').map(line => line.trim()).filter(line => line !== '') : [];

        // Extracting Activities
        // Updated to handle array of strings
        const activitiesSectionMatch = text.match(/(ACTIVITIES)\s*:\s*([\s\S]*?)(?:CONTACT|$)/i);
        extracted.activities = activitiesSectionMatch ? activitiesSectionMatch[2].split('\n').map(line => line.trim()).filter(line => line !== '') : [];

        return extracted;
    };


    // Handle CV upload (PDF)
    const handleCvUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            setLoadingMessage('Please upload a PDF file.');
            setTimeout(() => setLoadingMessage(''), 3000);
            return;
        }

        setLoadingMessage('Extracting information from CV...');

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const arrayBuffer = event.target.result;
                // Use window.pdfjsLib to get document and extract text
                const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                let fullText = '';

                // Loop through all pages to get full text content
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    fullText += textContent.items.map(item => item.str).join(' ') + '\n';
                }

                // Extract structured data using regex patterns
                const extractedData = extractCvInformation(fullText);

                // Update CV data state, prioritizing extracted data
                setCvData(prevData => ({
                    ...prevData,
                    ...extractedData,
                    personalDetails: { // Merge personal details specifically
                        ...prevData.personalDetails,
                        ...extractedData.personalDetails,
                    },
                    // For arrays, replace if extracted data exists, otherwise keep existing
                    experience: extractedData.experience.length > 0 ? extractedData.experience : prevData.experience,
                    education: extractedData.education.length > 0 ? extractedData.education : prevData.education,
                    projects: extractedData.projects.length > 0 ? extractedData.projects : prevData.projects,
                    certificates: extractedData.certificates.length > 0 ? extractedData.certificates : prevData.certificates,
                    skills: extractedData.skills.length > 0 ? extractedData.skills : prevData.skills,
                    languages: extractedData.languages.length > 0 ? extractedData.languages : prevData.languages,
                    references: extractedData.references.length > 0 ? extractedData.references : prevData.references,
                    interests: extractedData.interests.length > 0 ? extractedData.interests : prevData.interests,
                    activities: extractedData.activities.length > 0 ? extractedData.activities : prevData.activities,
                }));

                // Also update section visibility based on extracted data presence
                setSectionVisibility(prevVisibility => {
                    const newVisibility = { ...prevVisibility };
                    for (const section in extractedData) {
                        if (Array.isArray(extractedData[section])) {
                            newVisibility[section] = extractedData[section].length > 0;
                        } else if (typeof extractedData[section] === 'object' && extractedData[section] !== null) {
                            newVisibility[section] = Object.keys(extractedData[section]).length > 0 && Object.values(extractedData[section]).some(val => val);
                        } else if (typeof extractedData[section] === 'string') {
                            newVisibility[section] = extractedData[section].trim() !== '';
                        }
                    }
                    return newVisibility;
                });

                setLoadingMessage('CV information extracted and filled!');
            } catch (error) {
                console.error('Error processing PDF:', error);
                setLoadingMessage('Failed to extract CV information. Please try again or fill manually.');
            } finally {
                setTimeout(() => setLoadingMessage(''), 3000); // Clear message after 3 seconds
            }
        };
        reader.readAsArrayBuffer(file);
    };


    // CVForm Component: Handles all input fields for editing CV data
    const CVForm = ({ cvData, handleChange, handleArrayChange, addArrayItem, removeArrayItem, handleSkillCategoryChange, addSkillCategory, removeSkillCategory, handlePhotoUpload, handlePersonalDetailsChange, handleCvUpload, loadingMessage, handleInterestChange, addInterest, removeInterest, handleActivityChange, addActivity, removeActivity, sectionVisibility, toggleSectionVisibility }) => (
        <div className="p-6 bg-white rounded-lg shadow-xl overflow-y-auto max-h-[calc(100vh-4rem)] border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">Edit Your CV</h2>

            {/* Upload CV Section */}
            <div className="mb-6 bg-purple-50 p-4 rounded-lg border border-purple-200">
                <label className="block text-purple-800 text-sm font-semibold mb-2">Upload CV (PDF)</label>
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleCvUpload}
                    className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-purple-200 file:text-purple-800
                        hover:file:bg-purple-300 transition duration-200 ease-in-out"
                />
                {loadingMessage && (
                    <p className="mt-2 text-sm text-purple-600 animate-pulse">{loadingMessage}</p>
                )}
            </div>

            {/* Profile Picture Upload */}
            <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                <label className="block text-blue-800 text-sm font-semibold mb-2">Profile Picture</label>
                <div className="flex items-center space-x-4">
                    {cvData.profilePicture ? (
                        <img src={cvData.profilePicture} alt="Profile" className="w-24 h-24 rounded-full object-cover mr-6 border-2 border-blue-400 shadow-md" />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm border-2 border-blue-300">No Photo</div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-200 file:text-blue-800
                            hover:file:bg-blue-300 transition duration-200 ease-in-out"
                    />
                </div>
            </div>

            {/* Personal Details Section */}
            <div className="mb-6 border-b pb-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-700 text-blue-700">Personal Details</h3>
                    <button
                        onClick={() => toggleSectionVisibility('personalDetails')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition duration-200 ease-in-out ${sectionVisibility.personalDetails ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                    >
                        {sectionVisibility.personalDetails ? 'Remove Section' : 'Add Section'}
                    </button>
                </div>
                {sectionVisibility.personalDetails && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
                            <DelayedInput type="text" name="name" value={cvData.name} onBlur={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Title/Profession</label>
                            <DelayedInput type="text" name="title" value={cvData.title} onBlur={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                            <DelayedInput type="email" name="email" value={cvData.email} onBlur={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Phone</label>
                            <DelayedInput type="text" name="phone" value={cvData.phone} onBlur={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">LinkedIn (Optional)</label>
                            <DelayedInput type="text" name="linkedin" value={cvData.linkedin} onBlur={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">GitHub (Optional)</label>
                            <DelayedInput type="text" name="github" value={cvData.github} onBlur={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Date of Birth</label>
                            <DelayedInput type="text" value={cvData.personalDetails.dateOfBirth} onBlur={(e) => handlePersonalDetailsChange('dateOfBirth', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Nationality</label>
                            <DelayedInput type="text" value={cvData.personalDetails.nationality} onBlur={(e) => handlePersonalDetailsChange('nationality', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Gender</label>
                            <DelayedInput type="text" value={cvData.personalDetails.gender} onBlur={(e) => handlePersonalDetailsChange('gender', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                        </div>
                        <div className="col-span-full">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Address</label>
                            <DelayedInput type="text" value={cvData.personalDetails.address} onBlur={(e) => handlePersonalDetailsChange('address', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                        </div>
                    </div>
                )}
            </div>

            {/* Objective Section */}
            <div className="mb-6 border-b pb-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-700 text-blue-700">Objective</h3>
                    <button
                        onClick={() => toggleSectionVisibility('objective')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition duration-200 ease-in-out ${sectionVisibility.objective ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                    >
                        {sectionVisibility.objective ? 'Remove Section' : 'Add Section'}
                    </button>
                </div>
                {sectionVisibility.objective && (
                    <DelayedTextarea name="objective" value={cvData.objective} onBlur={handleChange} rows="5" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                )}
            </div>

            {/* Experience Section */}
            <div className="mb-6 border-b pb-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-700 text-blue-700">Experience</h3>
                    <button
                        onClick={() => toggleSectionVisibility('experience')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition duration-200 ease-in-out ${sectionVisibility.experience ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                    >
                        {sectionVisibility.experience ? 'Remove Section' : 'Add Section'}
                    </button>
                </div>
                {sectionVisibility.experience && (
                    <>
                        {cvData.experience.map((exp, index) => (
                            <div key={index} className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                    <div>
                                        <label className="block text-blue-800 text-sm font-semibold mb-1">Job Title</label>
                                        <DelayedInput type="text" value={exp.title} onBlur={(e) => handleArrayChange('experience', index, 'title', e.target.value)} className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                                    </div>
                                    <div>
                                        <label className="block text-blue-800 text-sm font-semibold mb-1">Company</label>
                                        <DelayedInput type="text" value={exp.company} onBlur={(e) => handleArrayChange('experience', index, 'company', e.target.value)} className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                                    </div>
                                    <div className="col-span-full">
                                        <label className="block text-blue-800 text-sm font-semibold mb-1">Years</label>
                                        <DelayedInput type="text" value={exp.years} onBlur={(e) => handleArrayChange('experience', index, 'years', e.target.value)} className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                                    </div>
                                    <div className="col-span-full">
                                        <label className="block text-blue-800 text-sm font-semibold mb-1">Description (comma-separated)</label>
                                        <DelayedTextarea
                                            value={exp.description.join(', ')}
                                            onBlur={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
                                            rows="3"
                                            className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeArrayItem('experience', index)}
                                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 ease-in-out shadow-md"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => addArrayItem('experience', { title: '', company: '', years: '', description: [] })}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out shadow-md"
                        >
                            Add Experience
                        </button>
                    </>
                )}
            </div>

            {/* Education Section */}
            <div className="mb-6 border-b pb-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-700 text-blue-700">Education</h3>
                    <button
                        onClick={() => toggleSectionVisibility('education')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition duration-200 ease-in-out ${sectionVisibility.education ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                    >
                        {sectionVisibility.education ? 'Remove Section' : 'Add Section'}
                    </button>
                </div>
                {sectionVisibility.education && (
                    <>
                        {cvData.education.map((edu, index) => (
                            <div key={index} className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                                    <div>
                                        <label className="block text-blue-800 text-sm font-semibold mb-1">Degree</label>
                                        <DelayedInput type="text" value={edu.degree} onBlur={(e) => handleArrayChange('education', index, 'degree', e.target.value)} className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                                    </div>
                                    <div>
                                        <label className="block text-blue-800 text-sm font-semibold mb-1">University</label>
                                        <DelayedInput type="text" value={edu.university} onBlur={(e) => handleArrayChange('education', index, 'university', e.target.value)} className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                                    </div>
                                    <div>
                                        <label className="block text-blue-800 text-sm font-semibold mb-1">Year</label>
                                        <DelayedInput type="text" value={edu.year} onBlur={(e) => handleArrayChange('education', index, 'year', e.target.value)} className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeArrayItem('education', index)}
                                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 ease-in-out shadow-md"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => addArrayItem('education', { degree: '', university: '', year: '' })}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out shadow-md"
                        >
                            Add Education
                        </button>
                    </>
                )}
            </div>

            {/* Projects Section */}
            <div className="mb-6 border-b pb-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-700 text-blue-700">Projects</h3>
                    <button
                        onClick={() => toggleSectionVisibility('projects')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition duration-200 ease-in-out ${sectionVisibility.projects ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                    >
                        {sectionVisibility.projects ? 'Remove Section' : 'Add Section'}
                    </button>
                </div>
                {sectionVisibility.projects && (
                    <>
                        {cvData.projects.map((project, index) => (
                            <div key={index} className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
                                <div className="grid grid-cols-1 gap-4 mb-2">
                                    <div>
                                        <label className="block text-blue-800 text-sm font-semibold mb-1">Project Name</label>
                                        <DelayedInput type="text" value={project.name} onBlur={(e) => handleArrayChange('projects', index, 'name', e.target.value)} className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                                    </div>
                                    <div>
                                        <label className="block text-blue-800 text-sm font-semibold mb-1">Description</label>
                                        <DelayedTextarea value={project.description} onBlur={(e) => handleArrayChange('projects', index, 'description', e.target.value)} rows="2" className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                                    </div>
                                    <div>
                                        <label className="block text-blue-800 text-sm font-semibold mb-1">Technologies (comma-separated)</label>
                                        <DelayedInput type="text" value={project.technologies.join(', ')} onBlur={(e) => handleArrayChange('projects', index, 'technologies', e.target.value)} className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeArrayItem('projects', index)}
                                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 ease-in-out shadow-md"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => addArrayItem('projects', { name: '', description: '', technologies: [] })}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out shadow-md"
                        >
                            Add Project
                        </button>
                    </>
                )}
            </div>

            {/* Certificates Section */}
            <div className="mb-6 border-b pb-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-700 text-blue-700">Certificates</h3>
                    <button
                        onClick={() => toggleSectionVisibility('certificates')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition duration-200 ease-in-out ${sectionVisibility.certificates ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                    >
                        {sectionVisibility.certificates ? 'Remove Section' : 'Add Section'}
                    </button>
                </div>
                {sectionVisibility.certificates && (
                    <>
                        {cvData.certificates.map((cert, index) => (
                            <div key={index} className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                    <div>
                                        <label className="block text-blue-800 text-sm font-semibold mb-1">Certificate Name</label>
                                        <DelayedInput type="text" value={cert.name} onBlur={(e) => handleArrayChange('certificates', index, 'name', e.target.value)} className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                                    </div>
                                    <div>
                                        <label className="block text-blue-800 text-sm font-semibold mb-1">Obtained Year</label>
                                        <DelayedInput type="text" value={cert.obtained} onBlur={(e) => handleArrayChange('certificates', index, 'obtained', e.target.value)} className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                                    </div>
                                    <div className="col-span-full">
                                        <label className="block text-blue-800 text-sm font-semibold mb-1">Issued By</label>
                                        <DelayedInput type="text" value={cert.issuedBy} onBlur={(e) => handleArrayChange('certificates', index, 'issuedBy', e.target.value)} className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeArrayItem('certificates', index)}
                                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 ease-in-out shadow-md"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => addArrayItem('certificates', { name: '', obtained: '', issuedBy: '' })}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out shadow-md"
                        >
                            Add Certificate
                        </button>
                    </>
                )}
            </div>

            {/* Skills Section - Now with dynamic categories */}
            <div className="mb-6 border-b pb-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-700 text-blue-700">Skills</h3>
                    <button
                        onClick={() => toggleSectionVisibility('skills')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition duration-200 ease-in-out ${sectionVisibility.skills ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                    >
                        {sectionVisibility.skills ? 'Remove Section' : 'Add Section'}
                    </button>
                </div>
                {sectionVisibility.skills && (
                    <>
                        {cvData.skills.map((category, categoryIndex) => (
                            <div key={categoryIndex} className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
                                <div className="grid grid-cols-1 gap-4 mb-2">
                                    <div>
                                        <label className="block text-blue-800 text-sm font-semibold mb-1">Category Name</label>
                                        <DelayedInput
                                            type="text"
                                            value={category.categoryName}
                                            onBlur={(e) => handleSkillCategoryChange(categoryIndex, 'categoryName', e.target.value)}
                                            className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-blue-800 text-sm font-semibold mb-1">Skills (comma-separated)</label>
                                        <DelayedTextarea
                                            value={category.skills.join(', ')}
                                            onBlur={(e) => handleSkillCategoryChange(categoryIndex, 'skills', e.target.value)}
                                            rows="2"
                                            className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeSkillCategory(categoryIndex)}
                                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 ease-in-out shadow-md"
                                >
                                    Remove Category
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={addSkillCategory}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out shadow-md"
                        >
                            Add Skill Category
                        </button>
                    </>
                )}
            </div>

            {/* Languages Section */}
            <div className="mb-6 border-b pb-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-700 text-blue-700">Languages</h3>
                    <button
                        onClick={() => toggleSectionVisibility('languages')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition duration-200 ease-in-out ${sectionVisibility.languages ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                    >
                        {sectionVisibility.languages ? 'Remove Section' : 'Add Section'}
                    </button>
                </div>
                {sectionVisibility.languages && (
                    <>
                        {cvData.languages.map((lang, index) => (
                            <div key={index} className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                    <div>
                                        <label className="block text-blue-800 text-sm font-semibold mb-1">Language Name</label>
                                        <DelayedInput type="text" value={lang.name} onBlur={(e) => handleArrayChange('languages', index, 'name', e.target.value)} className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                                    </div>
                                    <div>
                                        <label className="block text-blue-800 text-sm font-semibold mb-1">Proficiency</label>
                                        <DelayedInput type="text" value={lang.proficiency} onBlur={(e) => handleArrayChange('languages', index, 'proficiency', e.target.value)} className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeArrayItem('languages', index)}
                                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 ease-in-out shadow-md"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => addArrayItem('languages', { name: '', proficiency: '' })}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out shadow-md"
                        >
                            Add Language
                        </button>
                    </>
                )}
            </div>

            {/* References Section */}
            <div className="mb-6 border-b pb-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-700 text-blue-700">References</h3>
                    <button
                        onClick={() => toggleSectionVisibility('references')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition duration-200 ease-in-out ${sectionVisibility.references ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                    >
                        {sectionVisibility.references ? 'Remove Section' : 'Add Section'}
                    </button>
                </div>
                {sectionVisibility.references && (
                    <>
                        {cvData.references.map((ref, index) => (
                            <div key={index} className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                    <div>
                                        <label className="block text-blue-800 text-sm font-semibold mb-1">Name</label>
                                        <DelayedInput type="text" value={ref.name} onBlur={(e) => handleArrayChange('references', index, 'name', e.target.value)} className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                                    </div>
                                    <div>
                                        <label className="block text-blue-800 text-sm font-semibold mb-1">Title</label>
                                        <DelayedInput type="text" value={ref.title} onBlur={(e) => handleArrayChange('references', index, 'title', e.target.value)} className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                                    </div>
                                    <div>
                                        <label className="block text-blue-800 text-sm font-semibold mb-1">Organization</label>
                                        <DelayedInput type="text" value={ref.organization} onBlur={(e) => handleArrayChange('references', index, 'organization', e.target.value)} className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                                    </div>
                                    <div>
                                        <label className="block text-blue-800 text-sm font-semibold mb-1">Email</label>
                                        <DelayedInput type="email" value={ref.email} onBlur={(e) => handleArrayChange('references', index, 'email', e.target.value)} className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                                    </div>
                                    <div className="col-span-full">
                                        <label className="block text-blue-800 text-sm font-semibold mb-1">Phone</label>
                                        <DelayedInput type="text" value={ref.phone} onBlur={(e) => handleArrayChange('references', index, 'phone', e.target.value)} className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeArrayItem('references', index)}
                                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 ease-in-out shadow-md"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => addArrayItem('references', { name: '', title: '', organization: '', email: '', phone: '' })}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out shadow-md"
                        >
                            Add Reference
                        </button>
                    </>
                )}
            </div>

            {/* Interests Section - Now Dynamic */}
            <div className="mb-6 border-b pb-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-700 text-blue-700">Interests</h3>
                    <button
                        onClick={() => toggleSectionVisibility('interests')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition duration-200 ease-in-out ${sectionVisibility.interests ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                    >
                        {sectionVisibility.interests ? 'Remove Section' : 'Add Section'}
                    </button>
                </div>
                {sectionVisibility.interests && (
                    <>
                        {cvData.interests.map((interest, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2 bg-blue-50 p-3 rounded-lg border border-blue-200">
                                <DelayedInput
                                    type="text"
                                    value={interest}
                                    onBlur={(e) => handleInterestChange(index, e.target.value)}
                                    className="flex-grow p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                />
                                <button
                                    onClick={() => removeInterest(index)}
                                    className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 ease-in-out shadow-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={addInterest}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out shadow-md"
                        >
                            Add Interest
                        </button>
                    </>
                )}
            </div>

            {/* Activities Section - Now Dynamic */}
            <div className="mb-6 pb-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-700 text-blue-700">Activities</h3>
                    <button
                        onClick={() => toggleSectionVisibility('activities')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition duration-200 ease-in-out ${sectionVisibility.activities ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                    >
                        {sectionVisibility.activities ? 'Remove Section' : 'Add Section'}
                    </button>
                </div>
                {sectionVisibility.activities && (
                    <>
                        {cvData.activities.map((activity, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2 bg-blue-50 p-3 rounded-lg border border-blue-200">
                                <DelayedInput
                                    type="text"
                                    value={activity}
                                    onBlur={(e) => handleActivityChange(index, e.target.value)}
                                    className="flex-grow p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                />
                                <button
                                    onClick={() => removeActivity(index)}
                                    className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 ease-in-out shadow-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={addActivity}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out shadow-md"
                        >
                            Add Activity
                        </button>
                    </>
                )}
            </div>
        </div>
    );

    // DesignSelector Component: Allows choosing different CV templates
    const DesignSelector = ({ selectedTemplate, setSelectedTemplate }) => (
        <div className="p-4 bg-white rounded-lg shadow-lg mb-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Choose Design</h3>
            <div className="flex space-x-4 overflow-x-auto pb-2">
                <button
                    onClick={() => setSelectedTemplate('modern')}
                    className={`px-6 py-3 rounded-full text-lg font-medium transition duration-300 ease-in-out shadow-md flex-shrink-0
                        ${selectedTemplate === 'modern' ? 'bg-blue-600 text-white ring-2 ring-blue-400' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                    Modern
                </button>
                <button
                    onClick={() => setSelectedTemplate('classic')}
                    className={`px-6 py-3 rounded-full text-lg font-medium transition duration-300 ease-in-out shadow-md flex-shrink-0
                        ${selectedTemplate === 'classic' ? 'bg-blue-600 text-white ring-2 ring-blue-400' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                    Classic
                </button>
                <button
                    onClick={() => setSelectedTemplate('resume')}
                    className={`px-6 py-3 rounded-full text-lg font-medium transition duration-300 ease-in-out shadow-md flex-shrink-0
                        ${selectedTemplate === 'resume' ? 'bg-blue-600 text-white ring-2 ring-blue-400' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                    Resume
                </button>
                <button
                    onClick={() => setSelectedTemplate('creative')}
                    className={`px-6 py-3 rounded-full text-lg font-medium transition duration-300 ease-in-out shadow-md flex-shrink-0
                        ${selectedTemplate === 'creative' ? 'bg-blue-600 text-white ring-2 ring-blue-400' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                    Creative
                </button>
            </div>
        </div>
    );


    return (
        <div className="min-h-screen bg-blue-50 p-4 flex flex-col lg:flex-row gap-6 font-inter">
            {/* Left Panel: Form and Design Selector */}
            <div className="lg:w-1/2 flex flex-col gap-6">
                <DesignSelector selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />
                <CVForm
                    cvData={cvData}
                    handleChange={handleChange}
                    handleArrayChange={handleArrayChange}
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                    handleSkillCategoryChange={handleSkillCategoryChange}
                    addSkillCategory={addSkillCategory}
                    removeSkillCategory={removeSkillCategory}
                    handlePhotoUpload={handlePhotoUpload}
                    handleCvUpload={handleCvUpload}
                    handlePersonalDetailsChange={handlePersonalDetailsChange}
                    loadingMessage={loadingMessage}
                    // Pass new handlers for dynamic interests and activities
                    handleInterestChange={handleInterestChange}
                    addInterest={addInterest}
                    removeInterest={removeInterest}
                    handleActivityChange={handleActivityChange}
                    addActivity={addActivity}
                    removeActivity={removeActivity}
                    // Pass section visibility state and toggle function
                    sectionVisibility={sectionVisibility}
                    toggleSectionVisibility={toggleSectionVisibility}
                />
            </div>

            {/* Right Panel: CV Preview and Download Button */}
            <div className="lg:w-1/2 flex flex-col gap-6">
                <div className="p-4 bg-white rounded-lg shadow-lg flex justify-center">
                    <button
                        onClick={downloadCv}
                        className="px-8 py-3 bg-green-600 text-white rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
                    >
                        Download CV (PDF)
                    </button>
                </div>
                {/* CV Preview Container - This is the element that html2pdf will target */}
                <div ref={cvPreviewRef} className="flex-grow bg-blue-50 rounded-lg shadow-lg overflow-auto border-4 border-blue-200">
                    <CVPreview cvData={cvData} template={selectedTemplate} sectionVisibility={sectionVisibility} />
                </div>
            </div>

            {/* Footer Section */}
            <footer className="w-full bg-gray-800 text-white text-center p-4 rounded-lg mt-6 shadow-md">
                <p className="text-lg font-semibold mb-1">{cvData.name} - {cvData.title}</p>
                <p className="text-sm">Contact: {cvData.email} | {cvData.phone}</p>
                {cvData.linkedin && <p className="text-xs">LinkedIn: <a href={`https://${cvData.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">{cvData.linkedin}</a></p>}
                {cvData.github && <p className="text-xs">GitHub: <a href={`https://${cvData.github}`} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">{cvData.github}</a></p>}
            </footer>
        </div>
    );
};

export default App;
