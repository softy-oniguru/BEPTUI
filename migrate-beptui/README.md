# 🚀 migrate-bertui

Lightning-fast migration tool to seamlessly move your React projects from Vite, Create React App, and other frameworks to **BERTUI** - the fastest React framework powered by Bun.

## ⚡ Why Migrate to BERTUI?

- **10x Faster**: Powered by Bun, leave slow build times behind
- **File-Based Routing**: Intuitive, automatic routing with zero configuration
- **Zero Config**: No webpack, no complex setup, just works
- **Modern**: Built for the modern web with the latest standards
- **Lightweight**: Minimal dependencies, maximum performance

## 📦 Installation & Usage

No installation needed! Use it directly with `bunx`:

```bash
cd your-project
bunx migrate-bertui
```

That's it! The tool will:
1. ✅ Backup all your files to `.bertmigrate/`
2. 🧹 Clean the current directory
3. ⚡ Initialize a fresh BERTUI project
4. 📝 Create a detailed migration guide

## 🎯 Supported Projects

- ✅ Vite
- ✅ Create React App (CRA)
- ✅ Next.js
- ✅ Remix
- ✅ Any React-based project

## 🔥 Features

### Safe Migration
- **Automatic Backup**: All files backed up to `.bertmigrate/` before any changes
- **No Data Loss**: Your original code is preserved and easily accessible
- **Rollback Ready**: Keep the backup until you're confident in the migration

### Smart Detection
- Automatically detects your current framework
- Tailors migration guide to your specific setup
- Handles different project structures intelligently

### Comprehensive Guide
- Creates `MIGRATION_GUIDE.md` with step-by-step instructions
- Includes routing migration examples
- Provides code snippets for common patterns

## 📖 How It Works

### Before Migration
```
your-vite-app/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── components/
├── public/
├── vite.config.js
└── package.json
```

### After Migration
```
your-vite-app/
├── .bertmigrate/          # 📦 Your original files (backup)
│   ├── src/
│   ├── public/
│   ├── vite.config.js
│   └── package.json
├── src/
│   ├── pages/              # ⚡ File-based routing!
│   │   └── index.jsx       # Home route (/)
│   ├── main.jsx
│   └── images/
├── public/
├── package.json
└── MIGRATION_GUIDE.md     # 📝 Your personal guide
```

## 🎨 File-Based Routing

One of BERTUI's best features - routing made simple:

```
src/pages/index.jsx                 → /
src/pages/about.jsx                 → /about
src/pages/blog/index.jsx            → /blog
src/pages/user/[id].jsx             → /user/:id (dynamic)
src/pages/shop/[cat]/[prod].jsx     → /shop/:cat/:prod
```

### Dynamic Routes Example
```jsx
// src/pages/user/[id].jsx
export default function UserProfile({ params }) {
  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {params.id}</p>
    </div>
  );
}
```

### Navigation
```jsx
import { Link, useRouter } from 'bertui/router';

function Navigation() {
  const { navigate } = useRouter();
  
  return (
    <nav>
      <Link to="/about">About</Link>
      <button onClick={() => navigate('/dashboard')}>
        Dashboard
      </button>
    </nav>
  );
}
```

## 🛠️ CLI Options

```bash
bunx migrate-bertui          # Run migration
bunx migrate-bertui --help   # Show help
bunx migrate-bertui --version # Show version
```

## 📋 Step-by-Step Guide

### 1. Prepare Your Project
```bash
# Make sure you're in your project directory
cd my-vite-app

# Commit any changes (optional but recommended)
git add .
git commit -m "Before BERTUI migration"
```

### 2. Run Migration
```bash
bunx migrate-bertui
```

The tool will ask for confirmation before proceeding.

### 3. Review Changes
```bash
# Check the migration guide
cat MIGRATION_GUIDE.md

# Browse your backup
ls -la .bertmigrate/

# See the new structure
tree src/
```

### 4. Copy Your Code
```bash
# Copy components
cp -r .bertmigrate/src/components src/

# Copy styles
cp -r .bertmigrate/src/styles src/

# Update imports in your files
```

### 5. Test & Run
```bash
bun run dev      # Start development server
bun run build    # Build for production
```

### 6. Clean Up (when ready)
```bash
# Once everything works, remove the backup
rm -rf .bertmigrate/
```

## 🎯 Migration Checklist

After running `migrate-bertui`:

- [ ] Read `MIGRATION_GUIDE.md`
- [ ] Copy components from `.bertmigrate/src/`
- [ ] Convert routes to file-based structure
- [ ] Update imports (`react-router-dom` → `bertui/router`)
- [ ] Test all routes and features
- [ ] Build and preview production version
- [ ] Delete `.bertmigrate/` when confident

## 🚀 BERTUI Commands

```bash
bun run dev          # Development server (fast HMR!)
bun run build        # Production build
bun run preview      # Preview production build
```

## 💡 Common Migrations

### From Vite
```jsx
// Before (Vite + React Router)
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

// After (BERTUI) - Just create files!
// src/pages/index.jsx - automatically becomes "/"
// src/pages/about.jsx - automatically becomes "/about"
```

### From Create React App
```jsx
// Before (CRA)
// All routes in App.js with React Router

// After (BERTUI)
// Each page is its own file
// src/pages/index.jsx
// src/pages/dashboard.jsx
// etc.
```

## 🔧 Troubleshooting

### "Command not found: bunx"
**Solution**: Install Bun first
```bash
curl -fsSL https://bun.sh/install | bash
```

### "No package.json found"
**Solution**: Make sure you're in a Node.js project directory
```bash
cd path/to/your/project
bunx migrate-bertui
```

### Rollback Migration
If something goes wrong:
```bash
# Remove new files
rm -rf src/ public/ package.json

# Restore from backup
cp -r .bertmigrate/* .
rm -rf .bertmigrate/
```

## 📚 Resources

- [BERTUI Documentation](https://bertui-docswebsite.vercel.app/)
- [BERTUI GitHub](https://github.com/BunElysiaReact/BERTUI)
- [Bun Documentation](https://bun.sh/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

```bash
git clone https://github.com/yourusername/migrate-bertui
cd migrate-bertui
bun install
bun run dev
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Credits

Built for the [BERTUI](https://github.com/BunElysiaReact/BERTUI) community. Special thanks to all contributors!

---

**Made with ⚡ by the BERTUI team**

Questions? [Open an issue](https://github.com/yourusername/migrate-bertui/issues)