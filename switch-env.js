#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'frontend', 'config.js');

function switchEnvironment(env) {
  if (!['local', 'production'].includes(env)) {
    console.log('❌ Invalid environment. Use "local" or "production"');
    console.log('Usage: node switch-env.js <local|production>');
    return;
  }

  let configContent;
  
  if (env === 'local') {
    configContent = `// Configuration for API endpoints - LOCAL MODE
export const API_BASE_URL = 'http://localhost:5000';
console.log('🌍 Switched to LOCAL backend: http://localhost:5000');`;
  } else {
    configContent = `// Configuration for API endpoints - PRODUCTION MODE
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://shareboard-backend.onrender.com' // Your Render backend URL
  : 'http://localhost:5000';
console.log('🌍 Switched to PRODUCTION backend: https://shareboard-backend.onrender.com');`;
  }

  try {
    fs.writeFileSync(configPath, configContent);
    console.log(`✅ Successfully switched to ${env.toUpperCase()} mode!`);
    console.log(`📁 Updated: ${configPath}`);
    
    if (env === 'local') {
      console.log('\n🚀 To start local development:');
      console.log('   Terminal 1: cd backend && npm run dev');
      console.log('   Terminal 2: cd frontend && npm run dev');
    } else {
      console.log('\n🌐 Your app will now use the production backend');
      console.log('   Make sure to deploy your changes to Render first!');
    }
  } catch (error) {
    console.error('❌ Error updating config:', error.message);
  }
}

const environment = process.argv[2];
if (!environment) {
  console.log('🌍 Environment Switcher for ShareBoard');
  console.log('=====================================');
  console.log('Usage: node switch-env.js <local|production>');
  console.log('');
  console.log('Examples:');
  console.log('  node switch-env.js local      # Switch to local backend');
  console.log('  node switch-env.js production # Switch to production backend');
  console.log('');
  console.log('Current config:', configPath);
} else {
  switchEnvironment(environment);
}
