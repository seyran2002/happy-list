// eslint-disable-next-line prefer-const
let instances = [];

function onDocumentClick(e, el, fn) {
  // eslint-disable-next-line prefer-const
  let { target } = e;
  if (el !== target && !el.contains(target)) {
    fn(e);
  }
}

export default {
  bind(el, binding) {
    // add the index to element data attributes
    el.dataset.outsideClickIndex = instances.length;

    const fn = binding.value;
    // eslint-disable-next-line func-names
    const click = function (e) {
      onDocumentClick(e, el, fn);
    };

    document.addEventListener('click', click);
    document.addEventListener('touchstart', click);
    instances.push(click);
  },
  unbind(el) {
    const index = el.dataset.outsideClickIndex;
    const handler = instances[index];
    document.removeEventListener('click', handler);
    document.removeEventListener('touchstart', handler);
    instances.splice(index, 1);
  },
};
