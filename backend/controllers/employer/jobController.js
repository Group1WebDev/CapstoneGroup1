const JobPosting = require('../../models/jobPostingModel');

// create
const createJobPosting = async (req, res) => {
  try {
    const jobPosting = new JobPosting(req.body);
    await jobPosting.save();
    res.status(201).send(jobPosting);
  } catch (error) {
    res.status(400).send(error);
  }
};

// get all jobs
const getJobPostings = async (req, res) => {
  try {
    const jobPostings = await JobPosting.find({});
    res.status(200).send(jobPostings);
  } catch (error) {
    res.status(500).send(error);
  }
};

// get job by id
const getJobPostingById = async (req, res) => {
  try {
    const jobPosting = await JobPosting.findById(req.params.id);
    if (!jobPosting) {
      return res.status(404).send();
    }
    res.status(200).send(jobPosting);
  } catch (error) {
    res.status(500).send(error);
  }
};

// update job
const updateJobPosting = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['jobTitle', 'jobCategory', 'jobType', 'experienceLevel', 'minSalary', 'maxSalary', 'languageRequirement', 'jobDescription', 'addressLine', 'city', 'province', 'country'];
  const allCheck = updates.every((update) => allowedUpdates.includes(update));

  if (!allCheck) {
    return res.status(400).send({ error: 'err update, all field require' });
  }

  try {
    const jobPosting = await JobPosting.findById(req.params.id);

    if (!jobPosting) {
      return res.status(404).send();
    }

    updates.forEach((update) => (jobPosting[update] = req.body[update]));
    await jobPosting.save();
    res.status(200).send(jobPosting);
  } catch (error) {
    res.status(400).send(error);
  }
};

// delete job
const deleteJobPosting = async (req, res) => {
  try {
    const jobPosting = await JobPosting.findByIdAndDelete(req.params.id);

    if (!jobPosting) {
      return res.status(404).send();
    }

    res.status(200).send(jobPosting);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createJobPosting,
  getJobPostings,
  getJobPostingById,
  updateJobPosting,
  deleteJobPosting,
};