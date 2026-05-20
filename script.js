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

    // DOM Elements - Menus
    const textToolsMenu = document.getElementById('text-tools-menu');
    const numberToolsMenu = document.getElementById('number-tools-menu');
    const jsonToolsMenu = document.getElementById('json-tools-menu');
    const salesforceToolsMenu = document.getElementById('salesforce-tools-menu');
    const nihonToolsMenu = document.getElementById('nihon-tools-menu');
    // Default starting menu
    let currentMenu = textToolsMenu;

    // Tab nav
    const navItems = document.querySelectorAll('.tab-btn');

    // Text Tool Views & Elements
    const changeCaseView = document.getElementById('change-case-view');
    const changeCaseCard = document.querySelector('[data-tool="change-case"]');
    const caseInput = document.getElementById('case-input');
    const btnUppercase = document.getElementById('btn-uppercase');
    const btnLowercase = document.getElementById('btn-lowercase');
    const btnSentencecase = document.getElementById('btn-sentencecase');

    const kanaWidthView = document.getElementById('kana-width-view');
    const kanaWidthCard = document.querySelector('[data-tool="kana-width-converter"]');
    const kanaInput = document.getElementById('kana-input');
    const btnToFullWidth = document.getElementById('btn-to-full-width');
    const btnToHalfWidth = document.getElementById('btn-to-half-width');

    // Number Tool Views & Elements
    const phoneFormatterView = document.getElementById('phone-formatter-view');
    const phoneFormatterCard = document.querySelector('[data-tool="phone-formatter"]');
    const phoneInput = document.getElementById('phone-input');
    const countrySelect = document.getElementById('country-select');
    const toggleCountryCode = document.getElementById('toggle-country-code');
    const toggleHyphens = document.getElementById('toggle-hyphens');
    const toggleSpaces = document.getElementById('toggle-spaces');
    const phoneOutput = document.getElementById('phone-output');
    const btnCopyPhone = document.getElementById('btn-copy-phone');

    // JSON Tool Views & Elements
    const jsonEditorView = document.getElementById('json-editor-view');
    const jsonEditorCard = document.querySelector('[data-tool="json-editor"]');
    const jsonInput = document.getElementById('json-input');
    const jsonOutput = document.getElementById('json-output');
    const btnVisualizeJson = document.getElementById('btn-visualize-json');
    const btnFormatJson = document.getElementById('btn-format-json');
    const jsonVisualizerContainer = document.getElementById('json-visualizer-container');
    const jsonTable = document.getElementById('json-table');
    const btnAddRow = document.getElementById('btn-add-row');

    // Back Buttons
    const backBtns = document.querySelectorAll('.back-btn');

    // Phone format state
    let phoneState = {
        hasCode: false,
        hasHyphen: false,
        hasSpace: false
    };

    // JSON state
    let currentJsonData = null;

    /**
     * Navigation helper to show a specific view and hide all others
     */
    function showView(viewElement) {
        if (!viewElement) return;
        
        // Hide all views and menus
        document.querySelectorAll('.tools-menu, .tool-view').forEach(el => {
            el.classList.remove('view-active');
            el.classList.add('view-hidden');
        });
        
        // Show target view
        viewElement.classList.remove('view-hidden');
        viewElement.classList.add('view-active');
    }

    // Tab Category Switcher
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            const category = item.dataset.category;
            if (category === 'text') {
                currentMenu = textToolsMenu;
            } else if (category === 'number') {
                currentMenu = numberToolsMenu;
            } else if (category === 'salesforce') {
                currentMenu = salesforceToolsMenu;
            } else if (category === 'json') {
                currentMenu = jsonToolsMenu;
            } else if (category === 'nihon') {
                currentMenu = nihonToolsMenu;
            }

            showView(currentMenu);
        });
    });

    // Tool Card Click Listeners (Go to specific tool view)
    if (changeCaseCard) {
        changeCaseCard.addEventListener('click', () => {
            showView(changeCaseView);
            if (caseInput) caseInput.focus();
        });
    }

    if (kanaWidthCard) {
        kanaWidthCard.addEventListener('click', () => {
            showView(kanaWidthView);
            if (kanaInput) kanaInput.focus();
        });
    }

    if (phoneFormatterCard) {
        phoneFormatterCard.addEventListener('click', () => {
            showView(phoneFormatterView);
            if (phoneInput) phoneInput.focus();
        });
    }

    if (jsonEditorCard) {
        jsonEditorCard.addEventListener('click', () => {
            showView(jsonEditorView);
            if (jsonInput) jsonInput.focus();
        });
    }

    // Japan: Social Insurance
    const socialInsuranceCard = document.querySelector('[data-tool="social-insurance"]');
    const socialInsuranceView = document.getElementById('social-insurance-view');
    if (socialInsuranceCard) {
        socialInsuranceCard.addEventListener('click', () => {
            showView(socialInsuranceView);
            initSocialInsurance();
        });
    }

    // Salesforce: Create Icons
    const createIconsCard = document.querySelector('[data-tool="create-icons"]');
    const createIconsView = document.getElementById('create-icons-view');
    if (createIconsCard) {
        createIconsCard.addEventListener('click', () => {
            showView(createIconsView);
            initIconConverter();
        });
    }

    // Universal Back Button logic
    backBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showView(currentMenu);
        });
    });

    // --- Tool Logics ---

    // 1. Change Case Tool
    if (btnUppercase) {
        btnUppercase.addEventListener('click', () => {
            if (caseInput) caseInput.value = caseInput.value.toUpperCase();
        });
    }
    if (btnLowercase) {
        btnLowercase.addEventListener('click', () => {
            if (caseInput) caseInput.value = caseInput.value.toLowerCase();
        });
    }
    if (btnSentencecase) {
        btnSentencecase.addEventListener('click', () => {
            if (caseInput) {
                caseInput.value = caseInput.value.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
            }
        });
    }

    // 2. Kana Width Tool
    if (btnToFullWidth) {
        btnToFullWidth.addEventListener('click', () => {
            const text = kanaInput.value;
            if (text) {
                let result = text.replace(/[!-~]/g, c => String.fromCharCode(c.charCodeAt(0) + 0xFEE0)).replace(/ /g, '\u3000');
                kanaInput.value = result.replace(regKana, match => kanaMap[match]);
            }
        });
    }
    if (btnToHalfWidth) {
        btnToHalfWidth.addEventListener('click', () => {
            const text = kanaInput.value;
            if (text) {
                let result = text.replace(/[\uFF01-\uFF5E]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0)).replace(/\u3000/g, ' ');
                kanaInput.value = result.replace(regRevKana, match => revKanaMap[match]);
            }
        });
    }

    // 3. Phone Formatter Tool
    function formatSingleNumber(num, country) {
        let clean = num.replace(/[\s-]/g, '');
        if (!clean) return '';
        const { hasCode, hasHyphen, hasSpace } = phoneState;
        let prefix = '';
        let separator = hasHyphen ? '-' : (hasSpace ? ' ' : '');
        if (country === 'JP') {
            if (hasCode && clean.startsWith('0')) clean = clean.substring(1);
            if (hasHyphen || hasSpace) {
                if (hasCode && clean.length === 10) clean = clean.replace(/(\d{2})(\d{4})(\d{4})/, `$1${separator}$2${separator}$3`);
                else if (!hasCode && clean.length === 11) clean = clean.replace(/(\d{3})(\d{4})(\d{4})/, `$1${separator}$2${separator}$3`);
                else if (hasCode && clean.length === 9) clean = clean.replace(/(\d{1})(\d{4})(\d{4})/, `$1${separator}$2${separator}$3`);
                else if (!hasCode && clean.length === 10) clean = clean.replace(/(\d{2})(\d{4})(\d{4})/, `$1${separator}$2${separator}$3`);
            }
            if (hasCode) prefix = '+81' + separator;
        } else if (country === 'PH') {
            if (hasCode && clean.startsWith('0')) clean = clean.substring(1);
            if (hasHyphen || hasSpace) {
                if (hasCode && clean.length === 10) clean = clean.replace(/(\d{3})(\d{3})(\d{4})/, `$1${separator}$2${separator}$3`);
                else if (!hasCode && clean.length === 11) clean = clean.replace(/(\d{4})(\d{3})(\d{4})/, `$1${separator}$2${separator}$3`);
            }
            if (hasCode) prefix = '+63' + separator;
        }
        return prefix + clean;
    }

    function updatePhoneFormat() {
        if (!phoneInput || !phoneOutput) return;
        const rawText = phoneInput.value;
        const country = countrySelect.value;
        if (!rawText.trim()) { phoneOutput.value = ''; return; }
        phoneOutput.value = rawText.split('\n').map(line => formatSingleNumber(line, country)).join('\n');
    }

    [toggleCountryCode, toggleHyphens, toggleSpaces].forEach(toggle => {
        if (!toggle) return;
        toggle.addEventListener('click', (e) => {
            const btn = e.target;
            btn.classList.toggle('active');
            if (btn === toggleCountryCode) phoneState.hasCode = btn.classList.contains('active');
            if (btn === toggleHyphens) {
                phoneState.hasHyphen = btn.classList.contains('active');
                if (phoneState.hasHyphen) { phoneState.hasSpace = false; toggleSpaces.classList.remove('active'); }
            }
            if (btn === toggleSpaces) {
                phoneState.hasSpace = btn.classList.contains('active');
                if (phoneState.hasSpace) { phoneState.hasHyphen = false; toggleHyphens.classList.remove('active'); }
            }
            updatePhoneFormat();
        });
    });

    [phoneInput, countrySelect].forEach(el => {
        if (el) {
            el.addEventListener('input', updatePhoneFormat);
            el.addEventListener('change', updatePhoneFormat);
        }
    });

    if (btnCopyPhone) {
        btnCopyPhone.addEventListener('click', () => {
            const textToCopy = phoneOutput.value;
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalText = btnCopyPhone.textContent;
                    btnCopyPhone.textContent = 'Copied!';
                    setTimeout(() => { btnCopyPhone.textContent = originalText; }, 2000);
                });
            }
        });
    }

    // 4. JSON Editor Tool
    function updateJsonOutput() {
        if (jsonOutput) {
            jsonOutput.value = JSON.stringify(currentJsonData, null, 2);
        }
    }

    function renderJsonTable(data) {
        if (!jsonTable) return;
        jsonTable.innerHTML = ''; // Clear table
        const dataArray = Array.isArray(data) ? data : [data];
        if (dataArray.length === 0) return;

        const keyList = Array.from(dataArray.reduce((keys, item) => {
            Object.keys(item).forEach(key => keys.add(key));
            return keys;
        }, new Set()));

        // Header
        const thead = document.createElement('thead');
        const trHead = document.createElement('tr');
        keyList.forEach(key => {
            const th = document.createElement('th');
            th.textContent = key;
            trHead.appendChild(th);
        });
        thead.appendChild(trHead);
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
                    if (Array.isArray(currentJsonData)) currentJsonData[index][key] = e.target.value;
                    else currentJsonData[key] = e.target.value;
                    updateJsonOutput();
                });
                td.appendChild(input);
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        jsonTable.appendChild(tbody);
    }

    if (btnVisualizeJson) {
        btnVisualizeJson.addEventListener('click', () => {
            try {
                currentJsonData = JSON.parse(jsonInput.value);
                renderJsonTable(currentJsonData);
                if (jsonVisualizerContainer) {
                    jsonVisualizerContainer.classList.remove('view-hidden');
                }
                updateJsonOutput();
            } catch (e) {
                alert('Invalid JSON: ' + e.message);
            }
        });
    }

    if (btnFormatJson) {
        btnFormatJson.addEventListener('click', () => {
            try {
                const parsed = JSON.parse(jsonInput.value);
                jsonInput.value = JSON.stringify(parsed, null, 2);
            } catch (e) {
                alert('Invalid JSON: ' + e.message);
            }
        });
    }

    if (btnAddRow) {
        btnAddRow.addEventListener('click', () => {
            if (Array.isArray(currentJsonData)) {
                const newRow = {};
                if (currentJsonData.length > 0) Object.keys(currentJsonData[0]).forEach(k => newRow[k] = '');
                currentJsonData.push(newRow);
                renderJsonTable(currentJsonData);
                updateJsonOutput();
            }
        });
    }

    // 5. Social Insurance Tool
    const SI_BRACKETS = [
        { amount: 58000, min: 0 },       { amount: 68000, min: 63000 },
        { amount: 78000, min: 73000 },   { amount: 88000, min: 83000 },
        { amount: 98000, min: 93000 },   { amount: 104000, min: 101000 },
        { amount: 110000, min: 107000 }, { amount: 118000, min: 114000 },
        { amount: 126000, min: 122000 }, { amount: 134000, min: 130000 },
        { amount: 142000, min: 138000 }, { amount: 150000, min: 146000 },
        { amount: 160000, min: 155000 }, { amount: 170000, min: 165000 },
        { amount: 180000, min: 175000 }, { amount: 190000, min: 185000 },
        { amount: 200000, min: 195000 }, { amount: 220000, min: 210000 },
        { amount: 240000, min: 230000 }, { amount: 260000, min: 250000 },
        { amount: 280000, min: 270000 }, { amount: 300000, min: 290000 },
        { amount: 320000, min: 310000 }, { amount: 340000, min: 330000 },
        { amount: 360000, min: 350000 }, { amount: 380000, min: 370000 },
        { amount: 410000, min: 395000 }, { amount: 440000, min: 425000 },
        { amount: 470000, min: 455000 }, { amount: 500000, min: 485000 },
        { amount: 530000, min: 515000 }, { amount: 560000, min: 545000 },
        { amount: 590000, min: 575000 }, { amount: 620000, min: 605000 },
        { amount: 650000, min: 635000 }, { amount: 680000, min: 665000 },
        { amount: 710000, min: 695000 }, { amount: 750000, min: 730000 },
        { amount: 790000, min: 770000 }, { amount: 830000, min: 810000 },
        { amount: 880000, min: 855000 }, { amount: 930000, min: 905000 },
        { amount: 980000, min: 955000 }, { amount: 1030000, min: 1005000 },
        { amount: 1090000, min: 1055000 }, { amount: 1150000, min: 1115000 },
        { amount: 1210000, min: 1175000 }, { amount: 1270000, min: 1235000 },
        { amount: 1330000, min: 1295000 }, { amount: 1390000, min: 1355000 },
    ];

    const SI_KENPO_RATES = {
        '北海道': 10.21, '青森': 9.67,  '岩手': 9.75,  '宮城': 10.31, '秋田': 10.02,
        '山形': 9.84,  '福島': 9.53,  '茨城': 9.87,  '栃木': 9.91,  '群馬': 9.76,
        '埼玉': 9.81,  '千葉': 9.87,  '東京': 9.98,  '神奈川': 10.02,'新潟': 9.35,
        '富山': 9.57,  '石川': 9.94,  '福井': 9.73,  '山梨': 9.98,  '長野': 9.49,
        '岐阜': 9.80,  '静岡': 9.78,  '愛知': 9.89,  '三重': 9.81,  '滋賀': 9.81,
        '京都': 10.32, '大阪': 10.29, '兵庫': 10.20, '奈良': 10.22, '和歌山': 10.05,
        '鳥取': 9.97,  '島根': 10.11, '岡山': 10.23, '広島': 9.95,  '山口': 10.21,
        '徳島': 10.10, '香川': 10.28, '愛媛': 10.01, '高知': 10.10, '福岡': 10.36,
        '佐賀': 10.50, '長崎': 10.21, '熊本': 10.32, '大分': 10.21, '宮崎': 9.87,
        '鹿児島': 10.06,'沖縄': 9.27,
    };
    const SI_KAIGO_RATE = 1.60;
    const SI_NENKIN_RATE = 18.3;
    const SI_NENKIN_MAX = 650000;

    function siBracket(salary) {
        let bracket = SI_BRACKETS[0];
        for (const b of SI_BRACKETS) {
            if (salary >= b.min) bracket = b;
            else break;
        }
        return bracket.amount;
    }

    function siFormat(n) {
        return '¥' + Math.round(n).toLocaleString('en-US');
    }

    let siAgeMode = 'under40'; // 'under40' | '40to64' | '65plus'
    let siReady = false;

    function initSocialInsurance() {
        if (siReady) return;
        siReady = true;

        const salary = document.getElementById('si-salary');
        const prefecture = document.getElementById('si-prefecture');
        const btnUnder40 = document.getElementById('si-age-under40');
        const btn40to64 = document.getElementById('si-age-40to64');
        const btn65plus = document.getElementById('si-age-65plus');

        function setAge(mode) {
            siAgeMode = mode;
            btnUnder40.classList.toggle('active', mode === 'under40');
            btn40to64.classList.toggle('active', mode === '40to64');
            btn65plus.classList.toggle('active', mode === '65plus');
            siCalc();
        }

        btnUnder40.addEventListener('click', () => setAge('under40'));
        btn40to64.addEventListener('click', () => setAge('40to64'));
        btn65plus.addEventListener('click', () => setAge('65plus'));
        salary.addEventListener('input', siCalc);
        prefecture.addEventListener('change', siCalc);

        const backBtn = document.getElementById('back-to-menu-btn-si');
        if (backBtn) backBtn.addEventListener('click', () => showView(currentMenu));
    }

    function siCalc() {
        const salaryVal = parseFloat(document.getElementById('si-salary').value);
        const pref = document.getElementById('si-prefecture').value;
        const resultEl = document.getElementById('si-result');

        if (!salaryVal || salaryVal <= 0) {
            resultEl.innerHTML = '<span class="text-muted">Enter a monthly salary above to see the breakdown.</span>';
            return;
        }

        const stdAmount = siBracket(salaryVal);
        const nenkinBase = Math.min(stdAmount, SI_NENKIN_MAX);
        const kenpoRate = SI_KENPO_RATES[pref] || 9.98;
        const includeKaigo = siAgeMode === '40to64';
        const kaigoRate = includeKaigo ? SI_KAIGO_RATE : 0;
        const totalKenpoRate = kenpoRate + kaigoRate;

        const kenpoTotal = stdAmount * (totalKenpoRate / 100);
        const kenpoEmp = kenpoTotal / 2;
        const nenkinTotal = nenkinBase * (SI_NENKIN_RATE / 100);
        const nenkinEmp = nenkinTotal / 2;
        const kaigoTotal = includeKaigo ? (stdAmount * (SI_KAIGO_RATE / 100)) : 0;
        const kaigoEmp = kaigoTotal / 2;

        const totalEmp = kenpoEmp + nenkinEmp;
        const takehome = salaryVal - totalEmp;

        const rows = [
            {
                label: '健康保険 Health Insurance',
                base: stdAmount,
                rate: `${kenpoRate.toFixed(2)}%`,
                emp: kenpoEmp - kaigoEmp,
                employer: kenpoTotal / 2 - kaigoEmp,
            },
        ];

        if (includeKaigo) {
            rows.push({
                label: '介護保険 Care Insurance (40–64)',
                base: stdAmount,
                rate: `${SI_KAIGO_RATE.toFixed(2)}%`,
                emp: kaigoEmp,
                employer: kaigoEmp,
            });
        }

        rows.push({
            label: '厚生年金 Kosei Nenkin',
            base: nenkinBase,
            rate: `${SI_NENKIN_RATE}%`,
            emp: nenkinEmp,
            employer: nenkinEmp,
        });

        const tableRows = rows.map(r => `
            <tr>
                <td class="row-label">${r.label}</td>
                <td>${siFormat(r.base)}</td>
                <td class="row-rate">${r.rate}</td>
                <td>${siFormat(r.emp)}</td>
                <td>${siFormat(r.employer)}</td>
                <td>${siFormat(r.emp + r.employer)}</td>
            </tr>
        `).join('');

        resultEl.innerHTML = `
            <div style="overflow-x:auto;">
                <table class="si-table">
                    <thead>
                        <tr>
                            <th>項目 Item</th>
                            <th>標準報酬月額</th>
                            <th>保険料率</th>
                            <th>従業員負担</th>
                            <th>事業主負担</th>
                            <th>合計 Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                        <tr class="row-total">
                            <td colspan="3">合計 Total</td>
                            <td>${siFormat(totalEmp)}</td>
                            <td>${siFormat(totalEmp)}</td>
                            <td>${siFormat(totalEmp * 2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="si-summary">
                <div class="si-summary-card">
                    <div class="si-summary-label">標準報酬月額</div>
                    <div class="si-summary-value accent">${siFormat(stdAmount)}</div>
                </div>
                <div class="si-summary-card">
                    <div class="si-summary-label">月給 Salary</div>
                    <div class="si-summary-value">${siFormat(salaryVal)}</div>
                </div>
                <div class="si-summary-card">
                    <div class="si-summary-label">従業員控除合計 Deduction</div>
                    <div class="si-summary-value warn">− ${siFormat(totalEmp)}</div>
                </div>
                <div class="si-summary-card">
                    <div class="si-summary-label">手取り推定 Est. Take-home</div>
                    <div class="si-summary-value success">${siFormat(takehome)}</div>
                </div>
            </div>
        `;
    }

    // 4. Salesforce Icon Converter
    let iconConverterReady = false;
    let sfCurrentColor = '#0070D2';
    let sfRenderTimer = null;
    let sfFlatSize = 60;

    const SAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0070D2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
  <polyline points="14 2 14 8 20 8"/>
  <line x1="9" y1="13" x2="15" y2="13"/>
  <line x1="9" y1="17" x2="15" y2="17"/>
</svg>`;

    function initIconConverter() {
        if (iconConverterReady) return;
        iconConverterReady = true;

        const svgInput = document.getElementById('svgInput');
        const hexInput = document.getElementById('hexInput');
        const hexPreview = document.getElementById('hexPreview');
        const iconName = document.getElementById('iconName');
        const iconSize = document.getElementById('iconSize');

        hexInput.value = sfCurrentColor;
        hexPreview.style.background = sfCurrentColor;
        sfFlatSize = clampIconSize(iconSize.value);

        iconSize.addEventListener('input', () => {
            sfFlatSize = clampIconSize(iconSize.value);
            document.querySelectorAll('.sf-size-echo').forEach(el => { el.textContent = sfFlatSize; });
            const flat = document.getElementById('canvasFlat');
            flat.width = sfFlatSize;
            flat.height = sfFlatSize;
            updateIconSnippets();
            renderAllIcons();
        });

        hexInput.addEventListener('input', (e) => {
            let v = e.target.value.trim().toUpperCase();
            if (v && !v.startsWith('#')) v = '#' + v;
            if (/^#[0-9A-F]{6}$/.test(v)) {
                sfCurrentColor = v;
                hexPreview.style.background = v;
                renderAllIcons();
            }
        });

        svgInput.value = SAMPLE_SVG;
        svgInput.addEventListener('input', () => {
            clearTimeout(sfRenderTimer);
            sfRenderTimer = setTimeout(renderAllIcons, 250);
        });

        iconName.addEventListener('input', updateIconSnippets);

        document.getElementById('btn-render-icons').addEventListener('click', renderAllIcons);
        document.getElementById('btn-download-all-icons').addEventListener('click', downloadAllIcons);
        document.querySelectorAll('[data-download]').forEach(btn => {
            btn.addEventListener('click', () => {
                const canvasId = btn.dataset.download;
                const suffix = canvasId === 'canvasFlat'
                    ? `${sfFlatSize}x${sfFlatSize}`
                    : btn.dataset.suffix;
                downloadIconCanvas(canvasId, suffix);
            });
        });
        document.querySelectorAll('[data-copy-target]').forEach(btn => {
            btn.addEventListener('click', () => copySnippet(btn));
        });

        updateIconSnippets();
        renderAllIcons();
    }

    function sanitizeIconName(raw) {
        let name = (raw || '').trim().toLowerCase().replace(/[^a-z0-9_]/g, '_').replace(/_+/g, '_');
        if (!name || /^\d/.test(name)) name = 'my_icon';
        return name;
    }

    function toCamel(snake) {
        return snake.replace(/_([a-z0-9])/g, (_, c) => c.toUpperCase());
    }

    function updateIconSnippets() {
        const raw = document.getElementById('iconName').value;
        const name = sanitizeIconName(raw);
        const camel = toCamel(name);
        const constName = name.toUpperCase();
        const size = sfFlatSize;

        document.querySelectorAll('.sf-name-echo').forEach(el => { el.textContent = name; });
        document.querySelectorAll('.sf-size-echo').forEach(el => { el.textContent = size; });

        const snippets = {
            'snippet-lwc-html':
`<template>
  <img src={iconUrl} alt="${name}" width="${size}" height="${size}" />
</template>`,
            'snippet-lwc-js':
`import { LightningElement } from 'lwc';
import ${constName} from '@salesforce/resourceUrl/${name}';

export default class ${camel.charAt(0).toUpperCase() + camel.slice(1)} extends LightningElement {
  iconUrl = ${constName};
}`,
            'snippet-vf':
`<apex:image url="{!$Resource.${name}}" alt="${name}" width="${size}" height="${size}" />`,
            'snippet-css':
`.${name.replace(/_/g, '-')} {
  background-image: url('/resource/${name}');
  background-size: contain;
  background-repeat: no-repeat;
  width: ${size}px;
  height: ${size}px;
}`,
            'snippet-slds':
`<span class="slds-icon_container slds-icon-standard-custom" title="${name}">
  <img src={iconUrl} alt="${name}" width="${size}" height="${size}" />
  <span class="slds-assistive-text">${name}</span>
</span>`,
        };

        Object.entries(snippets).forEach(([id, code]) => {
            const el = document.getElementById(id);
            if (el) el.textContent = code;
        });
    }

    function copySnippet(btn) {
        const target = document.getElementById(btn.dataset.copyTarget);
        if (!target) return;
        navigator.clipboard.writeText(target.textContent).then(() => {
            const orig = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => { btn.textContent = orig; }, 1500);
        });
    }

    function normalizeSvg(svgText) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, 'image/svg+xml');
        const err = doc.querySelector('parsererror');
        if (err) throw new Error('Invalid SVG: ' + err.textContent.split('\n')[0]);
        const svg = doc.documentElement;
        if (svg.tagName.toLowerCase() !== 'svg') throw new Error('Root element must be <svg>');
        if (!svg.getAttribute('xmlns')) svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        if (!svg.hasAttribute('width') || !svg.hasAttribute('height')) {
            if (svg.hasAttribute('viewBox')) {
                const vb = svg.getAttribute('viewBox').split(/[\s,]+/);
                if (vb.length === 4) {
                    svg.setAttribute('width', vb[2]);
                    svg.setAttribute('height', vb[3]);
                }
            } else {
                svg.setAttribute('width', '24');
                svg.setAttribute('height', '24');
            }
        }
        return new XMLSerializer().serializeToString(svg);
    }

    function svgToImage(svgText) {
        return new Promise((resolve, reject) => {
            const blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const img = new Image();
            img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
            img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load SVG as image')); };
            img.src = url;
        });
    }

    function roundRectPath(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
    }

    function renderLegacyIcon(canvasId, img, size) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);
    }

    function renderSldsIcon(canvasId, img, size, color) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, size, size);

        const radius = Math.round(size * 0.15);
        ctx.fillStyle = color;
        roundRectPath(ctx, 0, 0, size, size, radius);
        ctx.fill();

        const glyphSize = Math.round(size * 0.60);
        const glyphX = Math.round((size - glyphSize) / 2);
        const glyphY = Math.round((size - glyphSize) / 2);

        const off = document.createElement('canvas');
        off.width = glyphSize;
        off.height = glyphSize;
        const offCtx = off.getContext('2d');
        offCtx.drawImage(img, 0, 0, glyphSize, glyphSize);
        offCtx.globalCompositeOperation = 'source-in';
        offCtx.fillStyle = '#ffffff';
        offCtx.fillRect(0, 0, glyphSize, glyphSize);

        ctx.drawImage(off, glyphX, glyphY);
    }

    async function renderAllIcons() {
        const errEl = document.getElementById('svgError');
        if (!errEl) return;
        errEl.style.display = 'none';
        try {
            const raw = document.getElementById('svgInput').value;
            if (!raw.trim()) return;
            const normalized = normalizeSvg(raw);
            const img = await svgToImage(normalized);
            const flat = document.getElementById('canvasFlat');
            flat.width = sfFlatSize;
            flat.height = sfFlatSize;
            renderLegacyIcon('canvasFlat', img, sfFlatSize);
            renderSldsIcon('canvasSlds', img, 480, sfCurrentColor);
        } catch (e) {
            errEl.textContent = e.message;
            errEl.style.display = 'block';
        }
    }

    function clampIconSize(v) {
        const n = parseInt(v, 10);
        if (isNaN(n)) return 60;
        return Math.max(16, Math.min(480, n));
    }

    // Lucide icons
    lucide.createIcons();

    // Theme switcher
    const root = document.documentElement;
    const btnDark = document.getElementById('theme-dark');
    const btnLight = document.getElementById('theme-light');

    function setTheme(mode) {
        root.setAttribute('data-theme', mode);
        btnDark.classList.toggle('active', mode === 'dark');
        btnLight.classList.toggle('active', mode === 'light');
        localStorage.setItem('sheen-theme', mode);
    }

    if(btnDark) btnDark.addEventListener('click', () => setTheme('dark'));
    if(btnLight) btnLight.addEventListener('click', () => setTheme('light'));

    const saved = localStorage.getItem('sheen-theme');
    if (saved) setTheme(saved);

    function downloadAllIcons() {
        downloadIconCanvas('canvasFlat', `${sfFlatSize}x${sfFlatSize}`);
        setTimeout(() => downloadIconCanvas('canvasSlds', 'slds'), 150);
    }

    function downloadIconCanvas(canvasId, suffix) {
        const canvas = document.getElementById(canvasId);
        const name = (document.getElementById('iconName').value || 'icon').trim().replace(/\s+/g, '_');
        canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${name}_${suffix}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 'image/png');
    }

});
