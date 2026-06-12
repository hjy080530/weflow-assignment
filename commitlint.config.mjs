const headerPattern = /^(\w+)(?:\(([\w/-]+)\))?!?:([^\s].+)$/

/** @type {import('@commitlint/types').UserConfig} */
const config = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'style', 'refactor', 'chore', 'docs', 'test', 'build', 'ci', 'perf', 'revert'],
    ],
    'scope-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-case': [0],
  },
  helpUrl: 'https://www.conventionalcommits.org/ko/v1.0.0/',
}

export default config
