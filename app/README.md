# 🏥 OpenEHR Clinical Data System

A modern, interactive web application for managing clinical data based on OpenEHR archetypes.

## Features

### 📊 Dashboard
- Real-time statistics and metrics
- Today's appointments
- Alerts and reminders
- Recent activity feed

### 👥 Patient Management
- Register new patients
- Search and filter patients
- View patient details
- Track patient history

### 🩺 Clinical Records
- Record vital signs (BP, HR, Temperature, SpO2, Respiratory Rate)
- Create clinical notes
- Problem/diagnosis tracking
- Risk assessments

### 💊 Medication Management
- Prescribe medications
- Track active prescriptions
- Medication history
- Dosage and frequency management

### 🔬 Laboratory
- Order lab tests
- View lab results
- Track test status
- Reference ranges and interpretations

### 🏥 Imaging
- Order imaging studies (X-Ray, CT, MRI, Ultrasound)
- Track imaging orders
- View radiology reports

## Quick Start

### Launch the Application

```bash
# Navigate to the app directory
cd /path/to/Proto/app

# Launch the application
./launch_app.sh
```

The application will automatically open in your browser at `http://localhost:8080`

### Manual Launch

```bash
# Start a web server
python3 -m http.server 8080

# Open in browser
open http://localhost:8080/index.html
```

## Usage

### 1. Register Patients
Click **"New Patient"** in the sidebar or use `Ctrl/Cmd + N`

### 2. Record Vital Signs
Click **"Record Vitals"** and select a patient

### 3. Order Tests
Use **"Order Lab Test"** or **"Order Imaging Study"** buttons

### 4. Prescribe Medications
Click **"Prescribe Medication"** and fill in the details

### 5. Create Clinical Notes
Navigate to **Clinical Records** and click **"New Clinical Note"**

## Data Management

### Export Data
- **JSON Export**: `Ctrl/Cmd + E` or use the data manager
- **CSV Export**: Export specific data types (patients, vitals, etc.)
- **OpenEHR XML**: Export individual records in OpenEHR format

### Import Data
- Import previously exported JSON files
- Restore backups

### Sample Data
Generate sample data for testing:
```javascript
dataManager.generateSampleData()
```

### Clear Data
Remove all data:
```javascript
dataManager.clearAllData()
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + N` | New Patient |
| `Ctrl/Cmd + E` | Export Data |
| `Escape` | Close Modal |

## OpenEHR Archetypes Used

This application implements the following OpenEHR archetypes:

### COMPOSITION
- `openEHR-EHR-COMPOSITION.gp_consultation.v1`
- `openEHR-EHR-COMPOSITION.xray_laboratory.v1`
- `openEHR-EHR-COMPOSITION.xray_radiology_report.v1`

### OBSERVATION
- `openEHR-EHR-OBSERVATION.vital_signs.v1`
- `openEHR-EHR-OBSERVATION.laboratory_test_result.v1`

### EVALUATION
- `openEHR-EHR-EVALUATION.problem_diagnosis.v1`
- `openEHR-EHR-EVALUATION.clinical_risk_assessment.v1`

### INSTRUCTION
- `openEHR-EHR-INSTRUCTION.medication_order.v1`
- `openEHR-EHR-INSTRUCTION.service_request.v1`

### ACTION
- `openEHR-EHR-ACTION.medication_administration.v1`
- `openEHR-EHR-ACTION.procedure.v1`

### ADMIN_ENTRY
- `openEHR-EHR-ADMIN_ENTRY.admission.v1`
- `openEHR-EHR-ADMIN_ENTRY.discharge.v1`

### CLUSTER
- `openEHR-EHR-CLUSTER.patient_identification.v1`
- `openEHR-EHR-CLUSTER.person_demographics.v1`

## Data Storage

All data is stored locally in your browser's `localStorage`. Data persists between sessions but is specific to your browser.

### Backup Recommendations
- Regularly export your data using `Ctrl/Cmd + E`
- Store backups in a safe location
- Data is not synced across devices

## Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ⚠️ Internet Explorer (Not supported)

## Technology Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Icons**: Font Awesome 6
- **Storage**: Browser localStorage
- **Standards**: OpenEHR ADL 1.4

## File Structure

```
app/
├── index.html          # Main application page
├── styles.css          # Application styles
├── app.js             # Core application logic
├── forms.js           # Dynamic form generation
├── data.js            # Data management and export
├── launch_app.sh      # Launch script
└── README.md          # This file
```

## Development

### Adding New Features

1. **New Form**: Add to `forms.js` in the `getModalContent()` method
2. **New Page**: Add page div in `index.html` and render function in `app.js`
3. **New Data Type**: Add to `app.data` object and create render function

### Customization

- **Colors**: Modify CSS variables in `styles.css` (`:root` section)
- **Archetypes**: Extend forms in `forms.js` to match your archetypes
- **Validation**: Add validation rules in form submission handlers

## API Integration

To integrate with a backend EHR system:

1. Replace `localStorage` calls with API endpoints
2. Implement authentication
3. Add real-time sync
4. Connect to OpenEHR CDR (Clinical Data Repository)

Example:
```javascript
// In app.js, replace saveData():
async saveData() {
    await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.data)
    });
}
```

## Security Notes

⚠️ **This is a demonstration application**

For production use:
- Implement proper authentication
- Use HTTPS
- Encrypt sensitive data
- Follow HIPAA/GDPR compliance
- Implement audit logging
- Add role-based access control

## Troubleshooting

### Port Already in Use
The launch script automatically finds an available port if 8080 is busy.

### Data Not Saving
- Check browser console for errors
- Ensure localStorage is enabled
- Try clearing browser cache

### Forms Not Submitting
- Check that all required fields are filled
- Open browser console (F12) for error messages

### Browser Doesn't Open
Manually navigate to `http://localhost:8080/index.html`

## Support

For issues related to:
- **OpenEHR Specifications**: https://specifications.openehr.org/
- **Archetypes**: https://ckm.openehr.org/
- **Community**: https://discourse.openehr.org/

## License

This is a demonstration application for educational purposes.

## Contributing

To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Roadmap

- [ ] Patient search with advanced filters
- [ ] Data visualization and charts
- [ ] Print/PDF export for reports
- [ ] Multi-language support
- [ ] Mobile responsive design improvements
- [ ] Offline mode with sync
- [ ] Integration with FHIR
- [ ] Real-time collaboration
- [ ] Advanced analytics dashboard

## Acknowledgments

Built using OpenEHR archetypes and following clinical data standards.

---

**Made with ❤️ for healthcare professionals**
