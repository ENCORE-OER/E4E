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
const GEN_LESSON_PLAN_URL =
  process.env.GEN_LESSON_PLAN_URL || 'https://skapi-giunti.polyglot-edu.com';
const ENCORE_OERS_DB =
  process.env.ENCORE_OERS_DB || 'https://encore-db.grial.eu';
const ENCORE_API_URL =
  process.env.ENCORE_API_URL || 'https://encore-api.polyglot-edu.com';

// TODO: remove these variables and set them on GitHub Env as a Secret (Update also the pipeline)
// At the moment these variables are visible from frontend if someone inspects the browser.
const SK_API_KEY = process.env.SK_API_KEY;
const SETUP_MODEL = '{"secretKey": "' + process.env.OPENAI_SECRETKEY + '","modelName": "gpt35Turbo","endpoint": "https://ai4edu.openai.azure.com/"}';
const SETUP_MODEL_LESSON_PLAN =  '{"secretKey": "' + process.env.OPENAI_SECRETKEY + '","modelName": "GPT-4o-MINI","endpoint": "https://ai4edu.openai.azure.com/"}';

module.exports = {
  env: {
    CURRENT_HOST: CURRENT_HOST,
    BACK_URL: BACK_URL,
    POLYGLOT_URL: POLYGLOT_URL,
    POLYGLOT_DASHBOARD: POLYGLOT_DASHBOARD,
    CONCEPT_URL: CONCEPT_URL,
    GENERATIVE_AI_URL: GENERATIVE_AI_URL,
    GEN_LESSON_PLAN_URL: GEN_LESSON_PLAN_URL,
    ENCORE_OERS_DB: ENCORE_OERS_DB,
    ENCORE_API_URL: ENCORE_API_URL,
    SK_API_KEY: SK_API_KEY,
    SETUP_MODEL: SETUP_MODEL,
    SETUP_MODEL_LESSON_PLAN: SETUP_MODEL_LESSON_PLAN,
  },
};
