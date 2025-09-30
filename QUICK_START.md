# 🚀 Quick Start Guide

## View All Templates in 3 Easy Steps

### Step 1: Navigate to the Repository
```bash
cd /path/to/your/Proto
# Example: cd ~/Downloads/Proto
```

### Step 2: Launch the Viewer
```bash
./launch_viewer.sh
```

### Step 3: Browse!
The viewer will automatically open in your browser at `http://localhost:8000/viewer.html`

---

## What You Can Do

### 📖 Browse All 16 Archetypes
- **3 COMPOSITION** templates (clinical documents)
- **2 OBSERVATION** archetypes (vital signs, lab results)
- **2 EVALUATION** archetypes (diagnoses, risk assessments)
- **2 INSTRUCTION** archetypes (medication orders, service requests)
- **2 ACTION** archetypes (medication admin, procedures)
- **2 ADMIN_ENTRY** archetypes (admission, discharge)
- **3 CLUSTER** archetypes (patient data, demographics)

### 🔍 Features
- **Visual sidebar** - Click any archetype to view
- **Syntax highlighting** - Easy-to-read ADL format
- **Copy to clipboard** - One-click copy
- **Download** - Save individual files
- **Metadata display** - See category, format, and size

---

## Alternative Methods

### Method 1: Manual Web Server
```bash
python3 -m http.server 8000
# Then open: http://localhost:8000/viewer.html
```

### Method 2: View in Text Editor
```bash
# View any archetype file
cat archetypes/observation/openEHR-EHR-OBSERVATION.vital_signs.v1.adl

# List all archetypes
find archetypes -name "*.adl"
```

### Method 3: Use Online Tools
- **Archetype Designer:** https://tools.openehr.org/designer/
  - Copy/paste any `.adl` file content
  - Visual tree view and editing

- **Clinical Knowledge Manager:** https://ckm.openehr.org/
  - Browse existing archetypes
  - Upload your own

---

## Troubleshooting

### "Permission denied" when running launch_viewer.sh
```bash
chmod +x launch_viewer.sh
./launch_viewer.sh
```

### "Python 3 not found"
Install Python 3:
- **macOS:** `brew install python3`
- **Linux:** `sudo apt install python3`
- **Windows:** Download from https://python.org

### Port 8000 already in use
The script will automatically find an available port and use that instead.

### Browser doesn't open automatically
Manually open: `http://localhost:8000/viewer.html`

---

## Next Steps

1. ✅ **View the archetypes** using the interactive viewer
2. 📚 **Read the full guide:** [USAGE_GUIDE.md](USAGE_GUIDE.md)
3. 🔧 **Edit archetypes:** Use https://tools.openehr.org/designer/
4. 📋 **Check the manifest:** [archetypes/ARCHETYPE_MANIFEST.md](archetypes/ARCHETYPE_MANIFEST.md)
5. 🏗️ **Build templates:** Combine archetypes for your use case

---

## Need Help?

- **Full Documentation:** [USAGE_GUIDE.md](USAGE_GUIDE.md)
- **OpenEHR Community:** https://discourse.openehr.org/
- **OpenEHR Specifications:** https://specifications.openehr.org/

---

**Happy Exploring! 🎉**
