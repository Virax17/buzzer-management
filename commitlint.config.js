module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'refactor', 'perf', 'test', 'docs', 'chore', 'revert', 'style'],
    ],
    'subject-case': [0], // not enforced — acronyms and identifiers are naturally uppercase
    'header-max-length': [2, 'always', 100],
  },
};
