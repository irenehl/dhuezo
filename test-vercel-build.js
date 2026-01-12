#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SERVER_ENDPOINT = 'http://127.0.0.1:7246/ingest/4716d069-a486-46d4-9cfe-1b3c1d3447eb';

function logDebug(location, message, data, hypothesisId) {
  const payload = {
    sessionId: 'debug-session',
    runId: 'test-vercel-build',
    hypothesisId,
    location,
    message,
    data,
    timestamp: Date.now(),
  };
  
  fetch(SERVER_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {});
  
  console.log(`[DEBUG] ${location}: ${message}`, JSON.stringify(data, null, 2));
}

// #region agent log
logDebug('test-vercel-build.js:1', 'Script started', { cwd: process.cwd() }, 'A');
// #endregion

const rootDir = process.cwd();
const appName = process.argv[2] || 'food-dice';
const appDir = path.join(rootDir, 'apps', appName);

// #region agent log
logDebug('test-vercel-build.js:2', 'Checking app directory', { appName, appDir, exists: fs.existsSync(appDir) }, 'A');
// #endregion

if (!fs.existsSync(appDir)) {
  console.error(`App directory not found: ${appDir}`);
  process.exit(1);
}

// Check for vercel.json in app directory
const vercelJsonPath = path.join(appDir, 'vercel.json');
const vercelJsonExists = fs.existsSync(vercelJsonPath);

// #region agent log
logDebug('test-vercel-build.js:3', 'Checking vercel.json', { 
  vercelJsonPath, 
  exists: vercelJsonExists,
  appDir 
}, 'A');
// #endregion

let vercelConfig = null;
if (vercelJsonExists) {
  try {
    vercelConfig = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));
    // #region agent log
    logDebug('test-vercel-build.js:4', 'Loaded vercel.json', { config: vercelConfig }, 'A');
    // #endregion
  } catch (error) {
    // #region agent log
    logDebug('test-vercel-build.js:5', 'Failed to parse vercel.json', { error: error.message }, 'A');
    // #endregion
  }
}

// Check for vercel.json in root directory
const rootVercelJsonPath = path.join(rootDir, 'vercel.json');
const rootVercelJsonExists = fs.existsSync(rootVercelJsonPath);

// #region agent log
logDebug('test-vercel-build.js:6', 'Checking root vercel.json', { 
  rootVercelJsonPath, 
  exists: rootVercelJsonExists 
}, 'B');
// #endregion

let rootVercelConfig = null;
if (rootVercelJsonExists) {
  try {
    rootVercelConfig = JSON.parse(fs.readFileSync(rootVercelJsonPath, 'utf8'));
    // #region agent log
    logDebug('test-vercel-build.js:7', 'Loaded root vercel.json', { config: rootVercelConfig }, 'B');
    // #endregion
  } catch (error) {
    // #region agent log
    logDebug('test-vercel-build.js:8', 'Failed to parse root vercel.json', { error: error.message }, 'B');
    // #endregion
  }
}

// Check package.json in app directory
const packageJsonPath = path.join(appDir, 'package.json');
const packageJsonExists = fs.existsSync(packageJsonPath);

// #region agent log
logDebug('test-vercel-build.js:9', 'Checking package.json', { 
  packageJsonPath, 
  exists: packageJsonExists 
}, 'C');
// #endregion

let packageConfig = null;
if (packageJsonExists) {
  try {
    packageConfig = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    // #region agent log
    logDebug('test-vercel-build.js:10', 'Loaded package.json', { 
      scripts: packageConfig.scripts,
      dependencies: Object.keys(packageConfig.dependencies || {}),
      devDependencies: Object.keys(packageConfig.devDependencies || {})
    }, 'C');
    // #endregion
  } catch (error) {
    // #region agent log
    logDebug('test-vercel-build.js:10b', 'Failed to parse package.json', { error: error.message }, 'C');
    // #endregion
  }
}

// Check for vite.config files
const viteConfigFiles = [
  path.join(rootDir, 'vite.config.js'),
  path.join(rootDir, 'vite.config.ts'),
  path.join(appDir, 'vite.config.js'),
  path.join(appDir, 'vite.config.ts'),
];

const viteConfigExists = viteConfigFiles.some(file => fs.existsSync(file));

// #region agent log
logDebug('test-vercel-build.js:11', 'Checking for vite config', { 
  viteConfigFiles,
  exists: viteConfigExists 
}, 'D');
// #endregion

// Check root package.json for build script
const rootPackageJsonPath = path.join(rootDir, 'package.json');
const rootPackageJsonExists = fs.existsSync(rootPackageJsonPath);

// #region agent log
logDebug('test-vercel-build.js:12', 'Checking root package.json', { 
  rootPackageJsonPath, 
  exists: rootPackageJsonExists 
}, 'E');
// #endregion

let rootPackageConfig = null;
if (rootPackageJsonExists) {
  try {
    rootPackageConfig = JSON.parse(fs.readFileSync(rootPackageJsonPath, 'utf8'));
    // #region agent log
    logDebug('test-vercel-build.js:13', 'Loaded root package.json', { 
      scripts: rootPackageConfig.scripts,
      hasBuildScript: !!rootPackageConfig.scripts?.build
    }, 'E');
    // #endregion
  } catch (error) {
    // #region agent log
    logDebug('test-vercel-build.js:13b', 'Failed to parse root package.json', { error: error.message }, 'E');
    // #endregion
  }
}

// Determine what build command would be used
let detectedBuildCommand = null;
let detectedFramework = null;

if (vercelConfig?.buildCommand) {
  detectedBuildCommand = vercelConfig.buildCommand;
  detectedFramework = vercelConfig.framework || 'nextjs';
  // #region agent log
  logDebug('test-vercel-build.js:14', 'Using vercel.json buildCommand', { 
    buildCommand: detectedBuildCommand,
    framework: detectedFramework 
  }, 'A');
  // #endregion
} else if (packageConfig?.scripts?.build) {
  detectedBuildCommand = `npm run build`;
  detectedFramework = 'nextjs'; // Assuming Next.js based on project structure
  // #region agent log
  logDebug('test-vercel-build.js:15', 'Using package.json build script', { 
    buildCommand: detectedBuildCommand,
    framework: detectedFramework 
  }, 'C');
  // #endregion
} else if (viteConfigExists) {
  detectedBuildCommand = 'vite build';
  detectedFramework = 'vite';
  // #region agent log
  logDebug('test-vercel-build.js:16', 'Auto-detected Vite', { 
    buildCommand: detectedBuildCommand,
    framework: detectedFramework 
  }, 'D');
  // #endregion
} else {
  // #region agent log
  logDebug('test-vercel-build.js:17', 'No build command detected', {}, 'E');
  // #endregion
}

console.log('\n=== VERCEL BUILD DETECTION RESULTS ===');
console.log(`Current working directory: ${process.cwd()}`);
console.log(`App directory: ${appDir}`);
console.log(`App vercel.json exists: ${vercelJsonExists}`);
console.log(`Root vercel.json exists: ${rootVercelJsonExists}`);
console.log(`Vite config exists: ${viteConfigExists}`);
console.log(`Detected build command: ${detectedBuildCommand || 'NONE'}`);
console.log(`Detected framework: ${detectedFramework || 'NONE'}`);
console.log('\n=== CONFIGURATION DETAILS ===');
if (vercelConfig) {
  console.log('App vercel.json:', JSON.stringify(vercelConfig, null, 2));
}
if (rootVercelConfig) {
  console.log('Root vercel.json:', JSON.stringify(rootVercelConfig, null, 2));
}
if (packageConfig?.scripts) {
  console.log('App package.json scripts:', JSON.stringify(packageConfig.scripts, null, 2));
}
