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
    const salesforceToolsMenu = document.getElementById('salesforce-tools-menu');
    // Default starting menu
    let currentMenu = textToolsMenu;

    // Sidebar
    const navItems = document.querySelectorAll('.nav-item');

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

    // Back Buttons
    const backBtns = document.querySelectorAll('.back-btn');

    // Phone format state
    let phoneState = {
        hasCode: false,
        hasHyphen: false,
        hasSpace: false
    };

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

    // Sidebar Category Switcher
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

});
