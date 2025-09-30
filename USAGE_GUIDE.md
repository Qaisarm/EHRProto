# OpenEHR Templates and Archetypes - Usage Guide

This guide explains how to view, validate, and work with the openEHR templates and archetypes in this repository.

## Table of Contents
1. [Quick Start](#quick-start)
2. [Viewing Archetypes](#viewing-archetypes)
3. [Using OpenEHR Tools](#using-openehr-tools)
4. [Online Tools](#online-tools)
5. [Local Development Setup](#local-development-setup)
6. [Validation](#validation)

---

## Quick Start

### Prerequisites
- Text editor (VS Code, Sublime Text, or any IDE)
- Web browser for online tools
- Optional: Java Runtime Environment (JRE) for local tools

### File Locations
```
archetypes/
├── composition/     # Clinical documents (3 templates)
├── cluster/         # Reusable data groups (3 archetypes)
├── observation/     # Clinical observations (2 archetypes)
├── evaluation/      # Clinical assessments (2 archetypes)
├── instruction/     # Orders and requests (2 archetypes)
├── action/          # Performed activities (2 archetypes)
└── admin_entry/     # Administrative records (2 archetypes)
```

---

## Viewing Archetypes

### Method 1: Text Editor (Simplest)
All archetype files are in ADL (Archetype Definition Language) format and can be opened with any text editor:

```bash
# Navigate to where you downloaded/cloned the repository
cd /path/to/your/Proto

# Example paths:
# cd ~/Downloads/Proto
# cd ~/Documents/EHRProto
# cd ~/Projects/Proto

# View a specific archetype
cat archetypes/composition/openEHR-EHR-COMPOSITION.gp_consultation.v1.adl

# List all archetypes
find archetypes -name "*.adl" -type f
```

### Method 2: VS Code with Syntax Highlighting
1. Open VS Code
2. Install the "ADL" extension (search for "Archetype Definition Language")
3. Open the `Proto` folder in VS Code
4. Browse through the `archetypes/` directory

---

## Using OpenEHR Tools

### 1. Archetype Designer (Online - Recommended)

**URL:** https://tools.openehr.org/designer/

**Steps:**
1. Go to https://tools.openehr.org/designer/
2. Click **"Import"** in the top menu
3. Select **"Import Archetype"**
4. Copy and paste the content of any `.adl` file from this repository
5. Click **"Import"**
6. The archetype will be displayed in a visual tree structure

**Features:**
- Visual tree view of archetype structure
- Edit and modify archetypes
- Validate syntax
- Export in different formats

### 2. Clinical Knowledge Manager (CKM)

**URL:** https://ckm.openehr.org/

**Steps:**
1. Go to https://ckm.openehr.org/
2. Create a free account (optional, but recommended)
3. Browse existing archetypes or upload your own
4. Search for similar archetypes for reference

### 3. Archetype Editor (Desktop Application)

**Download:** https://www.openehr.org/downloads/archetypeeditor/home

**Steps:**
1. Download and install the Archetype Editor
2. Launch the application
3. Go to **File → Open**
4. Navigate to the `archetypes/` directory
5. Select any `.adl` file to open

**Features:**
- Full-featured desktop editor
- Visual and text editing modes
- Built-in validation
- Template creation

---

## Online Tools

### Quick View Tools

#### 1. ADL Workbench (Web Version)
**URL:** https://ehrscape.marand.si/

**Features:**
- Parse and validate ADL files
- View archetype structure
- Test queries

#### 2. Better Platform Studio
**URL:** https://platform.better.care/studio

**Features:**
- Import and view archetypes
- Create templates from archetypes
- Generate forms automatically
- Test with sample data

#### 3. Ocean Health Systems Template Designer
**URL:** https://oceanhealthsystems.com/

**Features:**
- Professional template design
- Archetype composition
- Form generation

---

## Local Development Setup

### Using Python ADL Parser

```bash
# Install Python ADL parser
pip install pyehr

# Create a simple viewer script
cat > view_archetype.py << 'EOF'
import sys
from pyehr.ehr.services.dbmanager.dbservices import DBServices
from pyehr.ehr.services.dbmanager.drivers import FileSystemDriver

def view_archetype(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    print(content)
    print("\n" + "="*80)
    print(f"Archetype: {file_path}")
    print("="*80)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        view_archetype(sys.argv[1])
    else:
        print("Usage: python view_archetype.py <path_to_adl_file>")
EOF

# Run the viewer
python view_archetype.py archetypes/observation/openEHR-EHR-OBSERVATION.vital_signs.v1.adl
```

### Using Node.js ADL Viewer

```bash
# Install archetype-js
npm install -g archetype-js

# View an archetype
archetype-js parse archetypes/observation/openEHR-EHR-OBSERVATION.vital_signs.v1.adl
```

---

## Validation

### Online Validation

**ADL Validator:** https://tools.openehr.org/designer/

1. Open the Archetype Designer
2. Import your archetype
3. Click **"Validate"**
4. Review any errors or warnings

### Command Line Validation

```bash
# Using ADL Workbench CLI (if installed)
adl-workbench validate archetypes/

# Using custom validation script
cat > validate_all.sh << 'EOF'
#!/bin/bash
echo "Validating all ADL files..."
find archetypes -name "*.adl" -type f | while read file; do
    echo "Checking: $file"
    # Basic syntax check
    if grep -q "archetype (adl_version=" "$file"; then
        echo "  ✓ Valid ADL header"
    else
        echo "  ✗ Invalid ADL header"
    fi
done
EOF

chmod +x validate_all.sh
./validate_all.sh
```

---

## Viewing All Templates at Once

### Method 1: Generate HTML Documentation

```bash
# Navigate to your repository directory first
cd /path/to/your/Proto

# Create a documentation generator script
cat > generate_docs.sh << 'EOF'
#!/bin/bash

OUTPUT_DIR="docs"
mkdir -p $OUTPUT_DIR

echo "<html><head><title>OpenEHR Archetypes</title></head><body>" > $OUTPUT_DIR/index.html
echo "<h1>OpenEHR Archetype Library</h1>" >> $OUTPUT_DIR/index.html
echo "<ul>" >> $OUTPUT_DIR/index.html

find archetypes -name "*.adl" -type f | sort | while read file; do
    basename=$(basename "$file")
    echo "<li><a href='$basename.html'>$basename</a></li>" >> $OUTPUT_DIR/index.html
    
    # Create individual page
    echo "<html><head><title>$basename</title></head><body><pre>" > "$OUTPUT_DIR/$basename.html"
    cat "$file" >> "$OUTPUT_DIR/$basename.html"
    echo "</pre></body></html>" >> "$OUTPUT_DIR/$basename.html"
done

echo "</ul></body></html>" >> $OUTPUT_DIR/index.html
echo "Documentation generated in $OUTPUT_DIR/index.html"
EOF

chmod +x generate_docs.sh
./generate_docs.sh

# Open in browser
open docs/index.html  # macOS
# or
xdg-open docs/index.html  # Linux
```

### Method 2: Use the Manifest

View the complete list of all archetypes:

```bash
# View the manifest
cat archetypes/ARCHETYPE_MANIFEST.md

# Or open in your browser
open archetypes/ARCHETYPE_MANIFEST.md
```

---

## Interactive Web Viewer (Recommended)

### Create a Simple Web Viewer

```bash
# Navigate to your repository directory first
cd /path/to/your/Proto

# Create a simple HTML viewer
cat > viewer.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>OpenEHR Archetype Viewer</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .container { display: flex; }
        .sidebar { width: 300px; border-right: 1px solid #ccc; padding-right: 20px; }
        .content { flex: 1; padding-left: 20px; }
        .archetype-link { cursor: pointer; padding: 5px; margin: 5px 0; }
        .archetype-link:hover { background-color: #f0f0f0; }
        pre { background-color: #f5f5f5; padding: 15px; overflow-x: auto; }
        h2 { color: #2c3e50; }
        .category { font-weight: bold; margin-top: 15px; color: #3498db; }
    </style>
</head>
<body>
    <h1>OpenEHR Archetype Library</h1>
    <div class="container">
        <div class="sidebar">
            <div class="category">COMPOSITION</div>
            <div class="archetype-link" onclick="loadArchetype('composition/openEHR-EHR-COMPOSITION.gp_consultation.v1.adl')">
                GP Consultation
            </div>
            <div class="archetype-link" onclick="loadArchetype('composition/openEHR-EHR-COMPOSITION.xray_laboratory.v1.adl')">
                X-ray Laboratory
            </div>
            <div class="archetype-link" onclick="loadArchetype('composition/openEHR-EHR-COMPOSITION.xray_radiology_report.v1.adl')">
                X-ray Radiology Report
            </div>
            
            <div class="category">OBSERVATION</div>
            <div class="archetype-link" onclick="loadArchetype('observation/openEHR-EHR-OBSERVATION.vital_signs.v1.adl')">
                Vital Signs
            </div>
            <div class="archetype-link" onclick="loadArchetype('observation/openEHR-EHR-OBSERVATION.laboratory_test_result.v1.adl')">
                Laboratory Test Result
            </div>
            
            <div class="category">EVALUATION</div>
            <div class="archetype-link" onclick="loadArchetype('evaluation/openEHR-EHR-EVALUATION.problem_diagnosis.v1.adl')">
                Problem/Diagnosis
            </div>
            <div class="archetype-link" onclick="loadArchetype('evaluation/openEHR-EHR-EVALUATION.clinical_risk_assessment.v1.adl')">
                Clinical Risk Assessment
            </div>
            
            <div class="category">INSTRUCTION</div>
            <div class="archetype-link" onclick="loadArchetype('instruction/openEHR-EHR-INSTRUCTION.medication_order.v1.adl')">
                Medication Order
            </div>
            <div class="archetype-link" onclick="loadArchetype('instruction/openEHR-EHR-INSTRUCTION.service_request.v1.adl')">
                Service Request
            </div>
            
            <div class="category">ACTION</div>
            <div class="archetype-link" onclick="loadArchetype('action/openEHR-EHR-ACTION.medication_administration.v1.adl')">
                Medication Administration
            </div>
            <div class="archetype-link" onclick="loadArchetype('action/openEHR-EHR-ACTION.procedure.v1.adl')">
                Procedure
            </div>
            
            <div class="category">ADMIN_ENTRY</div>
            <div class="archetype-link" onclick="loadArchetype('admin_entry/openEHR-EHR-ADMIN_ENTRY.admission.v1.adl')">
                Hospital Admission
            </div>
            <div class="archetype-link" onclick="loadArchetype('admin_entry/openEHR-EHR-ADMIN_ENTRY.discharge.v1.adl')">
                Hospital Discharge
            </div>
            
            <div class="category">CLUSTER</div>
            <div class="archetype-link" onclick="loadArchetype('cluster/openEHR-EHR-CLUSTER.patient_identification.v1.adl')">
                Patient Identification
            </div>
            <div class="archetype-link" onclick="loadArchetype('cluster/openEHR-EHR-CLUSTER.person_demographics.v1.adl')">
                Person Demographics
            </div>
        </div>
        <div class="content">
            <h2 id="archetype-title">Select an archetype to view</h2>
            <pre id="archetype-content">Click on an archetype from the sidebar to view its content.</pre>
        </div>
    </div>
    
    <script>
        function loadArchetype(path) {
            const fullPath = 'archetypes/' + path;
            document.getElementById('archetype-title').textContent = path.split('/').pop();
            
            fetch(fullPath)
                .then(response => response.text())
                .then(data => {
                    document.getElementById('archetype-content').textContent = data;
                })
                .catch(error => {
                    document.getElementById('archetype-content').textContent = 
                        'Error loading archetype. Please ensure you are running this from a web server.\n\n' +
                        'To run a local web server:\n' +
                        '  python3 -m http.server 8000\n' +
                        'Then open: http://localhost:8000/viewer.html';
                });
        }
    </script>
</body>
</html>
EOF

echo "Web viewer created! To use it:"
echo "1. Run: python3 -m http.server 8000"
echo "2. Open: http://localhost:8000/viewer.html"
```

---

## Quick Commands Reference

```bash
# List all archetypes
find archetypes -name "*.adl" -type f | sort

# Count archetypes by type
echo "COMPOSITION: $(find archetypes/composition -name "*.adl" | wc -l)"
echo "CLUSTER: $(find archetypes/cluster -name "*.adl" | wc -l)"
echo "OBSERVATION: $(find archetypes/observation -name "*.adl" | wc -l)"
echo "EVALUATION: $(find archetypes/evaluation -name "*.adl" | wc -l)"
echo "INSTRUCTION: $(find archetypes/instruction -name "*.adl" | wc -l)"
echo "ACTION: $(find archetypes/action -name "*.adl" | wc -l)"
echo "ADMIN_ENTRY: $(find archetypes/admin_entry -name "*.adl" | wc -l)"

# Search for specific terms in archetypes
grep -r "vital signs" archetypes/

# View archetype metadata
head -n 30 archetypes/observation/openEHR-EHR-OBSERVATION.vital_signs.v1.adl
```

---

## Troubleshooting

### Issue: Cannot open ADL files
**Solution:** ADL files are plain text. Use any text editor (VS Code, Sublime, Notepad++, etc.)

### Issue: Validation errors
**Solution:** Use the online Archetype Designer at https://tools.openehr.org/designer/ for detailed error messages

### Issue: Want to create forms from archetypes
**Solution:** Use Better Platform Studio (https://platform.better.care/studio) or Ocean Template Designer

### Issue: Need to integrate with EHR system
**Solution:** Export as operational templates (.opt) using the Archetype Designer, then import into your EHR system

---

## Additional Resources

- **OpenEHR Specifications:** https://specifications.openehr.org/
- **ADL Documentation:** https://specifications.openehr.org/releases/AM/latest/ADL2.html
- **Community Forum:** https://discourse.openehr.org/
- **GitHub Examples:** https://github.com/openEHR/
- **Training Materials:** https://www.openehr.org/resources/training

---

## Next Steps

1. **Explore the archetypes** using the methods above
2. **Validate** your archetypes using online tools
3. **Create templates** by combining multiple archetypes
4. **Generate forms** for data entry
5. **Integrate** with your EHR system

For questions or issues, refer to the OpenEHR community forum or create an issue in this repository.
