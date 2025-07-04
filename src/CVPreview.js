// src/CVPreview.js
import React, {} from 'react';
import LucideIcon from './LucideIcon'; // Import the LucideIcon component

// CVPreview Component: Renders the selected CV template with provided data
const CVPreview = ({ cvData, template, sectionVisibility }) => { // Added sectionVisibility prop
    // Common Tailwind classes for section titles and list items across templates
    const sectionTitleClasses = "text-lg font-bold text-blue-700 mb-2 border-b-2 border-blue-300 pb-1";
    // Modified listItemClasses to include word-break
    // const listItemClasses = "text-gray-700 text-sm mb-1 break-words"; // Added break-words
    const skillBadgeClasses = "inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mb-2 font-semibold";

    // Helper function to check if a section has content
    const hasContent = (data) => {
        if (!data) return false;
        if (Array.isArray(data)) {
            return data.length > 0 && data.some(item => {
                if (typeof item === 'object' && item !== null) {
                    return Object.values(item).some(value => {
                        if (Array.isArray(value)) return value.length > 0;
                        return String(value).trim() !== '';
                    });
                }
                return String(item).trim() !== '';
            });
        }
        if (typeof data === 'object') {
            return Object.values(data).some(value => {
                if (Array.isArray(value)) return value.length > 0;
                return String(value).trim() !== '';
            });
        }
        return String(data).trim() !== '';
    };

    // Template 1: Modern
    const ModernTemplate = () => (
        <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-2xl mx-auto flex flex-col md:flex-row transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">
            {/* Left Column (Contact, Skills, Languages, Interests, Activities) */}
            <div className="md:w-1/3 pr-4 border-r border-gray-200 md:pr-8 flex flex-col items-center md:items-start">
                <div className="flex flex-col items-center mb-6">
                    {cvData.profilePicture && (
                        <img src={cvData.profilePicture} alt="Profile" className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-400 shadow-md transform transition-transform duration-300 hover:scale-105" />
                    )}
                    <h1 className="text-2xl font-bold text-gray-800 text-center">{cvData.name}</h1>
                    <p className="text-blue-600 text-md text-center">{cvData.title}</p>
                    {/* Moved contact info to header for Modern Template */}
                    <div className="flex flex-wrap justify-center text-gray-600 text-sm mt-2 w-full">
                        {cvData.email && <span className="mr-4 flex items-center group hover:text-blue-600 transition-colors duration-200 break-words"><LucideIcon name="mail" className="w-4 h-4 mr-1 text-blue-500 group-hover:text-blue-600" />{cvData.email}</span>}
                        {cvData.phone && <span className="mr-4 flex items-center group hover:text-blue-600 transition-colors duration-200 break-words"><LucideIcon name="phone" className="w-4 h-4 mr-1 text-blue-500 group-hover:text-blue-600" />{cvData.phone}</span>}
                        {cvData.personalDetails.address && <span className="mr-4 flex items-center group hover:text-blue-600 transition-colors duration-200 break-words"><LucideIcon name="map-pin" className="w-4 h-4 mr-1 text-blue-500 group-hover:text-blue-600" />{cvData.personalDetails.address}</span>}
                    </div>
                </div>

                {sectionVisibility.personalDetails && hasContent(cvData.personalDetails) && (
                    <div className="mb-6 no-break-section w-full">
                        {/* Only show "Personal Details" heading if there's content other than email, phone, address */}
                        {(cvData.personalDetails.dateOfBirth || cvData.personalDetails.nationality || cvData.personalDetails.gender) && (
                            <h2 className={`${sectionTitleClasses} flex items-center`}><LucideIcon name="user" className="mr-2 text-blue-500" size="18" />Personal Details</h2>
                        )}
                        <ul className="text-gray-700 text-sm">
                            {cvData.personalDetails.dateOfBirth && <li className="flex items-center mb-1 group hover:text-blue-600 transition-colors duration-200 break-words"><LucideIcon name="calendar" className="mr-2 text-blue-400 group-hover:text-blue-600" size="16" />{cvData.personalDetails.dateOfBirth}</li>}
                            {cvData.personalDetails.nationality && <li className="flex items-center mb-1 group hover:text-blue-600 transition-colors duration-200 break-words"><LucideIcon name="flag" className="mr-2 text-blue-400 group-hover:text-blue-600" size="16" />{cvData.personalDetails.nationality}</li>}
                            {cvData.personalDetails.gender && <li className="flex items-center mb-1 group hover:text-blue-600 transition-colors duration-200 break-words"><LucideIcon name="user" className="mr-2 text-blue-400 group-hover:text-blue-600" size="16" />{cvData.personalDetails.gender}</li>}
                        </ul>
                    </div>
                )}

                {sectionVisibility.skills && hasContent(cvData.skills) && (
                    <div className="mb-6 no-break-section w-full">
                        <h2 className={`${sectionTitleClasses} flex items-center`}><LucideIcon name="tool" className="mr-2 text-blue-500" size="18" />Skills</h2>
                        {cvData.skills.map((category, catIndex) => (
                            (category.categoryName.trim() !== '' || category.skills.length > 0) && (
                                <div key={catIndex} className="mb-2">
                                    {category.categoryName && <h4 className="font-semibold text-gray-800 text-sm mb-1 break-words">{category.categoryName}</h4>}
                                    <div className="flex flex-wrap">
                                        {category.skills.filter(skill => skill.trim() !== '').map((skill, skillIndex) => (
                                            <span key={skillIndex} className={`${skillBadgeClasses} transition-colors duration-200 hover:bg-blue-200 break-words`}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                )}

                {sectionVisibility.languages && hasContent(cvData.languages) && (
                    <div className="mb-6 no-break-section w-full">
                        <h2 className={`${sectionTitleClasses} flex items-center`}><LucideIcon name="globe" className="mr-2 text-blue-500" size="18" />Languages</h2>
                        <ul className="text-gray-700 text-sm">
                            {cvData.languages.filter(lang => lang.name.trim() !== '').map((lang, index) => (
                                <li key={index} className="mb-1 break-words">
                                    <span className="font-semibold">{lang.name}:</span> {lang.proficiency}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {sectionVisibility.interests && hasContent(cvData.interests) && (
                    <div className="mb-6 no-break-section w-full">
                        <h2 className={`${sectionTitleClasses} flex items-center`}><LucideIcon name="heart" className="mr-2 text-blue-500" size="18" />Interests</h2>
                        <ul className="list-disc list-inside text-gray-700 text-sm">
                            {cvData.interests.filter(interest => interest.trim() !== '').map((interest, index) => (
                                <li key={index} className="break-words">{interest}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {sectionVisibility.activities && hasContent(cvData.activities) && (
                    <div className="mb-6 no-break-section w-full">
                        <h2 className={`${sectionTitleClasses} flex items-center`}><LucideIcon name="activity" className="mr-2 text-blue-500" size="18" />Activities</h2>
                        <ul className="list-disc list-inside text-gray-700 text-sm">
                            {cvData.activities.filter(activity => activity.trim() !== '').map((activity, index) => (
                                <li key={index} className="break-words">{activity}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Right Column (Objective, Experience, Education, Projects, Certificates, References) */}
            <div className="md:w-2/3 md:pl-8 pt-6 md:pt-0">
                {sectionVisibility.objective && cvData.objective.trim() !== '' && (
                    <div className="mb-6 no-break-section">
                        <h2 className={`${sectionTitleClasses} flex items-center`}><LucideIcon name="target" className="mr-2 text-blue-500" size="18" />Objective</h2>
                        <p className="text-gray-700 text-sm leading-relaxed break-words">{cvData.objective}</p>
                    </div>
                )}

                {sectionVisibility.experience && hasContent(cvData.experience) && (
                    <div className="mb-6 no-break-section">
                        <h2 className={`${sectionTitleClasses} flex items-center`}><LucideIcon name="briefcase" className="mr-2 text-blue-500" size="18" />Experience</h2>
                        {cvData.experience.filter(exp => exp.title.trim() !== '' || exp.company.trim() !== '').map((exp, index) => (
                            <div key={index} className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100 transition-shadow duration-200 hover:shadow-md">
                                <h3 className="font-semibold text-gray-800 text-md break-words">{exp.title} at {exp.company}</h3>
                                <p className="text-gray-600 text-xs italic mb-1 break-words">{exp.years}</p>
                                <ul className="list-disc list-inside text-gray-700 text-sm ml-4">
                                    {exp.description.filter(desc => desc.trim() !== '').map((desc, i) => (
                                        <li key={i} className="break-words">{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {sectionVisibility.education && hasContent(cvData.education) && (
                    <div className="mb-6 no-break-section">
                        <h2 className={`${sectionTitleClasses} flex items-center`}><LucideIcon name="graduation-cap" className="mr-2 text-blue-500" size="18" />Education</h2>
                        {cvData.education.filter(edu => edu.degree.trim() !== '' || edu.university.trim() !== '').map((edu, index) => (
                            <div key={index} className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100 transition-shadow duration-200 hover:shadow-md">
                                <h3 className="font-semibold text-gray-800 text-md break-words">{edu.degree}</h3>
                                <p className="text-gray-600 text-sm italic break-words">{edu.university}, {edu.year}</p>
                            </div>
                        ))}
                    </div>
                )}

                {sectionVisibility.projects && hasContent(cvData.projects) && (
                    <div className="mb-6 no-break-section">
                        <h2 className={`${sectionTitleClasses} flex items-center`}><LucideIcon name="rocket" className="mr-2 text-blue-500" size="18" />Projects</h2>
                        {cvData.projects.filter(proj => proj.name.trim() !== '').map((project, index) => (
                            <div key={index} className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100 transition-shadow duration-200 hover:shadow-md">
                                <h3 className="font-semibold text-gray-800 text-md break-words">{project.name}</h3>
                                {project.description && <p className="text-gray-700 text-sm mb-1 break-words">{project.description}</p>}
                                {project.technologies.length > 0 && (
                                    <div className="flex flex-wrap">
                                        {project.technologies.filter(tech => tech.trim() !== '').map((tech, i) => (
                                            <span key={i} className={`${skillBadgeClasses} transition-colors duration-200 hover:bg-blue-200 break-words`}>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {sectionVisibility.certificates && hasContent(cvData.certificates) && (
                    <div className="mb-6 no-break-section">
                        <h2 className={`${sectionTitleClasses} flex items-center`}><LucideIcon name="award" className="mr-2 text-blue-500" size="18" />Certificates</h2>
                        <ul className="text-gray-700 text-sm">
                            {cvData.certificates.filter(cert => cert.name.trim() !== '').map((cert, index) => (
                                <li key={index} className="mb-1 p-3 bg-blue-50 rounded-lg border border-blue-100 transition-shadow duration-200 hover:shadow-md break-words">
                                    <span className="font-semibold">{cert.name}</span> ({cert.obtained}) - {cert.issuedBy}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {sectionVisibility.references && hasContent(cvData.references) && (
                    <div className="no-break-section">
                        <h2 className={`${sectionTitleClasses} flex items-center`}><LucideIcon name="users" className="mr-2 text-blue-500" size="18" />References</h2>
                        <ul className="text-gray-700 text-sm">
                            {cvData.references.filter(ref => ref.name.trim() !== '').map((ref, index) => (
                                <li key={index} className="mb-2 p-3 bg-blue-50 rounded-lg border border-blue-100 transition-shadow duration-200 hover:shadow-md break-words">
                                    <p className="font-semibold">{ref.name}</p>
                                    <p>{ref.title}, {ref.organization}</p>
                                    {ref.email && <p className="text-xs">Email: {ref.email}</p>}
                                    {ref.phone && <p className="text-xs">Phone: {ref.phone}</p>}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );

    // Template 2: Classic
    const ClassicTemplate = () => (
        <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-2xl mx-auto flex transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">
            {/* Left Column (Sidebar) */}
            <div className="w-1/3 bg-blue-800 text-white p-6 rounded-l-lg flex flex-col items-center text-center shadow-md no-break-section">
                {cvData.profilePicture && (
                    <img src={cvData.profilePicture} alt="Profile" className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-300 shadow-lg transform transition-transform duration-300 hover:scale-105" />
                )}
                <h1 className="text-3xl font-bold mb-1 text-blue-100 break-words">{cvData.name}</h1>
                <p className="text-lg font-light mb-4 text-blue-200 break-words">{cvData.title}</p>

                {/* Contact Information in Header for Classic Template */}
                <div className="w-full text-left mt-6 no-break-section">
                    <h2 className="text-xl font-semibold mb-3 border-b-2 border-blue-400 pb-1 text-blue-100 flex items-center"><LucideIcon name="contact" className="w-5 h-5 mr-2 text-blue-300" />Contact</h2>
                    {cvData.email && <p className="mb-2 text-sm flex items-center text-blue-200 group hover:text-blue-50 transition-colors duration-200 break-words"><LucideIcon name="mail" className="w-4 h-4 mr-2 text-blue-300 group-hover:text-blue-50" />{cvData.email}</p>}
                    {cvData.phone && <p className="mb-2 text-sm flex items-center text-blue-200 group hover:text-blue-50 transition-colors duration-200 break-words"><LucideIcon name="phone" className="w-4 h-4 mr-2 text-blue-300 group-hover:text-blue-50" />{cvData.phone}</p>}
                    {cvData.linkedin && <a href={`https://${cvData.linkedin}`} target="_blank" rel="noopener noreferrer" className="mb-2 text-sm flex items-center text-blue-200 hover:underline group hover:text-blue-50 transition-colors duration-200 break-words"><LucideIcon name="linkedin" className="w-4 h-4 mr-2 text-blue-300 group-hover:text-blue-50" />{cvData.linkedin.split('/').pop()}</a>}
                    {cvData.github && <a href={`https://${cvData.github}`} target="_blank" rel="noopener noreferrer" className="text-sm flex items-center text-blue-200 hover:underline group hover:text-blue-50 transition-colors duration-200 break-words"><LucideIcon name="github" className="w-4 h-4 mr-2 text-blue-300 group-hover:text-blue-50" />{cvData.github.split('/').pop()}</a>}
                    {cvData.personalDetails.address && <p className="mb-2 text-sm flex items-center text-blue-200 group hover:text-blue-50 transition-colors duration-200 break-words"><LucideIcon name="map-pin" className="w-4 h-4 mr-2 text-blue-300 group-hover:text-blue-50" />{cvData.personalDetails.address || 'Addis Ababa, Ethiopia'}</p>}
                </div>

                {sectionVisibility.personalDetails && (cvData.personalDetails.dateOfBirth || cvData.personalDetails.nationality || cvData.personalDetails.gender) && (
                    <div className="w-full text-left mt-6 no-break-section">
                        <h2 className="text-xl font-semibold mb-3 border-b-2 border-blue-400 pb-1 text-blue-100 flex items-center"><LucideIcon name="user" className="w-5 h-5 mr-2 text-blue-300" />Personal Details</h2>
                        {cvData.personalDetails.dateOfBirth && <p className="mb-1 text-blue-200 text-sm flex items-center group hover:text-blue-50 transition-colors duration-200 break-words"><LucideIcon name="calendar" className="w-4 h-4 mr-2 text-blue-300 group-hover:text-blue-50" />{cvData.personalDetails.dateOfBirth}</p>}
                        {cvData.personalDetails.nationality && <p className="mb-1 text-blue-200 text-sm flex items-center group hover:text-blue-50 transition-colors duration-200 break-words"><LucideIcon name="flag" className="w-4 h-4 mr-2 text-blue-300 group-hover:text-blue-50" />{cvData.personalDetails.nationality}</p>}
                        {cvData.personalDetails.gender && <p className="mb-1 text-blue-200 text-sm flex items-center group hover:text-blue-50 transition-colors duration-200 break-words"><LucideIcon name="user" className="w-4 h-4 mr-2 text-blue-300 group-hover:text-blue-50" />{cvData.personalDetails.gender}</p>}
                    </div>
                )}

                {sectionVisibility.skills && hasContent(cvData.skills) && (
                    <div className="w-full text-left mt-6 no-break-section">
                        <h2 className="text-xl font-semibold mb-3 border-b-2 border-blue-400 pb-1 text-blue-100 flex items-center"><LucideIcon name="tool" className="w-5 h-5 mr-2 text-blue-300" />Skills</h2>
                        {cvData.skills.map((category, categoryIndex) => (
                            (category.categoryName.trim() !== '' || category.skills.length > 0) && (
                                <div key={categoryIndex} className="mb-3 no-break-section">
                                    <h4 className="text-sm font-semibold mb-1 text-blue-200 break-words">{category.categoryName}:</h4>
                                    <div className="flex flex-wrap">
                                        {category.skills.filter(skill => skill.trim() !== '').map((skill, skillIndex) => (
                                            <span key={skillIndex} className="inline-block bg-blue-600 text-white text-xs font-medium px-2 py-0.5 rounded-full mr-1 mb-1 shadow-sm transition-colors duration-200 hover:bg-blue-700 break-words">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                )}

                {sectionVisibility.languages && hasContent(cvData.languages) && (
                    <div className="w-full text-left mt-6 no-break-section">
                        <h2 className="text-xl font-semibold mb-3 border-b-2 border-blue-400 pb-1 text-blue-100 flex items-center"><LucideIcon name="globe" className="w-5 h-5 mr-2 text-blue-300" />Languages</h2>
                        <ul className="list-none pl-0">
                            {cvData.languages.filter(lang => lang.name.trim() !== '').map((lang, index) => (
                                <li key={index} className="text-blue-200 mb-1 break-words">{lang.name} - {lang.proficiency}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {sectionVisibility.references && hasContent(cvData.references) && (
                    <div className="w-full text-left mt-6 no-break-section">
                        <h2 className="text-xl font-semibold mb-3 border-b-2 border-blue-400 pb-1 text-blue-100 flex items-center"><LucideIcon name="users" className="w-5 h-5 mr-2 text-blue-300" />References</h2>
                        {cvData.references.filter(ref => ref.name.trim() !== '').map((ref, index) => (
                            <div key={index} className="mb-2 p-2 bg-blue-700 rounded-md border border-blue-600 hover:shadow-sm transition duration-150 ease-in-out no-break-section">
                                <p className="font-semibold text-blue-100 break-words">{ref.name}</p>
                                <p className="text-blue-200 text-sm break-words">{ref.title}</p>
                            </div>
                        ))}
                    </div>
                )}

                {sectionVisibility.interests && hasContent(cvData.interests) && (
                    <div className="w-full text-left mt-6 no-break-section">
                        <h2 className="text-xl font-semibold mb-3 border-b-2 border-blue-400 pb-1 text-blue-100 flex items-center"><LucideIcon name="heart" className="w-5 h-5 mr-2 text-blue-300" />Interests</h2>
                        <ul className="list-disc list-inside text-blue-200 ml-2">
                            {cvData.interests.filter(interest => interest.trim() !== '').map((interest, i) => (
                                <li key={i} className="break-words">{interest}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {sectionVisibility.activities && hasContent(cvData.activities) && (
                    <div className="w-full text-left mt-6 no-break-section">
                        <h2 className="text-xl font-semibold mb-3 border-b-2 border-blue-400 pb-1 text-blue-100 flex items-center"><LucideIcon name="zap" className="w-5 h-5 mr-2 text-blue-300" />Activities</h2>
                        <ul className="list-disc list-inside text-blue-200 ml-2">
                            {cvData.activities.filter(activity => activity.trim() !== '').map((activity, i) => (
                                <li key={i} className="break-words">{activity}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Right Column (Main Content) */}
            <div className="w-2/3 p-6 bg-white rounded-r-lg">
                {sectionVisibility.objective && cvData.objective.trim() !== '' && (
                    <section className="mb-6 no-break-section">
                        <h2 className="text-lg font-bold text-gray-800 mb-2 border-b-2 border-blue-500 pb-1 flex items-center"><LucideIcon name="target" className="w-5 h-5 mr-2 text-blue-600" />Objective</h2>
                        <p className="text-gray-700 leading-relaxed break-words">{cvData.objective}</p>
                    </section>
                )}

                {sectionVisibility.experience && hasContent(cvData.experience) && (
                    <section className="mb-6 no-break-section">
                        <h2 className="text-lg font-bold text-gray-800 mb-2 border-b-2 border-blue-500 pb-1 flex items-center"><LucideIcon name="briefcase" className="w-5 h-5 mr-2 text-blue-600" />Experience</h2>
                        {cvData.experience.filter(exp => exp.title.trim() !== '' || exp.company.trim() !== '').map((exp, index) => (
                            <div key={index} className="mb-4 p-2 bg-gray-50 rounded-md border border-gray-100 transition-shadow duration-200 hover:shadow-md no-break-section">
                                <h3 className="text-md font-semibold text-gray-800 break-words">{exp.title}</h3>
                                <p className="text-sm text-gray-500 mb-1 break-words">{exp.company}, {exp.years}</p>
                                <ul className="list-disc list-inside text-gray-700 ml-4">
                                    {exp.description.filter(desc => desc.trim() !== '').map((desc, i) => (
                                        <li key={i} className="break-words">{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                )}

                {sectionVisibility.education && hasContent(cvData.education) && (
                    <section className="mb-6 no-break-section">
                        <h2 className="text-lg font-bold text-gray-800 mb-2 border-b-2 border-blue-500 pb-1 flex items-center"><LucideIcon name="graduation-cap" className="w-5 h-5 mr-2 text-blue-600" />Education</h2>
                        {cvData.education.filter(edu => edu.degree.trim() !== '' || edu.university.trim() !== '').map((edu, index) => (
                            <div key={index} className="mb-2 p-2 bg-gray-50 rounded-md border border-gray-100 transition-shadow duration-200 hover:shadow-md no-break-section">
                                <h3 className="text-md font-semibold text-gray-800 break-words">{edu.degree}</h3>
                                <p className="text-sm text-gray-700 break-words">{edu.university}, {edu.year}</p>
                            </div>
                        ))}
                    </section>
                )}

                {sectionVisibility.projects && hasContent(cvData.projects) && (
                    <section className="no-break-section">
                        <h2 className={sectionTitleClasses}><LucideIcon name="rocket" className="w-5 h-5 mr-2 text-blue-600" />Projects</h2>
                        {cvData.projects.filter(proj => proj.name.trim() !== '').map((project, index) => (
                            <div key={index} className="mb-4 p-2 bg-gray-50 rounded-md border border-gray-100 transition-shadow duration-200 hover:shadow-md no-break-section">
                                <h3 className="text-md font-semibold text-gray-800 break-words">{project.name}</h3>
                                <p className="text-sm text-gray-700 mb-1 break-words">{project.description}</p>
                                <p className="text-xs text-gray-500 break-words">Technologies: {project.technologies.join(', ')}</p>
                            </div>
                        ))}
                    </section>
                )}

                {sectionVisibility.certificates && hasContent(cvData.certificates) && (
                    <section className="mb-6 no-break-section">
                        <h2 className={sectionTitleClasses}><LucideIcon name="award" className="w-5 h-5 mr-2 text-blue-600" />Certificates</h2>
                        {cvData.certificates.filter(cert => cert.name.trim() !== '').map((cert, index) => (
                            <div key={index} className="mb-2 p-2 bg-gray-50 rounded-md border border-gray-100 transition-shadow duration-200 hover:shadow-md no-break-section">
                                <h3 className="text-md font-semibold text-gray-800 break-words">{cert.name}</h3>
                                <p className="text-sm text-gray-700 break-words">{cert.issuedBy}, {cert.obtained}</p>
                            </div>
                        ))}
                    </section>
                )}

                {sectionVisibility.interests && hasContent(cvData.interests) && (
                    <section className="mb-6 no-break-section">
                        <h2 className={sectionTitleClasses}><LucideIcon name="heart" className="w-5 h-5 mr-2 text-blue-600" />Interests</h2>
                        <ul className="list-disc list-inside text-gray-700 ml-4">
                            {cvData.interests.filter(interest => interest.trim() !== '').map((interest, i) => (
                                <li key={i} className="break-words">{interest}</li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    );

    // Template 3: Resume (similar to the original provided structure)
    const ResumeTemplate = () => (
        <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-2xl mx-auto flex text-sm border-2 border-gray-200 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">
            {/* Left Column (Sidebar) */}
            <div className="w-1/3 pr-6 border-r border-gray-300 bg-gray-50 p-4 rounded-l-lg no-break-section">
                {/* Personal Details (excluding email, phone, address which are moved to header) */}
                {sectionVisibility.personalDetails && (cvData.personalDetails.dateOfBirth || cvData.personalDetails.nationality || cvData.personalDetails.gender) && (
                    <section className="mb-6 no-break-section">
                        <h2 className="text-base font-bold text-gray-800 mb-2 border-b border-blue-400 pb-1 uppercase text-blue-700 flex items-center"><LucideIcon name="user" className="w-4 h-4 mr-2 text-blue-700" />Personal Details</h2>
                        {cvData.personalDetails.dateOfBirth && <p className="mb-1 text-gray-700 flex items-center group hover:text-blue-600 transition-colors duration-200 break-words"><LucideIcon name="calendar" className="w-4 h-4 mr-2 text-blue-500 group-hover:text-blue-600" />{cvData.personalDetails.dateOfBirth}</p>}
                        {cvData.personalDetails.nationality && <p className="mb-1 text-gray-700 flex items-center group hover:text-blue-600 transition-colors duration-200 break-words"><LucideIcon name="flag" className="w-4 h-4 mr-2 text-blue-500 group-hover:text-blue-600" />{cvData.personalDetails.nationality}</p>}
                        {cvData.personalDetails.gender && <p className="mb-1 text-gray-700 flex items-center group hover:text-blue-600 transition-colors duration-200 break-words"><LucideIcon name="user" className="w-4 h-4 mr-2 text-blue-500 group-hover:text-blue-600" />{cvData.personalDetails.gender}</p>}
                    </section>
                )}

                {sectionVisibility.skills && hasContent(cvData.skills) && (
                    <section className="mb-6 no-break-section">
                        <h2 className="text-base font-bold text-gray-800 mb-2 border-b border-blue-400 pb-1 uppercase text-blue-700 flex items-center"><LucideIcon name="tool" className="w-4 h-4 mr-2 text-blue-700" />Skills</h2>
                        {cvData.skills.map((category, categoryIndex) => (
                            (category.categoryName.trim() !== '' || category.skills.length > 0) && (
                                <div key={categoryIndex} className="mb-2">
                                    <h4 className="font-semibold text-gray-700 mb-1 break-words">{category.categoryName}:</h4>
                                    <div className="flex flex-wrap">
                                        {category.skills.filter(skill => skill.trim() !== '').map((skill, skillIndex) => (
                                            <span key={skillIndex} className="text-gray-700 mr-2 mb-1 hover:text-blue-600 transition duration-150 ease-in-out break-words">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </section>
                )}

                {sectionVisibility.languages && hasContent(cvData.languages) && (
                    <section className="mb-6 no-break-section">
                        <h2 className="text-base font-bold text-gray-800 mb-2 border-b border-blue-400 pb-1 uppercase text-blue-700 flex items-center"><LucideIcon name="globe" className="w-4 h-4 mr-2 text-blue-700" />Languages</h2>
                        <ul className="list-none pl-0">
                            {cvData.languages.filter(lang => lang.name.trim() !== '').map((lang, index) => (
                                <li key={index} className="text-gray-700 hover:text-blue-600 transition duration-150 ease-in-out break-words">{lang.name} - {lang.proficiency}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {sectionVisibility.references && hasContent(cvData.references) && (
                    <section className="mb-6 no-break-section">
                        <h2 className="text-base font-bold text-gray-800 mb-2 border-b border-blue-400 pb-1 uppercase text-blue-700 flex items-center"><LucideIcon name="users" className="w-4 h-4 mr-2 text-blue-700" />References</h2>
                        {cvData.references.filter(ref => ref.name.trim() !== '').map((ref, index) => (
                            <div key={index} className="mb-2 p-2 bg-white rounded-md border border-gray-100 hover:shadow-sm transition duration-150 ease-in-out no-break-section">
                                <p className="font-semibold text-gray-800 break-words">{ref.name} - {ref.organization}</p>
                                <p className="text-gray-700 break-words">{ref.title}</p>
                                {ref.email && <p className="text-gray-700 break-words">{ref.email}</p>}
                                {ref.phone && <p className="text-gray-700 break-words">{ref.phone}</p>}
                            </div>
                        ))}
                    </section>
                )}

                {sectionVisibility.activities && hasContent(cvData.activities) && (
                    <section className="no-break-section">
                        <h2 className="text-base font-bold text-gray-800 mb-2 border-b border-blue-400 pb-1 uppercase text-blue-700 flex items-center"><LucideIcon name="zap" className="w-4 h-4 mr-2 text-blue-700" />Activities</h2>
                        <ul className="list-disc list-inside text-gray-700 ml-2">
                            {cvData.activities.filter(activity => activity.trim() !== '').map((activity, i) => (
                                <li key={i} className="mb-1 hover:text-blue-600 transition duration-150 ease-in-out break-words">{activity}</li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>

            {/* Right Column (Main Content) */}
            <div className="w-2/3 pl-6">
                {/* Name and Title */}
                <div className="mb-6 text-center bg-blue-50 p-4 rounded-lg shadow-sm no-break-section">
                    <h1 className="text-3xl font-extrabold text-blue-800 mb-1 break-words">{cvData.name}</h1>
                    <p className="text-xl text-blue-600 font-semibold break-words">{cvData.title}</p>
                    {/* Moved contact info to header for Resume Template */}
                    <div className="flex flex-wrap justify-center text-gray-600 text-sm mt-2 w-full">
                        {cvData.email && <span className="mr-4 flex items-center group hover:text-blue-600 transition-colors duration-200 break-words"><LucideIcon name="mail" className="w-4 h-4 mr-1 text-blue-500 group-hover:text-blue-600" />{cvData.email}</span>}
                        {cvData.phone && <span className="mr-4 flex items-center group hover:text-blue-600 transition-colors duration-200 break-words"><LucideIcon name="phone" className="w-4 h-4 mr-1 text-blue-500 group-hover:text-blue-600" />{cvData.phone}</span>}
                        {cvData.personalDetails.address && <span className="mr-4 flex items-center group hover:text-blue-600 transition-colors duration-200 break-words"><LucideIcon name="map-pin" className="w-4 h-4 mr-1 text-blue-500 group-hover:text-blue-600" />{cvData.personalDetails.address}</span>}
                    </div>
                </div>

                {sectionVisibility.objective && cvData.objective.trim() !== '' && (
                    <section className="mb-6 no-break-section">
                        <h2 className="text-base font-bold text-gray-800 mb-2 border-b border-blue-400 pb-1 uppercase text-blue-700 flex items-center"><LucideIcon name="target" className="w-4 h-4 mr-2 text-blue-700" />Objective</h2>
                        <p className="text-gray-700 leading-relaxed break-words">{cvData.objective}</p>
                    </section>
                )}

                {sectionVisibility.experience && hasContent(cvData.experience) && (
                    <section className="mb-6 no-break-section">
                        <h2 className="text-base font-bold text-gray-800 mb-2 border-b border-blue-400 pb-1 uppercase text-blue-700 flex items-center"><LucideIcon name="briefcase" className="w-4 h-4 mr-2 text-blue-700" />Experience</h2>
                        {cvData.experience.filter(exp => exp.title.trim() !== '' || exp.company.trim() !== '').map((exp, index) => (
                            <div key={index} className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100 hover:shadow-md transition duration-150 ease-in-out no-break-section">
                                <h3 className="text-md font-semibold text-gray-800 break-words">{exp.title}</h3>
                                <p className="text-sm text-gray-600 mb-1 break-words">{exp.company}, {exp.years}</p>
                                <ul className="list-disc list-inside text-gray-700 ml-4">
                                    {exp.description.filter(desc => desc.trim() !== '').map((desc, i) => (
                                        <li key={i} className="mb-1 break-words">{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                )}

                {sectionVisibility.education && hasContent(cvData.education) && (
                    <section className="mb-6 no-break-section">
                        <h2 className="text-base font-bold text-gray-800 mb-2 border-b border-blue-400 pb-1 uppercase text-blue-700 flex items-center"><LucideIcon name="graduation-cap" className="w-4 h-4 mr-2 text-blue-700" />Education</h2>
                        {cvData.education.filter(edu => edu.degree.trim() !== '' || edu.university.trim() !== '').map((edu, index) => (
                            <div key={index} className="mb-2 p-3 bg-blue-50 rounded-lg border border-blue-100 hover:shadow-md transition duration-150 ease-in-out no-break-section">
                                <h3 className="text-md font-semibold text-gray-800 break-words">{edu.degree}</h3>
                                <p className="text-sm text-gray-700 break-words">{edu.university}, {edu.year}</p>
                            </div>
                        ))}
                    </section>
                )}

                {sectionVisibility.projects && hasContent(cvData.projects) && (
                    <section className="mb-6 no-break-section">
                        <h2 className="text-base font-bold text-gray-800 mb-2 border-b border-blue-400 pb-1 uppercase text-blue-700 flex items-center"><LucideIcon name="rocket" className="w-4 h-4 mr-2 text-blue-700" />Projects</h2>
                        {cvData.projects.filter(proj => proj.name.trim() !== '').map((project, index) => (
                            <div key={index} className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100 hover:shadow-md transition duration-150 ease-in-out no-break-section">
                                <h3 className="text-md font-semibold text-gray-800 break-words">{project.name}</h3>
                                <p className="text-sm text-gray-700 mb-1 break-words">{project.description}</p>
                                <p className="text-xs text-gray-600 break-words">Technologies: {project.technologies.join(', ')}</p>
                            </div>
                        ))}
                    </section>
                )}

                {sectionVisibility.certificates && hasContent(cvData.certificates) && (
                    <section className="mb-6 no-break-section">
                        <h2 className="text-base font-bold text-gray-800 mb-2 border-b border-blue-400 pb-1 uppercase text-blue-700 flex items-center"><LucideIcon name="award" className="w-4 h-4 mr-2 text-blue-700" />Certificate</h2>
                        {cvData.certificates.filter(cert => cert.name.trim() !== '').map((cert, index) => (
                            <div key={index} className="mb-2 p-3 bg-blue-50 rounded-lg border border-blue-100 hover:shadow-md transition duration-150 ease-in-out no-break-section">
                                <h3 className="text-md font-semibold text-gray-800 break-words">{cert.name}</h3>
                                <p className="text-sm text-gray-700 break-words">{cert.issuedBy}</p>
                                <p className="text-sm text-gray-700 break-words">Obtained in {cert.obtained}</p>
                            </div>
                        ))}
                    </section>
                )}

                {sectionVisibility.interests && hasContent(cvData.interests) && (
                    <section className="no-break-section">
                        <h2 className="text-base font-bold text-gray-800 mb-2 border-b border-blue-400 pb-1 uppercase text-blue-700 flex items-center"><LucideIcon name="heart" className="w-4 h-4 mr-2 text-blue-700" />Interests</h2>
                        <ul className="list-disc list-inside text-gray-700 ml-2">
                            {cvData.interests.filter(interest => interest.trim() !== '').map((interest, i) => (
                                <li key={i} className="mb-1 hover:text-blue-600 transition duration-150 ease-in-out break-words">{interest}</li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    );

    // Template 4: Creative
    const CreativeTemplate = () => (
        <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg shadow-2xl min-h-[11in] w-[8.5in] mx-auto flex flex-col transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-8 p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg no-break-section">
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <h1 className="text-4xl font-extrabold mb-1 break-words">{cvData.name}</h1>
                    <p className="text-xl font-light opacity-90 break-words">{cvData.title}</p>
                    {/* Moved contact info to header for Creative Template */}
                    <div className="flex flex-wrap justify-center text-sm mt-3 w-full">
                        {cvData.email && <span className="mx-2 flex items-center group hover:text-purple-200 transition-colors duration-200 break-words"><LucideIcon name="mail" className="mr-1 text-pink-300 group-hover:text-purple-200" size="14" />{cvData.email}</span>}
                        {cvData.phone && <span className="mx-2 flex items-center group hover:text-purple-200 transition-colors duration-200 break-words"><LucideIcon name="phone" className="mr-1 text-pink-300 group-hover:text-purple-200" size="14" />{cvData.phone}</span>}
                        {cvData.personalDetails.address && <span className="mx-2 flex items-center group hover:text-purple-200 transition-colors duration-200 break-words"><LucideIcon name="map-pin" className="mr-1 text-pink-300 group-hover:text-purple-200" size="14" />{cvData.personalDetails.address}</span>}
                    </div>
                </div>
                {cvData.profilePicture && (
                    <img src={cvData.profilePicture} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg flex-shrink-0 transform transition-transform duration-300 hover:scale-105" />
                )}
            </div>

            {/* Main Content Area - Two Columns */}
            <div className="flex flex-col md:flex-row flex-grow gap-6">
                {/* Left Column - Contact & Skills */}
                <div className="md:w-1/3 p-6 bg-white rounded-lg shadow-md no-break-section">
                    {sectionVisibility.personalDetails && (cvData.personalDetails.dateOfBirth || cvData.personalDetails.nationality || cvData.personalDetails.gender) && (
                        <section className="mb-6 no-break-section">
                            <h2 className="text-xl font-bold text-purple-700 mb-3 border-b-2 border-pink-300 pb-1 flex items-center"><LucideIcon name="user" className="w-5 h-5 mr-2 text-pink-500" />Personal Details</h2>
                            {cvData.personalDetails.dateOfBirth && <p className="mb-1 text-gray-700 flex items-center group hover:text-purple-600 transition-colors duration-200 break-words"><LucideIcon name="calendar" className="w-4 h-4 mr-2 text-pink-500 group-hover:text-purple-600" />{cvData.personalDetails.dateOfBirth}</p>}
                            {cvData.personalDetails.nationality && <p className="mb-1 text-gray-700 flex items-center group hover:text-purple-600 transition-colors duration-200 break-words"><LucideIcon name="flag" className="w-4 h-4 mr-2 text-pink-500 group-hover:text-purple-600" />{cvData.personalDetails.nationality}</p>}
                            {cvData.personalDetails.gender && <p className="mb-1 text-gray-700 flex items-center group hover:text-purple-600 transition-colors duration-200 break-words"><LucideIcon name="user" className="w-4 h-4 mr-2 text-pink-500 group-hover:text-purple-600" />{cvData.personalDetails.gender}</p>}
                        </section>
                    )}

                    {sectionVisibility.skills && hasContent(cvData.skills) && (
                        <section className="mb-6 no-break-section">
                            <h2 className="text-xl font-bold text-purple-700 mb-3 border-b-2 border-pink-300 pb-1 flex items-center"><LucideIcon name="tool" className="w-5 h-5 mr-2 text-pink-500" />Skills</h2>
                            {cvData.skills.map((category, categoryIndex) => (
                                (category.categoryName.trim() !== '' || category.skills.length > 0) && (
                                    <div key={categoryIndex} className="mb-3 no-break-section">
                                        <h4 className="font-semibold text-gray-800 mb-1 break-words">{category.categoryName}:</h4>
                                        <div className="flex flex-wrap">
                                            {category.skills.filter(skill => skill.trim() !== '').map((skill, skillIndex) => (
                                                <span key={skillIndex} className="inline-block bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-1 mb-1 shadow-sm transition-colors duration-200 hover:bg-pink-200 break-words">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}
                        </section>
                    )}

                    {sectionVisibility.languages && hasContent(cvData.languages) && (
                        <section className="mb-6 no-break-section">
                            <h2 className="text-xl font-bold text-purple-700 mb-3 border-b-2 border-pink-300 pb-1 flex items-center"><LucideIcon name="globe" className="w-5 h-5 mr-2 text-pink-500" />Languages</h2>
                            <ul className="list-none pl-0">
                                {cvData.languages.filter(lang => lang.name.trim() !== '').map((lang, index) => (
                                    <li key={index} className="text-gray-700 mb-1 break-words">{lang.name} - {lang.proficiency}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {sectionVisibility.interests && hasContent(cvData.interests) && (
                        <section className="mb-6 no-break-section">
                            <h2 className="text-xl font-bold text-purple-700 mb-3 border-b-2 border-pink-300 pb-1 flex items-center"><LucideIcon name="heart" className="w-5 h-5 mr-2 text-pink-500" />Interests</h2>
                            <ul className="list-disc list-inside text-gray-700 ml-4">
                                {cvData.interests.filter(interest => interest.trim() !== '').map((interest, index) => (
                                    <li key={index} className="break-words">{interest}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {sectionVisibility.activities && hasContent(cvData.activities) && (
                        <section className="mb-6 no-break-section">
                            <h2 className="text-xl font-bold text-purple-700 mb-3 border-b-2 border-pink-300 pb-1 flex items-center"><LucideIcon name="activity" className="w-5 h-5 mr-2 text-pink-500" />Activities</h2>
                            <ul className="list-disc list-inside text-gray-700 ml-4">
                                {cvData.activities.filter(activity => activity.trim() !== '').map((activity, index) => (
                                    <li key={index} className="break-words">{activity}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>

                {/* Right Content for Creative Template (Objective, Experience, Education, Projects, Certificates, References) */}
                <div className="md:w-2/3 p-6 bg-white rounded-lg shadow-md">
                    {sectionVisibility.objective && cvData.objective.trim() !== '' && (
                        <section className="mb-6 no-break-section">
                            <h2 className="text-xl font-bold text-purple-700 mb-3 border-b-2 border-pink-300 pb-1 flex items-center"><LucideIcon name="target" className="w-5 h-5 mr-2 text-pink-500" />Objective</h2>
                            <p className="text-gray-700 leading-relaxed break-words">{cvData.objective}</p>
                        </section>
                    )}

                    {sectionVisibility.experience && hasContent(cvData.experience) && (
                        <section className="mb-6 no-break-section">
                            <h2 className="text-xl font-bold text-purple-700 mb-3 border-b-2 border-pink-300 pb-1 flex items-center"><LucideIcon name="briefcase" className="w-5 h-5 mr-2 text-pink-500" />Experience</h2>
                            {cvData.experience.filter(exp => exp.title.trim() !== '' || exp.company.trim() !== '').map((exp, index) => (
                                <div key={index} className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-100 transition-shadow duration-200 hover:shadow-md no-break-section">
                                    <h3 className="text-md font-semibold text-gray-800 break-words">{exp.title}</h3>
                                    <p className="text-sm text-gray-600 mb-1 break-words">{exp.company}, {exp.years}</p>
                                    <ul className="list-disc list-inside text-gray-700 ml-4">
                                        {exp.description.map((desc, i) => (
                                            <li key={i} className="mb-1 break-words">{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </section>
                    )}

                    {sectionVisibility.education && hasContent(cvData.education) && (
                        <section className="mb-6 no-break-section">
                            <h2 className="text-xl font-bold text-purple-700 mb-3 border-b-2 border-pink-300 pb-1 flex items-center"><LucideIcon name="graduation-cap" className="w-5 h-5 mr-2 text-pink-500" />Education</h2>
                            {cvData.education.filter(edu => edu.degree.trim() !== '' || edu.university.trim() !== '').map((edu, index) => (
                                <div key={index} className="mb-2 p-3 bg-purple-50 rounded-lg border border-purple-100 transition-shadow duration-200 hover:shadow-md no-break-section">
                                    <h3 className="text-md font-semibold text-gray-800 break-words">{edu.degree}</h3>
                                    <p className="text-sm text-gray-700 break-words">{edu.university}, {edu.year}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {sectionVisibility.projects && hasContent(cvData.projects) && (
                        <section className="mb-6 no-break-section">
                            <h2 className="text-xl font-bold text-purple-700 mb-3 border-b-2 border-pink-300 pb-1 flex items-center"><LucideIcon name="rocket" className="w-5 h-5 mr-2 text-pink-500" />Projects</h2>
                            {cvData.projects.filter(proj => proj.name.trim() !== '').map((project, index) => (
                                <div key={index} className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-100 transition-shadow duration-200 hover:shadow-md no-break-section">
                                    <h3 className="text-md font-semibold text-gray-800 break-words">{project.name}</h3>
                                    <p className="text-sm text-gray-700 mb-1 break-words">{project.description}</p>
                                    <p className="text-xs text-gray-600 break-words">Technologies: {project.technologies.join(', ')}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {sectionVisibility.certificates && hasContent(cvData.certificates) && (
                        <section className="mb-6 no-break-section">
                            <h2 className="text-xl font-bold text-purple-700 mb-3 border-b-2 border-pink-300 pb-1 flex items-center"><LucideIcon name="award" className="w-5 h-5 mr-2 text-pink-500" />Certificates</h2>
                            {cvData.certificates.filter(cert => cert.name.trim() !== '').map((cert, index) => (
                                <div key={index} className="mb-2 p-3 bg-purple-50 rounded-lg border border-purple-100 transition-shadow duration-200 hover:shadow-md no-break-section">
                                    <h3 className="text-md font-semibold text-gray-800 break-words">{cert.name}</h3>
                                    <p className="text-sm text-gray-700 break-words">{cert.issuedBy}, {cert.obtained}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {sectionVisibility.references && hasContent(cvData.references) && (
                        <section className="no-break-section">
                            <h2 className="text-xl font-bold text-purple-700 mb-3 border-b-2 border-pink-300 pb-1 flex items-center"><LucideIcon name="users" className="w-5 h-5 mr-2 text-pink-500" />References</h2>
                            {cvData.references.filter(ref => ref.name.trim() !== '').map((ref, index) => (
                                <div key={index} className="mb-2 p-2 bg-purple-50 rounded-md border border-purple-100 hover:shadow-sm transition duration-150 ease-in-out no-break-section">
                                    <p className="font-semibold text-gray-800 break-words">{ref.name} - {ref.organization}</p>
                                    <p className="text-gray-700 break-words">{ref.title}</p>
                                    {ref.email && <p className="text-gray-700 break-words">{ref.email}</p>}
                                    {ref.phone && <p className="text-700 break-words">{ref.phone}</p>}
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </div>
        </div>
    );


    // Render the selected template
    return (
        <div className="flex justify-center p-4">
            {template === 'modern' ? <ModernTemplate /> : template === 'classic' ? <ClassicTemplate /> : template === 'creative' ? <CreativeTemplate /> : <ResumeTemplate />}
        </div>
    );
};

export default CVPreview;
