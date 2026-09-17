from PIL import Image
import sys

def make_dark_mode_logo(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        data = img.getdata()
        
        new_data = []
        for item in data:
            r, g, b, a = item
            
            # If the pixel has some opacity
            if a > 0:
                # Check if it's a dark/grayish pixel (part of the black text)
                # The green text has high G, low R and B.
                # Black text has low RGB values.
                # Let's say if it's not distinctly green, and it's dark
                # Actually, any pixel that is very dark, we can lighten it.
                # Or just check if G is not dominating.
                # A simple check: if max(R,G,B) is low, or if it's grayish
                if r < 80 and g < 100 and b < 100:
                    # It's part of the black text, make it white
                    # Keep the original alpha for smooth edges
                    new_data.append((255, 255, 255, a))
                elif r < 120 and g < 140 and b < 120 and (g - r) < 30:
                    # Catch the anti-aliased gray edges of the black text
                    new_data.append((255, 255, 255, a))
                else:
                    new_data.append(item)
            else:
                new_data.append(item)
                
        img.putdata(new_data)
        img.save(output_path, "PNG")
        print(f"Successfully created dark mode logo: {output_path}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python make_dark_logo.py <input> <output>")
    else:
        make_dark_mode_logo(sys.argv[1], sys.argv[2])
