#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

console.log('\n\x1b[35m\x1b[1m┌────────────────────────────────────────────────────────┐\x1b[0m');
console.log('\x1b[35m\x1b[1m│                      TEAMLESS CLI                      │\x1b[0m');
console.log('\x1b[35m\x1b[1m│      Beautiful PDFs with React & Tailwind CSS.         │\x1b[0m');
console.log('\x1b[35m\x1b[1m└────────────────────────────────────────────────────────┘\x1b[0m\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const defaultProjectName = 'teamless-pdf';
let targetDirArg = process.argv[2];

if (targetDirArg) {
  createProject(targetDirArg);
} else {
  rl.question(`Project name (\x1b[36m${defaultProjectName}\x1b[0m): `, (answer) => {
    const projectName = answer.trim() || defaultProjectName;
    createProject(projectName);
  });
}

function createProject(projectName) {
  rl.close();
  const cwd = process.cwd();
  const targetDir = path.resolve(cwd, projectName);

  if (fs.existsSync(targetDir)) {
    console.error(`\x1b[31mError: Directory '${projectName}' already exists. Please choose a different name.\x1b[0m\n`);
    process.exit(1);
  }

  console.log(`Scaffolding a new Teamless PDF project in \x1b[36m${targetDir}\x1b[0m...\n`);

  try {
    fs.mkdirSync(targetDir, { recursive: true });

    const templateSourceDir = path.resolve(__dirname, '../templates');

    // Recursive directory copy helper
    copyRecursiveSync(templateSourceDir, targetDir);

    console.log('\x1b[32m✔ Project files generated successfully.\x1b[0m');

    // Run dependency installation
    const packageManager = getPackageManager();
    console.log(`\nInstalling dependencies using \x1b[36m${packageManager}\x1b[0m (this may take a few seconds)...`);

    try {
      execSync(`${packageManager} install`, {
        cwd: targetDir,
        stdio: 'inherit'
      });
      console.log(`\x1b[32m✔ Dependencies installed.\x1b[0m\n`);
    } catch (installError) {
      console.warn(`\x1b[33mWarning: Failed to install dependencies. Please run '${packageManager} install' manually in the folder.\x1b[0m\n`);
    }

    console.log(`\x1b[32m\x1b[1m🎉 Successfully created ${projectName}!\x1b[0m`);
    console.log('\nGet started by running:\n');
    console.log(`  \x1b[36mcd\x1b[0m ${projectName}`);
    console.log(`  \x1b[36m${packageManager} run dev\x1b[0m\n`);
    console.log('\x1b[35mDesign beautiful PDFs. No more Puppeteer hell.\x1b[0m\n');

  } catch (error) {
    console.error(`\x1b[31mFailed to scaffold project: ${error.message}\x1b[0m`);
    process.exit(1);
  }
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function getPackageManager() {
  const userAgent = process.env.npm_config_user_agent || '';
  if (userAgent.startsWith('pnpm')) return 'pnpm';
  if (userAgent.startsWith('yarn')) return 'yarn';
  if (userAgent.startsWith('bun')) return 'bun';
  return 'npm';
}
