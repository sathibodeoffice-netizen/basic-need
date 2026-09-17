from PIL import Image
import sys

def remove_white_bg(input_path, output_path, tolerance=220):
    try:
        img = Image.open(input_path).convert("RGBA")
        data = img.getdata()
        
        new_data = []
        for item in data:
            # Check if pixel is close to white
            if item[0] > tolerance and item[1] > tolerance and item[2] > tolerance:
                # Make it transparent
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
                
        img.putdata(new_data)
        img.save(output_path, "PNG")
        print(f"Successfully created transparent image: {output_path}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python make_transparent.py <input> <output>")
    else:
        remove_white_bg(sys.argv[1], sys.argv[2])
