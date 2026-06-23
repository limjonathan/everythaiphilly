

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

// Initialize application on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
    loadCartFromStorage();
    renderCategoryChips();
    renderMenuItems();
    setupEventListeners();
    updateCartUI();
    setupScrollSpy();
});

// Event Listeners Configuration
function setupEventListeners() {
    // Menu searches
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
        smoothScrollTo("#menu");
    });

    // Mobile menu triggers
    mobileMenuToggle.addEventListener("click", toggleMobileDrawer);
    drawerCloseBtn.addEventListener("click", toggleMobileDrawer);
    drawerOverlay.addEventListener("click", toggleMobileDrawer);

    // Navigation links anchors hooks
    const navLinks = document.querySelectorAll(".nav-item, .drawer-link");
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            
            // Close drawer if open on mobile
            if (mobileDrawer.classList.contains("open")) {
                toggleMobileDrawer();
            }
            
            smoothScrollTo(targetId);
        });
    });

    // Horizontal slider snap scrolling buttons
    const slideLeftBtn = document.getElementById("slide-left-btn");
    const slideRightBtn = document.getElementById("slide-right-btn");

    slideLeftBtn.addEventListener("click", () => {
        menuGrid.scrollBy({ left: -320, behavior: "smooth" });
    });

    slideRightBtn.addEventListener("click", () => {
        menuGrid.scrollBy({ left: 320, behavior: "smooth" });
    });
}

// Smooth scrolling engine helper
function smoothScrollTo(selector) {
    const target = document.querySelector(selector);
    if (!target) return;
    const headerOffset = 100;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
}

// Scroll Spy implementation for navigation highlighting
function setupScrollSpy() {
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-item");

    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        const scrollPosition = window.scrollY + 140;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${currentSectionId}`) {
                item.classList.add("active");
            }
        });
    });
}

// Render dynamic filter category buttons
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

// Render full explorer menu items dynamically
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
            <div class="menu-card menu-card-outer" data-item-id="${item.id}">
                ${item.image ? `<img class="card-visual" src="${item.image}" alt="${item.name}" loading="lazy" style="width: 100%; object-fit: cover;">` : ''}
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

// Shopping Cart Actions
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
            smoothScrollTo("#menu");
        });
    } else {
        cartItemsContainer.innerHTML = state.cart.map(item => `
            <div class="cart-item" data-item-id="${item.id}">
                <div class="cart-item-details">
                    <h5>${item.name}</h5>
                    <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <div class="cart-item-qty-control">
                    <button class="cart-qty-btn" onclick="decreaseQuantity('${item.id}')"><i data-lucide="minus" style="width: 14px; height: 14px;"></i></button>
                    <span class="cart-item-qty">${item.quantity}</span>
                    <button class="cart-qty-btn" onclick="increaseQuantity('${item.id}')"><i data-lucide="plus" style="width: 14px; height: 14px;"></i></button>
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

// Overlay details modal behaviors
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

    if (item.image) {
        dishModalImgContainer.style.backgroundImage = `url('${item.image}')`;
        dishModalImgContainer.style.display = "block";
    } else {
        dishModalImgContainer.style.backgroundImage = "none";
        dishModalImgContainer.style.backgroundColor = "var(--clr-surface-core)";
    }

    dishModalCategory.textContent = item.category || "General";
    dishModalName.textContent = item.name;
    dishModalPrice.textContent = `$${(item.price || 0).toFixed(2)}${item.hasAddons ? '+' : ''}`;
    dishModalDesc.textContent = item.description || "";

    if (item.hasAddons) {
        dishModalOptions.style.display = "block";
    } else {
        dishModalOptions.style.display = "none";
    }

    const tags = item.tags || [];
    dishModalTags.innerHTML = tags.map(tag => {
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
};

dishModalCloseBtn.addEventListener("click", closeDishModal);
dishModalOverlay.addEventListener("click", closeDishModal);

dishModalAddBtn.addEventListener("click", () => {
    if (activeModalItemId) {
        addToCart(activeModalItemId);
        closeDishModal();
    }
});
