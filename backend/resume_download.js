const moment = require('moment');

module.exports = (resumeData) => {
  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>Test</title>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
          <style>

          .dateAndInfo {
            background:red;
            width:100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .print-page {
              font-family: 'Poppins', sans-serif;

    width: 100%;
    padding: 6mm;
    background: white;
    box-sizing: border-box;
    transform-origin: top left;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
    font-size: 12px;
}

.print-page p {
    color: #222 !important;
}
           p {
    line-height: 20px !important;
}

.head {
    text-align: center;
}

.head .full_name {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 8px;
}

.head .job_title {
    font-size: 12px;
}

.head .basic_info_line {
    font-size: 12px;
    margin-top: 12px;
}

.professional_summary {
    font-size: 12px;
    margin-top: 28px;
}

.section_title {
    font-weight: 600;
    border-bottom: 1px solid #222;
    padding-bottom: 8px;
    margin-bottom: 8px;
}

.section {
    margin-top: 18px;
}

.section ul {
    padding: 8px 0 0 8px;
}

ul {
    list-style: disc;
}

li {
    line-height: 18px !important;
}

.section-loop {
    margin-bottom: 14px;
}

.skills ul {
    padding-top: 0 !important;
}
          </style>
       </head>
       <body>
           <div class='print-page'>
    <div class='head'>
      <div class='full_name'>
        ${resumeData.first_name} ${resumeData.last_name}
      </div>
      <div class='job_title'>${resumeData.job_title}</div>
      <div class='basic_info_line'>
        ${resumeData.address}
        ${resumeData.phone ? ' | ' + resumeData.phone : ''} 
        ${resumeData.email ? ' | ' + resumeData.email : ''}
      </div>
    </div>
    <div class='professional_summary'>
      ${resumeData.professional_summary ? resumeData.professional_summary : ''}
    </div>
    <div class='work_experience section'>
      <div class='section_title'>WORK EXPERIENCE</div>
      ${
        resumeData.work_experience
          ? resumeData.work_experience
              .map(
                (data, index) => `
                  <div class='section-loop' key='${index}'>
                    <div class='dateAndInfo'>
                      <div><b>${data.position_title} - ${data.company_name}</b>, ${data.city}, ${data.country}</div>
                      <div>
                        ${data.start_date ? moment(data.start_date).format('ll') : ''} 
                        ${data.end_date ? ' - ' + moment(data.end_date).format('ll') : ''}
                      </div>
                    </div>
                    <div>${data.work_summary ? data.work_summary : ''}</div>
                  </div>`
              )
              .join('')
          : ''
      }
    </div>
    <div class='education section'>
      <div class='section_title'>Education</div>
      ${
        resumeData.education
          ? resumeData.education
              .map(
                (data, index) => `
                  <div class='section-loop' key='${index}'>
                    <div class='dateAndInfo'>
                      <div><b>${data.school_name}, ${data.degree}</b> | ${data.school_location}</div>
                      <div>
                        ${data.start_date ? moment(data.start_date).format('ll') : ''} 
                        ${data.end_date ? ' - ' + moment(data.end_date).format('ll') : ''}
                      </div>
                    </div>
                    <div>${data.description ? data.description : ''}</div>
                  </div>`
              )
              .join('')
          : ''
      }
          </div>
            <div class='skills section'>
              <div class='section_title'>Key Skills</div>
              <div class='section-loop'>
                <div>${resumeData.key_skills ? resumeData.key_skills : ''}</div>
              </div>
            </div>
          </div>
       </body>
    </html>
  `;
};
