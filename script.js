// Page router
const pages = {
    landing: 'screenLanding',
    login: 'screenLogin',
    policy: 'screenPolicy',
    connected: 'screenConnected',
    resources: 'screenResources',
    usage: 'screenUsage'
};

let currentPage = pages.landing;

// Full resource list with image paths (circular images)
// Place your images in the 'images/resources/' folder
const allResources = [
    { 
        name: 'eLearning', 
        imagePath: 'images/moodle.jpg',
        searchTerms: ['elearning', 'learning', 'course', 'moodle', 'education']
    },
    { 
        name: 'NUST Library', 
        imagePath: 'images/library.png',
        searchTerms: ['library', 'books', 'journal', 'nust library', 'reading']
    },
    { 
        name: 'Labs', 
        imagePath: 'images/labs.jpg',
        searchTerms: ['lab', 'laboratory', 'practical', 'science']
    },
    { 
        name: 'Outlook', 
        imagePath: 'images/outlook.jpg',
        searchTerms: ['outlook', 'email', 'microsoft', 'mail', 'inbox']
    },
    { 
        name: 'MS Teams', 
        imagePath: 'images/teams.jpg',
        searchTerms: ['teams', 'microsoft teams', 'chat', 'meeting', 'video call']
    },
    { 
        name: 'Sharepoint', 
        imagePath: 'images/sharepoint.jpg',
        searchTerms: ['sharepoint', 'files', 'document', 'share point', 'onedrive']
    },
    { 
        name: 'ChatGPT', 
        imagePath: 'images/chatgpt.jpg',
        searchTerms: ['chatgpt', 'ai', 'openai', 'chat gpt', 'assistant']
    },
    { 
        name: 'Timetable', 
        imagePath: 'images/timetable.jpg',
        searchTerms: ['timetable', 'schedule', 'class', 'calendar', 'courses']
    }
];

function showScreen(screenId) {
    Object.values(pages).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
    });
    
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.add('active');
        currentPage = screenId;
        
        // Refresh resources grid when entering resources screen
        if (screenId === pages.resources) {
            renderResourcesGrid(allResources);
            const searchInput = document.getElementById('resourceSearchInput');
            if (searchInput) searchInput.value = '';
            const noResultsDiv = document.getElementById('noResultsMsg');
            if (noResultsDiv) noResultsDiv.style.display = 'none';
        }
    }
}

function renderResourcesGrid(resourcesToShow) {
    const gridContainer = document.getElementById('resourcesGrid');
    const noResultsDiv = document.getElementById('noResultsMsg');
    
    if (!gridContainer) return;
    
    if (resourcesToShow.length === 0) {
        gridContainer.innerHTML = '';
        if (noResultsDiv) noResultsDiv.style.display = 'block';
        return;
    }
    
    if (noResultsDiv) noResultsDiv.style.display = 'none';
    
    gridContainer.innerHTML = resourcesToShow.map(resource => `
        <div class="resource-card" data-resource="${resource.name}">
            <div class="resource-image" style="background-image: url('${resource.imagePath}');"></div>
            <div class="resource-name">${resource.name}</div>
        </div>
    `).join('');
    
    // Re-attach click handlers to new cards
    document.querySelectorAll('.resource-card').forEach(card => {
        card.addEventListener('click', () => {
            const resourceName = card.getAttribute('data-resource');
            alert(`Opening: ${resourceName}\n(This would navigate to ${resourceName} portal)`);
        });
    });
}

function filterResources(searchTerm) {
    if (!searchTerm || searchTerm.trim() === '') {
        renderResourcesGrid(allResources);
        return;
    }
    
    const lowerSearch = searchTerm.toLowerCase().trim();
    const filtered = allResources.filter(resource => {
        // Match by name
        if (resource.name.toLowerCase().includes(lowerSearch)) return true;
        // Match by search terms
        if (resource.searchTerms.some(term => term.includes(lowerSearch))) return true;
        return false;
    });
    
    renderResourcesGrid(filtered);
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // ========== LANDING PAGE ==========
    const getStartedBtn = document.getElementById('btnGetStarted');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            showScreen(pages.login);
        });
    }
    
    // ========== LOGIN PAGE ==========
    const loginBackBtn = document.getElementById('loginBackBtn');
    if (loginBackBtn) {
        loginBackBtn.addEventListener('click', () => {
            showScreen(pages.landing);
        });
    }
    
    const doLoginBtn = document.getElementById('doLoginBtn');
    if (doLoginBtn) {
        doLoginBtn.addEventListener('click', () => {
            const username = document.getElementById('loginUsername')?.value || '';
            if (username.trim() === '') {
                alert('Please enter your student number');
            } else {
                const rememberMe = document.getElementById('rememberMe')?.checked || false;
                if (rememberMe) {
                    localStorage.setItem('savedUsername', username);
                } else {
                    localStorage.removeItem('savedUsername');
                }
                showScreen(pages.policy);
            }
        });
    }
    
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Password reset link sent to your registered email.');
        });
    }
    
    const contactSupportLogin = document.getElementById('contactSupportLogin');
    if (contactSupportLogin) {
        contactSupportLogin.addEventListener('click', (e) => {
            e.preventDefault();
            alert('ICT Support: support@nust.na | Tel: +264-61-207-2000');
        });
    }
    
    // Restore saved username
    const savedUser = localStorage.getItem('savedUsername');
    if (savedUser && document.getElementById('loginUsername')) {
        document.getElementById('loginUsername').value = savedUser;
        document.getElementById('rememberMe').checked = true;
    }
    
    // ========== POLICY PAGE ==========
    const policyBackBtn = document.getElementById('policyBackBtn');
    if (policyBackBtn) {
        policyBackBtn.addEventListener('click', () => {
            showScreen(pages.login);
        });
    }
    
    const acceptProceedBtn = document.getElementById('acceptProceedBtn');
    if (acceptProceedBtn) {
        acceptProceedBtn.addEventListener('click', () => {
            const selected = document.querySelector('input[name="policyChoice"]:checked');
            if (!selected) {
                alert('Please accept or decline the Academic Access Policy');
            } else if (selected.value === 'reject') {
                alert('You declined the policy. VPN access denied.');
            } else {
                showScreen(pages.connected);
            }
        });
    }
    
    const contactPolicyLink = document.getElementById('contactPolicyLink');
    if (contactPolicyLink) {
        contactPolicyLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('ICT Support: support@nust.na | Tel: +264-61-207-2000');
        });
    }
    
    // ========== CONNECTED PAGE ==========
    const disconnectToResourcesBtn = document.getElementById('disconnectToResourcesBtn');
    if (disconnectToResourcesBtn) {
        disconnectToResourcesBtn.addEventListener('click', () => {
            showScreen(pages.resources);
        });
    }
    
    // ========== RESOURCES PAGE (Functional Search with Circular Images) ==========
    const resourcesBackBtn = document.getElementById('resourcesBackBtn');
    if (resourcesBackBtn) {
        resourcesBackBtn.addEventListener('click', () => {
            showScreen(pages.connected);
        });
    }
    
    const viewAllStatsBtn = document.getElementById('viewAllStatsBtn');
    if (viewAllStatsBtn) {
        viewAllStatsBtn.addEventListener('click', () => {
            showScreen(pages.usage);
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('resourceSearchInput');
    const searchButton = document.getElementById('searchButton');
    
    function performSearch() {
        const searchTerm = searchInput ? searchInput.value : '';
        filterResources(searchTerm);
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }
    
    // Initial render of resources
    renderResourcesGrid(allResources);
    
    // ========== USAGE PAGE ==========
    const usageBackBtn = document.getElementById('usageBackBtn');
    if (usageBackBtn) {
        usageBackBtn.addEventListener('click', () => {
            showScreen(pages.resources);
        });
    }
    
    const extendSessionBtn = document.getElementById('extendSessionBtn');
    if (extendSessionBtn) {
        extendSessionBtn.addEventListener('click', () => {
            alert('Session extended by +2 hours. New remaining time: 4h 30min');
        });
    }
    
    const finalDisconnectBtn = document.getElementById('finalDisconnectBtn');
    if (finalDisconnectBtn) {
        finalDisconnectBtn.addEventListener('click', () => {
            alert('Disconnected from NUST VPN. Redirecting to home.');
            showScreen(pages.landing);
        });
    }
});