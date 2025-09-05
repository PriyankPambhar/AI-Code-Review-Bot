
# AI Code Review Bot

An **AI-powered Code Review Tool** built with **React.js**, **Tailwind CSS**, and **Google Gemini API**.  
This web application analyzes your source code for **security vulnerabilities**, **readability improvements**, and **performance optimizations**, providing detailed feedback instantly.

---

## 🚀 Features
- **AI-Powered Analysis** – Uses Google Gemini API for intelligent code review.
- **Real-Time Feedback** – Get instant suggestions for improving your code.
- **Security, Readability & Performance Scores** – Each aspect scored individually.
- **Copy & Download Reports** – Export results as JSON or copy to clipboard.
- **Responsive UI** – Works on all devices.
- **Dark Mode UI** – Modern developer-friendly interface.

---

## 📂 Project Structure
```

project-root/
│
├── public/                  # Static files
├── src/                     # Main source code
│   ├── components/          # Reusable components (CodeInput, ReviewDashboard, ScoreCard)
│   ├── App.jsx              # Main application file
│   ├── index.js             # Entry point
│   ├── styles.css           # Tailwind CSS file
│   └── assets/              # Logo and images
│
├── .env                     # API key (REACT\_APP\_GEMINI\_API\_KEY=your\_key\_here)
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation

````

---

## 🛠️ Technologies Used
- **Frontend:** React.js, Tailwind CSS
- **Backend API:** Google Gemini API
- **Styling:** Tailwind CSS
- **Package Manager:** npm

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/ai-code-review-bot.git
cd ai-code-review-bot
````

### 2. Install dependencies

```bash
npm install
```

### 3. Add your Gemini API Key

Create a `.env` file in the project root:

```
REACT_APP_GEMINI_API_KEY=your_api_key_here
```

### 4. Start the development server

```bash
npm start
```

The app will run at **[http://localhost:3000](http://localhost:3000)**

---

## 📸 Screenshots

### Review Dashboard
<img width="1920" height="3452" alt="AI-Code-Review-Bot-PD (1)" src="https://github.com/user-attachments/assets/399f3588-ce31-4dc4-b26b-bf81a6a165c2" />


---

## 📌 How It Works

1. **Paste your source code** into the input box.
2. **Click "Review"** to send the code to Google Gemini API.
3. **Receive instant feedback** including:

   * Security risks
   * Readability suggestions
   * Performance optimizations
4. **Export results** as JSON or copy to clipboard.

---

## 📈 Future Enhancements

* Support for **multiple programming languages**.
* Integration with **GitHub/GitLab pull requests**.
* Offline mode with **local AI model**.
* Customizable review rule sets.

---

## 🧑‍💻 Author

**Priyank Pambhar**
B.Tech (Information Technology), Atmiya University

```


