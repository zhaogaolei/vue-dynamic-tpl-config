module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    "plugin:vue/strongly-recommended",
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-unused-vars": [0, {"vars": "all", "args": "after-used"}],//2不能有声明后未被使用的变量或参数
    "no-useless-escape":'off',
    "vue/require-default-prop":0,
    'vue/max-attributes-per-line': [
      2,
      {
        'singleline': 5,
        'multiline': {
          'max': 1,
          'allowFirstLine': false
        }
      }
    ],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
