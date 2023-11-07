/**
 * API Config 
 */
const DEV_API_CONFIG = {
  protocol: "http",
  host: "localhost",
  port: 3080,
}

const PROD_API_CONFIG = {
  protocol: "https",
  host: "api.socialcap.app",
  port: 443,
}

export const API_CONFIG = PROD_API_CONFIG;
