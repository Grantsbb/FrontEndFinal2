import os

# switch file names to lower-case

directory = os.getcwd()

for filename in os.listdir(directory):
    # Only rename if the filename has uppercase letters
    if any(char.isupper() for char in filename):
        lowercase_filename = filename.lower()
        old_path = os.path.join(directory, filename)
        new_path = os.path.join(directory, lowercase_filename)

        if not os.path.exists(new_path):  # Avoid overwriting files
            os.rename(old_path, new_path)
            print(f"Renamed: {filename} → {lowercase_filename}")
        else:
            print(f"Skipped (target already exists): {filename}")
