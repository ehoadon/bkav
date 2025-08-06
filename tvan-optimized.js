// Enhanced JavaScript Functions for Optimized TVAN Application
// Performance and Modern Feature Implementations

// Initialize all core functionality
function initializeFilters() {
    const debouncedFilterSource = debounce(() => { 
        sourceCurrentPage = 1; 
        displaySourceData(); 
    }, 350);
    
    ['filterNguon', 'filterMaLoaiTD', 'filterMaLoi'].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.addEventListener('change', debouncedFilterSource);
    });
    
    const filterMoTaLoi = document.getElementById('filterMoTaLoi');
    if (filterMoTaLoi) filterMoTaLoi.addEventListener('input', debouncedFilterSource);

    const debouncedFilterExcluded = debounce(() => { 
        excludedCurrentPage = 1; 
        displayExcludedData(); 
    }, 350);
    
    ['filterExcludedNguon', 'filterExcludedMaLoaiTD', 'filterExcludedMaLoi'].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.addEventListener('change', debouncedFilterExcluded);
    });
    
    const filterExcludedMoTaLoi = document.getElementById('filterExcludedMoTaLoi');
    if (filterExcludedMoTaLoi) filterExcludedMoTaLoi.addEventListener('input', debouncedFilterExcluded);

    const debouncedFilterExport = debounce(() => { 
        exportCurrentPage = 1; 
        displayExportData(); 
    }, 350);
    
    ['filterExportNguon', 'filterExportMaLoaiTD', 'filterExportMaLoi'].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.addEventListener('change', debouncedFilterExport);
    });
    
    const filterExportMoTaLoi = document.getElementById('filterExportMoTaLoi');
    if (filterExportMoTaLoi) filterExportMoTaLoi.addEventListener('input', debouncedFilterExport);
}

function initializeTableListeners() {
    // Source table listeners
    const sourceTable = document.getElementById('sourceDataTable');
    if (sourceTable) {
        sourceTable.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            if (e.target.matches('#selectAllSource')) {
                const filteredData = getFilteredSourceData();
                filteredData.forEach(row => {
                    if (isChecked) selectedSourceRowIds.add(row.id);
                    else selectedSourceRowIds.delete(row.id);
                });
                displaySourceData();
            } else if (e.target.classList.contains('row-checkbox')) {
                const rowId = e.target.dataset.rowId;
                if (isChecked) selectedSourceRowIds.add(rowId);
                else selectedSourceRowIds.delete(rowId);
            }
            updateButtonStates('source');
        });
    }

    // Excluded table listeners
    const excludedTable = document.getElementById('excludedDataTable');
    if (excludedTable) {
        excludedTable.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            if (e.target.matches('#selectAllExcluded')) {
                const filteredData = getFilteredExcludedData();
                filteredData.forEach(row => {
                    if (isChecked) selectedExcludedRowIds.add(row.id);
                    else selectedExcludedRowIds.delete(row.id);
                });
                displayExcludedData();
            } else if (e.target.classList.contains('row-checkbox')) {
                const rowId = e.target.dataset.rowId;
                if (isChecked) selectedExcludedRowIds.add(rowId);
                else selectedExcludedRowIds.delete(rowId);
            }
            updateButtonStates('excluded');
        });
    }

    // Export table listeners
    const exportTable = document.getElementById('exportDataTable');
    if (exportTable) {
        exportTable.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            if (e.target.matches('#selectAllExport')) {
                const filteredData = getFilteredExportData();
                filteredData.forEach(row => {
                    if (isChecked) selectedExportRowIds.add(row.id);
                    else selectedExportRowIds.delete(row.id);
                });
                displayExportData();
            } else if (e.target.classList.contains('row-checkbox')) {
                const rowId = e.target.dataset.rowId;
                if (isChecked) selectedExportRowIds.add(rowId);
                else selectedExportRowIds.delete(rowId);
            }
            updateButtonStates('export');
        });

        // Double-click to edit cells
        exportTable.addEventListener('dblclick', (event) => {
            const cell = event.target.closest('td.editable');
            if (cell) makeCellEditable(cell);
        });
    }
}

function initializePaginationListeners() {
    ['source', 'excluded', 'export'].forEach(prefix => {
        const prevBtn = document.getElementById(`${prefix}PrevPageBtn`);
        const nextBtn = document.getElementById(`${prefix}NextPageBtn`);
        const goBtn = document.getElementById(`${prefix}GoBtn`);
        const pageInput = document.getElementById(`${prefix}PageInput`);

        if (prevBtn) prevBtn.addEventListener('click', () => changePage(prefix, -1));
        if (nextBtn) nextBtn.addEventListener('click', () => changePage(prefix, 1));
        if (goBtn) goBtn.addEventListener('click', () => goToPage(prefix));
        if (pageInput) {
            pageInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') goToPage(prefix);
            });
        }
    });
}

function initializeModalListeners() {
    // Bulk Edit Modal
    const bulkEditBtn = document.getElementById('bulkEditBtn');
    const bulkEditModal = document.getElementById('bulkEditModal');
    const bulkEditCloseBtn = document.getElementById('bulkEditCloseBtn');
    const saveBulkEditBtn = document.getElementById('saveBulkEditBtn');

    if (bulkEditBtn) {
        bulkEditBtn.addEventListener('click', () => {
            if (selectedExportRowIds.size > 0) {
                document.getElementById('bulkEditTitle').textContent = 
                    `Sửa hàng loạt cho ${selectedExportRowIds.size} mục đã chọn`;
                bulkEditModal.style.display = 'block';
            }
        });
    }

    if (bulkEditCloseBtn) {
        bulkEditCloseBtn.addEventListener('click', () => {
            bulkEditModal.style.display = 'none';
        });
    }

    if (saveBulkEditBtn) {
        saveBulkEditBtn.addEventListener('click', () => {
            const column = document.getElementById('bulkEditColumn').value;
            const value = document.getElementById('bulkEditValue').value;
            
            dataStores.export.data.forEach(row => {
                if (selectedExportRowIds.has(row.id)) row[column] = value;
            });
            
            bulkEditModal.style.display = 'none';
            selectedExportRowIds.clear();
            displayExportData();
            showMessage(`Đã cập nhật hàng loạt cột "${column}" thành công.`, 'success');
        });
    }

    // Trend Chart Modal
    const trendChartCloseBtn = document.getElementById('trendChartCloseBtn');
    if (trendChartCloseBtn) {
        trendChartCloseBtn.addEventListener('click', () => {
            document.getElementById('trendChartModal').style.display = 'none';
        });
    }

    // Rule Management Modal
    const openRuleMgmtBtn = document.getElementById('openRuleMgmtBtn');
    const ruleMgmtCloseBtn = document.getElementById('ruleMgmtCloseBtn');
    const saveRuleBtn = document.getElementById('saveRuleBtn');
    const clearRuleFormBtn = document.getElementById('clearRuleFormBtn');

    if (openRuleMgmtBtn) {
        openRuleMgmtBtn.addEventListener('click', async () => {
            showLoader(true);
            await fetchFirebaseErrors();
            displayFirebaseRules();
            showLoader(false);
            document.getElementById('ruleManagementModal').style.display = 'block';
        });
    }

    if (ruleMgmtCloseBtn) {
        ruleMgmtCloseBtn.addEventListener('click', () => {
            document.getElementById('ruleManagementModal').style.display = 'none';
        });
    }

    if (saveRuleBtn) saveRuleBtn.addEventListener('click', saveRule);
    if (clearRuleFormBtn) clearRuleFormBtn.addEventListener('click', clearRuleForm);

    // Click outside modal to close
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

function initializeChartListeners() {
    // Chart view mode listeners
    document.querySelectorAll('input[name="chartViewMode"]').forEach(radio => {
        radio.addEventListener('change', updateChartView);
    });

    // MST time frame listeners
    document.querySelectorAll('input[name="mstTimeFrame"]').forEach(radio => {
        radio.addEventListener('change', updateMstChart);
    });

    // Alert container listeners for trend charts
    const alertsContainer = document.getElementById('alertsContainer');
    if (alertsContainer) {
        alertsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-chart-link')) {
                const errorCode = e.target.dataset.errorCode;
                displayTrendChart(errorCode);
            }
        });
    }

    // Rule action change listener
    const newRuleAction = document.getElementById('newRuleAction');
    if (newRuleAction) {
        newRuleAction.addEventListener('change', function() {
            const standardValueGroup = document.getElementById('standardValueGroup');
            if (standardValueGroup) {
                standardValueGroup.style.display = this.value === 'STANDARDIZE' ? 'block' : 'none';
            }
        });
    }
}

// Enhanced button state management
function updateButtonStates(tableType) {
    const selectionSets = {
        source: selectedSourceRowIds,
        excluded: selectedExcludedRowIds,
        export: selectedExportRowIds
    };

    const selectionSet = selectionSets[tableType];
    const hasSelection = selectionSet.size > 0;

    if (tableType === 'source') {
        const moveToExportBtn = document.getElementById('moveSourceToExportBtn');
        const moveToExcludedBtn = document.getElementById('moveSourceToExcludedBtn');
        if (moveToExportBtn) moveToExportBtn.disabled = !hasSelection;
        if (moveToExcludedBtn) moveToExcludedBtn.disabled = !hasSelection;
    } else if (tableType === 'excluded') {
        const moveToSourceBtn = document.getElementById('moveExcludedToSourceBtn');
        const moveToExportBtn = document.getElementById('moveExcludedToExportBtn');
        const exportMiniBtn = document.getElementById('exportMiniExcludedBtn');
        if (moveToSourceBtn) moveToSourceBtn.disabled = !hasSelection;
        if (moveToExportBtn) moveToExportBtn.disabled = !hasSelection;
        if (exportMiniBtn) exportMiniBtn.disabled = !hasSelection;
    } else if (tableType === 'export') {
        const bulkEditBtn = document.getElementById('bulkEditBtn');
        const moveToSourceBtn = document.getElementById('moveExportToSourceBtn');
        const moveToExcludedBtn = document.getElementById('moveExportToExcludedBtn');
        if (bulkEditBtn) bulkEditBtn.disabled = !hasSelection;
        if (moveToSourceBtn) moveToSourceBtn.disabled = !hasSelection;
        if (moveToExcludedBtn) moveToExcludedBtn.disabled = !hasSelection;
    }
}

// Firebase error handling and rule management
async function fetchFirebaseErrors() {
    if (!db) {
        showMessage('Firebase không khả dụng.', 'warning');
        return;
    }

    try {
        const snapshot = await db.ref('error_definitions').once('value');
        firebaseRules = [];
        
        if (snapshot.exists()) {
            snapshot.forEach(childSnapshot => {
                firebaseRules.push({
                    key: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
        }
    } catch (error) {
        console.error('Error fetching Firebase rules:', error);
        showMessage('Không thể tải quy tắc từ Firebase.', 'error');
    }
}

// Enhanced data initialization with rules
async function initializeDataWithRules(allData) {
    const startTime = performance.now();
    
    initialSourceDataForChart = [...allData];
    
    // Apply Firebase rules if available
    if (firebaseRules.length === 0) {
        await fetchFirebaseErrors();
    }

    // Initialize data stores
    dataStores.source.data = [];
    dataStores.excluded.data = [];
    dataStores.export.data = [];

    // Process each row with rules
    allData.forEach(row => {
        let processed = false;
        
        // Apply Firebase rules
        for (const rule of firebaseRules) {
            if (matchesRule(row, rule)) {
                if (rule.rule_action === 'EXCLUDE') {
                    dataStores.excluded.data.push(row);
                    processed = true;
                    break;
                } else if (rule.rule_action === 'STANDARDIZE') {
                    // Apply standardization
                    if (rule.standard_value) {
                        row[getStandardizationField(rule)] = rule.standard_value;
                    }
                    dataStores.export.data.push(enhanceForExport(row));
                    processed = true;
                    break;
                }
            }
        }
        
        if (!processed) {
            // Check if it's ready for export based on data completeness
            if (isReadyForExport(row)) {
                dataStores.export.data.push(enhanceForExport(row));
            } else {
                dataStores.source.data.push(row);
            }
        }
    });

    // Populate filter options
    populateFilters();

    const processingTime = performance.now() - startTime;
    console.log(`Data processing completed in ${processingTime.toFixed(2)}ms`);
}

// Rule matching logic
function matchesRule(row, rule) {
    // Check if ma_loai_td matches
    if (rule.ma_loai_td && row['MÃ LOẠI TĐ'] !== rule.ma_loai_td) {
        return false;
    }

    // Check if ma_loi matches (for INCLUDE/EXCLUDE rules)
    if (rule.rule_action !== 'STANDARDIZE' && rule.ma_loi && row['MÃ LỖI'] !== rule.ma_loi) {
        return false;
    }

    // Check match value based on match type
    const targetValue = getTargetValueForRule(row, rule);
    return checkMatchType(targetValue, rule.match_value, rule.match_type);
}

function getTargetValueForRule(row, rule) {
    // Determine which field to check based on rule type
    if (rule.rule_action === 'STANDARDIZE') {
        return row['MÔ TẢ LỖI'] || '';
    }
    return row['MÔ TẢ LỖI'] || '';
}

function checkMatchType(value, pattern, matchType) {
    if (!value || !pattern) return false;
    
    const lowerValue = value.toLowerCase();
    const lowerPattern = pattern.toLowerCase();
    
    switch (matchType) {
        case 'EXACT':
            return lowerValue === lowerPattern;
        case 'CONTAINS':
            return lowerValue.includes(lowerPattern);
        case 'STARTS_WITH':
            return lowerValue.startsWith(lowerPattern);
        case 'ENDS_WITH':
            return lowerValue.endsWith(lowerPattern);
        default:
            return false;
    }
}

function getStandardizationField(rule) {
    // Return the field to be standardized
    return 'MÔ TẢ LỖI';
}

function isReadyForExport(row) {
    // Check if row has minimum required fields for export
    return row['MTĐ'] && row['MST'] && row['MÃ LOẠI TĐ'];
}

function enhanceForExport(row) {
    // Add TVAN field and other export-specific enhancements
    const enhanced = { ...row };
    
    // Generate TVAN if not present
    if (!enhanced.TVAN) {
        enhanced.TVAN = generateTVAN(row);
    }
    
    // Set default values for missing fields
    enhanced['TIMELOG'] = enhanced['TIMELOG'] || new Date().toLocaleDateString('vi-VN');
    enhanced['GỬI LẦN'] = enhanced['GỬI LẦN'] || '1';
    enhanced['MẪU SỐ KÝ HIỆU'] = enhanced['MẪU SỐ KÝ HIỆU'] || '';
    enhanced['SỐ HĐ'] = enhanced['SỐ HĐ'] || '';
    
    return enhanced;
}

function generateTVAN(row) {
    // Generate TVAN based on available data
    const mst = row['MST'] || 'NO_MST';
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `TV${mst.slice(-4)}${date}${random}`;
}

// Tab management
function openTab(evt, tabName) {
    // Hide all tab content
    document.querySelectorAll('.tab-content').forEach(tc => {
        tc.style.display = 'none';
        tc.classList.remove('active');
    });
    
    // Remove active class from all tab links
    document.querySelectorAll('.tab-link').forEach(tl => {
        tl.classList.remove('active');
    });
    
    // Show selected tab content
    const targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.style.display = 'block';
        targetTab.classList.add('active');
    }
    
    // Add active class to clicked tab
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
    } else {
        // Find and activate the corresponding tab link
        const tabLink = document.querySelector(`.tab-link[onclick*="${tabName}"]`);
        if (tabLink) tabLink.classList.add('active');
    }
}

// Rule management functions
function displayFirebaseRules() {
    const tableBody = document.getElementById('rulesTableBody');
    const countSpan = document.getElementById('rulesCount');
    
    if (!tableBody || !countSpan) return;

    tableBody.innerHTML = '';
    countSpan.textContent = firebaseRules.length;

    if (firebaseRules.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td colspan="7" class="empty-row">
                <i class="fas fa-info-circle"></i>
                Chưa có quy tắc nào được định nghĩa.
            </td>
        `;
        tableBody.appendChild(tr);
        return;
    }

    firebaseRules.sort((a, b) => (a.ma_loai_td || '').localeCompare(b.ma_loai_td || ''))
        .forEach(rule => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="col-action">
                    <button class="btn-warning btn-move" onclick="populateRuleFormForEdit('${rule.key}')" title="Sửa quy tắc này">
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button class="btn-danger btn-move" onclick="deleteRule('${rule.key}')" title="Xóa quy tắc này">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
                <td>${rule.rule_action || ''}</td>
                <td>${rule.ma_loai_td || ''}</td>
                <td>${rule.ma_loi || ''}</td>
                <td>${rule.match_type || ''}</td>
                <td style="word-break: break-word;">${rule.match_value || ''}</td>
                <td style="word-break: break-word;">${rule.standard_value || ''}</td>
            `;
            tableBody.appendChild(tr);
        });
}

function populateRuleFormForEdit(ruleKey) {
    const rule = firebaseRules.find(r => r.key === ruleKey);
    if (!rule) return;

    document.getElementById('editingRuleKey').value = rule.key;
    document.getElementById('newRuleAction').value = rule.rule_action;
    document.getElementById('newMaTD').value = rule.ma_loai_td;
    document.getElementById('newMaLoi').value = rule.ma_loi;
    document.getElementById('newMatchType').value = rule.match_type;
    document.getElementById('newMatchValue').value = rule.match_value;
    document.getElementById('newStandardValue').value = rule.standard_value || '';
    
    const standardValueGroup = document.getElementById('standardValueGroup');
    if (standardValueGroup) {
        standardValueGroup.style.display = rule.rule_action === 'STANDARDIZE' ? 'block' : 'none';
    }
    
    const clearBtn = document.getElementById('clearRuleFormBtn');
    if (clearBtn) clearBtn.style.display = 'inline-block';
    
    document.querySelector('#ruleManagementModal .modal-content').scrollTop = 0;
}

function clearRuleForm() {
    document.getElementById('editingRuleKey').value = '';
    document.getElementById('newRuleAction').value = 'INCLUDE';
    document.getElementById('newMaTD').value = '';
    document.getElementById('newMaLoi').value = '';
    document.getElementById('newMatchType').value = 'EXACT';
    document.getElementById('newMatchValue').value = '';
    document.getElementById('newStandardValue').value = '';
    
    const standardValueGroup = document.getElementById('standardValueGroup');
    if (standardValueGroup) standardValueGroup.style.display = 'none';
    
    const clearBtn = document.getElementById('clearRuleFormBtn');
    if (clearBtn) clearBtn.style.display = 'none';
}

async function deleteRule(ruleKey) {
    if (!db || !ruleKey) return;
    
    if (!confirm('Bạn có chắc chắn muốn xóa quy tắc này không? Hành động này không thể hoàn tác.')) {
        return;
    }
    
    showLoader(true);
    try {
        await db.ref('error_definitions/' + ruleKey).remove();
        showMessage('Đã xóa quy tắc thành công!', 'success');
        await fetchFirebaseErrors();
        displayFirebaseRules();
    } catch (error) {
        showMessage(`Lỗi khi xóa quy tắc: ${error.message}`, 'error');
    } finally {
        showLoader(false);
    }
}

async function saveRule() {
    const editingKey = document.getElementById('editingRuleKey').value;
    const ruleData = {
        rule_action: document.getElementById('newRuleAction').value,
        ma_loai_td: document.getElementById('newMaTD').value.trim(),
        ma_loi: document.getElementById('newMaLoi').value.trim(),
        match_type: document.getElementById('newMatchType').value,
        match_value: document.getElementById('newMatchValue').value.trim(),
        standard_value: document.getElementById('newRuleAction').value === 'STANDARDIZE' 
            ? document.getElementById('newStandardValue').value.trim() : ''
    };

    // Validation
    const isFilterAction = ruleData.rule_action === 'INCLUDE' || ruleData.rule_action === 'EXCLUDE';
    if (!ruleData.ma_loai_td || !ruleData.match_value || 
        (isFilterAction && !ruleData.ma_loi) || 
        (ruleData.rule_action === 'STANDARDIZE' && !ruleData.standard_value)) {
        showMessage('Vui lòng điền các trường bắt buộc.', 'error');
        return;
    }
    
    showLoader(true);
    try {
        if (editingKey) {
            await db.ref('error_definitions/' + editingKey).update(ruleData);
            showMessage('Cập nhật quy tắc thành công! Xử lý lại file để áp dụng thay đổi.', 'success');
        } else {
            await db.ref('error_definitions').push(ruleData);
            showMessage('Lưu quy tắc mới thành công!', 'success');
        }
        
        clearRuleForm();
        await fetchFirebaseErrors();
        displayFirebaseRules();
    } catch (error) {
        showMessage(`Lỗi khi lưu: ${error.message}`, 'error');
    } finally {
        showLoader(false);
    }
}

// Export functionality
function exportToExcel() {
    hideAllMessages();
    
    if (dataStores.export.data.length === 0) {
        showMessage('Không có dữ liệu để kết xuất.', 'warning');
        return;
    }
    
    showMessage('Đang tạo file Excel...', 'info');
    
    try {
        const fileName = `Tvan_Bkav_${new Date().toLocaleDateString('vi-VN').replace(/\//g, '')}.xlsx`;
        const dataForSheet = dataStores.export.data.map(({ id, sourceFile, DATE_OBJECT, ...rest }) => rest);
        
        const headerOrder = ["TVAN", "MTĐ", "MÃ LOẠI TĐ", "MÃ LỖI", "MÔ TẢ LỖI", 
                            "TIMELOG", "GỬI LẦN", "MST", "MẪU SỐ KÝ HIỆU", "SỐ HĐ"];
        
        const worksheet = XLSX.utils.json_to_sheet(dataForSheet, { header: headerOrder });
        
        // Set column widths
        worksheet['!cols'] = [
            { wch: 15 }, { wch: 25 }, { wch: 12 }, { wch: 10 }, { wch: 40 },
            { wch: 12 }, { wch: 8 }, { wch: 15 }, { wch: 15 }, { wch: 15 }
        ];
        
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'KetQuaDoiSoat');
        XLSX.writeFile(workbook, fileName);
        
        showMessage(`Kết xuất thành công file: ${fileName}`, 'success');
    } catch (error) {
        showMessage(`Lỗi kết xuất Excel: ${error.message}`, 'error');
    }
}

function exportMiniFromExcluded() {
    hideAllMessages();
    
    if (selectedExcludedRowIds.size === 0) {
        showMessage('Vui lòng chọn ít nhất một dòng để kết xuất.', 'warning');
        return;
    }
    
    showMessage('Đang tạo file kết xuất mini...', 'info');
    
    try {
        const selectedRows = dataStores.excluded.data.filter(row => 
            selectedExcludedRowIds.has(row.id)
        );
        
        const dataForSheet = selectedRows.map(row => ({ MST: row.MST }));
        
        const fileName = `KetXuatMini_MST_${new Date().toLocaleDateString('vi-VN').replace(/\//g, '')}.xlsx`;
        const worksheet = XLSX.utils.json_to_sheet(dataForSheet, { header: ['MST'] });
        worksheet['!cols'] = [{ wch: 20 }];
        
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'DanhSachMST');
        XLSX.writeFile(workbook, fileName);
        
        showMessage(`Kết xuất mini thành công file: ${fileName}`, 'success');
    } catch (error) {
        showMessage(`Lỗi kết xuất mini: ${error.message}`, 'error');
    }
}

// Additional utility functions for rule management
function openRuleManagement() {
    const ruleModal = document.getElementById('ruleManagementModal');
    if (ruleModal) {
        ruleModal.style.display = 'block';
        // Trigger the click event for opening rule management
        const event = new Event('click');
        document.getElementById('openRuleMgmtBtn').dispatchEvent(event);
    }
}

function addRuleAndMove(rowId, action) {
    const row = dataStores.source.data.find(r => r.id === rowId);
    if (!row) return;

    // Auto-populate rule form with row data
    document.getElementById('newRuleAction').value = action;
    document.getElementById('newMaTD').value = row['MÃ LOẠI TĐ'] || '';
    document.getElementById('newMaLoi').value = row['MÃ LỖI'] || '';
    document.getElementById('newMatchType').value = 'EXACT';
    document.getElementById('newMatchValue').value = row['MÔ TẢ LỖI'] || '';

    // Open rule management modal
    openRuleManagement();
    
    // Move the item
    if (action === 'EXCLUDE') {
        moveSingleItem(rowId, 'source', 'excluded');
    }
}

// Global functions needed for HTML onclick handlers
window.processFiles = processFiles;
window.openRuleManagement = openRuleManagement;
window.addRuleAndMove = addRuleAndMove;
window.moveSelectedItems = moveSelectedItems;
window.moveSingleItem = moveSingleItem;
window.exportToExcel = exportToExcel;
window.exportMiniFromExcluded = exportMiniFromExcluded;
window.openTab = openTab;
window.handleSort = handleSort;
window.changePage = changePage;
window.goToPage = goToPage;
window.toggleFilter = toggleFilter;
window.populateRuleFormForEdit = populateRuleFormForEdit;
window.deleteRule = deleteRule;
window.saveRule = saveRule;
window.clearRuleForm = clearRuleForm;
window.makeCellEditable = makeCellEditable;
window.displayTrendChart = displayTrendChart;

// Make sure these functions are available globally for backward compatibility
window.updateChartView = updateChartView;
window.updateMstChart = updateMstChart;
window.runAnalysisWorkflow = runAnalysisWorkflow;