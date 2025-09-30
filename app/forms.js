// Forms Module - Dynamic form generation based on OpenEHR archetypes
const forms = {
    getModalContent(type) {
        const modals = {
            newPatient: this.newPatientForm(),
            vitalSigns: this.vitalSignsForm(),
            labOrder: this.labOrderForm(),
            medication: this.medicationForm(),
            clinicalNote: this.clinicalNoteForm(),
            imagingOrder: this.imagingOrderForm()
        };
        
        return modals[type] || '';
    },

    newPatientForm() {
        return `
            <div class="modal-overlay" onclick="if(event.target === this) app.closeModal()">
                <div class="modal">
                    <div class="modal-header">
                        <h2><i class="fas fa-user-plus"></i> Register New Patient</h2>
                        <button class="modal-close" onclick="app.closeModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="newPatientForm" onsubmit="forms.submitNewPatient(event)">
                            <div class="form-row">
                                <div class="form-group">
                                    <label>First Name *</label>
                                    <input type="text" name="firstName" required>
                                </div>
                                <div class="form-group">
                                    <label>Last Name *</label>
                                    <input type="text" name="lastName" required>
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Date of Birth *</label>
                                    <input type="date" name="dob" required>
                                </div>
                                <div class="form-group">
                                    <label>Gender *</label>
                                    <select name="gender" required>
                                        <option value="">Select...</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Phone Number *</label>
                                    <input type="tel" name="phone" required>
                                </div>
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="email" name="email">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label>Address</label>
                                <input type="text" name="address">
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label>City</label>
                                    <input type="text" name="city">
                                </div>
                                <div class="form-group">
                                    <label>Postal Code</label>
                                    <input type="text" name="postalCode">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label>Emergency Contact Name</label>
                                <input type="text" name="emergencyContact">
                            </div>
                            
                            <div class="form-group">
                                <label>Emergency Contact Phone</label>
                                <input type="tel" name="emergencyPhone">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="app.closeModal()">Cancel</button>
                        <button type="submit" form="newPatientForm" class="btn btn-primary">
                            <i class="fas fa-save"></i> Register Patient
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    vitalSignsForm() {
        return `
            <div class="modal-overlay" onclick="if(event.target === this) app.closeModal()">
                <div class="modal">
                    <div class="modal-header">
                        <h2><i class="fas fa-heartbeat"></i> Record Vital Signs</h2>
                        <button class="modal-close" onclick="app.closeModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="vitalSignsForm" onsubmit="forms.submitVitalSigns(event)">
                            <div class="form-group">
                                <label>Patient *</label>
                                <select name="patientId" required>
                                    <option value="">Select Patient...</option>
                                    ${app.data.patients.map(p => `<option value="${p.id}">${p.name} (${p.id})</option>`).join('')}
                                </select>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Systolic BP (mmHg) *</label>
                                    <input type="number" name="systolic" min="50" max="250" required>
                                </div>
                                <div class="form-group">
                                    <label>Diastolic BP (mmHg) *</label>
                                    <input type="number" name="diastolic" min="30" max="150" required>
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Heart Rate (bpm) *</label>
                                    <input type="number" name="heartRate" min="30" max="200" required>
                                </div>
                                <div class="form-group">
                                    <label>Respiratory Rate (breaths/min) *</label>
                                    <input type="number" name="respiratoryRate" min="8" max="40" required>
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Temperature (°C) *</label>
                                    <input type="number" name="temperature" step="0.1" min="35" max="42" required>
                                </div>
                                <div class="form-group">
                                    <label>Oxygen Saturation (%) *</label>
                                    <input type="number" name="oxygenSat" min="70" max="100" required>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label>Position</label>
                                <select name="position">
                                    <option value="Sitting">Sitting</option>
                                    <option value="Standing">Standing</option>
                                    <option value="Lying">Lying</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label>Comments</label>
                                <textarea name="comments" rows="3"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="app.closeModal()">Cancel</button>
                        <button type="submit" form="vitalSignsForm" class="btn btn-primary">
                            <i class="fas fa-save"></i> Save Vital Signs
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    labOrderForm() {
        return `
            <div class="modal-overlay" onclick="if(event.target === this) app.closeModal()">
                <div class="modal">
                    <div class="modal-header">
                        <h2><i class="fas fa-flask"></i> Order Laboratory Test</h2>
                        <button class="modal-close" onclick="app.closeModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="labOrderForm" onsubmit="forms.submitLabOrder(event)">
                            <div class="form-group">
                                <label>Patient *</label>
                                <select name="patientId" required>
                                    <option value="">Select Patient...</option>
                                    ${app.data.patients.map(p => `<option value="${p.id}">${p.name} (${p.id})</option>`).join('')}
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label>Test Name *</label>
                                <select name="testName" required>
                                    <option value="">Select Test...</option>
                                    <option value="Complete Blood Count">Complete Blood Count (CBC)</option>
                                    <option value="Basic Metabolic Panel">Basic Metabolic Panel</option>
                                    <option value="Lipid Panel">Lipid Panel</option>
                                    <option value="Liver Function Test">Liver Function Test</option>
                                    <option value="Thyroid Function Test">Thyroid Function Test</option>
                                    <option value="Urinalysis">Urinalysis</option>
                                    <option value="HbA1c">HbA1c (Diabetes)</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label>Urgency *</label>
                                <select name="urgency" required>
                                    <option value="Routine">Routine</option>
                                    <option value="Urgent">Urgent</option>
                                    <option value="STAT">STAT (Immediate)</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label>Clinical Indication *</label>
                                <textarea name="indication" rows="3" required placeholder="Reason for test..."></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label>Specimen Type</label>
                                <select name="specimenType">
                                    <option value="Blood">Blood</option>
                                    <option value="Urine">Urine</option>
                                    <option value="Serum">Serum</option>
                                    <option value="Plasma">Plasma</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label>Special Instructions</label>
                                <textarea name="instructions" rows="2"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="app.closeModal()">Cancel</button>
                        <button type="submit" form="labOrderForm" class="btn btn-primary">
                            <i class="fas fa-paper-plane"></i> Submit Order
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    medicationForm() {
        return `
            <div class="modal-overlay" onclick="if(event.target === this) app.closeModal()">
                <div class="modal">
                    <div class="modal-header">
                        <h2><i class="fas fa-prescription"></i> Prescribe Medication</h2>
                        <button class="modal-close" onclick="app.closeModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="medicationForm" onsubmit="forms.submitMedication(event)">
                            <div class="form-group">
                                <label>Patient *</label>
                                <select name="patientId" required>
                                    <option value="">Select Patient...</option>
                                    ${app.data.patients.map(p => `<option value="${p.id}">${p.name} (${p.id})</option>`).join('')}
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label>Medication Name *</label>
                                <input type="text" name="medicationName" required placeholder="e.g., Amoxicillin">
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Dosage *</label>
                                    <input type="text" name="dosage" required placeholder="e.g., 500mg">
                                </div>
                                <div class="form-group">
                                    <label>Form *</label>
                                    <select name="form" required>
                                        <option value="">Select...</option>
                                        <option value="Tablet">Tablet</option>
                                        <option value="Capsule">Capsule</option>
                                        <option value="Liquid">Liquid</option>
                                        <option value="Injection">Injection</option>
                                        <option value="Cream">Cream</option>
                                        <option value="Inhaler">Inhaler</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Route *</label>
                                    <select name="route" required>
                                        <option value="">Select...</option>
                                        <option value="Oral">Oral</option>
                                        <option value="Intravenous">Intravenous</option>
                                        <option value="Intramuscular">Intramuscular</option>
                                        <option value="Subcutaneous">Subcutaneous</option>
                                        <option value="Topical">Topical</option>
                                        <option value="Inhalation">Inhalation</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Frequency *</label>
                                    <select name="frequency" required>
                                        <option value="">Select...</option>
                                        <option value="Once daily">Once daily</option>
                                        <option value="Twice daily">Twice daily</option>
                                        <option value="Three times daily">Three times daily</option>
                                        <option value="Four times daily">Four times daily</option>
                                        <option value="Every 6 hours">Every 6 hours</option>
                                        <option value="As needed">As needed (PRN)</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Start Date *</label>
                                    <input type="date" name="startDate" required>
                                </div>
                                <div class="form-group">
                                    <label>Duration (days)</label>
                                    <input type="number" name="duration" min="1" placeholder="e.g., 7">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label>Clinical Indication *</label>
                                <textarea name="indication" rows="2" required placeholder="Reason for prescription..."></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label>Special Instructions</label>
                                <textarea name="instructions" rows="2" placeholder="e.g., Take with food"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="app.closeModal()">Cancel</button>
                        <button type="submit" form="medicationForm" class="btn btn-primary">
                            <i class="fas fa-prescription-bottle"></i> Prescribe
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    clinicalNoteForm() {
        return `
            <div class="modal-overlay" onclick="if(event.target === this) app.closeModal()">
                <div class="modal">
                    <div class="modal-header">
                        <h2><i class="fas fa-file-medical"></i> New Clinical Note</h2>
                        <button class="modal-close" onclick="app.closeModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="clinicalNoteForm" onsubmit="forms.submitClinicalNote(event)">
                            <div class="form-group">
                                <label>Patient *</label>
                                <select name="patientId" required>
                                    <option value="">Select Patient...</option>
                                    ${app.data.patients.map(p => `<option value="${p.id}">${p.name} (${p.id})</option>`).join('')}
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label>Note Type *</label>
                                <select name="noteType" required>
                                    <option value="">Select Type...</option>
                                    <option value="Progress Note">Progress Note</option>
                                    <option value="Consultation">Consultation</option>
                                    <option value="Discharge Summary">Discharge Summary</option>
                                    <option value="Procedure Note">Procedure Note</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label>Chief Complaint *</label>
                                <input type="text" name="chiefComplaint" required>
                            </div>
                            
                            <div class="form-group">
                                <label>History of Present Illness *</label>
                                <textarea name="hpi" rows="4" required></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label>Physical Examination</label>
                                <textarea name="examination" rows="4"></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label>Assessment *</label>
                                <textarea name="assessment" rows="3" required></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label>Plan *</label>
                                <textarea name="plan" rows="3" required></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="app.closeModal()">Cancel</button>
                        <button type="submit" form="clinicalNoteForm" class="btn btn-primary">
                            <i class="fas fa-save"></i> Save Note
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    imagingOrderForm() {
        return `
            <div class="modal-overlay" onclick="if(event.target === this) app.closeModal()">
                <div class="modal">
                    <div class="modal-header">
                        <h2><i class="fas fa-x-ray"></i> Order Imaging Study</h2>
                        <button class="modal-close" onclick="app.closeModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="imagingOrderForm" onsubmit="forms.submitImagingOrder(event)">
                            <div class="form-group">
                                <label>Patient *</label>
                                <select name="patientId" required>
                                    <option value="">Select Patient...</option>
                                    ${app.data.patients.map(p => `<option value="${p.id}">${p.name} (${p.id})</option>`).join('')}
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label>Study Type *</label>
                                <select name="studyType" required>
                                    <option value="">Select Study...</option>
                                    <option value="X-Ray">X-Ray</option>
                                    <option value="CT Scan">CT Scan</option>
                                    <option value="MRI">MRI</option>
                                    <option value="Ultrasound">Ultrasound</option>
                                    <option value="Mammography">Mammography</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label>Body Part *</label>
                                <input type="text" name="bodyPart" required placeholder="e.g., Chest, Abdomen, Left Knee">
                            </div>
                            
                            <div class="form-group">
                                <label>Urgency *</label>
                                <select name="urgency" required>
                                    <option value="Routine">Routine</option>
                                    <option value="Urgent">Urgent</option>
                                    <option value="Emergency">Emergency</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label>Clinical Indication *</label>
                                <textarea name="indication" rows="3" required placeholder="Reason for imaging..."></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label>Special Requirements</label>
                                <textarea name="requirements" rows="2" placeholder="e.g., Contrast needed, patient allergies"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="app.closeModal()">Cancel</button>
                        <button type="submit" form="imagingOrderForm" class="btn btn-primary">
                            <i class="fas fa-paper-plane"></i> Submit Order
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    // Form Submissions
    submitNewPatient(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        
        const dob = new Date(data.dob);
        const age = new Date().getFullYear() - dob.getFullYear();
        
        const patient = {
            id: 'P' + String(app.data.patients.length + 1).padStart(3, '0'),
            name: `${data.firstName} ${data.lastName}`,
            age: age,
            gender: data.gender,
            contact: data.phone,
            email: data.email,
            address: data.address,
            city: data.city,
            postalCode: data.postalCode,
            emergencyContact: data.emergencyContact,
            emergencyPhone: data.emergencyPhone,
            lastVisit: new Date().toISOString().split('T')[0]
        };
        
        app.data.patients.push(patient);
        app.saveData();
        app.closeModal();
        app.renderPatients();
        this.showSuccess('Patient registered successfully!');
    },

    submitVitalSigns(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        
        const patient = app.data.patients.find(p => p.id === data.patientId);
        
        const vitalSigns = {
            id: 'VS' + String(app.data.vitalSigns.length + 1).padStart(3, '0'),
            patientId: data.patientId,
            patientName: patient.name,
            date: new Date().toISOString(),
            systolic: data.systolic,
            diastolic: data.diastolic,
            heartRate: data.heartRate,
            respiratoryRate: data.respiratoryRate,
            temperature: data.temperature,
            oxygenSat: data.oxygenSat,
            position: data.position,
            comments: data.comments
        };
        
        app.data.vitalSigns.push(vitalSigns);
        app.saveData();
        app.closeModal();
        app.renderDashboard();
        this.showSuccess('Vital signs recorded successfully!');
    },

    submitLabOrder(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        
        const patient = app.data.patients.find(p => p.id === data.patientId);
        
        const labOrder = {
            id: 'LAB' + String(app.data.labResults.length + 1).padStart(3, '0'),
            patientId: data.patientId,
            patient: patient.name,
            testName: data.testName,
            urgency: data.urgency,
            indication: data.indication,
            specimenType: data.specimenType,
            instructions: data.instructions,
            status: 'Ordered',
            date: new Date().toISOString().split('T')[0]
        };
        
        app.data.labResults.push(labOrder);
        app.saveData();
        app.closeModal();
        app.renderLabResults();
        this.showSuccess('Lab test ordered successfully!');
    },

    submitMedication(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        
        const patient = app.data.patients.find(p => p.id === data.patientId);
        
        const medication = {
            id: 'MED' + String(app.data.medications.length + 1).padStart(3, '0'),
            patientId: data.patientId,
            patient: patient.name,
            name: data.medicationName,
            dosage: data.dosage,
            form: data.form,
            route: data.route,
            frequency: data.frequency,
            startDate: data.startDate,
            duration: data.duration,
            indication: data.indication,
            instructions: data.instructions,
            status: 'Active'
        };
        
        app.data.medications.push(medication);
        app.saveData();
        app.closeModal();
        app.renderMedications();
        this.showSuccess('Medication prescribed successfully!');
    },

    submitClinicalNote(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        
        const patient = app.data.patients.find(p => p.id === data.patientId);
        
        const note = {
            id: 'NOTE' + String(app.data.clinicalNotes.length + 1).padStart(3, '0'),
            patientId: data.patientId,
            patient: patient.name,
            type: data.noteType,
            title: `${data.noteType} - ${data.chiefComplaint}`,
            chiefComplaint: data.chiefComplaint,
            hpi: data.hpi,
            examination: data.examination,
            assessment: data.assessment,
            plan: data.plan,
            summary: data.assessment.substring(0, 100) + '...',
            date: new Date().toISOString().split('T')[0],
            provider: 'Dr. Smith'
        };
        
        app.data.clinicalNotes.push(note);
        app.saveData();
        app.closeModal();
        app.renderClinicalRecords();
        this.showSuccess('Clinical note saved successfully!');
    },

    submitImagingOrder(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        
        const patient = app.data.patients.find(p => p.id === data.patientId);
        
        const imagingOrder = {
            id: 'IMG' + String(app.data.imagingStudies.length + 1).padStart(3, '0'),
            patientId: data.patientId,
            patient: patient.name,
            studyType: data.studyType,
            bodyPart: data.bodyPart,
            urgency: data.urgency,
            indication: data.indication,
            requirements: data.requirements,
            status: 'Ordered',
            date: new Date().toISOString().split('T')[0]
        };
        
        app.data.imagingStudies.push(imagingOrder);
        app.saveData();
        app.closeModal();
        app.renderImagingStudies();
        this.showSuccess('Imaging study ordered successfully!');
    },

    showSuccess(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: linear-gradient(135deg, var(--success) 0%, #059669 100%);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 3000;
            animation: slideIn 0.3s;
        `;
        notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// Make forms available globally
window.forms = forms;
