#!/bin/bash

# OpenEHR Patient Registration Template Setup Script
# This script helps set up and validate the patient registration templates

echo "OpenEHR Patient Registration Template Setup"
echo "=========================================="

# Check if required tools are available
echo "Checking for OpenEHR tools..."

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check for common OpenEHR tools
if command_exists "archetype_editor" || command_exists "template_designer"; then
    echo "✓ OpenEHR tools found"
else
    echo "! OpenEHR tools not found in PATH"
    echo "  You may need to install:"
    echo "  - Archetype Designer"
    echo "  - Template Designer"
    echo "  - ADL Workbench"
fi

# Validate ADL files (basic syntax check)
echo "Validating archetype files..."
for adl_file in archetypes/*.adl; do
    if [ -f "$adl_file" ]; then
        echo "  Checking $adl_file..."
        # Basic validation - check if file contains expected structure
        if grep -q "archetype (adl_version=" "$adl_file"; then
            echo "    ✓ Valid archetype structure"
        else
            echo "    ✗ Invalid archetype structure"
        fi
    fi
done

# Check template file
echo "Checking template file..."
if [ -f "templates/patient_registration_template.opt" ]; then
    if grep -q "template xmlns=" templates/patient_registration_template.opt; then
        echo "  ✓ Valid template structure"
    else
        echo "  ✗ Invalid template structure"
    fi
else
    echo "  ✗ Template file not found"
fi

echo ""
echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Import archetypes (.adl files) into your OpenEHR tool"
echo "2. Load the template (.opt file) into your template designer"
echo "3. Customize constraints as needed for your organization"
echo "4. Test with sample data"
echo "5. Deploy to your EHR system"
echo ""
echo "For more information, see examples/README.md"
