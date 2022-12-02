const diagnostics_channel = require("diagnostics_channel");
const BasicHelper = {
  handleQuery: ({
    name,
    dateOfBirth,
    email,
    gender,
    specialization, // for doctor
    jobType, // for employee
    diagnosis, // for patient
    password,//for admin
    limit,
    skip,
    sort,
  }) => {
    const filter = {};
    const options = {};

    if (name) {
      filter.name = name;
    }

    if (dateOfBirth) {
      filter.dateOfBirth = dateOfBirth;
    }

    if (email) {
      filter.email = email;
    }

    if (gender) {
      filter.gender = gender;
    }

    if (specialization) {
      filter.specialization = specialization;
    }

    if (jobType) {
      filter.jobType = jobType;
    }

    if (password) {
      filter.password = password;
    }

    if (diagnosis) {
      filter.diagnosis = diagnosis;
    }

    options.limit = +limit || 0;
    options.skip = +skip || 0;
    if (sort) {
      options.sort = sort;
    }

    return { filter, options };
  },
};

module.exports = BasicHelper.handleQuery;
