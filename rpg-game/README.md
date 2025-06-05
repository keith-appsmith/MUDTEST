# Idle RPG (Web)

A browser-based, text-driven idle MUD (Multi-User Dungeon) that you can run locally with nothing more than a modern web browser.  
The project combines a retro command-line experience with a sleek, responsive dark UI—playable on desktop and mobile alike.

## Core Features

- **Command-line Gameplay** – Type commands such as `mine iron_ore`, `craft iron_sword`, `sell wooden_shield` and watch real-time log updates.
- **Player HUD** – Top bar showing name, level, XP bar, gold and energy that updates live.
- **Sidebar Navigation** – Sections for Dashboard, Inventory, Crafting, Quests, Auction House and Settings.
- **Responsive Layout** – Collapsible sidebar and flexible panels that adapt seamlessly to smaller screens.
- **Extensible Panels** – Terminal shares space with additional components (e.g. quest progress, inventory preview) for future growth.
- **Modern Dark Theme** – Subtle borders, shadows and accessible color-coded messages (success, warning, error, system).

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/idle-rpg.git
cd idle-rpg/rpg-game
```

### 2. Serve the Site

Because everything is plain HTML/CSS/JS, any static server (or even opening the file directly) will work.  
Recommended options:

| Method | Command |
|--------|---------|
| VS Code Live Server | *Open folder → “Go Live” button* |
| Python 3 | `python -m http.server 8080` |
| Node http-server | `npx http-server -p 8080` |

Navigate to `http://localhost:8080` (or the port you chose) and start playing.

## Gameplay Basics

### Primary Commands

| Command | Description |
|---------|-------------|
| `help` | List all available commands |
| `look` / `examine [target]` | Get location or object details |
| `inventory` / `i` | Show your items |
| `stats` | Show player stats |
| `mine [resource]` | Mine `iron_ore`, `gold_ore`, `stone`, etc. |
| `craft [item]` | Craft items such as `iron_sword`, `health_potion` |
| `buy [item]` / `sell [item]` | Trade with NPC merchants |
| `quest` | View quests. `quest accept <name>` or `quest complete <name>` |
| `clear` | Clear the game log |

### Mechanics Snapshot

- **Energy** – Most actions cost energy; rest or wait to recover.
- **XP & Levels** – Earn XP by mining, crafting, quests; automatic level-ups increase thresholds.
- **Inventory** – Simple key/value store; quantities change via actions.
- **Random Rolls** – Mining & crafting have success chances for a lightweight RNG feel.

## Codebase Structure

```
rpg-game/
├── index.html          # Main HTML skeleton
├── css/
│   └── styles.css      # Dark theme + responsiveness
├── js/
│   └── script.js       # Game state, command parser, UI logic
└── README.md           # You are here
```

Individual modules are kept minimal and vanilla-JS to stay framework-agnostic.  
Feel free to migrate to React/Vue/Svelte if your project grows—UI components are already logically separated.

## Roadmap / Planned Features

- **Auction House (Multiplayer)**  
  List items for sale, bid/buy mechanics, real-time updates via WebSocket or Firebase.
- **Persistent Backend**  
  Save characters, inventory, and listings in a database (Supabase, MongoDB, Postgres, etc.).
- **Idle Timers**  
  Background activities (farming, expeditions) that accrue resources while offline.
- **Party & Chat**  
  Cooperative gameplay, shared quests, in-game chat panel.
- **Accessibility Pass**  
  Keyboard-only navigation, ARIA landmarks, color-blind palette options.

## Contributing

Pull requests, feature suggestions and bug reports are welcome!  
1. Fork the repo, create a branch (`git checkout -b feature/awesome`), commit, push and open a PR.  
2. Use clear commit messages and keep styles consistent with _styles.css_.  
3. For substantial changes, please open an issue first to discuss what you would like to change.

## Credits

Created by **[Your Name]** – inspired by classic MUDs and modern idle games.  
Fonts: [Source Code Pro](https://fonts.google.com/specimen/Source+Code+Pro), [Roboto](https://fonts.google.com/specimen/Roboto).  
Icons: [Font Awesome](https://fontawesome.com).

## License

This project is licensed under the **MIT License** – see `LICENSE` for details.  
Feel free to use, modify and distribute for personal or commercial purposes.
