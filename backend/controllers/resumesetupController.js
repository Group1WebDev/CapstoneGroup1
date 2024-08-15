const path = require('path');
const htmlTopdf = require('html-pdf');
const resumePDF = require('../resume_download.js');
const resumeModel = require('../models/resumeModel.js');

const createPDF = async (req, res) => {
  htmlTopdf.create(resumePDF(req.body), {}).toFile('resume.pdf', async (err) => {
    if (err) {
      res.status(400).json({ message: 'err 53 Line Pdf' });
    } else {
      const data = new resumeModel(req.body);
      await data.save();
      res.status(200).json({ message: 'resume created' });
    }
  });
};

const getResume = async (req, res) => {
  const resumeGet = path.join(__dirname, '../resume.pdf');
  res.sendFile(resumeGet);
};

module.exports = { createPDF, getResume };
