// Sample confessions data
const confessions = [
    {
        id: 1,
        content: "I've always dreamed of becoming a writer, but I've never shown my work to anyone. Maybe it's time to be brave.",
        category: "dreams",
        emotions: ["✧ Peaceful", "❈ Inspired", "❋ Hopeful"],
        avatar: "✧",
        likes: 42,
        comments: 12,
        liked: false
    },
    {
        id: 2,
        content: "Today I told someone I loved them for the first time. My heart has never felt so full.",
        category: "love",
        emotions: ["❥ Loved", "✧ Peaceful", "✹ Blessed"],
        avatar: "❥",
        likes: 89,
        comments: 24,
        liked: false
    },
    {
        id: 3,
        content: "Looking back at my past mistakes made me realize how much I've grown. Every setback was a setup for a comeback.",
        category: "regrets",
        emotions: ["❦ Reflective", "❋ Hopeful", "✤ Grateful"],
        avatar: "❦",
        likes: 67,
        comments: 18,
        liked: false
    }
];

// Category symbols mapping
const categorySymbols = {
    all: "◈",
    love: "❥",
    regrets: "❦",
    funny: "❧",
    secrets: "❈",
    dreams: "✧"
};

// Category gradient colors
const categoryGradients = {
    all: "linear-gradient(135deg, #6366f1, #a855f7)",
    love: "linear-gradient(135deg, #ec4899, #f43f5e)",
    regrets: "linear-gradient(135deg, #64748b, #94a3b8)",
    funny: "linear-gradient(135deg, #f59e0b, #f97316)",
    secrets: "linear-gradient(135deg, #10b981, #14b8a6)",
    dreams: "linear-gradient(135deg, #6366f1, #8b5cf6)"
};

// Current active tab
let activeTab = 'all';

// Initialize the app
function init() {
    renderConfessions();
    setupSearch();
    setupScrollAnimation();
}

// Render confessions based on active tab and search
function renderConfessions(searchTerm = '') {
    const grid = document.getElementById('confessionsGrid');
    grid.innerHTML = '';

    const filteredConfessions = confessions.filter(confession => {
        const matchesTab = activeTab === 'all' || confession.category === activeTab;
        const matchesSearch = !searchTerm || 
            confession.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            confession.emotions.some(emotion => emotion.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesTab && matchesSearch;
    });

    filteredConfessions.forEach(confession => {
        const card = createConfessionCard(confession);
        grid.appendChild(card);
    });

    // Animate cards
    animateCards();
}

// Create a confession card element
function createConfessionCard(confession) {
    const card = document.createElement('div');
    card.className = 'confession-card';
    
    const gradient = categoryGradients[confession.category] || categoryGradients.all;
    
    card.innerHTML = `
        <div class="card-header">
            <div class="avatar" style="background: ${gradient}">${confession.avatar}</div>
            <div class="category-chip" style="background: ${gradient}">
                <span>${categorySymbols[confession.category]}</span>
                <span>${confession.category.charAt(0).toUpperCase() + confession.category.slice(1)}</span>
            </div>
        </div>
        <div class="card-content">${confession.content}</div>
        <div class="emotion-chips">
            ${confession.emotions.map(emotion => `
                <span class="emotion-chip selected">${emotion}</span>
            `).join('')}
        </div>
        <div class="card-actions">
            <div class="action-buttons">
                <button class="action-btn ${confession.liked ? 'liked' : ''}" onclick="handleLike(${confession.id})">
                    <i class="fas fa-heart"></i>
                    <span class="like-count">${confession.likes}</span>
                </button>
                <button class="action-btn" onclick="handleComment(${confession.id})">
                    <i class="fas fa-comment"></i>
                    <span class="comment-count">${confession.comments}</span>
                </button>
            </div>
            <button class="action-btn" onclick="handleShare(${confession.id})">
                <i class="fas fa-share"></i>
            </button>
        </div>
    `;
    
    return card;
}

// Handle like action
function handleLike(confessionId) {
    const confession = confessions.find(c => c.id === confessionId);
    if (confession) {
        if (!confession.liked) {
            confession.likes++;
            confession.liked = true;
        } else {
            confession.likes--;
            confession.liked = false;
        }
        renderConfessions();
    }
}

// Handle comment action
function handleComment(confessionId) {
    const confession = confessions.find(c => c.id === confessionId);
    if (confession) {
        const comment = prompt('Add your comment:');
        if (comment && comment.trim()) {
            confession.comments++;
            renderConfessions();
            alert('Comment added successfully!');
        }
    }
}

// Handle share action
function handleShare(confessionId) {
    const confession = confessions.find(c => c.id === confessionId);
    if (confession) {
        alert('Sharing functionality coming soon!');
    }
}

// Show tab
function showTab(category) {
    activeTab = category;
    
    // Update active state of nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.textContent.toLowerCase().includes(category));
    });
    
    renderConfessions();
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    let debounceTimeout;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            renderConfessions(e.target.value.trim());
        }, 300);
    });
}

// Show random confession
function showRandomConfession() {
    const randomIndex = Math.floor(Math.random() * confessions.length);
    const confession = confessions[randomIndex];
    
    // Scroll to the confession
    const cards = document.querySelectorAll('.confession-card');
    cards[randomIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Add highlight animation
    cards[randomIndex].style.animation = 'highlight 2s ease';
    setTimeout(() => {
        cards[randomIndex].style.animation = '';
    }, 2000);
}

// Modal functions
function openCreateModal() {
    document.getElementById('createModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeCreateModal() {
    document.getElementById('createModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Toggle emotion selection
function toggleEmotion(button) {
    const selectedEmotions = document.querySelectorAll('.emotion-chip.selected[data-selected="true"]');
    
    if (button.getAttribute('data-selected') === 'true') {
        button.setAttribute('data-selected', 'false');
        button.classList.remove('selected');
    } else if (selectedEmotions.length < 3) {
        button.setAttribute('data-selected', 'true');
        button.classList.add('selected');
    }
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const content = form.querySelector('textarea').value;
    const category = form.querySelector('select').value;
    const selectedEmotions = Array.from(form.querySelectorAll('.emotion-chip[data-selected="true"]'))
        .map(chip => chip.textContent);
    
    if (!content || !category || selectedEmotions.length === 0) {
        alert('Please fill in all fields and select at least one emotion.');
        return;
    }
    
    const newConfession = {
        id: confessions.length + 1,
        content: content,
        category: category,
        emotions: selectedEmotions,
        avatar: categorySymbols[category] || "✧",
        likes: 0,
        comments: 0,
        liked: false
    };
    
    confessions.unshift(newConfession);
    renderConfessions();
    closeCreateModal();
    
    // Reset form
    form.reset();
    form.querySelectorAll('.emotion-chip').forEach(chip => {
        chip.setAttribute('data-selected', 'false');
        chip.classList.remove('selected');
    });
}

// Setup scroll animations
function setupScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.confession-card').forEach(card => {
        observer.observe(card);
    });
}

// Animate cards
function animateCards() {
    const cards = document.querySelectorAll('.confession-card');
    cards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
    });
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);
