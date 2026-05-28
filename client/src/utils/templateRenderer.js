export const buildResumeHTML = (data, layout = 'classic', accent = '#60A5FA') => {
  const { contacts = {}, experience = [], education = [], projects = [], certifications = [], languages = [], skills = [], summary = "" } = data || {};
  
  const name = [contacts.firstName, contacts.lastName].filter(Boolean).join(" ");
  const title = contacts.jobTitle;
  const email = contacts.email;
  const phone = contacts.phone;
  const location = data.location || "";
  const linkedin = data.linkedin || "";

  const hasSkills = skills && skills.length > 0;
  const hasExp = experience && experience.length > 0;
  const hasEdu = education && education.length > 0;
  const hasProj = projects && projects.length > 0;
  const hasCert = certifications && certifications.length > 0;
  const hasLang = languages && languages.length > 0;
  const hasSummary = !!summary;

  const fontImports = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:wght@400;700&family=Roboto:wght@400;500;700&display=swap');
  `;

  // ────────────────────────────────────────────────────────
  // 1. CLASSIC PROFESSIONAL (Traditional Top-to-Bottom)
  // ────────────────────────────────────────────────────────
  if (layout === 'classic') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          ${fontImports}
          body { font-family: 'Merriweather', serif; color: #111; line-height: 1.5; font-size: 10pt; padding: 30px 40px; margin: 0; box-sizing: border-box; background: #fff; }
          .header { text-align: center; border-bottom: 2px solid #222; padding-bottom: 15px; margin-bottom: 20px; }
          h1 { font-family: 'Inter', sans-serif; font-size: 24pt; margin: 0 0 5px 0; color: #000; letter-spacing: 1px; text-transform: uppercase; }
          .title { font-size: 11pt; color: #444; margin-bottom: 8px; font-weight: bold; }
          .contact { font-family: 'Inter', sans-serif; font-size: 9pt; color: #555; }
          .contact span { margin: 0 6px; }
          .section-title { font-family: 'Inter', sans-serif; font-size: 12pt; font-weight: 700; border-bottom: 1px solid #ccc; padding-bottom: 4px; margin-top: 22px; margin-bottom: 12px; text-transform: uppercase; color: #000; }
          .summary { font-size: 10pt; text-align: justify; }
          .item-block { margin-bottom: 14px; }
          .item-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px; }
          .role { font-weight: 700; font-size: 11pt; color: #111; }
          .company { font-style: italic; color: #333; font-size: 10.5pt; }
          .date { font-family: 'Inter', sans-serif; font-size: 9pt; font-weight: 600; color: #555; }
          ul { margin: 4px 0 0; padding-left: 18px; font-size: 9.5pt; }
          li { margin-bottom: 4px; text-align: justify; }
          .skills { font-family: 'Inter', sans-serif; font-size: 9.5pt; line-height: 1.6; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${name || 'Candidate Name'}</h1>
          ${title ? `<div class="title">${title}</div>` : ''}
          <div class="contact">
            ${email ? `<span>${email}</span>` : ''}
            ${phone ? `<span>|</span><span>${phone}</span>` : ''}
            ${location ? `<span>|</span><span>${location}</span>` : ''}
            ${linkedin ? `<span>|</span><span>${linkedin}</span>` : ''}
          </div>
        </div>

        ${hasSummary ? `<div class="section-title">Professional Summary</div><div class="summary">${summary}</div>` : ''}

        ${hasExp ? `<div class="section-title">Professional Experience</div>
          ${experience.map(e => `
            <div class="item-block">
              <div class="item-header">
                <div><span class="role">${e.role}</span> <span class="company">| ${e.company}</span></div>
                <div class="date">${e.date || e.duration}</div>
              </div>
              ${e.description ? `<div>${e.description}</div>` : ''}
              ${e.bullets?.length ? `<ul>${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
            </div>
          `).join('')}
        ` : ''}

        ${hasProj ? `<div class="section-title">Projects</div>
          ${projects.map(p => `
            <div class="item-block">
              <div class="item-header">
                <div><span class="role">${p.name}</span> <span class="company">| ${p.tech}</span></div>
              </div>
              ${p.description ? `<div>${p.description}</div>` : ''}
            </div>
          `).join('')}
        ` : ''}

        ${hasEdu ? `<div class="section-title">Education</div>
          ${education.map(e => `
            <div class="item-block">
              <div class="item-header">
                <div><span class="role">${e.degree}</span> <span class="company">| ${e.college}</span></div>
                <div class="date">${e.year}</div>
              </div>
            </div>
          `).join('')}
        ` : ''}

        ${hasCert ? `<div class="section-title">Certifications</div>
          ${certifications.map(c => `
            <div class="item-block">
              <div class="item-header">
                <div><span class="role">${c.name}</span> <span class="company">| ${c.issuer}</span></div>
                <div class="date">${c.year}</div>
              </div>
            </div>
          `).join('')}
        ` : ''}

        ${hasSkills ? `<div class="section-title">Skills</div><div class="skills">${skills.join(' • ')}</div>` : ''}
        ${hasLang ? `<div class="section-title">Languages</div><div class="skills">${languages.map(l => `${l.language} (${l.proficiency})`).join(' • ')}</div>` : ''}
      </body>
      </html>
    `;
  }

  // ────────────────────────────────────────────────────────
  // 2. MINIMALIST CLEAN (Spacious, Left Aligned)
  // ────────────────────────────────────────────────────────
  if (layout === 'minimal') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          ${fontImports}
          body { font-family: 'Inter', sans-serif; color: #333; line-height: 1.6; font-size: 10pt; padding: 40px 50px; margin: 0; box-sizing: border-box; }
          .header { margin-bottom: 30px; }
          h1 { font-size: 28pt; margin: 0 0 5px 0; color: ${accent}; font-weight: 300; letter-spacing: -1px; }
          .title { font-size: 12pt; color: #666; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; }
          .contact { font-size: 9pt; color: #888; display: flex; gap: 15px; flex-wrap: wrap; }
          .section-title { font-size: 10pt; font-weight: 600; color: ${accent}; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 30px; margin-bottom: 15px; }
          .item-block { margin-bottom: 20px; }
          .item-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
          .role { font-weight: 600; font-size: 11pt; color: #111; }
          .company { color: #555; font-size: 10pt; margin-left: 8px; }
          .date { font-size: 9pt; color: #999; }
          ul { margin: 8px 0 0; padding-left: 20px; font-size: 9.5pt; color: #444; }
          li { margin-bottom: 6px; }
          .skills { display: flex; flex-wrap: wrap; gap: 8px; }
          .skill-badge { background: #f4f4f5; color: #3f3f46; padding: 4px 10px; border-radius: 4px; font-size: 9pt; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${name || 'Candidate Name'}</h1>
          ${title ? `<div class="title">${title}</div>` : ''}
          <div class="contact">
            ${email ? `<span>${email}</span>` : ''}
            ${phone ? `<span>${phone}</span>` : ''}
            ${location ? `<span>${location}</span>` : ''}
            ${linkedin ? `<span>${linkedin}</span>` : ''}
          </div>
        </div>

        ${hasSummary ? `<div class="section-title">Summary</div><div style="font-size: 10pt; color: #444;">${summary}</div>` : ''}

        ${hasExp ? `<div class="section-title">Experience</div>
          ${experience.map(e => `
            <div class="item-block">
              <div class="item-header">
                <div><span class="role">${e.role}</span><span class="company">${e.company}</span></div>
                <div class="date">${e.date || e.duration}</div>
              </div>
              ${e.description ? `<div style="font-size: 9.5pt; color: #555;">${e.description}</div>` : ''}
              ${e.bullets?.length ? `<ul>${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
            </div>
          `).join('')}
        ` : ''}

        ${hasProj ? `<div class="section-title">Projects</div>
          ${projects.map(p => `
            <div class="item-block">
              <div class="item-header">
                <div><span class="role">${p.name}</span><span class="company">${p.tech}</span></div>
              </div>
              ${p.description ? `<div style="font-size: 9.5pt; color: #555;">${p.description}</div>` : ''}
            </div>
          `).join('')}
        ` : ''}

        ${hasEdu ? `<div class="section-title">Education</div>
          ${education.map(e => `
            <div class="item-block" style="margin-bottom: 10px;">
              <div class="item-header">
                <div><span class="role">${e.degree}</span><span class="company">${e.college}</span></div>
                <div class="date">${e.year}</div>
              </div>
            </div>
          `).join('')}
        ` : ''}

        ${hasCert ? `<div class="section-title">Certifications</div>
          ${certifications.map(c => `
            <div class="item-block" style="margin-bottom: 10px;">
              <div class="item-header">
                <div><span class="role">${c.name}</span><span class="company">${c.issuer}</span></div>
                <div class="date">${c.year}</div>
              </div>
            </div>
          `).join('')}
        ` : ''}

        ${hasSkills ? `<div class="section-title">Skills</div><div class="skills">${skills.map(s => `<span class="skill-badge">${s}</span>`).join('')}</div>` : ''}
        ${hasLang ? `<div class="section-title">Languages</div><div class="skills">${languages.map(l => `<span class="skill-badge">${l.language} (${l.proficiency})</span>`).join('')}</div>` : ''}
      </body>
      </html>
    `;
  }

  // ────────────────────────────────────────────────────────
  // 3. EXECUTIVE SIDEBAR (1/3 Colored Left, 2/3 White Right)
  // ────────────────────────────────────────────────────────
  if (layout === 'sidebar') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          ${fontImports}
          body { font-family: 'Roboto', sans-serif; margin: 0; display: flex; height: 100vh; font-size: 9.5pt; line-height: 1.5; color: #333; }
          .left { width: 32%; background: ${accent}; color: #fff; padding: 35px 25px; box-sizing: border-box; }
          .right { width: 68%; background: #fff; padding: 35px 30px; box-sizing: border-box; overflow-y: auto; }
          h1 { font-size: 22pt; margin: 0 0 5px 0; color: #fff; font-weight: 700; line-height: 1.1; }
          .title { font-size: 11pt; color: rgba(255,255,255,0.8); margin-bottom: 25px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; }
          .contact { margin-bottom: 30px; font-size: 9pt; }
          .contact div { margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
          .left-section-title { font-size: 11pt; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 5px; margin: 25px 0 15px; text-transform: uppercase; letter-spacing: 1px; }
          .right-section-title { font-size: 13pt; font-weight: 700; color: ${accent}; border-bottom: 2px solid #eee; padding-bottom: 5px; margin: 0 0 15px; text-transform: uppercase; }
          .item-block { margin-bottom: 18px; }
          .item-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
          .role { font-weight: 700; font-size: 11pt; color: #222; }
          .company { font-weight: 500; color: ${accent}; font-size: 10pt; }
          .date { font-size: 8.5pt; color: #888; font-weight: 500; }
          ul { margin: 6px 0 0; padding-left: 16px; color: #444; }
          li { margin-bottom: 4px; }
          .skill-pill { display: inline-block; background: rgba(255,255,255,0.15); padding: 5px 10px; margin: 0 4px 6px 0; border-radius: 20px; font-size: 8.5pt; }
        </style>
      </head>
      <body>
        <div class="left">
          <h1>${name || 'Candidate Name'}</h1>
          ${title ? `<div class="title">${title}</div>` : ''}
          
          <div class="left-section-title">Contact</div>
          <div class="contact">
            ${email ? `<div>✉ ${email}</div>` : ''}
            ${phone ? `<div>☏ ${phone}</div>` : ''}
            ${location ? `<div>📍 ${location}</div>` : ''}
            ${linkedin ? `<div>🔗 ${linkedin}</div>` : ''}
          </div>

          ${hasSkills ? `
            <div class="left-section-title">Skills</div>
            <div>${skills.map(s => `<span class="skill-pill">${s}</span>`).join('')}</div>
          ` : ''}

          ${hasLang ? `
            <div class="left-section-title">Languages</div>
            ${languages.map(l => `<div style="margin-bottom:6px; font-size:9pt;"><strong>${l.language}</strong><br><span style="opacity:0.8; font-size:8pt;">${l.proficiency}</span></div>`).join('')}
          ` : ''}
        </div>
        
        <div class="right">
          ${hasSummary ? `
            <div class="right-section-title">Profile</div>
            <div style="margin-bottom: 25px; text-align: justify;">${summary}</div>
          ` : ''}

          ${hasExp ? `
            <div class="right-section-title">Experience</div>
            ${experience.map(e => `
              <div class="item-block">
                <div class="item-header">
                  <div class="role">${e.role}</div>
                  <div class="date">${e.date || e.duration}</div>
                </div>
                <div class="company">${e.company}</div>
                ${e.description ? `<div style="margin-top:4px;">${e.description}</div>` : ''}
                ${e.bullets?.length ? `<ul>${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
              </div>
            `).join('')}
          ` : ''}

          ${hasProj ? `
            <div class="right-section-title">Projects</div>
            ${projects.map(p => `
              <div class="item-block">
                <div class="item-header">
                  <div class="role">${p.name}</div>
                </div>
                <div class="company">${p.tech}</div>
                ${p.description ? `<div style="margin-top:4px;">${p.description}</div>` : ''}
              </div>
            `).join('')}
          ` : ''}

          ${hasEdu ? `
            <div class="right-section-title">Education</div>
            ${education.map(e => `
              <div class="item-block" style="margin-bottom: 12px;">
                <div class="item-header">
                  <div class="role">${e.degree}</div>
                  <div class="date">${e.year}</div>
                </div>
                <div class="company">${e.college}</div>
              </div>
            `).join('')}
          ` : ''}

          ${hasCert ? `
            <div class="right-section-title">Certifications</div>
            ${certifications.map(c => `
              <div class="item-block" style="margin-bottom: 12px;">
                <div class="item-header">
                  <div class="role">${c.name}</div>
                  <div class="date">${c.year}</div>
                </div>
                <div class="company">${c.issuer}</div>
              </div>
            `).join('')}
          ` : ''}
        </div>
      </body>
      </html>
    `;
  }

  // ────────────────────────────────────────────────────────
  // 4. MODERN TWO-COLUMN (Top Header, 50/50 Split below)
  // ────────────────────────────────────────────────────────
  if (layout === 'two_column') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          ${fontImports}
          body { font-family: 'Inter', sans-serif; color: #222; line-height: 1.5; font-size: 9.5pt; margin: 0; box-sizing: border-box; }
          .header { background: #f8f9fa; padding: 35px 40px; border-bottom: 3px solid ${accent}; display: flex; justify-content: space-between; align-items: center; }
          h1 { font-size: 26pt; margin: 0 0 5px 0; color: #111; font-weight: 700; letter-spacing: -0.5px; }
          .title { font-size: 11.5pt; color: ${accent}; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
          .contact { text-align: right; font-size: 9pt; color: #555; }
          .contact div { margin-bottom: 3px; }
          .container { display: flex; padding: 30px 40px; gap: 30px; }
          .col-main { width: 60%; }
          .col-side { width: 40%; }
          .section-title { font-size: 12pt; font-weight: 700; color: #111; border-bottom: 2px solid #eaeaea; padding-bottom: 6px; margin-bottom: 15px; position: relative; text-transform: uppercase; letter-spacing: 0.5px; }
          .section-title::after { content: ''; position: absolute; left: 0; bottom: -2px; width: 30px; height: 2px; background: ${accent}; }
          .item-block { margin-bottom: 20px; }
          .role { font-weight: 700; font-size: 10.5pt; color: #111; }
          .company { font-weight: 500; color: #555; font-size: 9.5pt; }
          .date { font-size: 8.5pt; color: ${accent}; font-weight: 600; margin-bottom: 4px; display: block; }
          ul { margin: 6px 0 0; padding-left: 18px; color: #444; }
          li { margin-bottom: 4px; }
          .skill-item { display: flex; justify-content: space-between; border-bottom: 1px solid #f0f0f0; padding: 6px 0; }
          .skill-item:last-child { border: none; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1>${name || 'Candidate Name'}</h1>
            ${title ? `<div class="title">${title}</div>` : ''}
          </div>
          <div class="contact">
            ${email ? `<div>${email}</div>` : ''}
            ${phone ? `<div>${phone}</div>` : ''}
            ${location ? `<div>${location}</div>` : ''}
            ${linkedin ? `<div>${linkedin}</div>` : ''}
          </div>
        </div>

        <div class="container">
          <div class="col-main">
            ${hasSummary ? `
              <div class="section-title">Summary</div>
              <div style="margin-bottom: 30px; text-align: justify;">${summary}</div>
            ` : ''}

            ${hasExp ? `
              <div class="section-title">Experience</div>
              ${experience.map(e => `
                <div class="item-block">
                  <div class="role">${e.role}</div>
                  <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                    <span class="company">${e.company}</span>
                    <span class="date">${e.date || e.duration}</span>
                  </div>
                  ${e.description ? `<div>${e.description}</div>` : ''}
                  ${e.bullets?.length ? `<ul>${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
                </div>
              `).join('')}
            ` : ''}

            ${hasProj ? `
              <div class="section-title">Projects</div>
              ${projects.map(p => `
                <div class="item-block">
                  <div class="role">${p.name}</div>
                  <div class="company" style="margin-bottom:4px;">${p.tech}</div>
                  ${p.description ? `<div>${p.description}</div>` : ''}
                </div>
              `).join('')}
            ` : ''}
          </div>

          <div class="col-side">
            ${hasSkills ? `
              <div class="section-title">Skills</div>
              <div style="margin-bottom: 30px;">
                ${skills.map(s => `<div class="skill-item"><strong>${s}</strong></div>`).join('')}
              </div>
            ` : ''}

            ${hasEdu ? `
              <div class="section-title">Education</div>
              <div style="margin-bottom: 30px;">
                ${education.map(e => `
                  <div class="item-block" style="margin-bottom: 12px;">
                    <div class="role">${e.degree}</div>
                    <div class="company">${e.college}</div>
                    <div class="date" style="margin-top:2px;">${e.year}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${hasCert ? `
              <div class="section-title">Certifications</div>
              <div style="margin-bottom: 30px;">
                ${certifications.map(c => `
                  <div class="item-block" style="margin-bottom: 12px;">
                    <div class="role">${c.name}</div>
                    <div class="company">${c.issuer}</div>
                    <div class="date" style="margin-top:2px;">${c.year}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${hasLang ? `
              <div class="section-title">Languages</div>
              <div style="margin-bottom: 30px;">
                ${languages.map(l => `
                  <div class="skill-item">
                    <strong>${l.language}</strong>
                    <span style="color:#666; font-size:8.5pt;">${l.proficiency}</span>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ────────────────────────────────────────────────────────
  // 5. CORPORATE BOLD (Grid layout with distinct colored header box)
  // ────────────────────────────────────────────────────────
  if (layout === 'corporate') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          ${fontImports}
          body { font-family: 'Roboto', sans-serif; color: #111; line-height: 1.5; font-size: 9.5pt; margin: 0; padding: 25px 30px; box-sizing: border-box; }
          .header-box { background: ${accent}; color: #fff; padding: 25px 30px; border-radius: 4px; margin-bottom: 25px; }
          h1 { font-size: 26pt; margin: 0 0 5px 0; color: #fff; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
          .title { font-size: 12pt; color: rgba(255,255,255,0.9); font-weight: 500; letter-spacing: 2px; text-transform: uppercase; }
          .contact-bar { display: flex; flex-wrap: wrap; gap: 20px; margin-top: 15px; font-size: 9pt; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 12px; }
          .section-title { font-size: 11pt; font-weight: 700; color: ${accent}; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; }
          .section-title::after { content: ''; flex: 1; height: 1px; background: #ddd; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; }
          .item-block { margin-bottom: 15px; }
          .item-header { display: flex; justify-content: space-between; align-items: baseline; }
          .role { font-weight: 700; font-size: 10.5pt; color: #111; }
          .company { font-weight: 500; color: #444; font-size: 9.5pt; }
          .date { font-size: 8.5pt; color: #777; font-weight: bold; background: #f4f4f4; padding: 2px 8px; border-radius: 4px; }
          ul { margin: 6px 0 0; padding-left: 18px; color: #333; }
          li { margin-bottom: 4px; }
          .skills-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
          .skill-tag { border: 1px solid #ccc; padding: 4px 10px; border-radius: 2px; font-size: 8.5pt; color: #333; font-weight: 500; }
        </style>
      </head>
      <body>
        <div class="header-box">
          <h1>${name || 'Candidate Name'}</h1>
          ${title ? `<div class="title">${title}</div>` : ''}
          <div class="contact-bar">
            ${email ? `<span>✉ ${email}</span>` : ''}
            ${phone ? `<span>☏ ${phone}</span>` : ''}
            ${location ? `<span>📍 ${location}</span>` : ''}
            ${linkedin ? `<span>🔗 ${linkedin}</span>` : ''}
          </div>
        </div>

        ${hasSummary ? `
          <div class="section-title">Summary</div>
          <div style="margin-bottom: 25px; text-align: justify; font-size: 10pt;">${summary}</div>
        ` : ''}

        <div class="section-title">Experience</div>
        ${experience.map(e => `
          <div class="item-block">
            <div class="item-header">
              <div><span class="role">${e.role}</span> <span class="company">| ${e.company}</span></div>
              <div class="date">${e.date || e.duration}</div>
            </div>
            ${e.description ? `<div style="margin-top:4px;">${e.description}</div>` : ''}
            ${e.bullets?.length ? `<ul>${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
          </div>
        `).join('')}

        <div class="grid" style="margin-top: 25px;">
          <div>
            ${hasEdu ? `
              <div class="section-title">Education</div>
              ${education.map(e => `
                <div class="item-block">
                  <div class="item-header">
                    <div><div class="role">${e.degree}</div><div class="company">${e.college}</div></div>
                    <div class="date">${e.year}</div>
                  </div>
                </div>
              `).join('')}
            ` : ''}

            ${hasCert ? `
              <div class="section-title">Certifications</div>
              ${certifications.map(c => `
                <div class="item-block">
                  <div class="item-header">
                    <div><div class="role">${c.name}</div><div class="company">${c.issuer}</div></div>
                    <div class="date">${c.year}</div>
                  </div>
                </div>
              `).join('')}
            ` : ''}
          </div>

          <div>
            ${hasProj ? `
              <div class="section-title">Projects</div>
              ${projects.map(p => `
                <div class="item-block">
                  <div class="role">${p.name} <span class="company">| ${p.tech}</span></div>
                  ${p.description ? `<div style="margin-top:2px;">${p.description}</div>` : ''}
                </div>
              `).join('')}
            ` : ''}

            ${hasSkills ? `
              <div class="section-title">Skills</div>
              <div class="skills-wrap" style="margin-bottom: 20px;">
                ${skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
              </div>
            ` : ''}

            ${hasLang ? `
              <div class="section-title">Languages</div>
              <div class="skills-wrap">
                ${languages.map(l => `<span class="skill-tag">${l.language} (${l.proficiency})</span>`).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Fallback to classic if layout matches none
  return `<div>Template Layout Error</div>`;
};
