<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->


## Agent Development Rules

### Tech Stack
- **Tailwind CSS v4** for styling (Flexbox + Grid for responsiveness)  
- **Next.js** as the framework  
- **Prisma ORM v7** for database operations  
- **Global CSS** using the provided color scheme  

### Project Requirements
- Maintain a `TRACKING.md` file containing:
  - Brief descriptions of completed work  
  - Bug fixes and resolutions  
  - Progress updates  
- Maintain a `COMMIT_GUIDE.md` file (format below)  
- Keep code simple and uncomplicated  
- **Before starting any task**, clearly define what needs to be done  

---

## Commit Guide Format (`COMMIT_GUIDE.md`)

### When to Commit
- After completing a working feature  
- After fixing a bug  
- Before starting a risky change  
- When you reach a logical stopping point  
- After tests pass (if applicable)  

### Commit Message Templates

#### New Feature
**Use when:** Adding new functionality, component, or page  
```
feat: [short description of what was added]
```

#### Bug Fix
**Use when:** Fixing broken functionality  
```
fix: [short description of what was fixed]
```

#### Styling/UI Changes
**Use when:** Only CSS/layout changes  
```
style: [short description of styling updates]
```

#### Code Cleanup
**Use when:** Refactoring or improving readability  
```
refactor: [short description of what was improved]
```

#### Documentation
**Use when:** Updating README, TRACKING.md, or comments  
```
docs: [short description of documentation changes]
```

### Example Workflow
1. Complete task: "Add login button to navbar"  
2. Check guide → Use "New Feature" template  
3. Commit manually:  
   ```
   git commit -m "feat: add login button to navbar"
   ```

---

## AI Task Completion Summary

### 📋 Task Summary
- **What was done:** One‑sentence overview  
- **Files changed:** List of files with paths  
- **Key implementation details:** 2–3 important logic points  

### 🔍 For Beginners – What to Check
- **Test this:** Specific UI interactions to verify  
- **Watch out for:** Known limitations or fragile areas  
- **Next likely step:** Logical next task to build  

### 📝 Commit Ready
- **Suggested message:** `type: description`  
- **When to commit:** e.g., “After testing the login form”  

---

## Workflow

### Define
State what task you will complete.

### Implement
Write the code.

### Summarize
Provide the AI Task Completion Summary.

### Track
Update `TRACKING.md` with what was done.

### You Decide
Use the suggested commit message manually when ready.

---

## Important Rules
- AI never runs `git commit`  
- AI never assumes what you want  
- AI always provides clear summaries  
- AI keeps code simple when asked  
- You remain in full control  

---

If you want, I can also turn this into a **ready‑to‑use file structure**, or generate the actual `COMMIT_GUIDE.md` and `TRACKING.md` starter files — just tell me.