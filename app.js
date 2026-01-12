const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');

 const searchDatabase = [
            { title: 'Home', url: '/', keywords: ['home', 'main', 'welcome', 'start', 'abubot'] },
            { title: 'Products', url: '/tech.html', keywords: ['products', 'items', 'shop', 'buy', 'abubot', 'tech', 'tulip', 'sunflower', 'pot','keychain', 'bouquet'] },
            { title: 'About', url: '/about.html', keywords: ['about', 'info', 'information', 'company', 'nica'] },
            { title: 'Helpdesk', url: '/helpdesk.html', keywords: ['help', 'support', 'helpdesk', 'contact', 'assistance', 'faq'] },
            { title: 'Sign Up', url: '/signup.html', keywords: ['signup', 'register', 'account', 'join'] }
        ];

function performSearch(query) {
            if (!query.trim()) {
                searchResults.innerHTML = '';
                searchResults.classList.remove('active');
                return;
            }

            query = query.toLowerCase();
            const results = searchDatabase.filter(item => {
                return item.title.toLowerCase().includes(query) || 
                       item.keywords.some(keyword => keyword.includes(query));
            });

            displayResults(results);
        }


    function displayResults(results) {
            if (results.length === 0) {
                searchResults.innerHTML = '<div class="no-results">No results found</div>';
                searchResults.classList.add('active');
                return;
            }

            const html = results.map(result => 
                `<a href="${result.url}" class="search-result-item">${result.title}</a>`
            ).join('');

            searchResults.innerHTML = html;
            searchResults.classList.add('active');
        }

        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });

        // Search on button click
        searchBtn.addEventListener('click', () => {
            performSearch(searchInput.value);
        });
// Close search results when clicking outside
document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                searchResults.classList.remove('active');
            }
        });

    
        // Shopping cart functionality with sessionStorage
        const Cart = {
            init() {
                this.loadCart();
                this.updateCartDisplay();
            },

            loadCart() {
                const savedCart = sessionStorage.getItem('shoppingCart');
                this.items = savedCart ? JSON.parse(savedCart) : [];
            },

            saveCart() {
                sessionStorage.setItem('shoppingCart', JSON.stringify(this.items));
                this.updateCartDisplay();
            },

            getTotalCount() {
                return this.items.reduce((total, item) => total + item.quantity, 0);
            },

            updateCartDisplay() {
                const cartCountElement = document.getElementById('cartCount');
                if (cartCountElement) {
                    const count = this.getTotalCount();
                    cartCountElement.textContent = count;
                }
            }
        };

        // Initialize cart when page loads
        Cart.init();

        // Mobile menu toggle
        const mobileMenu = document.getElementById('mobile-menu');
        const navbarMenu = document.getElementById('navbar-menu');

        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-active');
            navbarMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.navbar__links');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-active');
                navbarMenu.classList.remove('active');
            });
        });



