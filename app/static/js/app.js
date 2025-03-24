// Global variables
let authToken = localStorage.getItem('authToken');
let userId = localStorage.getItem('userId');

// DOM Elements
const loginPage = document.getElementById('login-page');
const registerPage = document.getElementById('register-page');
const chatPage = document.getElementById('chat-page');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const chatForm = document.getElementById('chat-form');
const messagesContainer = document.getElementById('messages');
const recommendationsContainer = document.getElementById('recommendations');
const logoutButton = document.getElementById('logout-btn');
const loginError = document.getElementById('login-error');
const registerError = document.getElementById('register-error');

// Initialize app
document.addEventListener('DOMContentLoaded', init);

function init() {
    // Set up event listeners
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
    chatForm.addEventListener('submit', handleChatSubmit);
    
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
    
    // Show the appropriate page based on authentication
    if (authToken && userId) {
        showChatPage();
        loadRecommendations();
        sendInitialMessage();
    } else {
        showLoginPage();
    }
    
    // Register page link
    document.getElementById('register-link').addEventListener('click', (e) => {
        e.preventDefault();
        showRegisterPage();
    });
    
    // Login page link
    document.getElementById('login-link').addEventListener('click', (e) => {
        e.preventDefault();
        showLoginPage();
    });
}

// Page visibility functions
function showLoginPage() {
    loginPage.classList.remove('hidden');
    registerPage.classList.add('hidden');
    chatPage.classList.add('hidden');
    logoutButton.classList.add('hidden');
}

function showRegisterPage() {
    loginPage.classList.add('hidden');
    registerPage.classList.remove('hidden');
    chatPage.classList.add('hidden');
    logoutButton.classList.add('hidden');
}

function showChatPage() {
    loginPage.classList.add('hidden');
    registerPage.classList.add('hidden');
    chatPage.classList.remove('hidden');
    logoutButton.classList.remove('hidden');
}

// Authentication handlers
async function handleLogin(e) {
    e.preventDefault();
    
    const userIdInput = document.getElementById('login-userid').value;
    const password = document.getElementById('login-password').value;
    
    try {
        // For demo purposes, we'll use a simple authentication method
        // In a real app, this would be a proper API call
        if (password.length < 4) {
            throw new Error('Password must be at least 4 characters.');
        }
        
        // Save user ID and a mock token
        localStorage.setItem('authToken', 'demo-token-' + Date.now());
        localStorage.setItem('userId', userIdInput);
        authToken = 'demo-token-' + Date.now();
        userId = userIdInput;
        
        // Show chat page
        showChatPage();
        loadRecommendations();
        sendInitialMessage();
    } catch (error) {
        loginError.textContent = error.message;
        loginError.classList.remove('hidden');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    const userIdInput = document.getElementById('register-userid').value;
    const password = document.getElementById('register-password').value;
    
    try {
        // For demo purposes, we'll use a simple registration method
        // In a real app, this would be a proper API call
        if (password.length < 4) {
            throw new Error('Password must be at least 4 characters.');
        }
        
        // Save user ID and a mock token
        localStorage.setItem('authToken', 'demo-token-' + Date.now());
        localStorage.setItem('userId', userIdInput);
        authToken = 'demo-token-' + Date.now();
        userId = userIdInput;
        
        // Show chat page
        showChatPage();
        loadRecommendations();
        sendInitialMessage();
    } catch (error) {
        registerError.textContent = error.message;
        registerError.classList.remove('hidden');
    }
}

function handleLogout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    authToken = null;
    userId = null;
    showLoginPage();
}

// Chat handlers
async function handleChatSubmit(e) {
    e.preventDefault();
    
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message to UI
    addMessage(message, 'user');
    
    // Clear input
    chatInput.value = '';
    
    try {
        // For demo purposes, we'll simulate a response
        // In a real app, this would be a proper API call
        setTimeout(() => {
            let botResponse = "I'm your financial advisor. I can help you with investment advice, retirement planning, and other financial questions.";
            
            // Simple response logic based on keywords
            if (message.toLowerCase().includes('invest')) {
                botResponse = "Based on your profile, I recommend considering index funds or ETFs for a balanced investment approach.";
                updateRecommendations([
                    { 
                        name: "Vanguard Total Stock Market ETF",
                        description: "A low-cost way to invest in the entire US stock market."
                    },
                    {
                        name: "iShares Core S&P 500 ETF", 
                        description: "Tracks the S&P 500 index of large US companies."
                    }
                ]);
            } else if (message.toLowerCase().includes('retire')) {
                botResponse = "For retirement planning, consider setting up a diversified portfolio with a mix of stocks and bonds.";
                updateRecommendations([
                    { 
                        name: "Retirement Target Date Fund 2045",
                        description: "Automatically adjusts asset allocation as you approach retirement."
                    },
                    {
                        name: "High-Yield Savings Account", 
                        description: "Safe place for your emergency fund with better interest rates."
                    }
                ]);
            } else if (message.toLowerCase().includes('loan') || message.toLowerCase().includes('mortgage')) {
                botResponse = "I can help you understand different loan options. What specific information are you looking for?";
                updateRecommendations([
                    { 
                        name: "30-Year Fixed Rate Mortgage",
                        description: "Stable monthly payments over the life of your home loan."
                    },
                    {
                        name: "15-Year Fixed Rate Mortgage", 
                        description: "Higher monthly payments but less interest paid overall."
                    }
                ]);
            } else if (message.toLowerCase().includes('save') || message.toLowerCase().includes('saving')) {
                botResponse = "Saving consistently is key to financial security. Have you considered setting up automatic transfers to a savings account?";
                updateRecommendations([
                    { 
                        name: "High-Yield Online Savings",
                        description: "Better interest rates than traditional bank accounts."
                    },
                    {
                        name: "Certificates of Deposit", 
                        description: "Lock in your money for higher interest rates."
                    }
                ]);
            }
            
            addMessage(botResponse, 'bot');
        }, 1000);
    } catch (error) {
        console.error('Chat error:', error);
        addMessage('Sorry, there was an error processing your request. Please try again.', 'bot');
    }
}

function addMessage(content, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    
    messageElement.innerHTML = `
        ${content}
        <span class="message-time">${new Date().toLocaleTimeString()}</span>
    `;
    
    messagesContainer.appendChild(messageElement);
    
    // Scroll to the bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function loadRecommendations() {
    try {
        // For demo purposes, we'll use static recommendations
        // In a real app, this would be fetched from an API
        const demoRecommendations = [
            {
                name: "High-Yield Savings Account",
                description: "Earn more interest on your emergency fund and short-term savings."
            },
            {
                name: "Stock Market Index Fund",
                description: "Low-cost way to invest in the stock market for long-term growth."
            },
            {
                name: "Roth IRA",
                description: "Tax-advantaged retirement account for tax-free growth and withdrawals."
            }
        ];
        
        updateRecommendations(demoRecommendations);
    } catch (error) {
        console.error('Error loading recommendations:', error);
    }
}

function updateRecommendations(recommendations) {
    recommendationsContainer.innerHTML = '';
    
    if (!recommendations || recommendations.length === 0) {
        recommendationsContainer.innerHTML = '<p>No recommendations available at this time.</p>';
        return;
    }
    
    recommendations.forEach(rec => {
        const recElement = document.createElement('div');
        recElement.classList.add('recommendation-item');
        
        recElement.innerHTML = `
            <h3>${rec.name || 'Financial Product'}</h3>
            <p>${rec.description || 'No description available'}</p>
            ${rec.details ? `<p>Details: ${rec.details}</p>` : ''}
        `;
        
        recommendationsContainer.appendChild(recElement);
    });
}

function sendInitialMessage() {
    // Add a welcome message
    addMessage(`Hello ${userId}! Welcome to the Financial Advisor Chatbot. How can I help you today? You can ask about investments, retirement planning, loans, or saving strategies.`, 'bot');
} 