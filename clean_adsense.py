import os
import re

file_path = r'c:\Users\dell\Desktop\ALAE CHAKIR\index.html'
client_id = 'ca-pub-3226522232529208'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find the script tag with this client ID, allowing for variations in whitespace/newlines
pattern = r'<script async src="https://pagead2\.googlesyndication\.com/pagead/js/adsbygoogle\.js\?client=' + client_id + r'".*?></script>'
# Note: the above regex is simplified, let's make it more robust
pattern = re.compile(r'<script async src="https://pagead2\.googlesyndication\.com/pagead/js/adsbygoogle\.js\?client=' + client_id + r'"\s+crossorigin="anonymous"></script>', re.DOTALL)

# Actually, let's just find all instances of the googlesyndication script and replace them with one clean one.
search_pattern = re.compile(r'<script async src="https://pagead2\.googlesyndication\.com/pagead/js/adsbygoogle\.js.*?</script>', re.DOTALL)

matches = search_pattern.findall(content)
print(f"Found {len(matches)} matches.")

if len(matches) > 0:
    # Remove all of them first
    clean_content = search_pattern.sub('', content)
    # Re-insert one clean one after the title
    replacement = f'<title>My Picnic - تجربة بيكينيك مغربية</title>\n    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={client_id}" crossorigin="anonymous"></script>'
    final_content = clean_content.replace('<title>My Picnic - تجربة بيكينيك مغربية</title>', replacement)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(final_content)
    print("Cleaned up and inserted one instance.")
else:
    # If no matches found (maybe grep was right?), let's just try to insert it once
    replacement = f'<title>My Picnic - تجربة بيكينيك مغربية</title>\n    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={client_id}" crossorigin="anonymous"></script>'
    final_content = content.replace('<title>My Picnic - تجربة بيكينيك مغربية</title>', replacement)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(final_content)
    print("Inserted one instance (none found previously).")
