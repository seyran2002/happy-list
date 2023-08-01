import Vue from 'vue';

const showErrorsWithSnotify = errors => {
  Object.keys(errors).forEach(error => {
    for (let i = 0; i < errors[error].length; i++) {
      Vue.$snotify.error(errors[error][i], '', {
        timeout: -1,
        showProgressBar: true,
      });
    }
  });
};

export default showErrorsWithSnotify;
