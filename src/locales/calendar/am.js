/* eslint no-use-before-define: 0 */ // --> OFF
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory(require('vue2-datepicker')))
    : typeof define === 'function' && define.amd
    ? define(['vue2-datepicker'], factory)
    : ((global = global || self),
      ((global.DatePicker = global.DatePicker || {}),
      (global.DatePicker.lang = global.DatePicker.lang || {}),
      (global.DatePicker.lang.am = factory(global.DatePicker))));
})(this, DatePicker => {
  DatePicker = DatePicker && DatePicker.hasOwnProperty('default') ? DatePicker.default : DatePicker;

  function unwrapExports(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
  }

  function createCommonjsModule(fn, module) {
    return (module = { exports: {} }), fn(module, module.exports), module.exports;
  }

  const am = createCommonjsModule((module, exports) => {
    Object.defineProperty(exports, '__esModule', {
      value: true,
    });
    exports.default = void 0;
    const locale = {
      months: [
        'հունվար',
        'փետրվար',
        'մարտ',
        'ապրիլ',
        'մայիս',
        'հունիս',
        'հուլիս',
        'օգոստոս',
        'սեպտեմբեր',
        'հոկտեմբեր',
        'նոյեմբեր',
        'դեկտեմբեր',
      ],
      monthsShort: [
        'հունվ.',
        'փետր.',
        'մարտ',
        'ապր.',
        'մայիս',
        'հուն.',
        'հուլ.',
        'օգոստ.',
        'սեպտ.',
        'հոկ.',
        'նոյ.',
        'դեկ.',
      ],
      weekdays: ['կիրակի', 'երկուշաբթի', 'երեքշաբթի', 'չորեքշաբթի', 'հինգշաբթի', 'ուրբաթ', 'շաբաթ'],
      weekdaysShort: ['կիր.', 'երկ.', 'երեք.', 'չոր.', 'հինգ.', 'ուրբ.', 'շաբ.'],
      weekdaysMin: ['կի', 'երկ', 'երք', 'չրք', 'հշբթ', 'ուրբ', 'շբթ'],
      firstDayOfWeek: 1,
      firstWeekContainsDate: 1,
    };
    const _default = locale;
    exports.default = _default;
    module.exports = exports.default;
  });

  const am$1 = unwrapExports(am);

  const lang = {
    formatLocale: am$1,
    yearFormat: 'YYYY',
    monthFormat: 'MMM',
    monthBeforeYear: true,
  };
  DatePicker.locale('am', lang);

  return lang;
});
