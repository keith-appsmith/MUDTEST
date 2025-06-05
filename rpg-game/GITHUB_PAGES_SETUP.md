# Deploying **Idle RPG** to GitHub Pages  

This guide walks you through publishing the `rpg-game` web app with the pre-configured GitHub Actions workflow (`.github/workflows/gh-pages-deploy.yml`).  
Once finished you’ll have a public URL ( `https://<username>.github.io/<repository>` ) where anyone can play your idle RPG from any device.

---

## 1  •  Prepare a New Repository

1. Sign in to GitHub and click **New repository**.  
2. Name it something memorable, e.g. **idle-rpg** (the examples below use that name—substitute if you pick another).  
3. Choose **Public** or **Private** (Pages works for both).  
4. DO NOT initialize with a README, .gitignore, or license—this keeps the first push simple.  
5. Click **Create repository**.

---

## 2  •  Add the Project Files Locally

```bash
# Clone the empty repo
git clone https://github.com/<username>/idle-rpg.git
cd idle-rpg

# Copy or move the provided project into the repo
#   └── rpg-game/
#       ├── index.html
#       ├── css/
#       ├── js/
#       ├── launch.sh
#       └── .github/workflows/gh-pages-deploy.yml
cp -R /path/to/rpg-game ./          # or move, drag-drop, etc.

# Commit and push
git add .
git commit -m "Add Idle RPG static site with GitHub Pages workflow"
git push -u origin main
```

> 📄 **Important**  
> The workflow file must be located exactly at  
> `rpg-game/.github/workflows/gh-pages-deploy.yml` inside the repo—  
> the push above keeps that structure intact.

---

## 3  •  First Workflow Run

After the push:

1. Go to your repository on GitHub.  
2. Click the **Actions** tab.  
3. You should see a workflow called **“Deploy to GitHub Pages”** running on your `main` push.  
   - Build job: bundles everything in `rpg-game/` into the `_site` output folder.  
   - Deploy job: publishes `_site` to the special *GitHub Pages* storage.

Initial run takes ~1 minute. When both jobs show a green check, the site is live.

---

## 4  •  Enable GitHub Pages (one-time switch)

GitHub Actions configures Pages automatically, but the first time you must enable the feature:

1. Open **Settings → Pages** in your repo.  
2. Ensure **“Source”** is set to **GitHub Actions** (should already be selected).  
3. GitHub now displays your site URL, e.g.  

```
https://<username>.github.io/idle-rpg/
```

---

## 5  •  Visit Your Game

Open the URL provided in **Settings → Pages** or from the workflow summary.  
You should see:

- Left navigation sidebar  
- Top bar with player stats  
- Retro terminal awaiting commands (`help`, `mine iron_ore`, …)

🎉 **Congratulations—your Idle RPG is live!**

---

## 6  •  Update & Redeploy

1. Make edits locally (HTML/CSS/JS).  
2. Commit and push to `main`.  
3. The *Deploy to GitHub Pages* workflow runs automatically and updates the live site.

---

## 7  •  Troubleshooting

| Scenario | Fix |
|----------|-----|
| **Workflow tab shows red “X”** | Click the failed job → *Logs* to see details (missing file paths, syntax errors). |
| **404 on site URL** | Make sure the workflow finished successfully and that Pages is enabled. |
| **Assets not loading** | Verify folder structure under `rpg-game/` and that relative links are correct. |

---

## 8  •  Custom Domains (Optional)

1. Buy or configure a domain.  
2. In **Settings → Pages**, enter your domain under **Custom domain**.  
3. Add required `A` or `CNAME` records per GitHub’s instructions.  

---

### You’re Done

Your project now enjoys free, globally-cached hosting courtesy of GitHub Pages.  
Have fun expanding your Idle RPG: integrate an auction house, add multiplayer, or stylize the UI—every commit redeploys automatically.  
Happy adventuring!
