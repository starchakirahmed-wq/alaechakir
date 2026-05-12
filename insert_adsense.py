import os

file_path = r'c:\Users\dell\Desktop\ALAE CHAKIR\index.html'
script_to_add = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3226522232529208" crossorigin="anonymous"></script>'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

if script_to_add not in content:
    new_content = content.replace('<title>My Picnic - تجربة بيكينيك مغربية</title>', f'<title>My Picnic - تجربة بيكينيك مغربية</title>\n    {script_to_add}')
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Script added successfully.")
else:
    print("Script already exists.")
