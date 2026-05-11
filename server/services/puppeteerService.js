const puppeteer = require('puppeteer');

const generatePDF = async (htmlContent) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    
    // Set content and wait until network is idle
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });

    return pdfBuffer;
  } catch (error) {
    console.error("Puppeteer PDF generation error:", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

const buildResumeHTML = (data, layout = 'classic', accent = '#60A5FA') => {
  const { contacts = {}, experience = {}, education = {}, skills = [], summary = "" } = data || {};
  
  const name = [contacts.firstName, contacts.lastName].filter(Boolean).join(" ");
  const title = contacts.jobTitle;
  const email = contacts.email;
  const phone = contacts.phone;
  // Fallbacks if data structure varies
  const location = data.location || "";
  const linkedin = data.linkedin || "";

  const skillListHTML = (skills || []).map(skill => `<span>${skill}</span>`).join('');
  
  // Format experience (assuming it could be an object from form or array)
  const expArray = Array.isArray(experience) ? experience : (experience.role || experience.company ? [experience] : []);
  
  const expHTML = expArray.map(exp => `
    <div class="exp-item">
      <div class="exp-header">
        <div>
          <span class="exp-role">${exp.role || ''}</span> 
          ${exp.company ? `<span class="exp-company">| ${exp.company}</span>` : ''}
        </div>
        <div class="exp-date">${exp.date || exp.duration || ''}</div>
      </div>
      ${exp.description ? `<p style="font-size:10pt;color:#444;margin-top:4px;">${exp.description}</p>` : ''}
      ${exp.bullets && exp.bullets.length > 0 ? `<ul>${exp.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
    </div>
  `).join('');

  // Format education
  const eduArray = Array.isArray(education) ? education : (education.degree || education.college ? [education] : []);
  const eduHTML = eduArray.map(edu => `
    <div class="edu-item">
      <div class="edu-header">
        <div>
          <span class="edu-degree">${edu.degree || ''}</span>
          ${edu.college ? `<span class="edu-college">| ${edu.college}</span>` : ''}
        </div>
        <div class="exp-date">${edu.year || ''}</div>
      </div>
    </div>
  `).join('');

  const hasSkills = skills && skills.length > 0;
  const hasExp = expArray.length > 0;
  const hasEdu = eduArray.length > 0;
  const hasSummary = !!summary;

  const projArray = Array.isArray(data.projects) ? data.projects : [];
  const projHTML = projArray.map(proj => `
    <div class="exp-item">
      <div class="exp-header">
        <div>
          <span class="exp-role">${proj.name || ''}</span> 
          ${proj.tech ? `<span class="exp-company">| ${proj.tech}</span>` : ''}
        </div>
      </div>
      ${proj.description ? `<p style="font-size:10pt;color:#444;margin-top:4px;">${proj.description}</p>` : ''}
    </div>
  `).join('');
  const hasProj = projArray.length > 0;

  const certArray = Array.isArray(data.certifications) ? data.certifications : [];
  const certHTML = certArray.map(cert => `
    <div class="edu-item">
      <div class="edu-header">
        <div>
          <span class="edu-degree">${cert.name || ''}</span>
          ${cert.issuer ? `<span class="edu-college">| ${cert.issuer}</span>` : ''}
        </div>
        <div class="exp-date">${cert.year || ''}</div>
      </div>
    </div>
  `).join('');
  const hasCert = certArray.length > 0;

  const langArray = Array.isArray(data.languages) ? data.languages : [];
  const langHTML = langArray.map(lang => `
    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
      <span style="font-weight: bold;">${lang.language || ''}</span>
      <span style="color: #666; font-size: 9pt;">${lang.proficiency || ''}</span>
    </div>
  `).join('');
  const hasLang = langArray.length > 0;

  // 1. Sidebar Layout
  if (['sidebar', 'onyx'].includes(layout)) {
    const isDark = layout === 'onyx';
    const bg = isDark ? '#1a1a1a' : '#f8f9fa';
    const text = isDark ? '#f1f1f1' : '#333';
    const sideBg = isDark ? '#000' : accent;
    const sideText = isDark ? '#e0e0e0' : '#fff';

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Helvetica', 'Arial', sans-serif; color: ${text}; background: ${bg}; margin: 0; display: flex; height: 100%; font-size: 10pt; line-height: 1.5; }
          .sidebar { width: 35%; background: ${sideBg}; color: ${sideText}; padding: 25px 20px; box-sizing: border-box; }
          .main { width: 65%; padding: 25px 20px; background: ${bg}; box-sizing: border-box; overflow-y: auto; }
          h1 { font-size: 20pt; margin: 0 0 5px 0; line-height: 1.1; color: ${sideText}; }
          .title { font-size: 11pt; font-weight: bold; margin-bottom: 20px; color: ${isDark ? accent : 'rgba(255,255,255,0.8)'}; }
          .contact { margin-bottom: 25px; font-size: 9pt; line-height: 1.8; }
          .contact div { margin-bottom: 5px; }
          .section-title { font-size: 11pt; font-weight: bold; border-bottom: 2px solid ${isDark ? '#444' : '#ddd'}; padding-bottom: 5px; margin-top: 0; margin-bottom: 12px; text-transform: uppercase; color: ${isDark ? accent : accent}; }
          .sidebar .section-title { border-bottom-color: rgba(255,255,255,0.3); color: ${sideText}; }
          .summary { margin-bottom: 20px; font-size: 9.5pt; }
          .exp-item { margin-bottom: 15px; }
          .exp-header { display: flex; justify-content: space-between; margin-bottom: 5px; flex-wrap: wrap; }
          .exp-role { font-weight: bold; color: ${isDark ? '#fff' : '#111'}; font-size: 10.5pt; }
          .exp-company { font-style: italic; color: ${isDark ? '#aaa' : '#666'}; }
          .exp-date { font-size: 9pt; color: ${isDark ? '#888' : '#777'}; }
          ul { margin: 0; padding-left: 20px; font-size: 9.5pt; }
          li { margin-bottom: 4px; }
          .skills-list span { display: inline-block; background: rgba(255,255,255,0.1); padding: 4px 8px; margin: 2px; border-radius: 4px; font-size: 8.5pt; border: 1px solid rgba(255,255,255,0.2); }
        </style>
      </head>
      <body>
        <div class="sidebar">
          <h1>${name || 'Candidate Name'}</h1>
          <div class="title">${title || 'Job Title'}</div>
          <div class="contact">
            ${email ? `<div>${email}</div>` : ''}
            ${phone ? `<div>${phone}</div>` : ''}
            ${location ? `<div>${location}</div>` : ''}
            ${linkedin ? `<div>${linkedin}</div>` : ''}
          </div>
          ${hasSkills ? `
          <div class="section-title">Skills</div>
          <div class="skills-list">${skillListHTML}</div>
          ` : ''}
          ${hasLang ? `
          <div class="section-title" style="margin-top:20px;">Languages</div>
          <div>${langHTML}</div>
          ` : ''}
        </div>
        <div class="main">
          ${hasSummary ? `
          <div class="summary">
            <div class="section-title">Professional Summary</div>
            <div>${summary}</div>
          </div>
          ` : ''}
          ${hasExp ? `
          <div class="section-title">Experience</div>
          ${expHTML}
          ` : ''}
          ${hasProj ? `
          <div class="section-title" style="margin-top:20px;">Projects</div>
          ${projHTML}
          ` : ''}
          ${hasEdu ? `
          <div class="section-title" style="margin-top:20px;">Education</div>
          ${eduHTML}
          ` : ''}
          ${hasCert ? `
          <div class="section-title" style="margin-top:20px;">Certifications</div>
          ${certHTML}
          ` : ''}
        </div>
      </body>
      </html>
    `;
  }

  // 2. Centered/Minimal/Classic Layout
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Helvetica', 'Arial', sans-serif; color: #333; line-height: 1.5; font-size: 10pt; padding: 25px 35px; margin: 0; box-sizing: border-box; }
        .header { text-align: ${['centered', 'prism'].includes(layout) ? 'center' : 'left'}; margin-bottom: 20px; border-bottom: ${['classic', 'zinc'].includes(layout) ? `2px solid ${accent}` : 'none'}; padding-bottom: 12px; }
        h1 { font-size: 22pt; margin: 0 0 5px 0; color: #111; letter-spacing: 1px; ${layout === 'prism' ? `color: ${accent};` : ''} }
        .title { font-size: 11pt; font-weight: bold; color: ${accent}; margin-bottom: 8px; text-transform: uppercase; }
        .contact { font-size: 9pt; color: #666; }
        .contact span { margin: 0 6px; }
        .section-title { font-size: 11.5pt; font-weight: bold; border-bottom: 1.5px solid #ccc; padding-bottom: 3px; margin-top: 20px; margin-bottom: 10px; text-transform: uppercase; color: #111; position: relative; }
        .section-title::after { content: ''; position: absolute; left: 0; bottom: -1.5px; height: 1.5px; width: 40px; background: ${accent}; }
        .summary p { margin: 0; font-size: 9.5pt; }
        .exp-item { margin-bottom: 15px; }
        .exp-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; flex-wrap: wrap; }
        .exp-role { font-weight: bold; font-size: 10.5pt; color: #222; }
        .exp-company { font-style: italic; color: #555; }
        .exp-date { font-size: 9pt; color: #666; font-weight: bold; }
        ul { margin: 0; padding-left: 20px; font-size: 9.5pt; }
        li { margin-bottom: 4px; }
        .skills-list span { display: inline-block; background: #f0f0f0; padding: 4px 8px; margin: 3px; border-radius: 12px; font-size: 9pt; color: #333; border: 1px solid #ddd; }
        .edu-item { margin-bottom: 8px; }
        .edu-header { display: flex; justify-content: space-between; align-items: baseline; }
        .edu-degree { font-weight: bold; font-size: 10pt; }
        .edu-college { font-style: italic; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${name || 'Candidate Name'}</h1>
        <div class="title">${title || 'Job Title'}</div>
        <div class="contact">
          ${email ? `<span>${email}</span>` : ''}
          ${phone ? `<span>${phone}</span>` : ''}
          ${location ? `<span>${location}</span>` : ''}
          ${linkedin ? `<span>${linkedin}</span>` : ''}
        </div>
      </div>

      ${hasSummary ? `
      <div class="section">
        <div class="section-title">Professional Summary</div>
        <div class="summary"><p>${summary}</p></div>
      </div>
      ` : ''}

      ${hasExp ? `
      <div class="section">
        <div class="section-title">Professional Experience</div>
        ${expHTML}
      </div>
      ` : ''}

      ${hasProj ? `
      <div class="section">
        <div class="section-title">Projects</div>
        ${projHTML}
      </div>
      ` : ''}

      ${hasSkills ? `
      <div class="section">
        <div class="section-title">Skills & Competencies</div>
        <div class="skills-list">
          ${skillListHTML}
        </div>
      </div>
      ` : ''}

      ${hasEdu ? `
      <div class="section">
        <div class="section-title">Education</div>
        ${eduHTML}
      </div>
      ` : ''}

      ${hasCert ? `
      <div class="section">
        <div class="section-title">Certifications</div>
        ${certHTML}
      </div>
      ` : ''}

      ${hasLang ? `
      <div class="section">
        <div class="section-title">Languages</div>
        <div>${langHTML}</div>
      </div>
      ` : ''}
    </body>
    </html>
  `;
};

const buildCoverLetterHTML = (data) => {
  const { name, email, phone, date, paragraphs } = data;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Georgia', 'Times New Roman', serif; color: #333; line-height: 1.6; font-size: 11pt; }
        .header { margin-bottom: 30px; border-bottom: 1px solid #ccc; padding-bottom: 10px; }
        h1 { font-family: 'Helvetica', 'Arial', sans-serif; font-size: 22pt; margin: 0 0 5px 0; color: #111; letter-spacing: 1px; }
        .contact { font-family: 'Helvetica', 'Arial', sans-serif; font-size: 10pt; color: #666; }
        .contact span { margin-right: 15px; }
        .date { margin-bottom: 20px; font-weight: bold; }
        p { margin-bottom: 15px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${name || 'Candidate Name'}</h1>
        <div class="contact">
          ${email ? `<span>${email}</span>` : ''}
          ${phone ? `<span>${phone}</span>` : ''}
        </div>
      </div>

      <div class="date">${date || new Date().toLocaleDateString()}</div>
      
      <div class="content">
        ${(paragraphs || []).map(p => `<p>${p}</p>`).join('')}
      </div>
    </body>
    </html>
  `;
};

module.exports = {
  generatePDF,
  buildResumeHTML,
  buildCoverLetterHTML
};
