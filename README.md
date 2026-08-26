# Recall Project Setup Guide

## Prerequisites

Make sure the following are installed on your system:

* Node.js (Latest LTS version recommended)
* npm (Comes with Node.js)
* Git

---

## Running the Frontend Locally

After cloning the repository:

### 1. Navigate to the frontend folder

```bash
cd recall-web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open the application

Once the server starts, open the URL shown in the terminal (usually something like):

```text
http://localhost:5173
```

---

## Common Issue

If you run `npm install` from the root folder and get an error similar to:

```text
ENOENT: no such file or directory, open 'package.json'
```

you are likely in the wrong directory.

Make sure you are inside the `recall-web` folder before running any npm commands:

```bash
cd recall-web
```

Then run:

```bash
npm install
npm run dev
```

---

## Pulling Latest Changes

Before starting work:

```bash
git pull origin main
```

---

## Pushing Changes

After making changes:

```bash
git add .
git commit -m "Describe your changes"
git push origin main
```
