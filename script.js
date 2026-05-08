document.addEventListener('DOMContentLoaded', () => {
    // Kana Maps
    const kanaMap = {
        'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ',
        'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ',
        'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド',
        'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ',
        'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ',
        'ｳﾞ': 'ヴ', 'ﾜﾞ': 'ヷ', 'ｦﾞ': 'ヺ',
        'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
        'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
        'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
        'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
        'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
        'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
        'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
        'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
        'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
        'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
        'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
        'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ',
        '｡': '。', '､': '、', 'ｰ': 'ー', '｢': '「', '｣': '」', '･': '・'
    };

    const revKanaMap = Object.keys(kanaMap).reduce((acc, key) => {
        acc[kanaMap[key]] = key;
        return acc;
    }, {});

    const regKana = new RegExp(Object.keys(kanaMap).sort((a,b) => b.length - a.length).join('|'), 'g');
    const regRevKana = new RegExp(Object.keys(revKanaMap).join('|'), 'g');

    // DOM Elements
    const textToolsMenu = document.getElementById('text-tools-menu');
    const numberToolsMenu = document.getElementById('number-tools-menu');
    const aiToolsMenu = document.getElementById('ai-tools-menu');
    
    let currentMenu = textToolsMenu;

    const navItems = document.querySelectorAll('.nav-item');

    const changeCaseView = document.getElementById('change-case-view');
    const backBtn = document.getElementById('back-to-menu-btn');
    const changeCaseCard = document.querySelector('[data-tool="change-case"]');
    
    // Change Case Tools Elements
    const caseInput = document.getElementById('case-input');
    const btnUppercase = document.getElementById('btn-uppercase');
    const btnLowercase = document.getElementById('btn-lowercase');
    const btnSentencecase = document.getElementById('btn-sentencecase');

    // Kana Width Tools Elements
    const kanaWidthView = document.getElementById('kana-width-view');
    const kanaWidthCard = document.querySelector('[data-tool="kana-width-converter"]');
    const backBtnKana = document.getElementById('back-to-menu-btn-kana');
    
    const kanaInput = document.getElementById('kana-input');
    const btnToFullWidth = document.getElementById('btn-to-full-width');
    const btnToHalfWidth = document.getElementById('btn-to-half-width');

    // Phone Formatter Tools Elements
    const phoneFormatterView = document.getElementById('phone-formatter-view');
    const phoneFormatterCard = document.querySelector('[data-tool="phone-formatter"]');
    const backBtnPhone = document.getElementById('back-to-menu-btn-phone');
    
    const phoneInput = document.getElementById('phone-input');
    const countrySelect = document.getElementById('country-select');
    const toggleCountryCode = document.getElementById('toggle-country-code');
    const toggleHyphens = document.getElementById('toggle-hyphens');
    const toggleSpaces = document.getElementById('toggle-spaces');
    const phoneOutput = document.getElementById('phone-output');
    const btnCopyPhone = document.getElementById('btn-copy-phone');

    // JSON Tools Elements
    const jsonEditorView = document.getElementById('json-editor-view');
    const jsonEditorCard = document.querySelector('[data-tool="json-editor"]');
    const backBtnJson = document.getElementById('back-to-menu-btn-json');
    const jsonToolsMenu = document.getElementById('json-tools-menu');
    
    const jsonInput = document.getElementById('json-input');
    const jsonOutput = document.getElementById('json-output');
    const jsonTable = document.getElementById('json-table');
    const jsonVisualizerContainer = document.getElementById('json-visualizer-container');
    const btnVisualizeJson = document.getElementById('btn-visualize-json');
    const btnFormatJson = document.getElementById('btn-format-json');
    const btnAddRow = document.getElementById('btn-add-row');
    const btnCopyJson = document.getElementById('btn-copy-json');

    // Phone format state
    let phoneState = {
        hasCode: false,
        hasHyphen: false,
        hasSpace: false
    };

    // Navigation Logic
    function showView(viewElement) {
        // Hide all views globally
        document.querySelectorAll('.tools-menu, .tool-view').forEach(el => {
            el.classList.remove('view-active');
            el.classList.add('view-hidden');
        });
        
        // Show target view
        viewElement.classList.remove('view-hidden');
        viewElement.classList.add('view-active');
    }

    // Sidebar Navigation
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            const category = item.dataset.category;
            if (category === 'text') {
                currentMenu = textToolsMenu;
            } else if (category === 'number') {
                currentMenu = numberToolsMenu;
            } else if (category === 'json') {
                currentMenu = jsonToolsMenu;
            }
            
            showView(currentMenu);
        });
    });

    // Event Listeners for Navigation
    changeCaseCard.addEventListener('click', () => {
        showView(changeCaseView);
        caseInput.focus();
    });

    backBtn.addEventListener('click', () => {
        showView(currentMenu);
    });

    kanaWidthCard.addEventListener('click', () => {
        showView(kanaWidthView);
        kanaInput.focus();
    });

    backBtnKana.addEventListener('click', () => {
        showView(currentMenu);
    });

    phoneFormatterCard.addEventListener('click', () => {
        showView(phoneFormatterView);
        phoneInput.focus();
    });

    backBtnPhone.addEventListener('click', () => {
        showView(currentMenu);
    });

    jsonEditorCard.addEventListener('click', () => {
        showView(jsonEditorView);
        jsonInput.focus();
    });

    backBtnJson.addEventListener('click', () => {
        showView(currentMenu);
    });

    // Change Case Tool Logic
    btnUppercase.addEventListener('click', () => {
        const text = caseInput.value;
        if (text) {
            caseInput.value = text.toUpperCase();
        }
    });

    btnLowercase.addEventListener('click', () => {
        const text = caseInput.value;
        if (text) {
            caseInput.value = text.toLowerCase();
        }
    });

    btnSentencecase.addEventListener('click', () => {
        const text = caseInput.value;
        if (text) {
            // Simple sentence case: capitalize first letter of string
            // and first letter after every period, question mark, or exclamation point.
            caseInput.value = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function(c) {
                return c.toUpperCase();
            });
        }
    });

    // Kana Width Tool Logic
    btnToFullWidth.addEventListener('click', () => {
        const text = kanaInput.value;
        if (text) {
            // Convert standard ASCII characters to Full-width equivalents (+0xFEE0)
            // Space (0x0020) becomes Ideographic Space (0x3000)
            let result = text.replace(/[!-~]/g, function(char) {
                return String.fromCharCode(char.charCodeAt(0) + 0xFEE0);
            }).replace(/ /g, '\u3000');
            
            // Convert Half-width Kana to Full-width Kana
            kanaInput.value = result.replace(regKana, function(match) {
                return kanaMap[match];
            });
        }
    });

    btnToHalfWidth.addEventListener('click', () => {
        const text = kanaInput.value;
        if (text) {
            // Convert Full-width variants to standard ASCII characters (-0xFEE0)
            // Ideographic Space (0x3000) becomes Space (0x0020)
            let result = text.replace(/[\uFF01-\uFF5E]/g, function(char) {
                return String.fromCharCode(char.charCodeAt(0) - 0xFEE0);
            }).replace(/\u3000/g, ' ');

            // Convert Full-width Kana to Half-width Kana
            kanaInput.value = result.replace(regRevKana, function(match) {
                return revKanaMap[match];
            });
        }
    });

    // Phone Formatter Tool Logic
    function formatSingleNumber(num, country) {
        let clean = num.replace(/[\s-]/g, '');
        if (!clean) return '';

        const { hasCode, hasHyphen, hasSpace } = phoneState;
        
        let prefix = '';
        let separator = hasHyphen ? '-' : (hasSpace ? ' ' : '');

        if (country === 'JP') {
            if (hasCode && clean.startsWith('0')) {
                clean = clean.substring(1);
            }

            if (hasHyphen || hasSpace) {
                // Formatting for Japanese mobile (11-digit) and standard telephone (10-digit)
                if (hasCode && clean.length === 10) {
                    clean = clean.replace(/(\d{2})(\d{4})(\d{4})/, `$1${separator}$2${separator}$3`);
                } else if (!hasCode && clean.length === 11) {
                    clean = clean.replace(/(\d{3})(\d{4})(\d{4})/, `$1${separator}$2${separator}$3`);
                } else if (hasCode && clean.length === 9) {
                    clean = clean.replace(/(\d{1})(\d{4})(\d{4})/, `$1${separator}$2${separator}$3`);
                } else if (!hasCode && clean.length === 10) {
                    clean = clean.replace(/(\d{2})(\d{4})(\d{4})/, `$1${separator}$2${separator}$3`);
                }
            }
            if (hasCode) prefix = '+81' + separator;
        } else if (country === 'PH') {
            if (hasCode && clean.startsWith('0')) {
                clean = clean.substring(1);
            }

            if (hasHyphen || hasSpace) {
                // Formatting for PH mobile style XXX-XXX-XXXX
                if (hasCode && clean.length === 10) {
                    clean = clean.replace(/(\d{3})(\d{3})(\d{4})/, `$1${separator}$2${separator}$3`);
                } else if (!hasCode && clean.length === 11) {
                    clean = clean.replace(/(\d{4})(\d{3})(\d{4})/, `$1${separator}$2${separator}$3`);
                }
            }
            if (hasCode) prefix = '+63' + separator;
        }

        return prefix + clean;
    }

    function updatePhoneFormat() {
        const rawText = phoneInput.value;
        const country = countrySelect.value;
        
        if (!rawText.trim()) {
            phoneOutput.value = '';
            return;
        }

        const lines = rawText.split('\n');
        const formattedLines = lines.map(line => formatSingleNumber(line, country));
        
        phoneOutput.value = formattedLines.join('\n');
    }

    [toggleCountryCode, toggleHyphens, toggleSpaces].forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            const btn = e.target;
            btn.classList.toggle('active');
            
            if (btn === toggleCountryCode) phoneState.hasCode = btn.classList.contains('active');
            if (btn === toggleHyphens) {
                phoneState.hasHyphen = btn.classList.contains('active');
                if (phoneState.hasHyphen) {
                    phoneState.hasSpace = false;
                    toggleSpaces.classList.remove('active');
                }
            }
            if (btn === toggleSpaces) {
                phoneState.hasSpace = btn.classList.contains('active');
                if (phoneState.hasSpace) {
                    phoneState.hasHyphen = false;
                    toggleHyphens.classList.remove('active');
                }
            }
            updatePhoneFormat();
        });
    });

    [phoneInput, countrySelect].forEach(el => {
        el.addEventListener('input', updatePhoneFormat);
        el.addEventListener('change', updatePhoneFormat);
    });

    btnCopyPhone.addEventListener('click', () => {
        const textToCopy = phoneOutput.value;
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = btnCopyPhone.textContent;
                btnCopyPhone.textContent = 'Copied!';
                setTimeout(() => {
                    btnCopyPhone.textContent = originalText;
                }, 2000);
            });
        }
    });

    // JSON Editor Tool Logic
    let currentJsonData = null;

    btnFormatJson.addEventListener('click', () => {
        try {
            const text = jsonInput.value.trim();
            if (!text) return;
            const json = JSON.parse(text);
            jsonInput.value = JSON.stringify(json, null, 4);
        } catch (e) {
            alert('Invalid JSON format');
        }
    });

    btnVisualizeJson.addEventListener('click', () => {
        try {
            const text = jsonInput.value.trim();
            if (!text) return;
            currentJsonData = JSON.parse(text);
            renderJsonTable();
            jsonVisualizerContainer.classList.remove('view-hidden');
            updateJsonOutput();
        } catch (e) {
            alert('Error parsing JSON: ' + e.message);
        }
    });

    function renderJsonTable() {
        jsonTable.innerHTML = '';
        if (!currentJsonData) return;

        let dataArray = Array.isArray(currentJsonData) ? currentJsonData : [currentJsonData];
        if (dataArray.length === 0) {
            jsonTable.innerHTML = '<tr><td>No data available</td></tr>';
            return;
        }

        // Get all unique keys for header
        let keys = new Set();
        dataArray.forEach(item => {
            if (typeof item === 'object' && item !== null) {
                Object.keys(item).forEach(k => keys.add(k));
            }
        });
        
        const keyList = Array.from(keys);
        
        // Header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        keyList.forEach(key => {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        });
        const actionTh = document.createElement('th');
        actionTh.textContent = '';
        headerRow.appendChild(actionTh);
        thead.appendChild(headerRow);
        jsonTable.appendChild(thead);

        // Body
        const tbody = document.createElement('tbody');
        dataArray.forEach((item, index) => {
            const tr = document.createElement('tr');
            keyList.forEach(key => {
                const td = document.createElement('td');
                const input = document.createElement('input');
                input.className = 'table-input';
                input.value = (item[key] !== undefined) ? item[key] : '';
                input.addEventListener('input', (e) => {
                    if (Array.isArray(currentJsonData)) {
                        currentJsonData[index][key] = e.target.value;
                    } else {
                        currentJsonData[key] = e.target.value;
                    }
                    updateJsonOutput();
                });
                td.appendChild(input);
                tr.appendChild(td);
            });

            // Remove Button
            const actionTd = document.createElement('td');
            if (Array.isArray(currentJsonData)) {
                const removeBtn = document.createElement('button');
                removeBtn.className = 'btn-remove-row';
                removeBtn.innerHTML = '×';
                removeBtn.addEventListener('click', () => {
                    currentJsonData.splice(index, 1);
                    renderJsonTable();
                    updateJsonOutput();
                });
                actionTd.appendChild(removeBtn);
            }
            tr.appendChild(actionTd);
            tbody.appendChild(tr);
        });
        jsonTable.appendChild(tbody);
    }

    btnAddRow.addEventListener('click', () => {
        if (!currentJsonData) {
            currentJsonData = [{}];
        } else if (!Array.isArray(currentJsonData)) {
            currentJsonData = [currentJsonData, {}];
        } else {
            const newItem = {};
            if (currentJsonData.length > 0) {
                Object.keys(currentJsonData[0]).forEach(k => newItem[k] = "");
            }
            currentJsonData.push(newItem);
        }
        renderJsonTable();
        updateJsonOutput();
    });

    function updateJsonOutput() {
        if (currentJsonData) {
            jsonOutput.value = JSON.stringify(currentJsonData, null, 4);
        }
    }

    btnCopyJson.addEventListener('click', () => {
        if (jsonOutput.value) {
            navigator.clipboard.writeText(jsonOutput.value).then(() => {
                const originalText = btnCopyJson.textContent;
                btnCopyJson.textContent = 'Copied!';
                setTimeout(() => {
                    btnCopyJson.textContent = originalText;
                }, 2000);
            });
        }
    });
});

