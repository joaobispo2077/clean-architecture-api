module.exports = {
  "*.ts": [
    "eslint --fix",
    "npm run test:staged --pasWithNoTests"
  ]
};
