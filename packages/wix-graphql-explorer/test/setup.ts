import "@testing-library/jest-dom/vitest";

/**
 * This is a fix needed for running CodeMirror (used by GraphiQL) in JSDOM.
 * See https://github.com/jsdom/jsdom/issues/3002#issuecomment-655748833
 */
document.createRange = () => {
  const range = new Range();

  // @ts-expect-error
  range.getBoundingClientRect = () => {};

  // @ts-expect-error
  range.getClientRects = () => ({
    item: () => null,
    length: 0,
  });

  return range;
};
