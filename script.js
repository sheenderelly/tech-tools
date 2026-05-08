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

    // AI Tools Elements
    const cleanPromptView = document.getElementById('clean-prompt-view');
    const cleanPromptCard = document.querySelector('[data-tool="clean-prompt"]');
    const backBtnAi = document.getElementById('back-to-menu-btn-ai');
    
    const aiModelSelect = document.getElementById('ai-model-select');
    const geminiApiKeyInput = document.getElementById('gemini-api-key');
    const toggleApiKeyActive = document.getElementById('toggle-api-key-active');
    const promptInput = document.getElementById('prompt-input');
    const promptOutput = document.getElementById('prompt-output');
    const btnCleanPrompt = document.getElementById('btn-clean-prompt');
    const btnCopyPrompt = document.getElementById('btn-copy-prompt');

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
            } else if (category === 'ai') {
                currentMenu = aiToolsMenu;
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

    cleanPromptCard.addEventListener('click', () => {
        showView(cleanPromptView);
        promptInput.focus();
    });

    backBtnAi.addEventListener('click', () => {
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

    // Clean Prompt Tool Logic

    // Load AI settings from local storage
    let aiSettings = {
        apiKey: localStorage.getItem('geminiApiKey') || '',
        useKey: localStorage.getItem('useGeminiApiKey') === 'true',
        model: localStorage.getItem('aiModel') || 'gemini-2.5-flash'
    };

    if (aiModelSelect) {
        aiModelSelect.value = aiSettings.model;
        aiModelSelect.addEventListener('change', (e) => {
            aiSettings.model = e.target.value;
            localStorage.setItem('aiModel', aiSettings.model);
        });
    }

    if (aiSettings.apiKey) {
        geminiApiKeyInput.value = aiSettings.apiKey;
    }
    if (aiSettings.useKey) {
        toggleApiKeyActive.classList.add('active');
    }

    geminiApiKeyInput.addEventListener('input', (e) => {
        aiSettings.apiKey = e.target.value;
        localStorage.setItem('geminiApiKey', aiSettings.apiKey);
    });

    toggleApiKeyActive.addEventListener('click', () => {
        toggleApiKeyActive.classList.toggle('active');
        aiSettings.useKey = toggleApiKeyActive.classList.contains('active');
        localStorage.setItem('useGeminiApiKey', aiSettings.useKey);
    });

    btnCleanPrompt.addEventListener('click', async () => {
        const text = promptInput.value.trim();
        if (!text) {
            alert('Please enter a prompt to clean.');
            return;
        }

        if (aiSettings.useKey && !aiSettings.apiKey) {
            alert('Please provide a Google Gemini API Key or disable Use API Key.');
            return;
        }

        btnCleanPrompt.disabled = true;
        btnCleanPrompt.textContent = '✨ Cleaning...';
        promptOutput.value = 'Waiting for response from Gemini...';

        const systemPrompt = `You are an expert prompt engineer. The user will provide a raw prompt idea. Your task is to rewrite it to be highly structured, clear, and easy for an AI model to follow.
Do not deviate from the user's original idea, but structure it better.
Output ONLY the rewritten prompt.`;

        try {
            const modelName = aiSettings.model || 'gemini-2.5-flash';
            let url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;
            if (aiSettings.useKey && aiSettings.apiKey) {
                url += `?key=${aiSettings.apiKey}`;
            }
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: systemPrompt + "\n\nUser Input: " + text }
                        ]
                    }],
                    generationConfig: {
                        temperature: 0.3
                    }
                })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error?.message || 'Failed to fetch from Gemini API');
            }

            const data = await response.json();
            const cleanedPrompt = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (cleanedPrompt) {
                promptOutput.value = cleanedPrompt.trim();
            } else {
                promptOutput.value = 'Received an unexpected response format from the API.';
            }

        } catch (error) {
            console.error('Gemini API Error:', error);
            promptOutput.value = `Error: ${error.message}`;
        } finally {
            btnCleanPrompt.disabled = false;
            btnCleanPrompt.textContent = '✨ Clean Prompt';
        }
    });

    btnCopyPrompt.addEventListener('click', () => {
        const textToCopy = promptOutput.value;
        if (textToCopy && !textToCopy.startsWith('Error:') && !textToCopy.startsWith('Waiting for response')) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = btnCopyPrompt.textContent;
                btnCopyPrompt.textContent = 'Copied!';
                setTimeout(() => {
                    btnCopyPrompt.textContent = originalText;
                }, 2000);
            });
        }
    });
});
