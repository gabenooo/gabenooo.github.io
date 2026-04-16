import os
from PIL import Image

INPUT_DIR = "images"
OUTPUT_DIR = "thumbs"

MAX_WIDTH = 1200
QUALITY = 75  # 60–80 is a good range

os.makedirs(OUTPUT_DIR, exist_ok=True)

for filename in os.listdir(INPUT_DIR):
    if not filename.lower().endswith((".jpg", ".jpeg", ".png")):
        continue

    input_path = os.path.join(INPUT_DIR, filename)
    output_path = os.path.join(OUTPUT_DIR, filename)

    try:
        with Image.open(input_path) as img:
            # Convert to RGB (fixes PNG / weird formats)
            img = img.convert("RGB")

            # Resize while maintaining aspect ratio
            width, height = img.size
            if width > MAX_WIDTH:
                new_height = int((MAX_WIDTH / width) * height)
                img = img.resize((MAX_WIDTH, new_height), Image.LANCZOS)

            # Save compressed thumbnail
            img.save(output_path, "JPEG", quality=QUALITY, optimize=True)

            print(f"✓ Created thumbnail: {filename}")

    except Exception as e:
        print(f"Error processing {filename}: {e}")