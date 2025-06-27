#!/usr/bin/env node
import {
    intro,
    outro,
    text,
    select,
    confirm,
    spinner,
    cancel,
    isCancel,
    note,
} from '@clack/prompts';
import color from 'picocolors';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.clear();
intro(`${color.bgCyan(color.black(' TechCLI 🧪 '))} Modern Project Scaffolder`);

// GitHub repository configuration
const GITHUB_USER = 'KishoreDev-4-Mee'; // Replace with your GitHub username
const REPO_BASE = 'https://github.com'; // Base GitHub URL

// Cross-platform directory removal function
function removeDirectory(dirPath) {
    if (fs.existsSync(dirPath)) {
        try {
            fs.rmSync(dirPath, { recursive: true, force: true });
        } catch (error) {
            // Fallback for older Node.js versions
            if (fs.rmSync) {
                throw error;
            }
            // Use recursive delete for older versions
            deleteFolderRecursive(dirPath);
        }
    }
}

// Fallback recursive delete function for older Node.js versions
function deleteFolderRecursive(directoryPath) {
    if (fs.existsSync(directoryPath)) {
        fs.readdirSync(directoryPath).forEach((file) => {
            const curPath = path.join(directoryPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(directoryPath);
    }
}

// Get current working directory
const currentDir = process.cwd();
// console.log(color.dim(`📍 Current directory: ${currentDir}`));

const projectName = await text({
    message: '📁 Enter your project name:',
    placeholder: 'my-awesome-app',
    validate(value) {
        if (!value || value.length < 3) return `Must be at least 3 characters`;
        if (!/^[a-zA-Z0-9-_]+$/.test(value)) return `Only letters, numbers, hyphens, and underscores allowed`;
    },
});

if (isCancel(projectName)) {
    cancel('❌ Operation cancelled.');
    process.exit(0);
}

const category = await select({
    message: '🚀 Choose your project category:',
    options: [
        { value: 'frontend', label: color.cyan('🎨 Frontend') },
        { value: 'backend', label: color.green('⚙️  Backend') },
        { value: 'mobile', label: color.blue('📱 Mobile App') },
        { value: 'ai', label: color.magenta('🤖 AI Agent') },
        { value: 'api', label: color.yellow('🔌 API') },
        { value: 'static', label: color.gray('📄 HTML & CSS') },
        { value: 'others', label: color.white('🔧 Others') },
        { value: 'AI', label: color.red('🤖 AI') },
        { value: 'vote', label: color.red('🗳️  Vote for Next Stack') },
    ],
});

if (isCancel(category)) {
    cancel('❌ Operation cancelled.');
    process.exit(0);
}

if (category === 'vote') {
    outro(color.bold(`🗳️ You can vote here: https://yourvote.page`));
    process.exit(0);
}
else if (category === 'AI') {
    outro(color.bold(`🤖 AI category is under development. Stay tuned!`));
    process.exit(0);
}

// Framework options based on category
const frameworkOptions = {
    frontend: [
        { value: 'react-tailwind', label: color.cyan('React + Tailwind CSS'), repo: 'Chat-with-Documents' },
        { value: 'react-bootstrap', label: color.blue('React + Bootstrap'), repo: 'react-bootstrap-template' },
        { value: 'vue-tailwind', label: color.green('Vue.js + Tailwind CSS'), repo: 'vue-tailwind-template' },
        { value: 'angular-material', label: color.red('Angular + Material UI'), repo: 'angular-material-template' },
        { value: 'svelte-tailwind', label: color.yellow('Svelte + Tailwind CSS'), repo: 'svelte-tailwind-template' },
        { value: 'next-tailwind', label: color.black('Next.js + Tailwind CSS'), repo: 'next-tailwind-template' },
    ],
    backend: [
        { value: 'fastapi-postgres', label: color.green('FastAPI + PostgreSQL'), repo: 'fastapi-postgres-template' },
        { value: 'express-mongodb', label: color.yellow('Express.js + MongoDB'), repo: 'express-mongodb-template' },
        { value: 'django-postgres', label: color.green('Django + PostgreSQL'), repo: 'django-postgres-template' },
        { value: 'spring-mysql', label: color.green('Spring Boot + MySQL'), repo: 'spring-mysql-template' },
        { value: 'nestjs-postgres', label: color.red('NestJS + PostgreSQL'), repo: 'nestjs-postgres-template' },
        { value: 'rest-fastapi', label: color.green('REST API (FastAPI)'), repo: 'rest-fastapi-template' },
        { value: 'graphql-apollo', label: color.red('GraphQL (Apollo)'), repo: 'graphql-apollo-template' },
        { value: 'rest-express', label: color.yellow('REST API (Express)'), repo: 'rest-express-template' },
        { value: 'rest-django', label: color.green('REST API (Django)'), repo: 'rest-django-template' },
        { value: 'grpc-go', label: color.cyan('gRPC (Go)'), repo: 'grpc-go-template' },
    ],
    mobile: [
        { value: 'react-native', label: color.cyan('React Native'), repo: 'react-native-template' },
        { value: 'ionic-react', label: color.blue('Ionic + React'), repo: 'ionic-react-template' },
        { value: 'ionic-vue', label: color.green('Ionic + Vue'), repo: 'ionic-vue-template' },
        { value: 'flutter', label: color.blue('Flutter'), repo: 'flutter-template' },
        { value: 'expo', label: color.black('Expo (React Native)'), repo: 'expo-template' },
    ],
    ai: [
        { value: 'openai-agent', label: color.green('OpenAI Agent'), repo: 'openai-agent-template' },
        { value: 'langchain-agent', label: color.blue('LangChain Agent'), repo: 'langchain-agent-template' },
        { value: 'chatbot-flask', label: color.red('Chatbot + Flask'), repo: 'chatbot-flask-template' },
        { value: 'ml-fastapi', label: color.red('ML Model + FastAPI'), repo: 'ml-fastapi-template' },
        { value: 'tensorflow-app', label: color.yellow('TensorFlow App'), repo: 'tensorflow-app-template' },
    ],
    static: [
        { value: 'html-bootstrap', label: color.red('HTML + Bootstrap'), repo: 'html-bootstrap-template' },
        { value: 'html-tailwind', label: color.cyan('HTML + Tailwind CSS'), repo: 'html-tailwind-template' },
        { value: 'html-bulma', label: color.green('HTML + Bulma'), repo: 'html-bulma-template' },
        { value: 'html-materialize', label: color.red('HTML + Materialize'), repo: 'html-materialize-template' },
        { value: 'html-vanilla', label: color.gray('HTML + Vanilla CSS'), repo: 'html-vanilla-template' },
    ],
    others: [
        { value: 'streamlit-app', label: color.red('Streamlit App'), repo: 'streamlit-app-template' },
        { value: 'jupyter-notebook', label: color.yellow('Jupyter Notebook'), repo: 'jupyter-notebook-template' },
        { value: 'python-cli', label: color.yellow('Python CLI Tool'), repo: 'python-cli-template' },
        { value: 'discord-bot', label: color.red('Discord Bot'), repo: 'discord-bot-template' },
        { value: 'chrome-extension', label: color.blue('Chrome Extension'), repo: 'chrome-extension-template' },
        { value: 'electron-app', label: color.cyan('Electron App'), repo: 'electron-app-template' },
    ],
};

const framework = await select({
    message: `🧱 Choose your ${category} stack:`,
    options: frameworkOptions[category],
});

if (isCancel(framework)) {
    cancel('❌ Operation cancelled.');
    process.exit(0);
}

// Get the selected option details
const selectedOption = frameworkOptions[category].find(opt => opt.value === framework);
const repoName = selectedOption.repo;

// Set target directory as subfolder in current directory
const targetDir = path.join(currentDir, projectName);

// Ask for confirmation
// const shouldProceed = await confirm({
//     message: `📦 This will create "${projectName}" using ${selectedOption.label}. Continue?`,
// });

// if (isCancel(shouldProceed) || !shouldProceed) {
//     cancel('❌ Operation cancelled.');
//     process.exit(0);
// }

// Check if project directory already exists
if (fs.existsSync(targetDir)) {
    const overwrite = await confirm({
        message: `⚠️  Directory "${projectName}" already exists. Overwrite?`,
    });

    if (isCancel(overwrite) || !overwrite) {
        cancel('❌ Operation cancelled.');
        process.exit(0);
    }
}

// Clone the repository
const s = spinner();
s.start(`⚙️  Creating ${color.bold(selectedOption.label)} project...`);

try {
    // Remove existing target directory if it exists
    if (fs.existsSync(targetDir)) {
        removeDirectory(targetDir);
    }

    // Clone the repository directly to target directory
    const repoUrl = `${REPO_BASE}/${GITHUB_USER}/${repoName}.git`;
    execSync(`git clone "${repoUrl}" "${projectName}"`, { stdio: 'pipe' });

    // Remove .git folder to start fresh
    const gitPath = path.join(targetDir, '.git');
    if (fs.existsSync(gitPath)) {
        removeDirectory(gitPath);
    }

    // Initialize new git repository
    // process.chdir(targetDir);
    // execSync('git init', { stdio: 'pipe' });
    // process.chdir(currentDir);

    s.stop(`✅ Project "${color.bold(projectName)}" created successfully!`);

    // Show next steps
    note(
        `📋 Next steps:
${color.cyan('1.')} cd ${projectName}
${color.cyan('2.')} npm install ${color.gray('(if package.json exists)')}
${color.cyan('3.')} Follow the README.md for setup instructions
${color.cyan('4.')} Start coding! 🚀`,
        'Getting Started'
    );

} catch (error) {
    s.stop(`❌ Failed to create project`);

    if (error.message.includes('Repository not found') || error.message.includes('not found')) {
        note(
            `🔍 Template repository not found: ${repoName}
Please make sure the repository exists at:
${REPO_BASE}/${GITHUB_USER}/${repoName}
And that you have internet connection.`,
            'Error'
        );
    } else if (error.message.includes('git') && error.message.includes('not found')) {
        note(
            `🚫 Git is not installed or not found in PATH.
Please install Git from: https://git-scm.com/downloads
Or make sure Git is added to your system PATH.`,
            'Error'
        );
    } else {
        note(
            `💥 Error: ${error.message}
Make sure you have Git installed and internet connection.`,
            'Error'
        );
    }

    process.exit(1);
}

outro(`🎉 Done! Happy coding with ${color.underline(selectedOption.label)} 🚀`);