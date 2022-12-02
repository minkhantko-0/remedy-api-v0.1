const Helper = {
  handleQuery: ({ doctor, patient, status, handled_by, limit, skip, sort }) => {
    const filter = {};
    const options = {};

    if (doctor) {
      filter.doctor = doctor;
    }

    if (patient) {
      filter.patient = patient;
    }

    if (status) {
      filter.status = status;
    }

    if (handled_by) {
      filter.handled_by = handled_by;
    }

    options.limit = +limit || 0;
    options.skip = +skip || 0;
    if (sort) {
      options.sort = sort;
    }

    return { filter, options };
  },
};

module.exports = Helper.handleQuery;
