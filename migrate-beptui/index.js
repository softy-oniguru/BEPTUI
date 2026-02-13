#!/usr/bin/env bun
/**
 * migrate-bertui - CLI tool to migrate projects to BERTUI
 * Backs up existing files and copies fresh BERTUI template
 */

import { existsSync, mkdirSync, rmSync, readFileSync, cpSync, renameSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BACKUP_DIR = ".bertmigrate";
const VERSION = "1.0.0";

// Color utilities for terminal output
const colors = {
  reset: "\x1b[0m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  bold: "\x1b[1m",
};

const log = {
  info: (msg) => console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.bold}${colors.cyan}${msg}${colors.reset}\n`),
};

// Detect project type
function detectProjectType(cwd) {
  const packageJsonPath = join(cwd, "package.json");
  
  if (!existsSync(packageJsonPath)) {
    return null;
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

  if (deps["vite"]) return "vite";
  if (deps["react-scripts"]) return "create-react-app";
  if (deps["next"]) return "next";
  if (deps["@remix-run/react"]) return "remix";
  
  return "unknown";
}

// Backup existing project
function backupProject(cwd) {
  const backupPath = join(cwd, BACKUP_DIR);
  
  log.info("Creating backup directory...");
  
  // Remove existing backup if it exists
  if (existsSync(backupPath)) {
    log.warn("Existing backup found, removing...");
    rmSync(backupPath, { recursive: true, force: true });
  }

  // Create backup directory
  mkdirSync(backupPath, { recursive: true });

  // Files/folders to backup
  const itemsToBackup = [
    "src",
    "public",
    "package.json",
    "package-lock.json",
    "bun.lockb",
    "yarn.lock",
    "pnpm-lock.yaml",
    "tsconfig.json",
    "jsconfig.json",
    "vite.config.js",
    "vite.config.ts",
    ".env",
    ".env.local",
    "README.md",
    "index.html",
  ];

  log.info("Backing up project files...");
  
  for (const item of itemsToBackup) {
    const sourcePath = join(cwd, item);
    const destPath = join(backupPath, item);
    
    if (existsSync(sourcePath)) {
      try {
        cpSync(sourcePath, destPath, { recursive: true });
        log.success(`Backed up: ${item}`);
      } catch (error) {
        log.warn(`Could not backup: ${item}`);
      }
    }
  }

  // Create backup info file
  const backupInfo = {
    timestamp: new Date().toISOString(),
    originalProjectType: detectProjectType(cwd),
    migratedWith: `migrate-bertui@${VERSION}`,
  };

  Bun.write(
    join(backupPath, "backup-info.json"),
    JSON.stringify(backupInfo, null, 2)
  );

  log.success(`Backup completed in ${BACKUP_DIR}/`);
}

// Clean current directory (except backup)
function cleanDirectory(cwd) {
  log.info("Cleaning current directory...");

  const itemsToRemove = [
    "src",
    "public",
    "node_modules",
    "dist",
    "build",
    "package.json",
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    "tsconfig.json",
    "jsconfig.json",
    "vite.config.js",
    "vite.config.ts",
    "index.html",
    "README.md",
  ];

  for (const item of itemsToRemove) {
    const itemPath = join(cwd, item);
    if (existsSync(itemPath)) {
      try {
        rmSync(itemPath, { recursive: true, force: true });
        log.success(`Removed: ${item}`);
      } catch (error) {
        log.warn(`Could not remove: ${item}`);
      }
    }
  }
}

// Copy BERTUI template
function copyTemplate(cwd) {
  log.info("Copying BERTUI template...");

  // Find template directory (relative to this script)
  const templatePath = join(__dirname, "template");
  
  if (!existsSync(templatePath)) {
    log.error("Template directory not found!");
    log.error(`Expected at: ${templatePath}`);
    throw new Error("Template not found");
  }

  // Copy all template files
  const templateItems = [
    "src",
    "public",
    "package.json",
    "bertui.config.js",
    "README.md",
    "vercel.json",
    "gitignore",
  ];

  for (const item of templateItems) {
    const sourcePath = join(templatePath, item);
    const destPath = join(cwd, item);
    
    if (existsSync(sourcePath)) {
      try {
        cpSync(sourcePath, destPath, { recursive: true });
        log.success(`Copied: ${item}`);
      } catch (error) {
        log.error(`Failed to copy: ${item}`);
        throw error;
      }
    }
  }

  // Rename gitignore to .gitignore
  const gitignorePath = join(cwd, "gitignore");
  const dotGitignorePath = join(cwd, ".gitignore");
  if (existsSync(gitignorePath)) {
    renameSync(gitignorePath, dotGitignorePath);
    log.success("Created: .gitignore");
  }

  log.success("BERTUI template copied!");
}

// Create migration guide
function createMigrationGuide(cwd, projectType) {
  const guidePath = join(cwd, "MIGRATION_GUIDE.md");
  
  const guide = `# Migration Guide: ${projectType} → BERTUI

## ✅ Migration Completed!

Your project has been successfully migrated to BERTUI. Here's what happened:

### 📦 Backup
All your old files have been backed up to \`.bertmigrate/\`
- You can review your old code anytime
- Copy over any custom logic you need
- The backup is safe to delete once migration is complete

### 🎯 What's New

BERTUI is a lightning-fast React framework powered by Bun. Here are the key changes:

#### File Structure
\`\`\`
${projectType === "vite" ? `
Before (Vite):          After (BERTUI):
src/                    src/
  App.jsx                 pages/           # File-based routing!
  main.jsx                  index.jsx      # Home page (/)
                            about.jsx      # /about route
                          main.jsx         # Entry point
                          images/          # Static images
public/                 public/            # Public assets
` : projectType === "create-react-app" ? `
Before (CRA):           After (BERTUI):
src/                    src/
  App.js                  pages/           # File-based routing!
  index.js                  index.jsx      # Home page (/)
                          main.jsx         # Entry point
                          images/          # Static images
public/                 public/            # Public assets
` : `
Before:                 After (BERTUI):
src/                    src/
  (varies)                pages/           # File-based routing!
                            index.jsx      # Home page (/)
                          main.jsx         # Entry point
                          images/          # Static images
public/                 public/            # Public assets
`}
\`\`\`

### 🚀 Getting Started

1. **Install dependencies:**
   \`\`\`bash
   bun install
   \`\`\`

2. **Review the new structure:**
   \`\`\`bash
   cat src/pages/index.jsx
   \`\`\`

3. **Copy your components:**
   - Copy components from \`.bertmigrate/src/\` to \`src/\`
   - Adjust imports as needed
   
4. **Migrate routes:**
   ${projectType === "vite" || projectType === "create-react-app" ? `
   - Convert React Router routes to file-based routing
   - Example: \`/user/:id\` → \`src/pages/user/[id].jsx\`
   ` : `
   - Create pages in \`src/pages/\` directory
   - Use file names for routes (index.jsx = /)
   `}

5. **Update imports:**
   \`\`\`jsx
   // Old
   import { Link } from 'react-router-dom'
   
   // New
   import { Link } from 'bertui/router'
   \`\`\`

6. **Run your project:**
   \`\`\`bash
   bun run dev      # Development server
   bun run build    # Production build
   \`\`\`

### 🎨 File-Based Routing

BERTUI uses automatic file-based routing:

\`\`\`
src/pages/index.jsx                 → /
src/pages/about.jsx                 → /about
src/pages/blog/index.jsx            → /blog
src/pages/user/[id].jsx             → /user/:id (dynamic)
src/pages/shop/[cat]/[prod].jsx     → /shop/:cat/:prod
\`\`\`

Example dynamic route:
\`\`\`jsx
// src/pages/user/[id].jsx
export default function UserProfile({ params }) {
  return <div>User ID: {params.id}</div>
}
\`\`\`

### 📸 Image Handling

- Place images in \`src/images/\` → accessible at \`/images/*\`
- Or use \`public/\` for root-level assets

### 🔧 Commands

\`\`\`bash
bun run dev          # Start dev server (fast HMR!)
bun run build        # Build for production
bun run preview      # Preview production build
\`\`\`

### 💡 Tips

1. **Speed:** BERTUI is much faster than ${projectType} thanks to Bun
2. **Simplicity:** No complex configuration needed
3. **Routing:** File-based routing is intuitive and automatic
4. **Zero Config:** Everything works out of the box

### 📚 Learn More

- [BERTUI Documentation](https://bertui-docswebsite.vercel.app/)
- [GitHub Repository](https://github.com/BunElysiaReact/BERTUI)

### 🗑️ Cleanup

Once you've successfully migrated and tested:
\`\`\`bash
rm -rf .bertmigrate  # Remove backup
\`\`\`

---

**Need help?** Check your backup in \`.bertmigrate/\` or visit the BERTUI docs!
`;

  Bun.write(guidePath, guide);
  log.success("Created MIGRATION_GUIDE.md");
}

// Main migration function
function migrate() {
  const cwd = process.cwd();

  log.title("🚀 BERTUI Migration Tool");

  // Detect current project
  const projectType = detectProjectType(cwd);
  
  if (!projectType) {
    log.error("No package.json found. Are you in a Node.js project?");
    process.exit(1);
  }

  log.info(`Detected project type: ${colors.bold}${projectType}${colors.reset}`);
  
  // Confirmation prompt
  console.log(`\n${colors.yellow}⚠ This will:${colors.reset}`);
  console.log("  1. Backup all your files to .bertmigrate/");
  console.log("  2. Remove current project files");
  console.log("  3. Copy fresh BERTUI template");
  console.log(`\n${colors.bold}Your code will be safely backed up!${colors.reset}\n`);

  const proceed = prompt("Continue? (yes/no): ");
  
  if (proceed?.toLowerCase() !== "yes") {
    log.info("Migration cancelled");
    process.exit(0);
  }

  try {
    // Step 1: Backup
    log.title("📦 Step 1: Creating Backup");
    backupProject(cwd);

    // Step 2: Clean
    log.title("🧹 Step 2: Cleaning Directory");
    cleanDirectory(cwd);

    // Step 3: Copy template
    log.title("⚡ Step 3: Copying BERTUI Template");
    copyTemplate(cwd);

    // Step 4: Create migration guide
    log.title("📝 Step 4: Creating Migration Guide");
    createMigrationGuide(cwd, projectType);

    // Success
    log.title("✨ Migration Complete!");
    console.log(`${colors.green}Your project has been migrated to BERTUI!${colors.reset}\n`);
    console.log(`${colors.bold}Next steps:${colors.reset}`);
    console.log(`  1. Run ${colors.cyan}bun install${colors.reset} to install dependencies`);
    console.log(`  2. Read ${colors.cyan}MIGRATION_GUIDE.md${colors.reset} for instructions`);
    console.log(`  3. Copy your components from ${colors.cyan}.bertmigrate/src/${colors.reset}`);
    console.log(`  4. Run ${colors.cyan}bun run dev${colors.reset} to start developing\n`);
    console.log(`${colors.yellow}Your old files are in ${colors.cyan}.bertmigrate/${colors.yellow} - delete when ready!${colors.reset}\n`);

  } catch (error) {
    log.error("Migration failed!");
    console.error(error);
    log.warn("Your original files are still in .bertmigrate/");
    process.exit(1);
  }
}

// CLI entry point
const args = process.argv.slice(2);

if (args.includes("--version") || args.includes("-v")) {
  console.log(`migrate-bertui v${VERSION}`);
  process.exit(0);
}

if (args.includes("--help") || args.includes("-h")) {
  console.log(`
${colors.bold}${colors.cyan}migrate-bertui${colors.reset} - Migrate to BERTUI

${colors.bold}Usage:${colors.reset}
  bunx migrate-bertui

${colors.bold}What it does:${colors.reset}
  1. Backs up your project to .bertmigrate/
  2. Removes current project files
  3. Copies fresh BERTUI template
  4. Creates a migration guide

${colors.bold}Supported migrations:${colors.reset}
  • Vite
  • Create React App
  • Next.js
  • Remix
  • Any React project

${colors.bold}Options:${colors.reset}
  -h, --help       Show this help
  -v, --version    Show version

${colors.bold}Example:${colors.reset}
  cd my-vite-app
  bunx migrate-bertui
  bun install
  bun run dev
  `);
  process.exit(0);
}

// Run migration
migrate();