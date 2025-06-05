/**
 * Idle RPG Game - Main JavaScript
 * Handles UI interactions, command processing, and game state
 */

document.addEventListener('DOMContentLoaded', function() {
    // Game state
    const gameState = {
        player: {
            name: 'Adventurer',
            level: 1,
            xp: 250,
            maxXp: 1000,
            gold: 100,
            energy: 80,
            maxEnergy: 100,
            inventory: {
                'Health Potion': 3,
                'Iron Ore': 5,
                'Wooden Shield': 1
            },
            location: 'Town Square'
        },
        commandHistory: [],
        historyIndex: -1,
        activities: {
            mining: false,
            crafting: false,
            questing: false
        }
    };

    // Cache DOM elements
    const elements = {
        sidebar: document.querySelector('.sidebar'),
        sidebarToggle: document.getElementById('sidebar-toggle-btn'),
        commandInput: document.getElementById('command-input'),
        gameLog: document.getElementById('game-log'),
        playerName: document.getElementById('player-name'),
        playerLevel: document.getElementById('player-level'),
        playerGold: document.getElementById('player-gold'),
        xpProgress: document.getElementById('xp-progress'),
        energyProgress: document.getElementById('energy-progress')
    };

    // Initialize UI
    initializeUI();

    /**
     * Initialize UI elements and set up event listeners
     */
    function initializeUI() {
        // Update player stats in the UI
        updatePlayerStats();
        
        // Set up sidebar toggle for mobile
        elements.sidebarToggle.addEventListener('click', toggleSidebar);
        
        // Set up command input handling
        elements.commandInput.addEventListener('keydown', handleCommandInput);
        
        // Focus the command input when clicking anywhere in the terminal
        document.querySelector('.terminal-body').addEventListener('click', function() {
            elements.commandInput.focus();
        });
        
        // Auto-scroll the game log to bottom
        scrollGameLogToBottom();
    }

    /**
     * Toggle sidebar expanded/collapsed state for mobile view
     */
    function toggleSidebar() {
        elements.sidebar.classList.toggle('expanded');
    }

    /**
     * Handle command input from the terminal
     * @param {KeyboardEvent} event - The keyboard event
     */
    function handleCommandInput(event) {
        // Handle Enter key to process command
        if (event.key === 'Enter') {
            const command = elements.commandInput.value.trim().toLowerCase();
            
            if (command) {
                // Add command to history
                gameState.commandHistory.unshift(command);
                gameState.historyIndex = -1;
                
                // Limit history size
                if (gameState.commandHistory.length > 50) {
                    gameState.commandHistory.pop();
                }
                
                // Display command in the game log
                addToGameLog(command, 'command', '> ');
                
                // Process the command
                processCommand(command);
                
                // Clear the input field
                elements.commandInput.value = '';
            }
        }
        
        // Handle up/down arrow keys for command history
        else if (event.key === 'ArrowUp') {
            event.preventDefault();
            navigateCommandHistory(1);
        }
        else if (event.key === 'ArrowDown') {
            event.preventDefault();
            navigateCommandHistory(-1);
        }
    }

    /**
     * Navigate through command history using arrow keys
     * @param {number} direction - 1 for up (older), -1 for down (newer)
     */
    function navigateCommandHistory(direction) {
        if (gameState.commandHistory.length === 0) return;
        
        gameState.historyIndex += direction;
        
        // Bounds checking
        if (gameState.historyIndex >= gameState.commandHistory.length) {
            gameState.historyIndex = gameState.commandHistory.length - 1;
        } else if (gameState.historyIndex < -1) {
            gameState.historyIndex = -1;
        }
        
        // Set input value from history or clear it
        if (gameState.historyIndex === -1) {
            elements.commandInput.value = '';
        } else {
            elements.commandInput.value = gameState.commandHistory[gameState.historyIndex];
        }
        
        // Move cursor to end of input
        setTimeout(() => {
            elements.commandInput.selectionStart = elements.commandInput.value.length;
            elements.commandInput.selectionEnd = elements.commandInput.value.length;
        }, 0);
    }

    /**
     * Process a command entered by the user
     * @param {string} command - The command to process
     */
    function processCommand(command) {
        const parts = command.split(' ');
        const action = parts[0];
        const target = parts.slice(1).join(' ');
        
        switch (action) {
            case 'help':
                showHelp();
                break;
                
            case 'look':
            case 'examine':
                lookAround(target);
                break;
                
            case 'inventory':
            case 'inv':
            case 'i':
                showInventory();
                break;
                
            case 'stats':
            case 'status':
                showPlayerStats();
                break;
                
            case 'mine':
                mineResource(target);
                break;
                
            case 'craft':
                craftItem(target);
                break;
                
            case 'buy':
                buyItem(target);
                break;
                
            case 'sell':
                sellItem(target);
                break;
                
            case 'quest':
                questInfo(target);
                break;
                
            case 'clear':
                clearGameLog();
                break;
                
            default:
                addToGameLog(`Unknown command: '${command}'. Type 'help' for a list of commands.`, 'error-message');
        }
    }

    /**
     * Add a message to the game log
     * @param {string} message - The message to add
     * @param {string} [type=''] - Message type (system-message, success-message, warning-message, error-message, command)
     * @param {string} [prefix=''] - Optional prefix for the message
     */
    function addToGameLog(message, type = '', prefix = '') {
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.textContent = prefix + message;
        
        elements.gameLog.appendChild(entry);
        scrollGameLogToBottom();
    }

    /**
     * Scroll the game log to the bottom
     */
    function scrollGameLogToBottom() {
        elements.gameLog.scrollTop = elements.gameLog.scrollHeight;
    }

    /**
     * Clear the game log
     */
    function clearGameLog() {
        elements.gameLog.innerHTML = '';
        addToGameLog('Game log cleared.', 'system-message');
    }

    /**
     * Update player stats in the UI
     */
    function updatePlayerStats() {
        const player = gameState.player;
        
        // Update text elements
        elements.playerName.textContent = player.name;
        elements.playerLevel.textContent = player.level;
        elements.playerGold.textContent = player.gold;
        
        // Update progress bars
        const xpPercent = (player.xp / player.maxXp) * 100;
        elements.xpProgress.style.width = `${xpPercent}%`;
        elements.xpProgress.parentElement.querySelector('.progress-text').textContent = 
            `${player.xp} / ${player.maxXp}`;
        
        const energyPercent = (player.energy / player.maxEnergy) * 100;
        elements.energyProgress.style.width = `${energyPercent}%`;
        elements.energyProgress.parentElement.querySelector('.progress-text').textContent = 
            `${player.energy} / ${player.maxEnergy}`;
    }

    /**
     * Update player resources (gold, XP, energy)
     * @param {Object} changes - Object containing resource changes
     */
    function updatePlayerResources(changes) {
        const player = gameState.player;
        
        // Update gold
        if (changes.gold) {
            player.gold += changes.gold;
            if (player.gold < 0) player.gold = 0;
        }
        
        // Update XP
        if (changes.xp) {
            player.xp += changes.xp;
            
            // Level up if XP threshold reached
            if (player.xp >= player.maxXp) {
                player.level++;
                player.xp -= player.maxXp;
                player.maxXp = Math.floor(player.maxXp * 1.5);
                addToGameLog(`Congratulations! You've reached level ${player.level}!`, 'success-message');
            }
        }
        
        // Update energy
        if (changes.energy) {
            player.energy += changes.energy;
            if (player.energy < 0) player.energy = 0;
            if (player.energy > player.maxEnergy) player.energy = player.maxEnergy;
            
            // Warn if energy is low
            if (player.energy < 20) {
                addToGameLog('Your energy is getting low. Consider resting soon.', 'warning-message');
            }
        }
        
        // Update UI
        updatePlayerStats();
    }

    /**
     * Update player inventory
     * @param {string} item - Item name
     * @param {number} amount - Amount to add (negative to remove)
     * @returns {boolean} - Whether the operation was successful
     */
    function updateInventory(item, amount) {
        const inventory = gameState.player.inventory;
        
        // Add new item or update existing
        if (amount > 0 || (inventory[item] && inventory[item] + amount >= 0)) {
            inventory[item] = (inventory[item] || 0) + amount;
            
            // Remove item if quantity is 0
            if (inventory[item] <= 0) {
                delete inventory[item];
            }
            
            return true;
        }
        
        return false;
    }

    // Command implementations

    /**
     * Show help information
     */
    function showHelp() {
        addToGameLog('Available commands:', 'system-message');
        addToGameLog('help - Show this help message', 'system-message');
        addToGameLog('look/examine [target] - Look around or examine something', 'system-message');
        addToGameLog('inventory/inv/i - Show your inventory', 'system-message');
        addToGameLog('stats/status - Show your character stats', 'system-message');
        addToGameLog('mine [resource] - Mine a resource (e.g., mine iron_ore)', 'system-message');
        addToGameLog('craft [item] - Craft an item (e.g., craft iron_sword)', 'system-message');
        addToGameLog('buy [item] - Buy an item from a merchant', 'system-message');
        addToGameLog('sell [item] - Sell an item to a merchant', 'system-message');
        addToGameLog('quest [name/accept/complete] - View or manage quests', 'system-message');
        addToGameLog('clear - Clear the game log', 'system-message');
    }

    /**
     * Look around the current location or examine a specific target
     * @param {string} target - The target to examine (optional)
     */
    function lookAround(target) {
        if (!target) {
            addToGameLog(`You are in the ${gameState.player.location}.`, '');
            
            switch (gameState.player.location) {
                case 'Town Square':
                    addToGameLog('You see merchants, a blacksmith, and adventurers gathering around.', '');
                    addToGameLog('The auction house is to the east, and the mines are to the west.', '');
                    break;
                    
                case 'Mines':
                    addToGameLog('Dark tunnels stretch before you, glittering with mineral deposits.', '');
                    addToGameLog('You can mine resources here to craft items or sell for gold.', '');
                    break;
                    
                case 'Auction House':
                    addToGameLog('Players are busy trading items and resources.', '');
                    addToGameLog('You can buy items from other players or list your own for sale.', '');
                    break;
            }
        } else {
            // Examine specific targets
            switch (target) {
                case 'merchant':
                case 'merchants':
                    addToGameLog('The merchants have various goods for sale.', '');
                    addToGameLog('You can buy items with the "buy" command.', '');
                    break;
                    
                case 'blacksmith':
                    addToGameLog('The blacksmith is busy hammering away at a glowing piece of metal.', '');
                    addToGameLog('You can craft weapons and armor here with the right materials.', '');
                    break;
                    
                case 'mines':
                case 'mine':
                    addToGameLog('The entrance to the mines lies to the west of town.', '');
                    addToGameLog('You can find valuable resources there, but be careful.', '');
                    break;
                    
                default:
                    addToGameLog(`You don't see anything special about ${target}.`, '');
            }
        }
    }

    /**
     * Show the player's inventory
     */
    function showInventory() {
        const inventory = gameState.player.inventory;
        const items = Object.keys(inventory);
        
        if (items.length === 0) {
            addToGameLog('Your inventory is empty.', '');
            return;
        }
        
        addToGameLog('Your inventory contains:', '');
        items.forEach(item => {
            addToGameLog(`${item} (${inventory[item]})`, '');
        });
    }

    /**
     * Show detailed player stats
     */
    function showPlayerStats() {
        const player = gameState.player;
        
        addToGameLog('Player Stats:', 'system-message');
        addToGameLog(`Name: ${player.name}`, '');
        addToGameLog(`Level: ${player.level}`, '');
        addToGameLog(`XP: ${player.xp}/${player.maxXp}`, '');
        addToGameLog(`Gold: ${player.gold}`, '');
        addToGameLog(`Energy: ${player.energy}/${player.maxEnergy}`, '');
        addToGameLog(`Location: ${player.location}`, '');
    }

    /**
     * Mine a resource
     * @param {string} resource - The resource to mine
     */
    function mineResource(resource) {
        // Check if player has energy
        if (gameState.player.energy < 10) {
            addToGameLog('You are too tired to mine. Rest to regain energy.', 'error-message');
            return;
        }
        
        // Process different resources
        switch (resource) {
            case 'iron_ore':
            case 'iron':
                const success = Math.random() > 0.3; // 70% success rate
                
                if (success) {
                    updateInventory('Iron Ore', 1);
                    updatePlayerResources({ energy: -10, xp: 15 });
                    addToGameLog('You successfully mined iron ore!', 'success-message');
                    addToGameLog('(+1 Iron Ore, -10 Energy, +15 XP)', '');
                } else {
                    updatePlayerResources({ energy: -5 });
                    addToGameLog('You failed to find any iron ore.', 'warning-message');
                    addToGameLog('(-5 Energy)', '');
                }
                break;
                
            case 'gold_ore':
            case 'gold':
                const goldSuccess = Math.random() > 0.6; // 40% success rate
                
                if (goldSuccess) {
                    updateInventory('Gold Ore', 1);
                    updatePlayerResources({ energy: -15, xp: 30 });
                    addToGameLog('You successfully mined gold ore!', 'success-message');
                    addToGameLog('(+1 Gold Ore, -15 Energy, +30 XP)', '');
                } else {
                    updatePlayerResources({ energy: -8 });
                    addToGameLog('You failed to find any gold ore.', 'warning-message');
                    addToGameLog('(-8 Energy)', '');
                }
                break;
                
            case 'stone':
                updateInventory('Stone', 1);
                updatePlayerResources({ energy: -5, xp: 5 });
                addToGameLog('You mined some stone.', 'success-message');
                addToGameLog('(+1 Stone, -5 Energy, +5 XP)', '');
                break;
                
            default:
                addToGameLog(`You can't mine ${resource || 'nothing'}.`, 'error-message');
                addToGameLog('Try "mine iron_ore", "mine gold_ore", or "mine stone".', '');
        }
    }

    /**
     * Craft an item
     * @param {string} item - The item to craft
     */
    function craftItem(item) {
        switch (item) {
            case 'iron_sword':
                if (gameState.player.inventory['Iron Ore'] >= 3) {
                    updateInventory('Iron Ore', -3);
                    updateInventory('Iron Sword', 1);
                    updatePlayerResources({ xp: 50 });
                    addToGameLog('You crafted an Iron Sword!', 'success-message');
                    addToGameLog('(-3 Iron Ore, +1 Iron Sword, +50 XP)', '');
                } else {
                    addToGameLog('You need 3 Iron Ore to craft an Iron Sword.', 'error-message');
                }
                break;
                
            case 'health_potion':
                if (gameState.player.inventory['Herbs'] >= 2) {
                    updateInventory('Herbs', -2);
                    updateInventory('Health Potion', 1);
                    updatePlayerResources({ xp: 20 });
                    addToGameLog('You crafted a Health Potion!', 'success-message');
                    addToGameLog('(-2 Herbs, +1 Health Potion, +20 XP)', '');
                } else {
                    addToGameLog('You need 2 Herbs to craft a Health Potion.', 'error-message');
                }
                break;
                
            default:
                addToGameLog(`You don't know how to craft ${item || 'that'}.`, 'error-message');
                addToGameLog('Try "craft iron_sword" or "craft health_potion".', '');
        }
    }

    /**
     * Buy an item from a merchant
     * @param {string} item - The item to buy
     */
    function buyItem(item) {
        const prices = {
            'health_potion': 20,
            'herbs': 5,
            'iron_ore': 15
        };
        
        if (!prices[item]) {
            addToGameLog(`The merchant doesn't sell ${item || 'that'}.`, 'error-message');
            return;
        }
        
        const price = prices[item];
        
        if (gameState.player.gold >= price) {
            updatePlayerResources({ gold: -price });
            
            // Convert item name format
            const formattedItem = item
                .split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            
            updateInventory(formattedItem, 1);
            addToGameLog(`You bought a ${formattedItem} for ${price} gold.`, 'success-message');
        } else {
            addToGameLog(`You don't have enough gold to buy ${item}.`, 'error-message');
            addToGameLog(`Price: ${price} gold, Your gold: ${gameState.player.gold}`, '');
        }
    }

    /**
     * Sell an item to a merchant
     * @param {string} item - The item to sell
     */
    function sellItem(item) {
        // Convert from command format to inventory format
        const formattedItem = item
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        
        const prices = {
            'Health Potion': 10,
            'Iron Ore': 8,
            'Gold Ore': 25,
            'Iron Sword': 40,
            'Wooden Shield': 15,
            'Stone': 2,
            'Herbs': 3
        };
        
        if (!gameState.player.inventory[formattedItem] || gameState.player.inventory[formattedItem] <= 0) {
            addToGameLog(`You don't have any ${formattedItem} to sell.`, 'error-message');
            return;
        }
        
        const price = prices[formattedItem] || 1; // Default price of 1 if not specified
        
        updateInventory(formattedItem, -1);
        updatePlayerResources({ gold: price });
        
        addToGameLog(`You sold a ${formattedItem} for ${price} gold.`, 'success-message');
    }

    /**
     * Quest information and management
     * @param {string} action - The quest action or name
     */
    function questInfo(action) {
        if (!action) {
            addToGameLog('Available quests:', 'system-message');
            addToGameLog('- Blacksmith\'s Request (collect 10 Iron Ore)', '');
            addToGameLog('- Herbalist\'s Need (collect 5 Herbs)', '');
            addToGameLog('Use "quest [name]" for details or "quest accept [name]" to accept a quest.', '');
            return;
        }
        
        if (action === 'blacksmith' || action === 'blacksmiths_request') {
            addToGameLog('Blacksmith\'s Request', 'system-message');
            addToGameLog('The local blacksmith needs 10 Iron Ore for a special order.', '');
            addToGameLog('Reward: 100 gold, 200 XP', '');
        } else if (action === 'herbalist' || action === 'herbalists_need') {
            addToGameLog('Herbalist\'s Need', 'system-message');
            addToGameLog('The herbalist is running low on supplies and needs 5 Herbs.', '');
            addToGameLog('Reward: 50 gold, 100 XP', '');
        } else if (action.startsWith('accept')) {
            const questName = action.split(' ')[1];
            addToGameLog(`You've accepted the ${questName} quest!`, 'success-message');
            addToGameLog('Track your progress in the Quest panel.', '');
        } else if (action.startsWith('complete')) {
            const questName = action.split(' ')[1];
            
            if (questName === 'blacksmith' && gameState.player.inventory['Iron Ore'] >= 10) {
                updateInventory('Iron Ore', -10);
                updatePlayerResources({ gold: 100, xp: 200 });
                addToGameLog('You\'ve completed the Blacksmith\'s Request!', 'success-message');
                addToGameLog('Reward received: 100 gold, 200 XP', 'success-message');
            } else {
                addToGameLog('You haven\'t met the requirements to complete this quest.', 'error-message');
            }
        } else {
            addToGameLog(`Unknown quest or action: ${action}`, 'error-message');
        }
    }
});
