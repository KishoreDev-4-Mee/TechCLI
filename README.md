


````markdown
# 🧪 TechCLI

A modern project scaffolding CLI tool that helps you quickly create new projects with popular tech stacks and templates — in seconds.

---

## 🚀 Features

- ⚡ Blazing-fast CLI-based project setup
- 🗂️ Organized by categories (Frontend, Backend, AI, Mobile, etc.)
- 📦 Prebuilt ZIP templates (auto-extracted on creation)
- 📁 No Git mess — `.git` is auto-removed
- 🔗 GitHub-based template storage
- 🔧 Works offline (after first fetch if cached)

---

## 📋 Requirements

- [Node.js](https://nodejs.org/) installed
- [Git](https://git-scm.com/) installed and accessible from command line

---

## 🔧 Installation

1. Clone or download this repository:
   ```bash
   git clone https://github.com/KishoreDev-4-Mee/TechCLI.git
   cd TechCLI
````

2. Run the setup script:

   ```bash
   setup.bat
   ```

3. Close and reopen your terminal.

4. Run the CLI from anywhere:

   ```bash
   techcli
   ```

---

## 📚 Usage

```bash
techcli
```

* Enter a project name
* Select a category
* Choose your tech stack
* The CLI will fetch the correct template from GitHub and create your project folder.

---

## 🎨 Available Categories

### 🧑‍💻 Frontend

* React + Tailwind CSS
* React + Bootstrap
* Vue.js + Tailwind CSS
* Angular + Material UI
* Svelte + Tailwind CSS
* Next.js + Tailwind CSS

### ⚙️ Backend

* FastAPI + PostgreSQL
* Express.js + MongoDB
* Django + PostgreSQL
* Spring Boot + MySQL
* NestJS + PostgreSQL
* REST API templates

### 📱 Mobile (Coming Soon)

* React Native
* Ionic + React / Vue
* Flutter
* Expo

### 🤖 AI & Machine Learning

* OpenAI Agent
* LangChain Agent
* Flask + Chatbot
* FastAPI + ML Model
* TensorFlow App

### 🌐 Static Websites

* HTML + Bootstrap
* HTML + Tailwind CSS
* HTML + Bulma
* HTML + Materialize
* HTML + Vanilla CSS

### 🧰 Others

* Streamlit App
* Jupyter Notebook
* Python CLI Tool
* Discord Bot
* Chrome Extension
* Electron App

---

## ➕ How to Add Your Own Templates

You can easily add custom project templates hosted on your own GitHub repository.

### 🔧 Step-by-Step

1. **Fork or create a GitHub repo** with the starter project you want to use.
2. Compress the project folder into a `.zip` file and upload it to your repo.
3. Update your `index.js` or `config.js` like this:

```js
const frontend = [
  { value: 'react-tailwind', label: color.cyan('React + Tailwind CSS'), repo: 'react-tailwind-template' },
  { value: 'vue-tailwind', label: color.green('Vue + Tailwind CSS'), repo: 'vue-tailwind-template' },
  ...
];
```

4. Make sure the zipped template is accessible via:

```
https://github.com/<your-username>/<repo-name>/raw/main/template.zip
```

5. In your code, the full link is constructed like:

```js
const GITHUB_USER = 'KishoreDev-4-Mee';
const REPO_BASE = 'https://github.com';
const zipUrl = `${REPO_BASE}/${GITHUB_USER}/${repo}/raw/main/template.zip`;
```

6. Once added, your template will appear in the CLI selection list and be fetched and extracted automatically.

✅ You can also add categories like `mobile`, `ai`, or `backend` the same way.

---

## 🤝 Contributing

You're welcome to:

* Submit PRs with new templates
* Suggest stack combinations
* Report issues and improvements

---

## 📜 License

ISC License

---

## 👨‍💻 Made with ❤️ by [@KishoreDev-4-Mee](https://github.com/KishoreDev-4-Mee)

```

---

Let me know if you'd like:
- A `README.md` badge design section
- Auto-template validator or template uploader script
- GitHub Action to zip and update your templates automatically
```
