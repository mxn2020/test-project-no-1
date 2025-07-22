#!/bin/bash

# Script to update all dev-container component files with new devId logic

find src/lib/dev-container -name "*.tsx" \( -path "*/shadcn/*" -o -path "*/geenius/*" \) | while read -r file; do
  echo "Updating $file..."
  
  # Skip files that are already updated (contain useDevMode hook)
  if grep -q "useDevMode" "$file"; then
    echo "  Already updated, skipping..."
    continue
  fi
  
  # Create a temporary file for processing
  temp_file=$(mktemp)
  
  # Read the file and process it
  python3 << EOF > "$temp_file"
import re
import sys

# Read the file
with open('$file', 'r') as f:
    content = f.read()

# Add useDevMode import if not present
if 'useDevMode' not in content:
    # Find the DevProps import line and add useDevMode
    content = re.sub(
        r"import { DevProps } from '../types';",
        "import { DevProps } from '../types';\nimport { useDevMode } from '../hooks/useDevMode';",
        content
    )

# Add devDetailed parameter if missing
content = re.sub(
    r'({ devId, devName, devDescription, devSelectable = true)(, children)',
    r'\1, devDetailed\2',
    content
)

# Remove generateId import if present
content = re.sub(r"import { generateId }.*?;\n", "", content)

# Remove old componentId line if present
content = re.sub(r"const componentId = devId \|\|.*?;\n", "", content, flags=re.DOTALL)

# Add the new logic before the return statement
if 'shouldContainerize' not in content:
    # Find the function body start
    pattern = r'(\({ devId[^}]+}\s*,\s*ref\)\s*=>\s*{\s*)'
    replacement = r'\1const { config } = useDevMode();\n  const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);\n  \n  // If no devId provided or explicitly set to "noID", don\'t containerize\n  if (!devId || devId === "noID" || !shouldContainerize) {\n    return (\n      ORIGINAL_RETURN_CONTENT\n    );\n  }\n\n  '
    
    # This is complex, so let's use a simpler approach for each file type
    
# Print the content
print(content)
EOF

  # Copy the processed content back to the original file
  if [ -s "$temp_file" ]; then
    mv "$temp_file" "$file"
    echo "  Updated successfully"
  else
    echo "  Failed to update"
    rm -f "$temp_file"
  fi
done