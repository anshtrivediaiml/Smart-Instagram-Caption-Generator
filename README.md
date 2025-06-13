# 📸 Smart Instagram Caption Generator

A modern web app that generates engaging, aesthetic, or witty Instagram captions based on your uploaded photo. Using Google's **Gemini API**, the app generates captions that fit your chosen language, caption style, and length — all wrapped in a slick, light/dark mode switchable UI.

---

## 🌟 Features

- 🖼️ Upload an image and receive intelligent caption suggestions  
- 🎭 Choose from various **caption styles**: Funny, Romantic, Aesthetic, Sad, etc.  
- 🌐 Supports multiple **languages**: English, Hindi, Gujarati  
- 📏 Select **caption length**: Short, Medium, or Long  
- 🔢 Choose how many captions to generate using a slider  
- 🔁 Toggle between **Light and Dark Mode**  
- 🔍 Filter captions dynamically with a live search  
- 📋 One-click **copy to clipboard** feature  
- ⚡ Powered by Google's Gemini AI for fast, creative responses  

---

## 📁 Project Structure

```
insta-caption-generator/
├── backend/             # Flask backend with Gemini API integration
│   ├── app.py           # Main Flask app
│   ├── requirements.txt # Backend dependencies
│   └── .env             # Gemini API Key (not committed)
├── frontend/            # React frontend
│   ├── public/
│   ├── src/
│   │   ├── App.js       # Main React component
│   │   ├── App.css      # Styling (light/dark theme)
│   │   └── index.js
│   └── package.json     # Frontend dependencies
├── README.md            # You're here!
└── .gitignore
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/anshtrivediaiml/Smart-Instagram-Caption-Generator.git
cd insta-caption-generator
```

---

### 2. Backend Setup (Flask + Gemini API)

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file and add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Start the Flask server:

```bash
python app.py
```

> The backend will run at: `http://localhost:5000`

---

### 3. Frontend Setup (React)

Navigate to the frontend directory:

```bash
cd ../frontend
```

Install frontend dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

> The frontend will run at: `http://localhost:3000`

---

## ⚙️ API Route

| Route             | Method | Description                              |
|------------------|--------|------------------------------------------|
| `/generate_caption` | POST   | Accepts image + options, returns captions |

---

## 📜 Example Payload (FormData)

> This route expects a `multipart/form-data` submission:

- `image`: uploaded image file  
- `category`: caption style (e.g. `funny`)  
- `language`: `english`, `hindi`, or `gujarati`  
- `length`: `short`, `medium`, or `long`  
- `num_captions`: number of captions (max 20)  

---

## 🧠 Powered By

- 🤖 [Gemini API](https://ai.google.dev/) — Google's next-gen AI model  
- ⚛️ React + Custom CSS  
- 🐍 Flask (Python)  
- 🎨 CSS Variables for light/dark theming  

---

## 📦 Dependencies

### Frontend

- `react`  
- `axios`  
- `lucide-react`  
- `react-hot-toast`  

### Backend

- `flask`  
- `flask-cors`  
- `python-dotenv`  
- `Pillow`  
- `google-generativeai`  

---

## 🛠️ Future Enhancements

- 🔖 Save favorite captions  
- 📥 Drag & drop image upload  
- 🌍 Add support for more Indian languages  
- 📄 Export captions as `.txt` or image cards  
- 🧠 Auto-detect image theme for smarter prompts  

---

---

## 🌍 Deployment Guide

### 🔧 Deploy Frontend to Vercel

1. Push the `/frontend` folder to GitHub
2. Import your repo into [Vercel](https://vercel.com)
3. Set:
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Environment Variable**:  
     - `REACT_APP_API_URL=https://your-backend-url.onrender.com`

### 🔧 Deploy Backend to Render

1. Push the `/backend` folder to GitHub  
2. Create a new [Web Service](https://render.com)  
3. Set:
   - **Start Command**: `python app.py`
   - **Environment Variable**:  
     - `GEMINI_API_KEY=your_key_here`

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo and submit pull requests. ✨

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙋‍♂️ Acknowledgements

- Gemini API by Google  
- UI inspiration from modern SaaS dashboards  
- React + Open-source UI components  
- Flask + Python community  

---

> Built with ❤️ by Ansh
