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

### Quick Start - View Archetypes Locally

First, navigate to where you downloaded/cloned this repository:
```bash
cd /path/to/your/Proto
# Example: cd ~/Downloads/Proto or cd ~/Documents/EHRProto
```

**Option 1: Interactive Web Viewer (Recommended)**
```bash
# Launch the interactive viewer
./launch_viewer.sh
```
This will start a local web server and open the archetype viewer in your browser.

**Option 2: Manual Launch**
```bash
# Start a web server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000/viewer.html
```

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
