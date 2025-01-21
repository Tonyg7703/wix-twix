/** @type {import('lint-staged').Configuration} */
export default {
  '*.{js,ts,jsx,tsx}': ['prettier --write' /*, 'eslint --fix' */],
};
