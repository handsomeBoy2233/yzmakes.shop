// Nectar & Vine - Core Application Logic

// --- STATE MANAGEMENT ---
let appState = {
    currentCategory: 'All',
    searchQuery: '',
    showFavorites: false,
    favorites: JSON.parse(localStorage.getItem('nectar_favorites')) || [],
    currentPage: 1,
    itemsPerPage: 24
};

// --- DOM ELEMENTS ---
const elements = {
    sidebarCategoryList: document.getElementById('sidebarCategoryList'),
    mobileCategoriesScroll: document.getElementById('mobileCategoriesScroll'),
    statsCategoryCount: document.getElementById('statsCategoryCount'),
    searchInput: document.getElementById('searchInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    favFilterBtn: document.getElementById('favFilterBtn'),
    favBadge: document.getElementById('favBadge'),
    resultsTitle: document.getElementById('resultsTitle'),
    resultsCount: document.getElementById('resultsCount'),
    drinksGrid: document.getElementById('drinksGrid'),
    paginationControls: document.getElementById('paginationControls'),
    emptyState: document.getElementById('emptyState'),
    resetFiltersBtn: document.getElementById('resetFiltersBtn'),
    gridView: document.getElementById('gridView'),
    detailView: document.getElementById('detailView'),
    backToGridBtn: document.getElementById('backToGridBtn'),
    detailFavToggleBtn: document.getElementById('detailFavToggleBtn'),
    favBtnText: document.getElementById('favBtnText'),
    videoIframe: document.getElementById('videoIframe'),
    detailCategory: document.getElementById('detailCategory'),
    detailPart: document.getElementById('detailPart'),
    detailTitle: document.getElementById('detailTitle'),
    detailIngredients: document.getElementById('detailIngredients'),
    detailInstructions: document.getElementById('detailInstructions'),
    relatedCategoryName: document.getElementById('relatedCategoryName'),
    relatedCarousel: document.getElementById('relatedCarousel'),
    mobileMenuToggle: document.getElementById('mobileMenuToggle'),
    appSidebar: document.getElementById('appSidebar'),
    drawerOverlay: document.getElementById('drawerOverlay')
};

// --- RECIPE INGREDIENT & INSTRUCTION GENERATOR (100% Authentic Mock Recipe System) ---
function generateRecipe(title, category) {
    const titleLower = title.toLowerCase();
    let ingredients = [];
    let instructions = [];

    // Base liquors and modifiers maps
    let bases = [];
    let mixers = [];
    let garnishes = [];

    // Detect fruits/flavors in the name
    if (titleLower.includes('strawberry')) {
        ingredients.push("4 Fresh Strawberries (muddled)");
        mixers.push("0.5 oz Strawberry Puree");
    }
    if (titleLower.includes('blueberry') || titleLower.includes('berry')) {
        ingredients.push("8-10 Fresh Blueberries");
        mixers.push("0.5 oz Blueberry Simple Syrup");
    }
    if (titleLower.includes('blackberry')) {
        ingredients.push("5 Fresh Blackberries");
        mixers.push("0.5 oz Blackberry Cordial");
    }
    if (titleLower.includes('pineapple')) {
        mixers.push("1.5 oz Fresh Pineapple Juice");
    }
    if (titleLower.includes('coconut') || titleLower.includes('colada')) {
        mixers.push("1.5 oz Cream of Coconut (Coco Lopez)");
        mixers.push("0.5 oz Coconut Milk");
    }
    if (titleLower.includes('lime') || titleLower.includes('mojito') || titleLower.includes('margarita')) {
        mixers.push("0.75 oz Freshly Squeezed Lime Juice");
    }
    if (titleLower.includes('lemon') || titleLower.includes('sour') || titleLower.includes('lemonade')) {
        mixers.push("0.75 oz Freshly Squeezed Lemon Juice");
    }
    if (titleLower.includes('grapefruit') || titleLower.includes('paloma')) {
        mixers.push("2 oz Pink Grapefruit Juice");
        mixers.push("0.5 oz Lime Juice");
        garnishes.push("Grapefruit wedge");
    }
    if (titleLower.includes('peach')) {
        mixers.push("1 oz White Peach Puree");
        garnishes.push("Peach slice");
    }
    if (titleLower.includes('apple') || titleLower.includes('cider')) {
        mixers.push("2 oz Apple Cider or Green Apple Juice");
        garnishes.push("Cinnamon stick or apple fan");
    }
    if (titleLower.includes('orange') || titleLower.includes('sunrise') || titleLower.includes('cosmo')) {
        mixers.push("1 oz Fresh Orange Juice");
    }
    if (titleLower.includes('watermelon')) {
        ingredients.push("3 Cubes of Fresh Watermelon (muddled)");
        mixers.push("1 oz Watermelon Juice");
    }
    if (titleLower.includes('mint')) {
        ingredients.push("8-10 Fresh Mint Leaves");
    }
    if (titleLower.includes('honey') || titleLower.includes('bee')) {
        mixers.push("0.75 oz Honey Water Syrup (3:1 ratio)");
    }
    if (titleLower.includes('ginger') || titleLower.includes('mule')) {
        mixers.push("Top with Fiery Ginger Beer");
    }
    if (titleLower.includes('cucumber')) {
        ingredients.push("4 Cucumber slices (muddled)");
    }
    if (titleLower.includes('cherry')) {
        ingredients.push("3 Brandied Cherries");
        mixers.push("0.25 oz Maraschino Cherry Juice");
    }
    if (titleLower.includes('hibiscus')) {
        mixers.push("0.75 oz House-made Hibiscus Syrup");
        garnishes.push("Edible Hibiscus Flower");
    }
    if (titleLower.includes('melon') || titleLower.includes('midori')) {
        bases.push("1 oz Midori Melon Liqueur");
    }

    // Determine main base alcohol based on category and title keywords
    const isMocktail = category.includes("Mocktails");
    
    if (isMocktail) {
        bases.push("2 oz Non-Alcoholic Botanical Spirit (or Club Soda base)");
        ingredients.push("0.5 oz Agave Nectar or Simple Syrup");
    } else {
        if (titleLower.includes('whiskey') || titleLower.includes('bourbon') || titleLower.includes('manhattan') || titleLower.includes('derby') || titleLower.includes('sour')) {
            bases.push("2 oz Premium Bourbon or Rye Whiskey");
        } else if (titleLower.includes('tequila') || titleLower.includes('margarita') || titleLower.includes('paloma') || titleLower.includes('sunrise')) {
            bases.push("2 oz Blanco or Reposado Tequila");
            if (titleLower.includes('mezcal')) bases = ["1.5 oz Artisanal Mezcal", "0.5 oz Blanco Tequila"];
        } else if (titleLower.includes('gin') || titleLower.includes('aviation') || titleLower.includes('gimlet') || titleLower.includes('negroni')) {
            bases.push("2 oz London Dry Gin");
        } else if (titleLower.includes('rum') || titleLower.includes('mojito') || titleLower.includes('daiquiri') || titleLower.includes('colada') || titleLower.includes('painkiller') || titleLower.includes('mai tai')) {
            bases.push("2 oz Aged White Rum");
            if (titleLower.includes('dark') || titleLower.includes('painkiller') || titleLower.includes('tai')) {
                bases = ["1.5 oz Amber Rum", "0.5 oz Dark Overproof Float"];
            }
        } else if (titleLower.includes('vodka') || titleLower.includes('martini') || titleLower.includes('mule') || titleLower.includes('cosmo') || titleLower.includes('screwdriver') || titleLower.includes('russian')) {
            bases.push("2 oz Single-Estate Vodka");
        } else if (titleLower.includes('aperol') || titleLower.includes('spritz') || titleLower.includes('bloom')) {
            bases.push("2 oz Aperol Aperitivo");
        } else {
            // Default creative category liquor
            bases.push("1.5 oz Vodka or White Rum");
        }

        // Add secondary modifiers
        if (titleLower.includes('margarita') || titleLower.includes('sidecar') || titleLower.includes('cosmo')) {
            bases.push("0.75 oz Cointreau or Triple Sec");
        }
        if (titleLower.includes('martini')) {
            if (titleLower.includes('dirty')) {
                bases = ["2.5 oz Gin or Vodka", "0.5 oz Dry Vermouth"];
                mixers.push("0.5 oz Savory Olive Brine");
                garnishes.push("3 Spanish Queen Olives");
            } else if (titleLower.includes('espresso')) {
                bases = ["1.5 oz Vodka", "1 oz Coffee Liqueur"];
                mixers.push("1 oz Freshly Brewed Espresso");
                mixers.push("0.25 oz Demerara Syrup");
                garnishes.push("3 Roasted Espresso Beans");
            } else {
                bases = ["2.5 oz London Dry Gin", "0.5 oz Dry Vermouth"];
                garnishes.push("Lemon twist or cocktail onion");
            }
        }
        if (titleLower.includes('negroni')) {
            bases = ["1 oz Gin", "1 oz Campari", "1 oz Sweet Vermouth"];
            garnishes.push("Orange peel");
        }
        if (titleLower.includes('spritz') || titleLower.includes('mimosa') || titleLower.includes('royale') || titleLower.includes('sparkle') || titleLower.includes('champagne')) {
            mixers.push("Top with 3 oz Chilled Prosecco or Champagne");
        }
        if (titleLower.includes('sour') && !titleLower.includes('whiskey')) {
            ingredients.push("0.5 oz Organic Agave or Simple Syrup");
            ingredients.push("1 Fresh Egg White (or Aqua Faba for foam)");
        }
        if (titleLower.includes('whiskey sour') || titleLower.includes('new york sour')) {
            ingredients.push("0.75 oz Rich Simple Syrup");
            ingredients.push("1 Fresh Egg White");
            if (titleLower.includes('new york')) {
                mixers.push("0.5 oz Fruity Red Wine Float (e.g. Shiraz or Cabernet)");
            }
        }
    }

    // Default modifiers if empty
    if (mixers.length === 0 && ingredients.length <= 1) {
        mixers.push("0.75 oz Demerara Simple Syrup");
        mixers.push("0.5 oz Lemon Juice");
    }

    // Combine everything into a nicely formatted list
    let allIngredients = [...bases, ...mixers, ...ingredients];
    
    // De-duplicate any formatting items
    allIngredients = Array.from(new Set(allIngredients));

    // Standardize garnishes if empty
    if (garnishes.length === 0) {
        if (titleLower.includes('mojito') || titleLower.includes('mint')) {
            garnishes.push("Fresh slapped mint sprig");
        } else if (titleLower.includes('margarita') || titleLower.includes('sour')) {
            garnishes.push("Dehydrated lime wheel");
            if (titleLower.includes('margarita')) {
                garnishes.push("Flaky sea salt rim");
            }
        } else if (titleLower.includes('mule')) {
            garnishes.push("Fresh lime wedge and mint");
        } else {
            garnishes.push("Edible flower or citrus peel wheel");
        }
    }

    garnishes.forEach(g => {
        allIngredients.push(`${g} (for garnish)`);
    });

    // Make instructions based on type
    if (titleLower.includes('mojito') || titleLower.includes('smash') || titleLower.includes('muddle')) {
        instructions.push("Add fresh fruits/herbs (mint, berries, cucumber) and syrup into the bottom of a highball glass.");
        instructions.push("Gently muddle to release essential oils and juices without shredding the herb leaves.");
        instructions.push("Fill the glass halfway with crushed ice, then pour in the spirits and citrus juice.");
        instructions.push("Stir thoroughly from the bottom up to integrate the muddled ingredients.");
        instructions.push("Top off with extra crushed ice, add the mixers (soda/ginger beer), and garnish elegantly.");
    } else if (titleLower.includes('martini') || titleLower.includes('negroni') || titleLower.includes('manhattan') || titleLower.includes('classic')) {
        instructions.push("Chill your serving glass (coupe or martini glass) with ice and water.");
        instructions.push("Combine all liquid ingredients in a mixing glass filled with fresh, solid ice blocks.");
        instructions.push("Stir continuously for 30-45 seconds until the mixing glass is frosty and fully diluted.");
        instructions.push("Discard ice from the serving glass and strain the cocktail cleanly into it.");
        instructions.push("Express citrus peel oils over the surface of the drink and drop the garnish in.");
    } else if (titleLower.includes('spritz') || titleLower.includes('fizz') || titleLower.includes('mimosa') || titleLower.includes('layer')) {
        instructions.push("Fill a large wine glass or highball glass with generous cubes of ice.");
        instructions.push("Pour in the botanical syrup, citrus juice, and base spirits first.");
        instructions.push("Slowly top with chilled Prosecco, Champagne, or soda water to maintain carbonation.");
        instructions.push("Stir once very gently with a barspoon to lift the ingredients.");
        instructions.push("Garnish with fresh fruit slices or edible herbs.");
    } else {
        // Standard Shaken drink (Sour, Daiquiri, Margarita, etc.)
        instructions.push("Rim the cocktail glass if required (salt or sugar) and set aside.");
        instructions.push("Add base spirits, citrus juices, syrups, and egg white (if using) to a shaker tin.");
        if (titleLower.includes('sour') && titleLower.includes('egg')) {
            instructions.push("Perform a 'dry shake' (without ice) for 15 seconds to emulsify the egg white into a thick foam.");
        }
        instructions.push("Add large ice cubes to the shaker and shake vigorously for 12 seconds until ice-cold.");
        instructions.push("Double strain through a fine mesh strainer into a chilled coupe or rocks glass over fresh ice.");
        if (titleLower.includes('new york sour')) {
            instructions.push("Gently pour the red wine float over the back of a bar spoon to create a beautiful crimson layer on top.");
        }
        instructions.push("Garnish and serve immediately.");
    }

    return { ingredients: allIngredients, instructions: instructions };
}

// --- DYNAMIC DATA PROCESSING & CATEGORY EXTRACTION ---
const categories = [
    'All',
    'Mocktails (Alcohol-Free)',
    'Golden Hour & Sunsets',
    'Fruit Crushes & Ocean Breezes',
    'Tropical & Coladas',
    'Vibrant & Electric Glows',
    'Valentine & Romantic Specials',
    'Botanical & Tea Infusions',
    'Sours',
    'Margaritas',
    'Holiday & Winter Specials',
    'Creamy & Dessert Drinks',
    'Whiskey, Gin & Classics',
    'Mojitos',
    'Martinis',
    'Mules & Smashes',
    'Halloween & Spooky Specials',
    'Wine Cocktails & Sangrias',
    'Daiquiris',
    'Beer Cocktails & Shandy',
    'Creative & Craft Cocktails'
];

// --- INIT APP FUNCTIONS ---
function init() {
    setupCategoriesUI();
    renderDrinksGrid();
    setupEventListeners();
    handleRouting();
    updateFavBadge();
}

// Render the category list on sidebar and mobile header scroll
function setupCategoriesUI() {
    elements.sidebarCategoryList.innerHTML = '';
    elements.mobileCategoriesScroll.innerHTML = '';
    elements.statsCategoryCount.textContent = categories.length - 1; // Exclude 'All'

    categories.forEach(cat => {
        // Count items in category
        const count = cat === 'All' 
            ? DRINKS_DATA.length 
            : DRINKS_DATA.filter(d => d.category === cat).length;

        // Sidebar Item
        const li = document.createElement('li');
        li.className = 'category-item';
        li.innerHTML = `
            <button class="category-btn ${appState.currentCategory === cat ? 'active' : ''}" data-category="${cat}">
                <span>${cat}</span>
                <span class="category-count">${count}</span>
            </button>
        `;
        elements.sidebarCategoryList.appendChild(li);

        // Mobile Scroll Item
        const mobileBtn = document.createElement('button');
        mobileBtn.className = `mobile-cat-btn ${appState.currentCategory === cat ? 'active' : ''}`;
        mobileBtn.setAttribute('data-category', cat);
        mobileBtn.innerHTML = `${cat} <span style="opacity: 0.6; font-size: 0.75rem; margin-left: 2px;">(${count})</span>`;
        elements.mobileCategoriesScroll.appendChild(mobileBtn);
    });
}

// Render Grid cards with filters and pagination applied
function renderDrinksGrid() {
    let filtered = DRINKS_DATA;

    // Apply category filter
    if (appState.currentCategory !== 'All') {
        filtered = filtered.filter(drink => drink.category === appState.currentCategory);
    }

    // Apply search filter
    if (appState.searchQuery.trim() !== '') {
        const query = appState.searchQuery.toLowerCase().trim();
        filtered = filtered.filter(drink => {
            return drink.title.toLowerCase().includes(query) || 
                   drink.category.toLowerCase().includes(query) ||
                   drink.part.toString() === query ||
                   drink.part.toString().includes(query);
        });
    }

    // Apply Favorites filter
    if (appState.showFavorites) {
        filtered = filtered.filter(drink => appState.favorites.includes(drink.part));
    }

    // Update headers and titles
    let titleText = appState.currentCategory === 'All' ? 'All Creations' : appState.currentCategory;
    if (appState.showFavorites) {
        titleText = 'My Bookmarked Favorites';
    }
    elements.resultsTitle.textContent = titleText;
    elements.resultsCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'item' : 'items'}`;

    // Handle Empty State
    if (filtered.length === 0) {
        elements.drinksGrid.style.display = 'none';
        elements.paginationControls.style.display = 'none';
        elements.emptyState.style.display = 'flex';
        return;
    } else {
        elements.drinksGrid.style.display = 'grid';
        elements.emptyState.style.display = 'none';
    }

    // Apply Pagination
    const startIndex = (appState.currentPage - 1) * appState.itemsPerPage;
    const endIndex = startIndex + appState.itemsPerPage;
    const paginatedItems = filtered.slice(startIndex, endIndex);

    // Render Cards
    elements.drinksGrid.innerHTML = '';
    
    // DocumentFragment for batch appending performance
    const fragment = document.createDocumentFragment();

    paginatedItems.forEach(drink => {
        const isFav = appState.favorites.includes(drink.part);
        const card = document.createElement('article');
        card.className = 'drink-card';
        card.setAttribute('data-part', drink.part);
        
        // Emojis for tags
        let catEmoji = "🍹";
        if (drink.category.includes("Mocktail")) catEmoji = "🥤";
        else if (drink.category.includes("Spritz") || drink.category.includes("Glow")) catEmoji = "🥂";
        else if (drink.category.includes("Martini")) catEmoji = "🍸";
        else if (drink.category.includes("Whiskey") || drink.category.includes("Classics")) catEmoji = "🥃";
        else if (drink.category.includes("Margarita")) catEmoji = "🧂";
        else if (drink.category.includes("Wine")) catEmoji = "🍷";
        else if (drink.category.includes("Beer")) catEmoji = "🍺";

        card.innerHTML = `
            <div class="card-image-wrapper skeleton">
                <img class="card-image" src="image/${encodeURIComponent(drink.image)}" alt="${drink.title}" loading="lazy" onload="this.parentElement.classList.remove('skeleton')">
                <div class="card-badge">Part ${drink.part}</div>
                <button class="card-favorite-btn ${isFav ? 'active' : ''}" data-part="${drink.part}" aria-label="Add to Favorites" title="Save Drink">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
            <div class="card-info">
                <span class="card-category">${catEmoji} ${drink.category}</span>
                <h3 class="card-title">${drink.title}</h3>
            </div>
        `;

        // Card navigation click handler
        card.addEventListener('click', (e) => {
            if (e.target.closest('.card-favorite-btn')) return;
            location.hash = `#/drink/${drink.part}`;
        });

        // Favorite click handler
        const favBtn = card.querySelector('.card-favorite-btn');
        favBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(drink.part);
            favBtn.classList.toggle('active');
        });

        fragment.appendChild(card);
    });

    elements.drinksGrid.appendChild(fragment);

    // Render Pagination Controls
    renderPagination(filtered.length);
}

// Render Pagination buttons dynamically
function renderPagination(totalItems) {
    elements.paginationControls.innerHTML = '';
    const totalPages = Math.ceil(totalItems / appState.itemsPerPage);

    if (totalPages <= 1) {
        elements.paginationControls.style.display = 'none';
        return;
    }

    elements.paginationControls.style.display = 'flex';
    const fragment = document.createDocumentFragment();

    // Previous Button
    const prevBtn = document.createElement('button');
    prevBtn.className = `pagination-btn ${appState.currentPage === 1 ? 'disabled' : ''}`;
    prevBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
    `;
    prevBtn.onclick = () => {
        if (appState.currentPage > 1) {
            appState.currentPage--;
            renderDrinksGrid();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    fragment.appendChild(prevBtn);

    // Page Buttons
    const maxPageButtons = 7;
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxPageButtons) {
        const half = Math.floor(maxPageButtons / 2);
        if (appState.currentPage <= half) {
            endPage = maxPageButtons - 2;
            for (let i = 1; i <= endPage; i++) {
                fragment.appendChild(createPageBtn(i));
            }
            fragment.appendChild(createEllipsis());
            fragment.appendChild(createPageBtn(totalPages));
        } else if (appState.currentPage > totalPages - half) {
            startPage = totalPages - maxPageButtons + 3;
            fragment.appendChild(createPageBtn(1));
            fragment.appendChild(createEllipsis());
            for (let i = startPage; i <= totalPages; i++) {
                fragment.appendChild(createPageBtn(i));
            }
        } else {
            fragment.appendChild(createPageBtn(1));
            fragment.appendChild(createEllipsis());
            for (let i = appState.currentPage - 1; i <= appState.currentPage + 1; i++) {
                fragment.appendChild(createPageBtn(i));
            }
            fragment.appendChild(createEllipsis());
            fragment.appendChild(createPageBtn(totalPages));
        }
    } else {
        for (let i = 1; i <= totalPages; i++) {
            fragment.appendChild(createPageBtn(i));
        }
    }

    // Next Button
    const nextBtn = document.createElement('button');
    nextBtn.className = `pagination-btn ${appState.currentPage === totalPages ? 'disabled' : ''}`;
    nextBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
    `;
    nextBtn.onclick = () => {
        if (appState.currentPage < totalPages) {
            appState.currentPage++;
            renderDrinksGrid();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    fragment.appendChild(nextBtn);

    elements.paginationControls.appendChild(fragment);
}

function createPageBtn(pageNum) {
    const btn = document.createElement('button');
    btn.className = `pagination-btn ${appState.currentPage === pageNum ? 'active' : ''}`;
    btn.textContent = pageNum;
    btn.onclick = () => {
        appState.currentPage = pageNum;
        renderDrinksGrid();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return btn;
}

function createEllipsis() {
    const span = document.createElement('span');
    span.className = 'pagination-ellipsis';
    span.textContent = '...';
    return span;
}

// Toggle Favorite Status in State and LocalStorage
function toggleFavorite(partNumber) {
    const index = appState.favorites.indexOf(partNumber);
    if (index === -1) {
        appState.favorites.push(partNumber);
    } else {
        appState.favorites.splice(index, 1);
    }
    localStorage.setItem('nectar_favorites', JSON.stringify(appState.favorites));
    updateFavBadge();
    
    if (appState.showFavorites) {
        renderDrinksGrid();
    }
}

// Update Heart badge count in header
function updateFavBadge() {
    elements.favBadge.textContent = appState.favorites.length;
}

// --- DETAIL VIEW RENDERING ---
function loadDetailView(partNumber) {
    const drink = DRINKS_DATA.find(d => d.part === parseInt(partNumber));
    if (!drink) {
        // Drink not found, redirect to home
        location.hash = '';
        return;
    }

    // Scroll window to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Set simple details
    elements.detailTitle.textContent = drink.title;
    elements.detailPart.textContent = `Part ${drink.part}`;
    elements.detailCategory.textContent = drink.category;
    
    // Set video source
    elements.videoIframe.src = drink.url;

    // Check favorite status for bookmark button
    const isFav = appState.favorites.includes(drink.part);
    if (isFav) {
        elements.detailFavToggleBtn.classList.add('active');
        elements.favBtnText.textContent = 'Bookmarked';
    } else {
        elements.detailFavToggleBtn.classList.remove('active');
        elements.favBtnText.textContent = 'Bookmark';
    }

    // Unbind/re-bind bookmark toggle click
    elements.detailFavToggleBtn.onclick = () => {
        toggleFavorite(drink.part);
        const active = appState.favorites.includes(drink.part);
        elements.detailFavToggleBtn.classList.toggle('active', active);
        elements.favBtnText.textContent = active ? 'Bookmarked' : 'Bookmark';
        
        // Update corresponding cards in background
        const cardFav = document.querySelector(`.drink-card[data-part="${drink.part}"] .card-favorite-btn`);
        if (cardFav) cardFav.classList.toggle('active', active);
    };

    // Generate Ingredients and instructions
    const recipe = generateRecipe(drink.title, drink.category);
    
    // Load ingredients list
    elements.detailIngredients.innerHTML = '';
    recipe.ingredients.forEach(ing => {
        const li = document.createElement('li');
        li.textContent = ing;
        elements.detailIngredients.appendChild(li);
    });

    // Load instructions list
    elements.detailInstructions.innerHTML = '';
    recipe.instructions.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        elements.detailInstructions.appendChild(li);
    });

    // Load Related Drinks (excluding current drink, limited to 6)
    elements.relatedCategoryName.textContent = drink.category;
    elements.relatedCarousel.innerHTML = '';
    
    const relatedList = DRINKS_DATA
        .filter(d => d.category === drink.category && d.part !== drink.part)
        .slice(0, 6);

    if (relatedList.length === 0) {
        // Fallback to any drinks if category contains no others
        elements.relatedCarousel.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">No other creations in this category yet.</p>`;
    } else {
        relatedList.forEach(related => {
            const card = document.createElement('div');
            card.className = 'drink-card';
            card.innerHTML = `
                <div class="card-image-wrapper skeleton">
                    <img class="card-image" src="image/${encodeURIComponent(related.image)}" alt="${related.title}" loading="lazy" onload="this.parentElement.classList.remove('skeleton')">
                    <div class="card-badge">Part ${related.part}</div>
                </div>
                <div class="card-info">
                    <h4 class="card-title" style="font-size: 0.95rem; height: auto; margin-bottom: 0;">${related.title}</h4>
                </div>
            `;
            card.addEventListener('click', () => {
                location.hash = `#/drink/${related.part}`;
            });
            elements.relatedCarousel.appendChild(card);
        });
    }

    // Toggle views
    elements.gridView.style.display = 'none';
    elements.detailView.style.display = 'block';
}

// --- ROUTING HANDLER ---
function handleRouting() {
    const hash = location.hash;
    const drinkRouteMatch = hash.match(/^#\/drink\/(\d+)$/);

    if (drinkRouteMatch) {
        const partNumber = drinkRouteMatch[1];
        loadDetailView(partNumber);
    } else {
        // Default Grid view
        elements.detailView.style.display = 'none';
        elements.gridView.style.display = 'block';
        // Reset video source to stop playing in background
        elements.videoIframe.src = '';
        renderDrinksGrid();
    }
}

// --- EVENT LISTENERS ---
function setupEventListeners() {
    // Category Button Clicks (Sidebar & Mobile)
    document.addEventListener('click', (e) => {
        const catBtn = e.target.closest('.category-btn') || e.target.closest('.mobile-cat-btn');
        if (catBtn) {
            const selectedCategory = catBtn.getAttribute('data-category');
            appState.currentCategory = selectedCategory;
            appState.showFavorites = false; // Turn off favorites when switching categories
            appState.currentPage = 1; // Reset to page 1
            elements.favFilterBtn.classList.remove('active');
            
            // Sync active states on buttons
            setupCategoriesUI();
            
            // Close mobile menu if open
            elements.appSidebar.classList.remove('open');
            elements.drawerOverlay.classList.remove('open');

            // Reset search input if clicked category
            elements.searchInput.value = '';
            appState.searchQuery = '';
            elements.clearSearchBtn.style.display = 'none';

            // Navigate to home first if inside detail page
            if (location.hash !== '') {
                location.hash = '';
            } else {
                renderDrinksGrid();
            }
        }
    });

    // Search Input handler
    elements.searchInput.addEventListener('input', (e) => {
        appState.searchQuery = e.target.value;
        appState.currentPage = 1; // Reset to page 1
        elements.clearSearchBtn.style.display = e.target.value ? 'flex' : 'none';
        
        // Re-render
        if (location.hash !== '') {
            location.hash = ''; // Return to grid when searching
        } else {
            renderDrinksGrid();
        }
    });

    // Clear search
    elements.clearSearchBtn.addEventListener('click', () => {
        elements.searchInput.value = '';
        appState.searchQuery = '';
        appState.currentPage = 1; // Reset to page 1
        elements.clearSearchBtn.style.display = 'none';
        
        if (location.hash !== '') {
            location.hash = '';
        } else {
            renderDrinksGrid();
        }
    });

    // Favorites Filter Button
    elements.favFilterBtn.addEventListener('click', () => {
        appState.showFavorites = !appState.showFavorites;
        appState.currentPage = 1; // Reset to page 1
        elements.favFilterBtn.classList.toggle('active', appState.showFavorites);
        
        if (appState.showFavorites) {
            // Deselect active sidebar categories
            document.querySelectorAll('.category-btn, .mobile-cat-btn').forEach(b => b.classList.remove('active'));
        } else {
            // Reselect the current category
            setupCategoriesUI();
        }

        if (location.hash !== '') {
            location.hash = '';
        } else {
            renderDrinksGrid();
        }
    });

    // Reset Filters button (empty state)
    elements.resetFiltersBtn.addEventListener('click', () => {
        appState.currentCategory = 'All';
        appState.searchQuery = '';
        appState.showFavorites = false;
        appState.currentPage = 1; // Reset to page 1
        elements.searchInput.value = '';
        elements.clearSearchBtn.style.display = 'none';
        elements.favFilterBtn.classList.remove('active');
        
        setupCategoriesUI();
        renderDrinksGrid();
    });

    // Back to Grid button in Detail Page
    elements.backToGridBtn.addEventListener('click', () => {
        location.hash = '';
    });

    // Window Hashchange listener
    window.addEventListener('hashchange', handleRouting);

    // Mobile Menu Drawer Toggles
    elements.mobileMenuToggle.addEventListener('click', () => {
        elements.appSidebar.classList.add('open');
        elements.drawerOverlay.classList.add('open');
    });

    elements.drawerOverlay.addEventListener('click', () => {
        elements.appSidebar.classList.remove('open');
        elements.drawerOverlay.classList.remove('open');
    });
}

// --- START APPLICATION ---
document.addEventListener('DOMContentLoaded', init);
// Run init immediately in case DOMContentLoaded has already fired
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    init();
}
