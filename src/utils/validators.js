export const phoneOrEmailRule = {
  validate(value) {
    const MOBILEREG =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PHONEREG = /^(\+374)+(41|43|44|49|55|77|91|93|94|95|96|98|99|33)+\d{6}\b/;
    return PHONEREG.test(value) || MOBILEREG.test(value);
  },
};

export const dateFormat = {
  validate(value) {
    const dateRule = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/;
    return dateRule.test(value);
  },
};

export const timeFormat = {
  validate(value) {
    const timeRule = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
    return timeRule.test(value);
  },
};
