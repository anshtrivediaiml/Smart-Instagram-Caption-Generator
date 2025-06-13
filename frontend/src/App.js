import React, { useState, useRef } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { Moon, Sun, Loader, Copy, X } from "lucide-react";
import "./App.css";

export default function App() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [captionItems, setCaptionItems] = useState([]);
  const [theme, setTheme] = useState("light");
  const [filter, setFilter] = useState("");
  const [style, setStyle] = useState("default");
  const [language, setLanguage] = useState("english");
  const [captionCount, setCaptionCount] = useState(5);
  const [captionLength, setCaptionLength] = useState("medium");
  const captionListRef = useRef(null);

  const emojiSuggestions = ["✨", "📸", "🔥", "😍", "💬", "😎", "💫", "🌟", "❤️"];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setCaptionItems([]);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setCaptionItems([]);
  };

  const handleGenerate = async () => {
    if (!image) return toast.error("Please upload an image");
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("category", style);
    formData.append("num_captions", captionCount);
    formData.append("language", language);
    formData.append("length", captionLength);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/generate_caption`,
        formData
      );
      const captions = response.data.captions;

      if (Array.isArray(captions) && captions.length > 0) {
        setCaptionItems(captions);
        toast.success(`Generated ${captions.length} captions`);

        setTimeout(() => {
          if (captionListRef.current) {
            captionListRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 200);
      } else {
        setCaptionItems([]);
        toast.error("No captions generated");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to connect to backend or generate captions");
      setCaptionItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const filteredItems = captionItems.filter((item) =>
    item.caption.toLowerCase().includes(filter.toLowerCase())
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme === "dark" ? "dark" : "";
  };

  return (
    <div className="container">
      <Toaster />
      <div className="card">
        <div className="title-row">
          <h1>Insta Caption Generator</h1>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        <input type="file" accept="image/*" onChange={handleImageUpload} />

        {image && (
          <div className="image-container">
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              className="image-preview-medium"
            />
            <button onClick={handleRemoveImage} className="remove-image-btn">
              <X size={18} />
            </button>
          </div>
        )}

<div className="select-row">
  <div className="select-group">
    <label htmlFor="style">Caption style:</label>
    <select
      id="style"
      value={style}
      onChange={(e) => setStyle(e.target.value)}
      className="style-select"
    >
      <option value="default">Default</option>
      <option value="witty">Witty</option>
      <option value="romantic">Romantic</option>
      <option value="funny">Funny</option>
      <option value="trendy">Trendy</option>
      <option value="sad">Sad</option>
      <option value="aesthetic">Aesthetic</option>
    </select>
  </div>

  <div className="select-group">
    <label htmlFor="language">Language:</label>
    <select
      id="language"
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="style-select"
    >
      <option value="english">English</option>
      <option value="hindi">Hindi</option>
      <option value="gujarati">Gujarati</option>
    </select>
  </div>
</div>


        <div className="radio-group">
          <label className="group-label">Caption Length:</label>
          {["short", "medium", "long"].map((len) => (
            <label key={len} className="radio-item">
              <input
                type="radio"
                name="length"
                value={len}
                checked={captionLength === len}
                onChange={(e) => setCaptionLength(e.target.value)}
              />
              {len.charAt(0).toUpperCase() + len.slice(1)}
            </label>
          ))}
        </div>

        <div className="slider-container">
          <label htmlFor="captionCount">Number of captions: {captionCount}</label>
          <input
            type="range"
            id="captionCount"
            min="1"
            max="20"
            value={captionCount}
            onChange={(e) => setCaptionCount(parseInt(e.target.value))}
          />
        </div>

        <button
          onClick={handleGenerate}
          className="generate"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader className="spin" size={18} /> Generating...
            </>
          ) : (
            "Generate Captions"
          )}
        </button>

        {captionItems.length > 0 && (
          <div ref={captionListRef} className="caption-section">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search captions..."
              className="filter"
            />

            {filteredItems.map((item, index) => (
              <div
                key={index}
                className="caption-item fade-in"
                style={{
                  animationDelay: `${index * 100}ms`,
                  marginBottom: "20px",
                  padding: "10px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <p className="caption-text" style={{ margin: 0 }}>
                  {item.caption} {emojiSuggestions[index % emojiSuggestions.length]}
                </p>
                <p className="caption-text" style={{ fontWeight: "500", color: "#666" }}>
                  {item.hashtags}
                </p>
                <button
                  onClick={() => handleCopy(`${item.caption} ${item.hashtags}`)}
                  className="copy-btn"
                  title="Copy caption & hashtags"
                >
                  <Copy size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
