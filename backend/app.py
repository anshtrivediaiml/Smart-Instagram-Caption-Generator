from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from dotenv import load_dotenv
import google.generativeai as genai
import base64

app = Flask(__name__)
CORS(app)

app.config["UPLOAD_FOLDER"] = "uploads"
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
load_dotenv()
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = genai.GenerativeModel("gemini-1.5-flash")

@app.route("/generate_caption", methods=["POST"])
def generate_caption():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    if "category" not in request.form:
        return jsonify({"error": "No caption category provided"}), 400
    if "num_captions" not in request.form:
        return jsonify({"error": "No caption count provided"}), 400

    category = request.form["category"].strip().lower()
    num_captions = min(int(request.form["num_captions"]), 20)
    language = request.form.get("language", "english").strip().lower()
    length = request.form.get("length", "medium").strip().lower()

    lang_instruction = {
        "english": "in English",
        "hindi": "in Hindi",
        "gujarati": "in Gujarati"
    }.get(language, "in English")

    length_instruction = {
        "short": "1 sentence long",
        "medium": "2–3 sentences long",
        "long": "3–5 sentences long and storytelling style"
    }.get(length, "2–3 sentences long")

    image = request.files["image"]
    filename = secure_filename(image.filename)
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    image.save(filepath)

    try:
        with open(filepath, "rb") as img_file:
            image_data = img_file.read()
        image_base64 = base64.b64encode(image_data).decode("utf-8")

        image_part = {
            "inline_data": {
                "mime_type": "image/jpeg",
                "data": image_base64,
            }
        }

        prompt = (
            f"Generate exactly {num_captions} Instagram captions {lang_instruction}, "
            f"each {length_instruction}, in a {category} style for the image. "
            f"After each caption, include only 3 to 5 relevant and trending Instagram hashtags, no more. "
            f"Format: caption first, then hashtags on the next line. No numbering, no title, no explanation."
        )

        response = model.generate_content([prompt, image_part])

        if not hasattr(response, "text") or not response.text.strip():
            return jsonify({"error": "No captions generated"}), 500

        lines = [line.strip() for line in response.text.strip().split("\n") if line.strip()]
        captions_with_hashtags = []

        i = 0
        while i < len(lines) - 1:
            caption = lines[i]
            hashtags = lines[i + 1]
            if hashtags.startswith("#"):
                hashtag_list = hashtags.split()
                filtered_hashtags = ' '.join([tag for tag in hashtag_list if tag.startswith("#")][:5])
                captions_with_hashtags.append({
                    "caption": caption,
                    "hashtags": filtered_hashtags
                })
            i += 2

        return jsonify({
            "category": category,
            "language": language,
            "captions": captions_with_hashtags[:num_captions]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
