/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

const CURRENT_HOST = process.env.DEPLOY_URL ?? 'http://localhost:3000';
const BACK_URL = process.env.BACK_URL || 'http://localhost:5000';

const CONCEPT_URL =
  process.env.CONCEPT_URL || 'https://concept.polyglot-edu.com';
const POLYGLOT_URL =
  //process.env.POLYGLOT_URL || 'https://polyglot-api.polyglot-edu.com';
  process.env.POLYGLOT_URL || 'https://polyglot-api-staging.polyglot-edu.com';
const POLYGLOT_DASHBOARD =
  process.env.POLYGLOT_DASHBOARD || 'https://staging.polyglot-edu.com/';
const GENERATIVE_AI_URL =
  process.env.GENERATIVE_AI_URL || 'https://skapi.polyglot-edu.com';

module.exports = {
  env: {
    CURRENT_HOST: CURRENT_HOST,
    BACK_URL: BACK_URL,
    POLYGLOT_URL: POLYGLOT_URL,
    POLYGLOT_DASHBOARD: POLYGLOT_DASHBOARD,
    CONCEPT_URL: CONCEPT_URL,
    GENERATIVE_AI_URL: GENERATIVE_AI_URL,
  },
};
