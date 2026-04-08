# 🔍 GSC Analyzer File Upload - Debugging Guide

**Status:** 🔧 DEBUGGING ENABLED  
**Date:** 2026-04-08  
**Commit:** `8cad97e`  
**Issue:** File upload shows no feedback, file list doesn't appear

---

## 🐛 Problema Raportată

**Simptome:**
- Upload fișier Excel/CSV → nimic nu se întâmplă
- Nu apare lista cu fișiere încărcate
- Nu apare preview table
- Nu există feedback vizual

**Posibile Cauze:**
1. ❌ Biblioteca XLSX (SheetJS) nu se încarcă de pe CDN
2. ❌ Eroare JavaScript care oprește execuția
3. ❌ DOM elements nu sunt găsite
4. ❌ FileReader API nu funcționează
5. ❌ Fișierul GSC nu are formatul așteptat

---

## ✅ Ce Am Adăugat (Commit 8cad97e)

### 1. **Verificare XLSX Library la Start**

```javascript
// La începutul scriptului (linia 378)
console.log('Script started. XLSX available:', typeof XLSX !== 'undefined');
if (typeof XLSX === 'undefined') {
  console.error('XLSX library failed to load from CDN');
}
```

**Ce verifică:**
- Biblioteca XLSX este disponibilă global
- CDN `https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js` s-a încărcat

---

### 2. **Debugging în `handleFiles()`**

```javascript
function handleFiles(fileList) {
  console.log('handleFiles called with', fileList.length, 'files');
  
  // Check XLSX
  if (typeof XLSX === 'undefined') {
    showError('Excel library not loaded. Please refresh the page and try again.');
    return;
  }
  
  // Filter files
  var files = Array.from(fileList).filter(function(f){
    return f.name.match(/\.(csv|xlsx|xls)$/i);
  });
  console.log('Filtered files:', files.map(function(f){ return f.name; }));
  
  // Show file list immediately
  document.getElementById('file-list').style.display = 'block';
  document.getElementById('upload-zone').style.display = 'none';
  
  // Read files
  files.forEach(function(f){
    var reader = new FileReader();
    reader.onload = function(e){
      console.log('File loaded:', f.name, 'size:', e.target.result.byteLength, 'bytes');
      // ...
    };
    reader.onerror = function(e){
      console.error('Error reading file:', f.name, e);
      showError('Error reading file: ' + f.name);
    };
    reader.readAsArrayBuffer(f);
  });
}
```

**Ce verifică:**
- Funcția este apelată
- Câte fișiere sunt selectate
- Extensia fișierelor (trebuie csv/xlsx/xls)
- FileReader se execută corect
- Fișierul se citește complet (afișează mărimea în bytes)

---

### 3. **Debugging în `parseFile()`**

```javascript
function parseFile(fileObj) {
  console.log('parseFile called for:', fileObj.name);
  
  if (typeof XLSX === 'undefined') {
    console.error('XLSX library not available in parseFile');
    return [];
  }
  
  console.log('Reading workbook...');
  var wb = XLSX.read(fileObj.data, { type: 'array' });
  console.log('Workbook sheets:', wb.SheetNames);
  
  var ws = wb.Sheets[wb.SheetNames[0]];
  var aoa = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
  console.log('Rows in sheet:', aoa.length);
  
  if(aoa.length < 2) {
    console.warn('Sheet has less than 2 rows');
    return [];
  }
  
  // ... rest of parsing
}
```

**Ce verifică:**
- XLSX.read funcționează
- Workbook-ul are sheets
- Sheet-ul are rânduri (minim 2)
- Datele sunt parsate corect

---

### 4. **Debugging în `processAll()`**

```javascript
function processAll() {
  console.log('processAll called with', loadedFiles.length, 'files');
  
  loadedFiles.forEach(function(f){
    console.log('Processing file:', f.name);
    var rows = parseFile(f);
    console.log('Parsed rows:', rows.length);
    // ...
  });
  
  console.log('Combined rows:', combined.length, 'Failed files:', failed);
}
```

**Ce verifică:**
- Câte fișiere sunt procesate
- Câte rânduri sunt parsate din fiecare
- Câte rânduri totale după combinare
- Care fișiere au eșuat

---

### 5. **Error Handlers Îmbunătățite**

```javascript
reader.onerror = function(e){
  console.error('Error reading file:', f.name, e);
  showError('Error reading file: ' + f.name);
};

// În catch:
catch(e) {
  console.error('Parse error in', fileObj.name, ':', e);
  showDebug('Parse error in ' + fileObj.name + ': ' + e.message + '\n' + e.stack);
  return [];
}
```

**Ce verifică:**
- Erori de citire FileReader
- Erori de parsing XLSX
- Stack trace complet pentru debugging

---

## 🧪 Cum Să Testezi (După Vercel Deploy)

### **Step 1: Deschide Console (FOARTE IMPORTANT)**

1. Deschide: https://learnseohub.com/tools/gsc-analyzer
2. **F12** → **Console** tab
3. **Refresh:** `Ctrl+Shift+R`

### **Step 2: Verifică XLSX Library**

**În Console, caută:**
```
Script started. XLSX available: true
```

✅ **Dacă vezi `true`** → Biblioteca OK, continuă  
❌ **Dacă vezi `false`** sau **eroare** → Problema este CDN-ul

**Fix pentru CDN blocat:**
- Verifică dacă `https://cdnjs.cloudflare.com` este accesibil
- Uneori antivirus/firewall blochează CDN-uri
- Încearcă din altă rețea sau dezactivează ad-blocker

---

### **Step 3: Upload Fișier Excel/CSV**

1. Click pe **"Browse files"** sau drag & drop
2. Selectează fișier GSC exportat (CSV sau .xlsx)

**În Console, trebuie să vezi:**
```
handleFiles called with 1 files
Filtered files: ["Queries (1).csv"]
File loaded: Queries (1).csv size: 45230 bytes
parseFile called for: Queries (1).csv
Reading workbook...
Workbook sheets: ["Queries"]
Rows in sheet: 152
Processing file: Queries (1).csv
Parsed rows: 45
Combined rows: 45 Failed files: []
```

---

### **Step 4: Analizează Console Output**

#### ✅ **SUCCESS Scenario (Totul OK)**

```
Script started. XLSX available: true
handleFiles called with 1 files
Filtered files: ["Queries.xlsx"]
File loaded: Queries.xlsx size: 23456 bytes
parseFile called for: Queries.xlsx
Reading workbook...
Workbook sheets: ["Sheet1"]
Rows in sheet: 120
processAll called with 1 files
Processing file: Queries.xlsx
Parsed rows: 35
Combined rows: 35 Failed files: []
```

**Rezultat vizual:**
- ✅ Upload zone dispare
- ✅ File list apare: "📄 Queries.xlsx ×"
- ✅ Preview table apare cu queries
- ✅ Button "Analyze with AI" activ

---

#### ❌ **ERROR Scenario 1: XLSX Not Loaded**

```
Script started. XLSX available: false
XLSX library failed to load from CDN
handleFiles called with 1 files
XLSX library is not available
```

**Vizual:**
- ❌ Mesaj eroare: "Excel library not loaded. Please refresh the page and try again."

**Fix:**
1. Hard refresh: `Ctrl+Shift+R`
2. Verifică Network tab → `xlsx.full.min.js` (trebuie 200 OK)
3. Dacă 403/404 → CDN blocat, contactează admin

---

#### ❌ **ERROR Scenario 2: File Type Invalid**

```
handleFiles called with 1 files
Filtered files: []
```

**Vizual:**
- ❌ Mesaj: "Please upload CSV or Excel (.xlsx) files..."

**Fix:**
- Upload doar: `.csv`, `.xlsx`, `.xls`
- Nu: `.txt`, `.pdf`, `.doc`, etc.

---

#### ❌ **ERROR Scenario 3: File Empty or Wrong Format**

```
File loaded: Queries.csv size: 456 bytes
parseFile called for: Queries.csv
Reading workbook...
Workbook sheets: ["Sheet1"]
Rows in sheet: 1
Sheet has less than 2 rows
Parsed rows: 0
Combined rows: 0 Failed files: ["Queries.csv"]
```

**Vizual:**
- ❌ Mesaj: "Could not read data from the uploaded files. See the debug info below..."
- Debug box apare cu detalii

**Fix:**
1. Verifică că fișierul GSC are date (minim 2 rânduri: header + 1 query)
2. Exportă din GSC cu **Compare** mode enabled:
   - Date range: **Last 28 days** vs **Previous 28 days**
   - Tab: **Queries**
   - Export: **Download Excel**

---

#### ❌ **ERROR Scenario 4: Parse Error**

```
parseFile called for: Queries.xlsx
Reading workbook...
Parse error in Queries.xlsx : TypeError: Cannot read property 'Sheets' of undefined
```

**Vizual:**
- ❌ Debug box cu stack trace

**Fix:**
- Fișierul Excel este corupt
- Re-export din GSC
- Sau convertește CSV → Excel cu Google Sheets

---

## 📊 Expected Console Output (Full Flow)

### **1. Page Load**
```
Script started. XLSX available: true
```

### **2. File Selection**
```
handleFiles called with 1 files
Filtered files: ["Queries (1).csv"]
```

### **3. File Reading**
```
File loaded: Queries (1).csv size: 45230 bytes
```

### **4. File Parsing**
```
parseFile called for: Queries (1).csv
Reading workbook...
Workbook sheets: ["Sheet1"]
Rows in sheet: 152
File: Queries (1).csv
Headers found: top queries | clicks | impressions | ctr | position
```

### **5. Data Processing**
```
processAll called with 1 files
Processing file: Queries (1).csv
Parsed rows: 45
Combined rows: 45 Failed files: []
```

### **6. UI Update (no console, check visual)**
- Upload zone hidden
- File list visible: "📄 Queries (1).csv ×"
- Preview table with 40 rows
- "Analyze with AI" button enabled

---

## 🔧 Troubleshooting Checklist

### **Issue: Console Shows Nothing**

**Check:**
- [ ] F12 Console open **BEFORE** uploading file
- [ ] Console filter not set (should show "All levels")
- [ ] No adblocker blocking `console.log`

**Fix:**
```javascript
// Test în Console:
console.log('Test'); // Trebuie să vezi "Test"
```

---

### **Issue: "XLSX available: false"**

**Check:**
- [ ] Network tab → `xlsx.full.min.js` (status 200?)
- [ ] CDN blocat de firewall/antivirus?
- [ ] Ad-blocker activ?

**Fix:**
1. Dezactivează ad-blocker temporary
2. Refresh: `Ctrl+Shift+R`
3. Verifică că `https://cdnjs.cloudflare.com` este accesibil

---

### **Issue: "handleFiles" Not Called**

**Check:**
- [ ] Click pe "Browse files" funcționează?
- [ ] Input file ID corect? (`file-input`)
- [ ] Drag & drop zone ID corect? (`upload-zone`)

**Fix:**
```javascript
// Test în Console:
document.getElementById('file-input').click(); // Trebuie să deschidă dialog
```

---

### **Issue: "Parsed rows: 0"**

**Check:**
- [ ] Fișierul are date (nu e gol)?
- [ ] Export din GSC cu **Compare mode**?
- [ ] Tab **Queries** (nu Pages)?
- [ ] Are coloane: Query, Impressions, Position?

**Fix:**
1. Re-export din GSC:
   - Performance → Search results
   - Date range: **Compare** last 28d vs previous 28d
   - Tab: **Queries**
   - Sort by: **Impressions difference** (descending)
   - Export: **Download Excel**

---

### **Issue: Debug Box Appears**

**Check debug box content:**
- File name
- Headers found
- Parse errors

**Common errors:**
- "Could not find required columns" → Missing Query/Impressions/Position
- "Sheet has less than 2 rows" → Empty file
- "Parse error" → File corrupt

---

## 📞 Raportare Probleme

**Dacă problema persistă, trimite la:** palamarciuc.dina2@gmail.com

**Include:**
1. **Screenshot Console** (F12 → Console tab, cu TOT output-ul)
2. **Screenshot Network tab** (F12 → Network → filter: `xlsx`)
3. **Fișierul GSC** (trimite-l ca attachment, dacă e OK să-l împărtășești)
4. **Browser + versiune** (ex: Chrome 120, Firefox 115)
5. **Sistem operare** (Windows/Mac/Linux)

---

## 🎯 Expected Behavior (After Fix)

### **Normal Flow:**

1. **Page load** → Console: `XLSX available: true` ✓
2. **Select file** → Console: `handleFiles called with 1 files` ✓
3. **File read** → Console: `File loaded: ... size: 45230 bytes` ✓
4. **Parse** → Console: `Parsed rows: 45` ✓
5. **Process** → Console: `Combined rows: 45` ✓
6. **Visual:**
   - Upload zone hidden ✓
   - File list: "📄 Queries.csv ×" ✓
   - Preview table: 40 queries ✓
   - Button "Analyze with AI" enabled ✓

---

## ✅ Next Steps

### **După Vercel Deployment (2 min wait):**

1. **Test cu Console open** (F12)
2. **Upload fișier GSC**
3. **Check console output** (trebuie să vezi toate log-urile)
4. **Raportează rezultatul:**
   - ✅ Funcționează → continuă cu analiza AI
   - ❌ Nu funcționează → trimite screenshot console

---

**Status:** 🔧 DEBUGGING DEPLOYED  
**Commit:** `8cad97e`  
**Next:** Test live cu Console open pentru diagnostic complet
