(() => {
  const circleDiv = document.getElementById("circleDiv");
  const circleFront = document.querySelector(".progress-ring__circleFront");

  const radius = circleFront.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  circleFront.style.strokeDasharray = circumference;
  circleFront.style.strokeDashoffset = circumference;

  const state = {
    value: 0,
    animate: false,
    hidden: false,
  };

  const listeners = new Set();

  const emit = () => {
    listeners.forEach((fn) => fn({ ...state }));
  };

  const subscribe = (fn) => {
    listeners.add(fn);
    fn({ ...state });
    return () => listeners.delete(fn);
  };


  const setValue = (value) => {
    state.value = Math.min(Math.max(0, value), 100);

    const offset =
      circumference - (state.value / 100) * circumference;

    circleFront.style.strokeDashoffset = offset;
    emit();
  };

  const setAnimate = (flag) => {
    state.animate = Boolean(flag);
    circleFront.style.animation = flag
      ? "spin 2s linear infinite"
      : "";
    emit();
  };

  const setHidden = (flag) => {
    state.hidden = Boolean(flag);
    circleDiv.style.display = flag ? "none" : "block";
    emit();
  };

  window.Progress = {
    setValue,
    setAnimate,
    setHidden,
    getState: () => ({ ...state }),
    subscribe,
  };
})();
