// Main Application Logic
const app = {
    currentPage: 'dashboard',
    data: {
        patients: [],
        vitalSigns: [],
        labResults: [],
        medications: [],
        clinicalNotes: [],
        imagingStudies: []
    },

    init() {
        this.loadData();
        this.setupNavigation();
        this.renderDashboard();
        this.setupEventListeners();
        console.log('OpenEHR Clinical System initialized');
    },

    // Navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.navigateTo(page);
            });
        });
    },

    navigateTo(page) {
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            }
        });

        // Show page
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(`page-${page}`).classList.add('active');
        
        this.currentPage = page;
        this.renderPage(page);
    },

    renderPage(page) {
        switch(page) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'patients':
                this.renderPatients();
                break;
            case 'clinical':
                this.renderClinicalRecords();
                break;
            case 'medications':
                this.renderMedications();
                break;
            case 'lab':
                this.renderLabResults();
                break;
            case 'imaging':
                this.renderImagingStudies();
                break;
        }
    },

    // Dashboard
    renderDashboard() {
        // Update stats
        document.getElementById('stat-patients').textContent = this.data.patients.length;
        document.getElementById('stat-vitals').textContent = this.data.vitalSigns.length;
        document.getElementById('stat-labs').textContent = this.data.labResults.length;
        document.getElementById('stat-meds').textContent = this.data.medications.filter(m => m.status === 'Active').length;

        // Render recent activity
        this.renderRecentActivity();
        
        // Render today's appointments
        this.renderTodayAppointments();
        
        // Render alerts
        this.renderAlerts();
    },

    renderRecentActivity() {
        const container = document.getElementById('recentActivity');
        const activities = [
            { text: 'Vital signs recorded for John Doe', time: '10 minutes ago', icon: 'heartbeat' },
            { text: 'Lab results received for Jane Smith', time: '1 hour ago', icon: 'flask' },
            { text: 'New patient registered: Bob Johnson', time: '2 hours ago', icon: 'user-plus' }
        ];

        container.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <i class="fas fa-${activity.icon}"></i> ${activity.text}
                <div class="activity-time">${activity.time}</div>
            </div>
        `).join('');
    },

    renderTodayAppointments() {
        const container = document.getElementById('todayAppointments');
        const appointments = [
            { patient: 'John Doe', time: '09:00 AM', type: 'Follow-up' },
            { patient: 'Jane Smith', time: '10:30 AM', type: 'Consultation' },
            { patient: 'Bob Johnson', time: '02:00 PM', type: 'Lab Review' }
        ];

        container.innerHTML = appointments.length > 0 ? appointments.map(apt => `
            <div class="card" style="margin-bottom: 0.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong>${apt.patient}</strong>
                        <div style="color: var(--text-light); font-size: 0.875rem;">${apt.type}</div>
                    </div>
                    <div style="color: var(--primary); font-weight: 600;">${apt.time}</div>
                </div>
            </div>
        `).join('') : '<p style="color: var(--text-light);">No appointments scheduled for today</p>';
    },

    renderAlerts() {
        const container = document.getElementById('alerts');
        const alerts = [
            { text: 'Critical lab result pending review', type: 'danger' },
            { text: '3 prescriptions expiring this week', type: 'warning' },
            { text: 'System backup completed successfully', type: 'success' }
        ];

        container.innerHTML = alerts.map(alert => `
            <div class="card" style="margin-bottom: 0.75rem; border-left: 4px solid var(--${alert.type});">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-${alert.type === 'danger' ? 'exclamation-circle' : alert.type === 'warning' ? 'exclamation-triangle' : 'check-circle'}" 
                       style="color: var(--${alert.type}); font-size: 1.25rem;"></i>
                    <span>${alert.text}</span>
                </div>
            </div>
        `).join('');
    },

    // Patients
    renderPatients() {
        const tbody = document.getElementById('patientsTable');
        
        if (this.data.patients.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-light);">
                        <i class="fas fa-users" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
                        No patients registered yet. Click "Add New Patient" to get started.
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = this.data.patients.map(patient => `
            <tr>
                <td>${patient.id}</td>
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.gender}</td>
                <td>${patient.contact}</td>
                <td>${patient.lastVisit || 'N/A'}</td>
                <td>
                    <button class="action-btn view" onclick="app.viewPatient('${patient.id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="action-btn edit" onclick="app.editPatient('${patient.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                </td>
            </tr>
        `).join('');
    },

    searchPatients() {
        const searchTerm = document.getElementById('patientSearch').value.toLowerCase();
        const filtered = this.data.patients.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.id.toLowerCase().includes(searchTerm) ||
            p.contact.includes(searchTerm)
        );
        
        const tbody = document.getElementById('patientsTable');
        tbody.innerHTML = filtered.map(patient => `
            <tr>
                <td>${patient.id}</td>
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.gender}</td>
                <td>${patient.contact}</td>
                <td>${patient.lastVisit || 'N/A'}</td>
                <td>
                    <button class="action-btn view" onclick="app.viewPatient('${patient.id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="action-btn edit" onclick="app.editPatient('${patient.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                </td>
            </tr>
        `).join('');
    },

    // Clinical Records
    renderClinicalRecords() {
        const container = document.getElementById('clinicalRecords');
        
        if (this.data.clinicalNotes.length === 0) {
            container.innerHTML = `
                <div class="card" style="text-align: center; padding: 3rem;">
                    <i class="fas fa-file-medical" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                    <p style="color: var(--text-light);">No clinical records yet. Create your first clinical note.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.data.clinicalNotes.map(note => `
            <div class="card">
                <div class="card-header">
                    <div class="card-title">${note.title}</div>
                    <span class="badge ${note.type}">${note.type}</span>
                </div>
                <div class="card-body">
                    <p><strong>Patient:</strong> ${note.patient}</p>
                    <p><strong>Date:</strong> ${note.date}</p>
                    <p><strong>Provider:</strong> ${note.provider}</p>
                    <p style="margin-top: 1rem;">${note.summary}</p>
                </div>
            </div>
        `).join('');
    },

    // Medications
    renderMedications() {
        const container = document.getElementById('medicationsList');
        
        if (this.data.medications.length === 0) {
            container.innerHTML = `
                <div class="card" style="text-align: center; padding: 3rem;">
                    <i class="fas fa-pills" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                    <p style="color: var(--text-light);">No medications prescribed yet.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.data.medications.map(med => `
            <div class="card">
                <div class="card-header">
                    <div class="card-title">${med.name}</div>
                    <span class="badge ${med.status === 'Active' ? 'success' : 'warning'}">${med.status}</span>
                </div>
                <div class="card-body">
                    <p><strong>Patient:</strong> ${med.patient}</p>
                    <p><strong>Dosage:</strong> ${med.dosage}</p>
                    <p><strong>Frequency:</strong> ${med.frequency}</p>
                    <p><strong>Route:</strong> ${med.route}</p>
                    <p><strong>Start Date:</strong> ${med.startDate}</p>
                    ${med.endDate ? `<p><strong>End Date:</strong> ${med.endDate}</p>` : ''}
                </div>
            </div>
        `).join('');
    },

    // Lab Results
    renderLabResults() {
        const container = document.getElementById('labResults');
        
        if (this.data.labResults.length === 0) {
            container.innerHTML = `
                <div class="card" style="text-align: center; padding: 3rem;">
                    <i class="fas fa-flask" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                    <p style="color: var(--text-light);">No lab results available.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.data.labResults.map(lab => `
            <div class="card">
                <div class="card-header">
                    <div class="card-title">${lab.testName}</div>
                    <span class="badge ${lab.status === 'Final' ? 'success' : 'warning'}">${lab.status}</span>
                </div>
                <div class="card-body">
                    <p><strong>Patient:</strong> ${lab.patient}</p>
                    <p><strong>Date:</strong> ${lab.date}</p>
                    <p><strong>Result:</strong> ${lab.result}</p>
                    <p><strong>Reference Range:</strong> ${lab.referenceRange}</p>
                    <p><strong>Interpretation:</strong> <span class="badge ${lab.interpretation === 'Normal' ? 'success' : 'warning'}">${lab.interpretation}</span></p>
                </div>
            </div>
        `).join('');
    },

    // Imaging Studies
    renderImagingStudies() {
        const container = document.getElementById('imagingList');
        
        if (this.data.imagingStudies.length === 0) {
            container.innerHTML = `
                <div class="card" style="text-align: center; padding: 3rem;">
                    <i class="fas fa-x-ray" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                    <p style="color: var(--text-light);">No imaging studies available.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.data.imagingStudies.map(study => `
            <div class="card">
                <div class="card-header">
                    <div class="card-title">${study.studyType}</div>
                    <span class="badge ${study.status === 'Completed' ? 'success' : 'warning'}">${study.status}</span>
                </div>
                <div class="card-body">
                    <p><strong>Patient:</strong> ${study.patient}</p>
                    <p><strong>Date:</strong> ${study.date}</p>
                    <p><strong>Body Part:</strong> ${study.bodyPart}</p>
                    <p><strong>Radiologist:</strong> ${study.radiologist}</p>
                    <p style="margin-top: 1rem;"><strong>Findings:</strong> ${study.findings}</p>
                </div>
            </div>
        `).join('');
    },

    // Modal Management
    showModal(modalType) {
        const modal = this.createModal(modalType);
        document.getElementById('modalsContainer').innerHTML = modal;
    },

    closeModal() {
        document.getElementById('modalsContainer').innerHTML = '';
    },

    createModal(type) {
        // Modal content will be generated by forms.js
        return window.forms.getModalContent(type);
    },

    // Data Management
    loadData() {
        const savedData = localStorage.getItem('openEHRData');
        if (savedData) {
            this.data = JSON.parse(savedData);
        } else {
            this.loadSampleData();
        }
    },

    saveData() {
        localStorage.setItem('openEHRData', JSON.stringify(this.data));
    },

    loadSampleData() {
        this.data = {
            patients: [
                {
                    id: 'P001',
                    name: 'John Doe',
                    age: 45,
                    gender: 'Male',
                    contact: '555-0101',
                    lastVisit: '2025-09-25'
                },
                {
                    id: 'P002',
                    name: 'Jane Smith',
                    age: 32,
                    gender: 'Female',
                    contact: '555-0102',
                    lastVisit: '2025-09-28'
                }
            ],
            vitalSigns: [],
            labResults: [],
            medications: [],
            clinicalNotes: [],
            imagingStudies: []
        };
        this.saveData();
    },

    // Event Listeners
    setupEventListeners() {
        // Add any global event listeners here
    },

    // Patient Actions
    viewPatient(id) {
        const patient = this.data.patients.find(p => p.id === id);
        if (patient) {
            alert(`Viewing patient: ${patient.name}\nID: ${patient.id}\nAge: ${patient.age}\nGender: ${patient.gender}`);
        }
    },

    editPatient(id) {
        alert(`Edit patient functionality coming soon for ID: ${id}`);
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
