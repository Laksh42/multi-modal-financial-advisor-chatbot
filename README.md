# Multi-Modal Financial Advisor Chatbot

A web-based financial advisor chatbot that provides personalized financial product recommendations and advice through an interactive chat interface. The chatbot offers guidance on investments, retirement planning, loans, and saving strategies.

## Features

1. **User Authentication**:
   - Simple login/registration system
   - Persistent user sessions
   - Secure password handling

2. **Interactive Chat Interface**:
   - Real-time chat with the financial advisor bot
   - Context-aware responses
   - Natural language processing for understanding user queries

3. **Personalized Recommendations**:
   - Dynamic financial product recommendations
   - Context-based suggestion updates
   - Clear explanations for each recommendation

4. **Financial Advisory Topics**:
   - Investment strategies (ETFs, Index Funds)
   - Retirement planning
   - Loan and mortgage options
   - Savings strategies

## Getting Started

### Prerequisites

- Python 3.x
- Web browser with JavaScript enabled

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/multi-modal-financial-advisor-chatbot.git
   cd multi-modal-financial-advisor-chatbot
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the application:
   ```bash
   python simple_demo.py
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

## Project Structure

```
├── app/                  # Main application directory
│   ├── static/           # Static assets
│   │   ├── css/         # Stylesheets
│   │   ├── js/          # JavaScript files
│   │   └── favicon.ico  # Site favicon
│   └── database/        # Database related files
├── simple_demo.py       # Development server
└── requirements.txt     # Python dependencies
```

## Usage

1. **Registration/Login**:
   - Create a new account or log in with existing credentials
   - User sessions are maintained using local storage

2. **Chat Interface**:
   - Type your financial questions in the chat input
   - Receive instant responses from the advisor
   - View personalized recommendations in the sidebar

3. **Topics You Can Discuss**:
   - Investment advice
   - Retirement planning
   - Loan and mortgage information
   - Savings strategies
   - General financial guidance

## Development

The project uses:
- HTML5 for structure
- CSS3 for styling
- Vanilla JavaScript for frontend functionality
- Python for the backend server
- Local storage for session management

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request