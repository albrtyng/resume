export const getFocusableElements = (
  parentElement: HTMLElement,
): HTMLElement[] => {
  const focusableElements =
    'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const elements =
    parentElement.querySelectorAll<HTMLElement>(focusableElements);
  let focusable: HTMLElement[] = [];

  [].forEach.call(elements, function (el) {
    focusable.push(el);
  });

  return focusable.filter(
    (el: HTMLElement) => !(el as HTMLInputElement).disabled,
  );
};
