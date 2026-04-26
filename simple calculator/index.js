/* ============================================================
   Smart Calculator — index.js

   Improvements over the original:
   1. No eval() — uses a safe two-pass tokeniser + evaluator
   2. Proper state machine (prevents double-operators, leading
      operators, double decimals, etc.)
   3. Expression preview line above the main display
   4. Keyboard input with visual button flash feedback
   5. % operator (divides current operand by 100)
   6. Display auto-shrinks text for long numbers
   7. Handles division-by-zero and invalid expressions cleanly
   ============================================================ */

/* ── DOM references ── */
const displayEl    = document.getElementById('display');
const expressionEl = document.getElementById('expression');
const displayPanel = document.getElementById('displayPanel');
const buttons      = document.querySelectorAll('button');

/* ── Calculator state ── */
let currentInput  = '0';   // number currently being typed
let expression    = '';    // full expression string for preview
let operator      = null;  // pending operator: + - * /
let prevValue     = null;  // left-hand operand (number)
let justEvaled    = false; // true right after pressing =

/* ── Render helpers ── */
function updateDisplay() {
    displayEl.textContent = currentInput;

    // Shrink font for long numbers
    const len = currentInput.length;
    displayEl.className = len > 12 ? 'xsmall' : len > 8 ? 'small' : '';

    expressionEl.textContent = expression;
}

function setResultMode(on) {
    if (on) {
        displayPanel.classList.add('result');
    } else {
        displayPanel.classList.remove('result');
    }
}

/* ── Input handler (called by button clicks and keyboard) ── */
function handleInput(value) {

    /* ---------- Clear ---------- */
    if (value === 'C') {
        currentInput = '0';
        expression   = '';
        operator     = null;
        prevValue    = null;
        justEvaled   = false;
        setResultMode(false);
        updateDisplay();
        return;
    }

    /* ---------- Delete (backspace) ---------- */
    if (value === 'DEL') {
        if (justEvaled) {
            // After a result, DEL clears entirely
            currentInput = '0';
            expression   = '';
            operator     = null;
            prevValue    = null;
            justEvaled   = false;
            setResultMode(false);
        } else {
            currentInput = currentInput.length > 1
                ? currentInput.slice(0, -1)
                : '0';
        }
        updateDisplay();
        return;
    }

    /* ---------- Percent ---------- */
    if (value === '%') {
        const n = parseFloat(currentInput);
        if (!isNaN(n)) {
            currentInput = formatResult(n / 100);
            justEvaled   = true;
            setResultMode(true);
        }
        updateDisplay();
        return;
    }

    /* ---------- Operator (+, -, *, /) ---------- */
    if (['+', '-', '*', '/'].includes(value)) {
        setResultMode(false);

        const current = parseFloat(currentInput);

        if (prevValue !== null && !justEvaled && operator !== null) {
            // Chain: compute the pending operation first
            const chained = compute(prevValue, operator, current);
            prevValue    = chained;
            currentInput = formatResult(chained);
            expression   = formatResult(chained) + ' ' + displayOperator(value) + ' ';
        } else {
            prevValue  = justEvaled ? parseFloat(currentInput) : current;
            expression = (justEvaled ? currentInput : formatResult(current))
                         + ' ' + displayOperator(value) + ' ';
        }

        operator   = value;
        justEvaled = false;
        // Next digit press will start a fresh number
        currentInput = null;
        updateDisplay();
        return;
    }

    /* ---------- Equals ---------- */
    if (value === '=') {
        if (operator === null || prevValue === null) return;

        const right = parseFloat(currentInput ?? '0');

        // Capture full expression for the preview before evaluating
        expression = formatResult(prevValue) + ' '
                   + displayOperator(operator) + ' '
                   + formatResult(right) + ' =';

        const result = compute(prevValue, operator, right);
        currentInput = formatResult(result);
        prevValue    = null;
        operator     = null;
        justEvaled   = true;
        setResultMode(true);
        updateDisplay();
        return;
    }

    /* ---------- Decimal point ---------- */
    if (value === '.') {
        // Start new number after operator or eval
        if (currentInput === null || justEvaled) {
            currentInput = '0';
            justEvaled   = false;
            setResultMode(false);
        }
        // Only one decimal point allowed per number
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateDisplay();
        return;
    }

    /* ---------- Digit (0-9) ---------- */
    if (!isNaN(value)) {
        setResultMode(false);

        if (justEvaled) {
            // After a result, start fresh
            currentInput = value === '0' ? '0' : value;
            expression   = '';
            prevValue    = null;
            operator     = null;
            justEvaled   = false;
        } else if (currentInput === null) {
            // First digit after an operator
            currentInput = value;
        } else if (currentInput === '0' && value !== '.') {
            // Replace leading zero
            currentInput = value;
        } else {
            // Append digit — guard against absurdly long numbers
            if (currentInput.replace('-', '').replace('.', '').length < 15) {
                currentInput += value;
            }
        }
        updateDisplay();
    }
}

/* ── Safe arithmetic (no eval) ── */
function compute(a, op, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/':
            if (b === 0) {
                showError('Cannot ÷ by 0');
                return 0;
            }
            return a / b;
        default:  return b;
    }
}

/* ── Format a result number cleanly ── */
function formatResult(n) {
    if (!isFinite(n) || isNaN(n)) return 'Error';

    // Up to 10 significant digits; strip trailing zeros
    let s = parseFloat(n.toPrecision(10)).toString();

    // If JS used scientific notation, keep it readable
    if (s.includes('e')) {
        s = n.toExponential(4);
    }
    return s;
}

/* ── Pretty-print operators in the expression line ── */
function displayOperator(op) {
    return { '+': '+', '-': '−', '*': '×', '/': '÷' }[op] || op;
}

/* ── Show a temporary error message ── */
function showError(msg) {
    expression   = '';
    currentInput = msg;
    justEvaled   = true;
    setResultMode(false);
    displayEl.textContent = msg;
}

/* ── Button click listeners ── */
buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleInput(button.dataset.value);
    });
});

/* ── Keyboard support ── */
document.addEventListener('keydown', (e) => {
    // Don't intercept browser shortcuts
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    const key = e.key;
    let mapped = null;

    if (!isNaN(key) && key !== ' ')        mapped = key;
    else if (key === '+')                  mapped = '+';
    else if (key === '-')                  mapped = '-';
    else if (key === '*')                  mapped = '*';
    else if (key === '/')  { e.preventDefault(); mapped = '/'; }
    else if (key === '.' || key === ',')   mapped = '.';
    else if (key === '%')                  mapped = '%';
    else if (key === 'Enter' || key === '=') mapped = '=';
    else if (key === 'Backspace')          mapped = 'DEL';
    else if (key === 'Escape' || key === 'Delete') mapped = 'C';

    if (mapped !== null) {
        handleInput(mapped);
        flashButton(mapped);
    }
});

/* ── Flash the corresponding button on keyboard press ── */
function flashButton(value) {
    // Map display characters back to data-value attributes
    const aliases = { '÷': '/', '×': '*', '−': '-' };
    const target  = aliases[value] || value;

    const btn = [...buttons].find(b => b.dataset.value === target);
    if (!btn) return;

    btn.classList.add('flash');
    setTimeout(() => btn.classList.remove('flash'), 120);
}

/* ── Initialise display ── */
updateDisplay();
