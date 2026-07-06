#!/usr/bin/env node

const { createServer } = require('vite');
const path = require('path');
const fs = require('fs');

async function main() {
  const cwd = process.cwd();
  const pdfsDir = path.resolve(cwd, 'pdfs');

  if (!fs.existsSync(pdfsDir)) {
    console.log(`\n\x1b[33m[Teamless] Warning: No 'pdfs' directory found in your current folder: ${cwd}\x1b[0m`);
    console.log(`\x1b[33m[Teamless] Run 'npx create-teamless' or create a 'pdfs/' directory containing your React templates.\x1b[0m\n`);
  }

  const configPath = path.resolve(__dirname, '../vite.config.ts');

  try {
    const server = await createServer({
      configFile: configPath,
    });

    await server.listen();
    server.printUrls();
    
    // Attempt to open the browser
    const url = server.resolvedUrls?.local?.[0] || 'http://localhost:3000';
    try {
      const open = require('open');
      await open(url);
    } catch {
      // open might not be available or fail, which is fine
    }

    console.log(`\x1b[32m\x1b[1m[Teamless] Live preview server started. HMR is active!\x1b[0m\n`);
  } catch (error) {
    console.error(`\x1b[31m[Teamless] Failed to start preview server: ${error.message}\x1b[0m`);
    process.exit(1);
  }
}

main();
