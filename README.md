# OpenEHR Healthcare Templates

This project contains OpenEHR archetypes and templates for healthcare workflows including patient registration, radiology, and clinical consultations.

## Project Structure

```
Proto/
├── archetypes/              # OpenEHR archetype files (.adl format)
│   ├── composition/         # COMPOSITION archetypes (clinical documents)
│   ├── cluster/            # CLUSTER archetypes (reusable data groups)
│   ├── observation/        # OBSERVATION archetypes (clinical observations)
│   ├── evaluation/         # EVALUATION archetypes (clinical assessments)
│   ├── instruction/        # INSTRUCTION archetypes (care instructions)
│   ├── action/             # ACTION archetypes (care actions)
│   └── admin_entry/        # ADMIN_ENTRY archetypes (administrative data)
├── templates/              # Operational templates (.opt format)
├── examples/               # Example usage and documentation
└── setup.sh               # Setup script
```

## Available Archetypes

### COMPOSITION Archetypes
- **General Physician Consultation** - Template for GP consultations
- **X-ray Laboratory** - Template for X-ray laboratory operations
- **X-ray Radiology Report** - Template for radiology reporting

### CLUSTER Archetypes
- **Patient Identification** - Patient identification details
- **Person Demographics** - Demographic information
- **Registration Other Data** - Additional registration data

## Getting Started

This repository provides two applications:
1. **Clinical Application** - Full-featured UX/UI for managing clinical data
2. **Template Viewer** - Browse and view all OpenEHR archetype definitions

---

### 🎯 Option 1: Clinical Application (Full UX/UI)

**Launch the complete clinical data system with interactive forms and data management:**

#### Step 1: Navigate to the app directory
```bash
cd /path/to/your/Proto/app
# Example: cd ~/Downloads/Proto/app or cd ~/Documents/EHRProto/app
```

#### Step 2: Launch the application
```bash
./launch_app.sh
```

**Or manually:**
```bash
# Start web server
python3 -m http.server 8080

# Open in browser
open http://localhost:8080/index.html
```

#### What You Get:
- ✅ **Patient Management** - Register and manage patients
- ✅ **Vital Signs Recording** - BP, HR, Temperature, SpO2, Respiratory Rate
- ✅ **Lab Orders & Results** - Order tests, view results with interpretations
- ✅ **Medication Prescriptions** - Prescribe with dosage, route, frequency
- ✅ **Clinical Notes** - Progress notes, consultations, discharge summaries
- ✅ **Imaging Orders** - X-Ray, CT, MRI, Ultrasound orders
- ✅ **Data Export/Import** - JSON, CSV, OpenEHR XML formats
- ✅ **Dashboard** - Statistics, appointments, alerts
- ✅ **Search & Filter** - Find patients and records quickly

**Keyboard Shortcuts:**
- `Ctrl/Cmd + N` - New Patient
- `Ctrl/Cmd + E` - Export Data
- `Escape` - Close Modal

[📖 Full App Documentation](app/README.md)

---

### 📚 Option 2: Template Viewer (Browse Archetypes)

**View and browse all 16 OpenEHR archetype definitions:**

#### Step 1: Navigate to the repository root
```bash
cd /path/to/your/Proto
# Example: cd ~/Downloads/Proto or cd ~/Documents/EHRProto
```

#### Step 2: Launch the viewer
```bash
./launch_viewer.sh
```

**Or manually:**
```bash
# Start web server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000/viewer.html
```

#### What You Get:
- 📄 Browse all 16 archetypes by category
- 🔍 View ADL code with syntax highlighting
- 📋 Copy to clipboard functionality
- 💾 Download individual archetype files
- 📊 Metadata display (category, format, size)
- 🔗 Links to online OpenEHR tools

**Categories Available:**
- COMPOSITION (3) - Clinical documents
- OBSERVATION (2) - Vital signs, lab results
- EVALUATION (2) - Diagnoses, risk assessments
- INSTRUCTION (2) - Medication orders, service requests
- ACTION (2) - Medication admin, procedures
- ADMIN_ENTRY (2) - Admission, discharge
- CLUSTER (3) - Patient data, demographics

[📖 Viewer Usage Guide](USAGE_GUIDE.md)

---

### 🚀 Quick Start Summary

| Task | Command | URL |
|------|---------|-----|
| **Launch Clinical App** | `cd app && ./launch_app.sh` | http://localhost:8080/index.html |
| **Launch Template Viewer** | `./launch_viewer.sh` | http://localhost:8000/viewer.html |
| **View Archetype Files** | `cat archetypes/observation/*.adl` | - |
| **Export Data** | Press `Ctrl/Cmd + E` in app | - |

---

### 📋 Prerequisites

- **Python 3** (for local web server)
- **Modern Web Browser** (Chrome, Firefox, Safari, Edge)
- **No installation required** - Pure HTML/CSS/JavaScript

**Check Python:**
```bash
python3 --version
# Should show Python 3.x.x
```

**Install Python (if needed):**
- **macOS**: `brew install python3`
- **Linux**: `sudo apt install python3`
- **Windows**: Download from https://python.org

---

### 🔧 Troubleshooting

#### Port Already in Use
Both launch scripts automatically find available ports if default ports are busy.

#### Permission Denied
```bash
chmod +x launch_app.sh
chmod +x launch_viewer.sh
```

#### Python Not Found
Install Python 3 or use alternative web server:
```bash
# Using Node.js
npx http-server -p 8080

# Using PHP
php -S localhost:8080
```

#### Browser Doesn't Open
Manually navigate to the URLs shown in the terminal output.

### Using OpenEHR Tools

1. **Online Archetype Designer:** https://tools.openehr.org/designer/
   - Import any `.adl` file from the `archetypes/` directory
   - View, edit, and validate archetypes visually

2. **Clinical Knowledge Manager:** https://ckm.openehr.org/
   - Browse and search existing archetypes
   - Upload and share your own

3. **Desktop Tools:**
   - Download Archetype Editor from https://www.openehr.org/downloads/
   - Open `.adl` files directly

For detailed instructions, see [USAGE_GUIDE.md](USAGE_GUIDE.md)

## Resources

- [OpenEHR Clinical Knowledge Manager](https://ckm.openehr.org/)
- [OpenEHR Archetype Designer](https://tools.openehr.org/)
- [OpenEHR Specifications](https://specifications.openehr.org/)

## ADL Format Compatibility

These archetypes are created in **ADL 1.4** format for maximum compatibility with OpenEHR tools and systems.

All archetypes have been updated to use proper ADL 1.4 syntax and should now parse correctly in OpenEHR tools.

**All archetypes now use the correct ADL 1.4 format with proper UID headers and should parse correctly in OpenEHR tools.**
