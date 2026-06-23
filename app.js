import { MENU_DATA } from './menu-data.js';

// Global Application State
const state = {
    selectedCategory: "All",
    searchQuery: "",
    cart: []
};

// DOM Elements
const menuGrid = document.getElementById("menu-grid");
const categoriesContainer = document.getElementById("categories-container");
const menuSearchInput = document.getElementById("menu-search-input");
const clearSearchBtn = document.getElementById("clear-search-btn");

const cartToggleBtn = document.getElementById("cart-toggle-btn");
const cartSidebar = document.getElementById("cart-sidebar");
const cartCloseBtn = document.getElementById("cart-close-btn");
const cartOverlay = document.getElementById("cart-overlay");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartBadgeCount = document.getElementById("cart-badge-count");
const cartSubtotalVal = document.getElementById("cart-subtotal-val");
const emptyCartBrowse = document.getElementById("empty-cart-browse");

const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileDrawer = document.getElementById("mobile-drawer");
const drawerCloseBtn = document.getElementById("drawer-close-btn");
const drawerOverlay = document.getElementById("drawer-overlay");

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    loadCartFromStorage();
    renderCategoryChips();
    renderMenuItems();
    setupEventListeners();
    updateCartUI();
    initHyperframes(); // Start the presentation slide scheduler
});

// ==========================================
// EVENT LISTENERS Setup
// ==========================================
function setupEventListeners() {
    // Search inputs
    menuSearchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value.trim().toLowerCase();
        toggleClearSearchButton();
        renderMenuItems();
    });

    clearSearchBtn.addEventListener("click", () => {
        menuSearchInput.value = "";
        state.searchQuery = "";
        clearSearchBtn.style.display = "none";
        renderMenuItems();
    });

    // Cart toggles
    cartToggleBtn.addEventListener("click", toggleCart);
    cartCloseBtn.addEventListener("click", toggleCart);
    cartOverlay.addEventListener("click", toggleCart);
    emptyCartBrowse.addEventListener("click", (e) => {
        e.preventDefault();
        toggleCart();
        showFrame(8); // Switch to the menu frame
    });

    // Mobile drawer toggles
    mobileMenuToggle.addEventListener("click", toggleMobileDrawer);
    drawerCloseBtn.addEventListener("click", toggleMobileDrawer);
    drawerOverlay.addEventListener("click", toggleMobileDrawer);

    // Mobile drawer links
    const drawerLinks = document.querySelectorAll(".drawer-link");
    drawerLinks.forEach((link, idx) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            toggleMobileDrawer();
            showFrame(idx); // Switch frames based on menu index
        });
    });

    // Desktop slider snaps navigation arrows
    const slideLeftBtn = document.getElementById("slide-left-btn");
    const slideRightBtn = document.getElementById("slide-right-btn");

    slideLeftBtn.addEventListener("click", () => {
        menuGrid.scrollBy({ left: -388, behavior: "smooth" });
    });

    slideRightBtn.addEventListener("click", () => {
        menuGrid.scrollBy({ left: 388, behavior: "smooth" });
    });
}

// ==========================================
// CATEGORIES & MENU CARDS DYNAMICS
// ==========================================
function renderCategoryChips() {
    const categories = ["All", ...new Set(MENU_DATA.map(item => item.category))];
    
    categoriesContainer.innerHTML = categories.map(category => {
        const isActive = category === state.selectedCategory ? "active" : "";
        return `<button class="filter-chip ${isActive}" data-category="${category}">${category}</button>`;
    }).join("");

    const chips = categoriesContainer.querySelectorAll(".filter-chip");
    chips.forEach(chip => {
        chip.addEventListener("click", (e) => {
            chips.forEach(c => c.classList.remove("active"));
            e.currentTarget.classList.add("active");
            state.selectedCategory = e.currentTarget.dataset.category;
            renderMenuItems();
        });
    });
}

function renderMenuItems() {
    const filteredItems = MENU_DATA.filter(item => {
        const matchesCategory = state.selectedCategory === "All" || item.category === state.selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(state.searchQuery) || 
                              item.description.toLowerCase().includes(state.searchQuery);
        return matchesCategory && matchesSearch;
    });

    if (filteredItems.length === 0) {
        menuGrid.innerHTML = `
            <div class="menu-loading">
                <i data-lucide="info" style="width: 32px; height: 32px;"></i>
                <p>No dishes found matching your criteria.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    menuGrid.innerHTML = filteredItems.map(item => {
        const tagHTML = item.tags.map(tag => {
            const tagClass = `tag-${tag.toLowerCase()}`;
            return `<span class="tag ${tagClass}">${tag}</span>`;
        }).join("");

        const optionIndicator = item.hasAddons ? '<span class="price-add-on">+</span>' : '';

        return `
            <div class="double-bezel-outer menu-card-outer" data-item-id="${item.id}">
                <div class="double-bezel-inner menu-card-inner">
                    ${item.image ? `<div class="card-visual" style="background-image: url('${item.image}')"></div>` : ''}
                    <div class="card-top">
                        <div class="card-header">
                            <h3 class="card-title">${item.name}</h3>
                            <span class="card-price">$${item.price.toFixed(2)}${optionIndicator}</span>
                        </div>
                        <p class="card-desc">${item.description}</p>
                    </div>
                    <div class="card-footer">
                        <div class="card-tags">
                            ${tagHTML}
                        </div>
                        <button class="add-btn-round" aria-label="Add ${item.name} to order" data-action="add">
                            <i data-lucide="plus" stroke-width="1.5"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join("");

    lucide.createIcons();

    // Trigger details modal on card clicks (except addition button)
    const cards = menuGrid.querySelectorAll(".menu-card-outer");
    cards.forEach(card => {
        card.addEventListener("click", (e) => {
            if (e.target.closest(".add-btn-round")) return;
            const itemId = card.dataset.itemId;
            openDishModal(itemId);
        });

        const addBtn = card.querySelector(".add-btn-round");
        addBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const itemId = card.dataset.itemId;
            addToCart(itemId);
        });
    });
}

function toggleClearSearchButton() {
    if (state.searchQuery.length > 0) {
        clearSearchBtn.style.display = "block";
    } else {
        clearSearchBtn.style.display = "none";
    }
}

// ==========================================
// CART OPERATIONS
// ==========================================
window.addToCart = function(itemId) {
    const item = MENU_DATA.find(i => i.id === itemId);
    if (!item) return;

    const existingIndex = state.cart.findIndex(cartItem => cartItem.id === itemId);

    if (existingIndex > -1) {
        state.cart[existingIndex].quantity += 1;
    } else {
        state.cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
        });
    }

    saveCartToStorage();
    updateCartUI();
    animateCartBadge();
};

function updateCartUI() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadgeCount.textContent = totalCount;

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartSubtotalVal.textContent = `$${subtotal.toFixed(2)}`;

    if (state.cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-state">
                <i data-lucide="shopping-bag" stroke-width="1.5"></i>
                <p>Your bag is empty.</p>
                <button class="btn btn-pill-secondary btn-sm" id="empty-cart-browse">Browse Menu</button>
            </div>
        `;
        document.getElementById("empty-cart-browse").addEventListener("click", (e) => {
            e.preventDefault();
            toggleCart();
            showFrame(8); // Open the explorer frame
        });
    } else {
        cartItemsContainer.innerHTML = state.cart.map(item => `
            <div class="cart-item" data-item-id="${item.id}">
                <div class="cart-item-details">
                    <h5>${item.name}</h5>
                    <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <div class="cart-item-qty-control">
                    <button class="cart-qty-btn" onclick="decreaseQuantity('${item.id}')"><i data-lucide="minus"></i></button>
                    <span class="cart-item-qty">${item.quantity}</span>
                    <button class="cart-qty-btn" onclick="increaseQuantity('${item.id}')"><i data-lucide="plus"></i></button>
                </div>
            </div>
        `).join("");
    }

    lucide.createIcons();
}

window.decreaseQuantity = function(itemId) {
    const itemIndex = state.cart.findIndex(i => i.id === itemId);
    if (itemIndex === -1) return;

    if (state.cart[itemIndex].quantity > 1) {
        state.cart[itemIndex].quantity -= 1;
    } else {
        state.cart.splice(itemIndex, 1);
    }

    saveCartToStorage();
    updateCartUI();
};

window.increaseQuantity = function(itemId) {
    const itemIndex = state.cart.findIndex(i => i.id === itemId);
    if (itemIndex === -1) return;

    state.cart[itemIndex].quantity += 1;

    saveCartToStorage();
    updateCartUI();
};

function toggleCart() {
    cartSidebar.classList.toggle("open");
    cartOverlay.classList.toggle("show");
}

function animateCartBadge() {
    cartBadgeCount.classList.add("bump");
    setTimeout(() => {
        cartBadgeCount.classList.remove("bump");
    }, 300);
}

function loadCartFromStorage() {
    const stored = localStorage.getItem("every_thai_cart");
    if (stored) {
        try {
            state.cart = JSON.parse(stored);
        } catch (e) {
            state.cart = [];
        }
    }
}

function saveCartToStorage() {
    localStorage.setItem("every_thai_cart", JSON.stringify(state.cart));
}

function toggleMobileDrawer() {
    mobileDrawer.classList.toggle("open");
    drawerOverlay.classList.toggle("show");
}

// ==========================================
// COORD DETAILS OVERLAY MODALS
// ==========================================
const dishModal = document.getElementById("dish-modal");
const dishModalCloseBtn = document.getElementById("dish-modal-close-btn");
const dishModalOverlay = document.getElementById("dish-modal-overlay");
const dishModalImgContainer = document.getElementById("dish-modal-img-container");
const dishModalCategory = document.getElementById("dish-modal-category");
const dishModalName = document.getElementById("dish-modal-name");
const dishModalPrice = document.getElementById("dish-modal-price");
const dishModalDesc = document.getElementById("dish-modal-desc");
const dishModalOptions = document.getElementById("dish-modal-options-section");
const dishModalTags = document.getElementById("dish-modal-tags");
const dishModalAddBtn = document.getElementById("dish-modal-add-btn");

let activeModalItemId = null;

window.openDishModal = function(itemId) {
    const item = MENU_DATA.find(i => i.id === itemId);
    if (!item) return;

    activeModalItemId = itemId;
    playing = false; // Pause autoplay while reading modal details

    if (item.image) {
        dishModalImgContainer.style.backgroundImage = `url('${item.image}')`;
        dishModalImgContainer.style.display = "block";
    } else {
        dishModalImgContainer.style.backgroundImage = "none";
        dishModalImgContainer.style.backgroundColor = "var(--clr-surface-core)";
    }

    dishModalCategory.textContent = item.category;
    dishModalName.textContent = item.name;
    dishModalPrice.textContent = `$${item.price.toFixed(2)}${item.hasAddons ? '+' : ''}`;
    dishModalDesc.textContent = item.description;

    if (item.hasAddons) {
        dishModalOptions.style.display = "block";
    } else {
        dishModalOptions.style.display = "none";
    }

    dishModalTags.innerHTML = item.tags.map(tag => {
        const tagClass = `tag-${tag.toLowerCase()}`;
        return `<span class="tag ${tagClass}">${tag}</span>`;
    }).join("");

    dishModal.classList.add("open");
    dishModalOverlay.classList.add("show");
};

window.closeDishModal = function() {
    dishModal.classList.remove("open");
    dishModalOverlay.classList.remove("show");
    activeModalItemId = null;
    playing = true; // Resume slideshow
    frameStart = Date.now();
    scheduleNextFrame();
};

dishModalCloseBtn.addEventListener("click", closeDishModal);
dishModalOverlay.addEventListener("click", closeDishModal);

dishModalAddBtn.addEventListener("click", () => {
    if (activeModalItemId) {
        addToCart(activeModalItemId);
        closeDishModal();
    }
});

// ==========================================
// CINEMATIC HYPERFRAMES LOGIC
// ==========================================
let frames = [];
let totalFrames = 0;
let currentFrameIndex = 0;
let playing = true;
let frameStart = Date.now();
let playbackTimer;

const progressIndicator = document.getElementById("progress-indicator");
const dockCounterVal = document.getElementById("dock-counter-val");
const dockPrevBtn = document.getElementById("dock-prev-btn");
const dockNextBtn = document.getElementById("dock-next-btn");
const dockPlayBtn = document.getElementById("dock-play-btn");

function initHyperframes() {
    frames = Array.from(document.querySelectorAll(".frame"));
    totalFrames = frames.length;
    
    if (totalFrames === 0) return;

    // Attach navigation dock event listeners
    dockPrevBtn.addEventListener("click", () => showFrame(currentFrameIndex - 1));
    dockNextBtn.addEventListener("click", () => showFrame(currentFrameIndex + 1));
    dockPlayBtn.addEventListener("click", togglePlayback);

    // Keyboard Arrow Keys
    document.addEventListener("keydown", (e) => {
        // Block during typing searches or modal display
        if (document.activeElement.tagName === "INPUT" || activeModalItemId) return;
        
        if (e.key === "ArrowRight") {
            showFrame(currentFrameIndex + 1);
        } else if (e.key === "ArrowLeft") {
            showFrame(currentFrameIndex - 1);
        } else if (e.key === " ") {
            e.preventDefault();
            togglePlayback();
        }
    });

    // Mouse Scroll Wheel frame controller
    let lastWheelTime = 0;
    document.addEventListener("wheel", (e) => {
        if (activeModalItemId || cartSidebar.classList.contains("open")) return;
        
        const now = Date.now();
        if (now - lastWheelTime < 1000) return; // Debounce triggers

        if (e.deltaY > 30) {
            showFrame(currentFrameIndex + 1);
            lastWheelTime = now;
        } else if (e.deltaY < -30) {
            showFrame(currentFrameIndex - 1);
            lastWheelTime = now;
        }
    });

    showFrame(0);
    tickProgress();
}

window.showFrame = function(n) {
    if (totalFrames === 0) return;
    
    currentFrameIndex = (n + totalFrames) % totalFrames;

    // Toggle active frame classes
    frames.forEach((frame, idx) => {
        frame.classList.toggle("active", idx === currentFrameIndex);
    });

    // Update navbar indicators
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        const frameLinkIndex = Number(item.getAttribute("data-frame"));
        // Highlight active headers based on frame matching groups
        if (frameLinkIndex === 0 && currentFrameIndex === 0) {
            item.classList.add("active");
        } else if (frameLinkIndex === 1 && currentFrameIndex >= 1 && currentFrameIndex <= 7) {
            item.classList.add("active");
        } else if (frameLinkIndex === 8 && currentFrameIndex === 8) {
            item.classList.add("active");
        } else if (frameLinkIndex === 9 && currentFrameIndex === 9) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    // Update counter dock text
    dockCounterVal.textContent = 
        String(currentFrameIndex + 1).padStart(2, "0") + " / " + String(totalFrames).padStart(2, "0");

    frameStart = Date.now();
    if (playing) scheduleNextFrame();
};

function scheduleNextFrame() {
    clearTimeout(playbackTimer);
    if (!playing) return;
    const duration = Number(frames[currentFrameIndex].dataset.duration) || 5000;
    playbackTimer = setTimeout(() => showFrame(currentFrameIndex + 1), duration);
}

function togglePlayback() {
    playing = !playing;
    dockPlayBtn.textContent = playing ? "⏸" : "▶";
    if (playing) {
        frameStart = Date.now();
        scheduleNextFrame();
    } else {
        clearTimeout(playbackTimer);
    }
}

function tickProgress() {
    if (playing && totalFrames > 0) {
        const duration = Number(frames[currentFrameIndex].dataset.duration) || 5000;
        const pct = Math.min(1, (Date.now() - frameStart) / duration) * 100;
        progressIndicator.style.width = pct + "%";
    } else if (!playing) {
        progressIndicator.style.width = "0%";
    }
    requestAnimationFrame(tickProgress);
}
