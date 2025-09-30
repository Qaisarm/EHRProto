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

1. Install an OpenEHR tooling environment (e.g., Archetype Designer, Template Designer)
2. Import the archetypes from the `archetypes/` directory
3. Open and customize the template from the `templates/` directory
4. Export the template for use in your OpenEHR system

## Resources

- [OpenEHR Clinical Knowledge Manager](https://ckm.openehr.org/)
- [OpenEHR Archetype Designer](https://tools.openehr.org/)
- [OpenEHR Specifications](https://specifications.openehr.org/)

## ADL Format Compatibility

These archetypes are created in **ADL 1.4** format for maximum compatibility with OpenEHR tools and systems.

All archetypes have been updated to use proper ADL 1.4 syntax and should now parse correctly in OpenEHR tools.

**All archetypes now use the correct ADL 1.4 format with proper UID headers and should parse correctly in OpenEHR tools.**
