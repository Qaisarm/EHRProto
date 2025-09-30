// Data Management Module - Export and Import functionality
const dataManager = {
    // Export data to JSON
    exportToJSON() {
        const dataStr = JSON.stringify(app.data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `openehr-data-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    },

    // Export to CSV
    exportToCSV(dataType) {
        let data, headers, filename;
        
        switch(dataType) {
            case 'patients':
                data = app.data.patients;
                headers = ['ID', 'Name', 'Age', 'Gender', 'Contact', 'Last Visit'];
                filename = 'patients';
                break;
            case 'vitalSigns':
                data = app.data.vitalSigns;
                headers = ['ID', 'Patient', 'Date', 'Systolic', 'Diastolic', 'Heart Rate', 'Temp', 'SpO2'];
                filename = 'vital-signs';
                break;
            case 'medications':
                data = app.data.medications;
                headers = ['ID', 'Patient', 'Medication', 'Dosage', 'Frequency', 'Status'];
                filename = 'medications';
                break;
            case 'labResults':
                data = app.data.labResults;
                headers = ['ID', 'Patient', 'Test', 'Date', 'Status'];
                filename = 'lab-results';
                break;
            default:
                return;
        }
        
        const csvContent = this.convertToCSV(data, headers);
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    },

    convertToCSV(data, headers) {
        const rows = [headers.join(',')];
        
        data.forEach(item => {
            const values = Object.values(item).map(val => {
                if (typeof val === 'string' && val.includes(',')) {
                    return `"${val}"`;
                }
                return val;
            });
            rows.push(values.join(','));
        });
        
        return rows.join('\n');
    },

    // Import data from JSON
    importFromJSON(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                if (confirm('This will replace all existing data. Continue?')) {
                    app.data = importedData;
                    app.saveData();
                    app.renderPage(app.currentPage);
                    forms.showSuccess('Data imported successfully!');
                }
            } catch (error) {
                alert('Error importing data: Invalid JSON file');
            }
        };
        reader.readAsText(file);
    },

    // Generate OpenEHR compliant XML
    exportToOpenEHR(recordType, recordId) {
        const record = this.getRecord(recordType, recordId);
        if (!record) return;
        
        const xml = this.generateOpenEHRXML(recordType, record);
        const blob = new Blob([xml], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `openehr-${recordType}-${recordId}.xml`;
        link.click();
        URL.revokeObjectURL(url);
    },

    getRecord(type, id) {
        const dataMap = {
            'vitalSigns': app.data.vitalSigns,
            'labResults': app.data.labResults,
            'medications': app.data.medications,
            'clinicalNotes': app.data.clinicalNotes
        };
        
        return dataMap[type]?.find(item => item.id === id);
    },

    generateOpenEHRXML(type, record) {
        const timestamp = new Date().toISOString();
        
        switch(type) {
            case 'vitalSigns':
                return `<?xml version="1.0" encoding="UTF-8"?>
<composition xmlns="http://schemas.openehr.org/v1">
    <name>
        <value>Vital Signs</value>
    </name>
    <archetype_node_id>openEHR-EHR-COMPOSITION.encounter.v1</archetype_node_id>
    <uid>
        <value>${this.generateUID()}</value>
    </uid>
    <content>
        <name>
            <value>Vital Signs Observation</value>
        </name>
        <archetype_node_id>openEHR-EHR-OBSERVATION.vital_signs.v1</archetype_node_id>
        <data>
            <events>
                <time>${timestamp}</time>
                <data>
                    <items>
                        <name><value>Systolic Blood Pressure</value></name>
                        <value>${record.systolic} mmHg</value>
                    </items>
                    <items>
                        <name><value>Diastolic Blood Pressure</value></name>
                        <value>${record.diastolic} mmHg</value>
                    </items>
                    <items>
                        <name><value>Heart Rate</value></name>
                        <value>${record.heartRate} bpm</value>
                    </items>
                    <items>
                        <name><value>Temperature</value></name>
                        <value>${record.temperature} °C</value>
                    </items>
                    <items>
                        <name><value>Oxygen Saturation</value></name>
                        <value>${record.oxygenSat} %</value>
                    </items>
                </data>
            </events>
        </data>
    </content>
</composition>`;

            case 'medications':
                return `<?xml version="1.0" encoding="UTF-8"?>
<composition xmlns="http://schemas.openehr.org/v1">
    <name>
        <value>Medication Order</value>
    </name>
    <archetype_node_id>openEHR-EHR-INSTRUCTION.medication_order.v1</archetype_node_id>
    <uid>
        <value>${this.generateUID()}</value>
    </uid>
    <activities>
        <name><value>Order</value></name>
        <description>
            <items>
                <name><value>Medication Name</value></name>
                <value>${record.name}</value>
            </items>
            <items>
                <name><value>Dose Amount</value></name>
                <value>${record.dosage}</value>
            </items>
            <items>
                <name><value>Route</value></name>
                <value>${record.route}</value>
            </items>
            <items>
                <name><value>Frequency</value></name>
                <value>${record.frequency}</value>
            </items>
            <items>
                <name><value>Start Date</value></name>
                <value>${record.startDate}</value>
            </items>
        </description>
    </activities>
</composition>`;

            default:
                return `<?xml version="1.0" encoding="UTF-8"?>
<composition xmlns="http://schemas.openehr.org/v1">
    <name><value>Clinical Record</value></name>
    <uid><value>${this.generateUID()}</value></uid>
</composition>`;
        }
    },

    generateUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    // Generate sample data for testing
    generateSampleData() {
        if (!confirm('This will add sample data to your system. Continue?')) {
            return;
        }

        // Add sample patients
        const samplePatients = [
            { firstName: 'Alice', lastName: 'Johnson', dob: '1985-03-15', gender: 'Female', phone: '555-0103' },
            { firstName: 'Robert', lastName: 'Williams', dob: '1972-07-22', gender: 'Male', phone: '555-0104' },
            { firstName: 'Emily', lastName: 'Brown', dob: '1990-11-08', gender: 'Female', phone: '555-0105' }
        ];

        samplePatients.forEach(patient => {
            const dob = new Date(patient.dob);
            const age = new Date().getFullYear() - dob.getFullYear();
            
            app.data.patients.push({
                id: 'P' + String(app.data.patients.length + 1).padStart(3, '0'),
                name: `${patient.firstName} ${patient.lastName}`,
                age: age,
                gender: patient.gender,
                contact: patient.phone,
                lastVisit: new Date().toISOString().split('T')[0]
            });
        });

        // Add sample vital signs
        app.data.patients.forEach(patient => {
            app.data.vitalSigns.push({
                id: 'VS' + String(app.data.vitalSigns.length + 1).padStart(3, '0'),
                patientId: patient.id,
                patientName: patient.name,
                date: new Date().toISOString(),
                systolic: Math.floor(Math.random() * 40) + 110,
                diastolic: Math.floor(Math.random() * 20) + 70,
                heartRate: Math.floor(Math.random() * 30) + 60,
                respiratoryRate: Math.floor(Math.random() * 8) + 12,
                temperature: (Math.random() * 2 + 36).toFixed(1),
                oxygenSat: Math.floor(Math.random() * 5) + 95,
                position: 'Sitting'
            });
        });

        // Add sample lab results
        const labTests = ['Complete Blood Count', 'Basic Metabolic Panel', 'Lipid Panel'];
        app.data.patients.slice(0, 2).forEach((patient, idx) => {
            app.data.labResults.push({
                id: 'LAB' + String(app.data.labResults.length + 1).padStart(3, '0'),
                patient: patient.name,
                testName: labTests[idx],
                date: new Date().toISOString().split('T')[0],
                result: 'Normal',
                referenceRange: 'Within normal limits',
                interpretation: 'Normal',
                status: 'Final'
            });
        });

        // Add sample medications
        const medications = [
            { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', route: 'Oral' },
            { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', route: 'Oral' }
        ];
        
        app.data.patients.slice(0, 2).forEach((patient, idx) => {
            app.data.medications.push({
                id: 'MED' + String(app.data.medications.length + 1).padStart(3, '0'),
                patient: patient.name,
                name: medications[idx].name,
                dosage: medications[idx].dosage,
                frequency: medications[idx].frequency,
                route: medications[idx].route,
                startDate: new Date().toISOString().split('T')[0],
                status: 'Active'
            });
        });

        app.saveData();
        app.renderPage(app.currentPage);
        forms.showSuccess('Sample data generated successfully!');
    },

    // Clear all data
    clearAllData() {
        if (confirm('This will delete ALL data. This action cannot be undone. Continue?')) {
            if (confirm('Are you absolutely sure? This will permanently delete all patient records, vital signs, medications, and clinical notes.')) {
                app.data = {
                    patients: [],
                    vitalSigns: [],
                    labResults: [],
                    medications: [],
                    clinicalNotes: [],
                    imagingStudies: []
                };
                app.saveData();
                app.renderPage(app.currentPage);
                forms.showSuccess('All data has been cleared');
            }
        }
    },

    // Statistics
    getStatistics() {
        return {
            totalPatients: app.data.patients.length,
            totalVitalSigns: app.data.vitalSigns.length,
            totalLabTests: app.data.labResults.length,
            totalMedications: app.data.medications.length,
            activeMedications: app.data.medications.filter(m => m.status === 'Active').length,
            totalClinicalNotes: app.data.clinicalNotes.length,
            totalImagingStudies: app.data.imagingStudies.length,
            averageAge: app.data.patients.length > 0 
                ? Math.round(app.data.patients.reduce((sum, p) => sum + p.age, 0) / app.data.patients.length)
                : 0,
            genderDistribution: {
                male: app.data.patients.filter(p => p.gender === 'Male').length,
                female: app.data.patients.filter(p => p.gender === 'Female').length,
                other: app.data.patients.filter(p => p.gender === 'Other').length
            }
        };
    }
};

// Make dataManager available globally
window.dataManager = dataManager;

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + E: Export data
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        dataManager.exportToJSON();
    }
    
    // Ctrl/Cmd + N: New patient
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        app.showModal('newPatient');
    }
    
    // Escape: Close modal
    if (e.key === 'Escape') {
        app.closeModal();
    }
});
