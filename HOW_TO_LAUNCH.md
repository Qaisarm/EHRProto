# 🚀 How to Launch - Simple Guide

## Two Applications Available

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  1. 🏥 CLINICAL APP          2. 📚 TEMPLATE VIEWER            │
│     Full System                  Browse Archetypes             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🏥 Launch Clinical Application

### Quick Launch
```bash
cd /path/to/Proto/app
./launch_app.sh
```

### Opens at: `http://localhost:8080/index.html`

### Features:
```
✅ Patient Management          ✅ Vital Signs Recording
✅ Lab Orders & Results        ✅ Medication Prescriptions  
✅ Clinical Notes              ✅ Imaging Orders
✅ Data Export/Import          ✅ Dashboard & Statistics
```

---

## 📚 Launch Template Viewer

### Quick Launch
```bash
cd /path/to/Proto
./launch_viewer.sh
```

### Opens at: `http://localhost:8000/viewer.html`

### Features:
```
📄 Browse 16 Archetypes       🔍 View ADL Code
📋 Copy to Clipboard          💾 Download Files
📊 Metadata Display           🔗 Online Tools Links
```

---

## 📊 Comparison Table

| Feature | Clinical App | Template Viewer |
|---------|-------------|-----------------|
| **Purpose** | Manage patient data | View archetype definitions |
| **Location** | `app/` directory | Root directory |
| **Port** | 8080 | 8000 |
| **Launch Script** | `launch_app.sh` | `launch_viewer.sh` |
| **Main File** | `index.html` | `viewer.html` |
| **Use Case** | Clinical work | Development/Learning |

---

## 🎯 Which One Should I Use?

### Use Clinical App If You Want To:
- ✅ Register and manage patients
- ✅ Record vital signs and clinical data
- ✅ Order tests and prescribe medications
- ✅ Create clinical documentation
- ✅ Export/import patient data
- ✅ Actually USE the system

### Use Template Viewer If You Want To:
- ✅ Learn about OpenEHR archetypes
- ✅ View archetype structure and definitions
- ✅ Copy archetype code for development
- ✅ Understand the data models
- ✅ Browse the 16 available archetypes

---

## 🔧 Manual Launch (Alternative)

### Clinical App
```bash
cd /path/to/Proto/app
python3 -m http.server 8080
# Then open: http://localhost:8080/index.html
```

### Template Viewer
```bash
cd /path/to/Proto
python3 -m http.server 8000
# Then open: http://localhost:8000/viewer.html
```

---

## ⚡ Quick Commands Cheat Sheet

```bash
# CLINICAL APP
cd ~/Downloads/Proto/app && ./launch_app.sh

# TEMPLATE VIEWER  
cd ~/Downloads/Proto && ./launch_viewer.sh

# CHECK PYTHON
python3 --version

# MAKE SCRIPTS EXECUTABLE
chmod +x launch_app.sh launch_viewer.sh
```

---

## 🆘 Troubleshooting

### "Permission denied"
```bash
chmod +x launch_app.sh
chmod +x launch_viewer.sh
```

### "Port already in use"
Scripts automatically find available ports. Just run again!

### "Python not found"
Install Python 3:
- **macOS**: `brew install python3`
- **Linux**: `sudo apt install python3`
- **Windows**: Download from python.org

### Browser doesn't open
Manually go to the URL shown in terminal:
- Clinical App: `http://localhost:8080/index.html`
- Template Viewer: `http://localhost:8000/viewer.html`

---

## 📱 Access from Phone/Tablet

If server is running on your computer:

1. Find your computer's IP address:
   ```bash
   # macOS/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

2. On your phone/tablet browser, go to:
   - Clinical App: `http://YOUR_IP:8080/index.html`
   - Template Viewer: `http://YOUR_IP:8000/viewer.html`

---

## 🎓 First Time Users

### Recommended Path:

1. **Start with Template Viewer** (5 minutes)
   - Understand what archetypes are
   - Browse the 16 available templates
   - See the data structure

2. **Then Try Clinical App** (15 minutes)
   - Register a test patient
   - Record some vital signs
   - Order a lab test
   - See how archetypes work in practice

3. **Generate Sample Data** (Optional)
   - Open browser console (F12)
   - Run: `dataManager.generateSampleData()`
   - Explore with pre-populated data

---

## 📚 Documentation Links

- **Main README**: [README.md](README.md)
- **Quick Start**: [QUICK_START.md](QUICK_START.md)
- **Usage Guide**: [USAGE_GUIDE.md](USAGE_GUIDE.md)
- **App Documentation**: [app/README.md](app/README.md)
- **Archetype Manifest**: [archetypes/ARCHETYPE_MANIFEST.md](archetypes/ARCHETYPE_MANIFEST.md)

---

## 🎉 You're Ready!

Choose your application and launch it. Both are ready to use with no installation required!

**Questions?** Check the documentation links above or open an issue on GitHub.
