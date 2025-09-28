# Patient Registration Template Usage Guide

This guide explains how to use the OpenEHR patient registration template and archetypes.

## Overview

The patient registration template provides a standardized way to capture patient demographic, contact, address, and identification information for healthcare systems.

## Template Components

### 1. Person Demographics Archetype
- **File**: `openEHR-EHR-CLUSTER.person_demographics.v1.adl`
- **Purpose**: Captures basic demographic information
- **Key Fields**:
  - Title, Given names, Family name
  - Date of birth, Gender
  - Birth place, Nationality, Ethnicity
  - Marital status

### 2. Address Archetype
- **File**: `openEHR-EHR-CLUSTER.address.v1.adl`
- **Purpose**: Captures address information
- **Key Fields**:
  - Address type (Home, Work, etc.)
  - Street lines, City, State/Province
  - Postal code, Country
  - Validity period

### 3. Contact Archetype
- **File**: `openEHR-EHR-CLUSTER.contact.v1.adl`
- **Purpose**: Captures contact information
- **Key Fields**:
  - Contact type (Home, Work, Mobile, Emergency)
  - Phone number, Email address
  - Preferred contact method
  - Contact notes

### 4. Patient Identification Archetype
- **File**: `openEHR-EHR-CLUSTER.patient_identification.v1.adl`
- **Purpose**: Captures identification and emergency contact information
- **Key Fields**:
  - Medical record number
  - National patient identifier
  - Insurance information
  - Emergency contact details

## Template Structure

The main template file `patient_registration_template.opt` combines all these archetypes into a single patient registration form with the following structure:

```
Patient Registration
├── Patient Details
    ├── Person Demographics (required)
    ├── Address Information (optional)
    ├── Contact Information (optional)
    └── Patient Identification (optional)
```

## Usage in Healthcare Systems

### 1. Import Archetypes
First, import the archetype files (.adl) into your OpenEHR system or template designer tool.

### 2. Load Template
Load the template file (.opt) into your template designer or EHR system.

### 3. Customize Constraints
The template uses archetype slots that allow you to:
- Add specific constraints for your use case
- Include additional archetypes if needed
- Remove optional sections not required by your organization

### 4. Generate Forms
Use the template to generate:
- Data entry forms for registration staff
- API schemas for system integration
- Validation rules for data quality

## Example Data Structure

```json
{
  "patient_registration": {
    "person_demographics": {
      "given_names": "John",
      "family_name": "Smith",
      "date_of_birth": "1980-05-15",
      "gender": "Male"
    },
    "address": {
      "address_type": "Home",
      "street_lines": ["123 Main Street"],
      "city": "Anytown",
      "state_province": "CA",
      "postal_code": "12345",
      "country": "USA"
    },
    "contact": {
      "contact_type": "Home",
      "phone_number": "+1-555-0123",
      "email_address": "john.smith@email.com"
    },
    "patient_identification": {
      "medical_record_number": "MRN123456",
      "emergency_contact_name": "Jane Smith",
      "emergency_contact_phone": "+1-555-0124"
    }
  }
}
```

## Customization Tips

1. **Add Organization-Specific Fields**: Extend archetypes or add new ones for organization-specific requirements
2. **Set Mandatory Fields**: Configure cardinality constraints based on your registration requirements
3. **Add Validation Rules**: Implement pattern matching for phone numbers, email addresses, etc.
4. **Localization**: Translate term definitions for different languages
5. **Integration**: Map fields to existing systems (HL7 FHIR, etc.)

## Validation and Testing

- Test the template with sample data
- Validate against OpenEHR specifications
- Check for data quality and completeness
- Ensure compatibility with your EHR system

## Resources

- [OpenEHR Clinical Knowledge Manager](https://ckm.openehr.org/)
- [OpenEHR Specifications](https://specifications.openehr.org/)
- [Archetype Designer Tool](https://tools.openehr.org/)
- [Template Designer Documentation](https://www.openehr.org/programs/clinicalmodels/tools)

## Support

For questions or issues with this template, please refer to the OpenEHR community resources or contact your system administrator.
