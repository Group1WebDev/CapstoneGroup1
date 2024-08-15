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
  const allowedUpdates = ['jobTitle', 'jobCategory', 'jobType', 'experienceLevel', 'minSalary', 'maxSalary', 'languageRequirement', 'jobDescription', 'addressLine', 'city', 'province', 'country', 'jobStatus', 'jobVacancies', 'jobApplications'];
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

const getJobsPostedByEmployer = async (req, res) => {
  const { id } = req.params;
  try {
    // fetching jobs of employer with applicants data
    // populate will show full detail of user inside user_id instead of id only
    const employerJobs = await JobPosting.find({ posted_by: id }).populate('applied_by.userId');

    res.status(200).send(employerJobs);
  } catch (error) {
    res.status(500).send(error);
  }
};

// apply for new job
const applyToJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const { totalExp, resume, userCoverL, userId } = req.body;
    const newApplicant = {
      expYears: Number(totalExp),
      resume: 'https://group-1-capstone.onrender.com/profiles/' + req.file.filename,
      coverLetter: userCoverL,
      userId: userId,
    };
    console.log(newApplicant);
    const applyJob = await JobPosting.findByIdAndUpdate(
      // find job by id
      { _id: jobId },

      // push details inside applied_by array and incrementing job application
      { $push: { applied_by: newApplicant }, $inc: { jobApplications: 1 } }
    );
    res.status(200).json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

module.exports = {
  createJobPosting,
  getJobPostings,
  getJobPostingById,
  updateJobPosting,
  deleteJobPosting,
  getJobsPostedByEmployer,
  applyToJob,
};
