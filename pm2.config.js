const BASE_ENV = {
  NODE_ENV: 'development',
  POSTGRESS_HOST: '0.0.0.0',
  POSTGRESS_PORT: 5432,
  POSTGRESS_USER: 'user',
  POSTGRESS_PASS: 'password',
  POSTGRESS_DB: 'MOTOR_INSURANCE_WEBSITE',
};

const API = {
  name: 'api',
  namespace: 'service',
  script: 'yarn nx run api:start',
  autorestart: true,
  restart_delay: 5000,
  watch: false,
  watch_delay: 5000,
  ignore_watch: ['coverage', '.vscode', 'docker', 'node_modules'],
  exec_mode: 'fork',
  env: BASE_ENV,
};

module.exports = {
  apps: [API],
};
