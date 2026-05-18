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
