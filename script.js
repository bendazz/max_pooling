class MaxPoolingDemo {
    constructor() {
        this.poolSize = 2;
        this.inputSize = 8;
        this.outputSize = 4; // 8 / 2 = 4 (for 2x2 pooling with stride 2)
        this.stride = 2; // Non-overlapping pooling
        this.currentRow = 0;
        this.currentCol = 0;
        
        this.inputMatrix = [];
        this.outputMatrix = [];
        
        this.init();
    }

    init() {
        this.generateRandomData();
        this.createMatrices();
        this.setupEventListeners();
        this.performMaxPooling(); // Perform initial calculation
        this.updateDisplay();
    }

    generateRandomData() {
        // Generate random input matrix (8x8) with integers 1-20
        this.inputMatrix = [];
        for (let i = 0; i < this.inputSize; i++) {
            this.inputMatrix[i] = [];
            for (let j = 0; j < this.inputSize; j++) {
                this.inputMatrix[i][j] = Math.floor(Math.random() * 20) + 1;
            }
        }

        // Initialize output matrix with dashes
        this.outputMatrix = [];
        for (let i = 0; i < this.outputSize; i++) {
            this.outputMatrix[i] = [];
            for (let j = 0; j < this.outputSize; j++) {
                this.outputMatrix[i][j] = '-';
            }
        }
    }

    createMatrices() {
        this.createInputMatrix();
        this.createOutputMatrix();
    }

    createInputMatrix() {
        const inputContainer = document.getElementById('input-matrix');
        inputContainer.innerHTML = '';
        
        for (let i = 0; i < this.inputSize; i++) {
            for (let j = 0; j < this.inputSize; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell input-cell';
                cell.textContent = this.inputMatrix[i][j];
                cell.id = `input-${i}-${j}`;
                inputContainer.appendChild(cell);
            }
        }
    }

    createOutputMatrix() {
        const outputContainer = document.getElementById('output-matrix');
        outputContainer.innerHTML = '';
        
        for (let i = 0; i < this.outputSize; i++) {
            for (let j = 0; j < this.outputSize; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell output-cell';
                cell.textContent = this.outputMatrix[i][j];
                cell.id = `output-${i}-${j}`;
                outputContainer.appendChild(cell);
            }
        }
    }

    setupEventListeners() {
        // Navigation buttons
        document.getElementById('upBtn').addEventListener('click', () => this.movePool(-1, 0));
        document.getElementById('downBtn').addEventListener('click', () => this.movePool(1, 0));
        document.getElementById('leftBtn').addEventListener('click', () => this.movePool(0, -1));
        document.getElementById('rightBtn').addEventListener('click', () => this.movePool(0, 1));
        
        // Control buttons
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('randomizeBtn').addEventListener('click', () => this.randomizeData());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    this.movePool(-1, 0);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.movePool(1, 0);
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.movePool(0, -1);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.movePool(0, 1);
                    break;
            }
        });
    }

    movePool(deltaRow, deltaCol) {
        const newRow = this.currentRow + deltaRow;
        const newCol = this.currentCol + deltaCol;
        
        // Check boundaries
        if (newRow >= 0 && newRow < this.outputSize && newCol >= 0 && newCol < this.outputSize) {
            this.currentRow = newRow;
            this.currentCol = newCol;
            this.performMaxPooling();
            this.updateDisplay();
        }
    }

    performMaxPooling() {
        // Calculate the starting position in the input matrix
        const startRow = this.currentRow * this.stride;
        const startCol = this.currentCol * this.stride;
        
        let maxValue = -Infinity;
        let values = [];
        let maxPosition = { row: startRow, col: startCol };
        
        // Find maximum value in the pooling window
        for (let i = 0; i < this.poolSize; i++) {
            for (let j = 0; j < this.poolSize; j++) {
                const inputRow = startRow + i;
                const inputCol = startCol + j;
                const value = this.inputMatrix[inputRow][inputCol];
                values.push(value);
                
                if (value > maxValue) {
                    maxValue = value;
                    maxPosition = { row: inputRow, col: inputCol };
                }
            }
        }
        
        // Store the result
        this.outputMatrix[this.currentRow][this.currentCol] = maxValue;
        
        // Update calculation display
        const calculation = `Values: [${values.join(', ')}]`;
        document.getElementById('calculation-display').innerHTML = 
            `<strong>Position (${this.currentRow}, ${this.currentCol}):</strong><br>` +
            `Input region: (${startRow}-${startRow + this.poolSize - 1}, ${startCol}-${startCol + this.poolSize - 1})<br>` +
            `${calculation}<br>` +
            `<strong>Max Value: ${maxValue}</strong> at position (${maxPosition.row}, ${maxPosition.col})`;
    }

    updateDisplay() {
        // Update position display
        document.getElementById('pos-row').textContent = this.currentRow;
        document.getElementById('pos-col').textContent = this.currentCol;
        
        // Update pooling overlay position
        const overlay = document.getElementById('pooling-overlay');
        const cellSize = 47; // 45px + 2px gap
        const overlaySize = this.poolSize * cellSize - 2; // Subtract gap for last cell
        
        overlay.style.left = `${10 + this.currentCol * this.stride * cellSize}px`;
        overlay.style.top = `${10 + this.currentRow * this.stride * cellSize}px`;
        overlay.style.width = `${overlaySize}px`;
        overlay.style.height = `${overlaySize}px`;
        
        // Update navigation buttons
        document.getElementById('upBtn').disabled = this.currentRow === 0;
        document.getElementById('downBtn').disabled = this.currentRow === this.outputSize - 1;
        document.getElementById('leftBtn').disabled = this.currentCol === 0;
        document.getElementById('rightBtn').disabled = this.currentCol === this.outputSize - 1;
        
        // Highlight current input region
        this.highlightInputRegion();
        
        // Update output matrix display
        this.updateOutputMatrix();
    }

    highlightInputRegion() {
        // Remove previous highlights
        document.querySelectorAll('.input-cell').forEach(cell => {
            cell.classList.remove('highlight');
        });
        
        // Add highlights to current pooling region
        const startRow = this.currentRow * this.stride;
        const startCol = this.currentCol * this.stride;
        
        for (let i = 0; i < this.poolSize; i++) {
            for (let j = 0; j < this.poolSize; j++) {
                const cell = document.getElementById(`input-${startRow + i}-${startCol + j}`);
                if (cell) {
                    cell.classList.add('highlight');
                }
            }
        }
    }

    updateOutputMatrix() {
        for (let i = 0; i < this.outputSize; i++) {
            for (let j = 0; j < this.outputSize; j++) {
                const cell = document.getElementById(`output-${i}-${j}`);
                cell.textContent = this.outputMatrix[i][j];
                
                if (this.outputMatrix[i][j] !== '-') {
                    cell.classList.add('filled');
                } else {
                    cell.classList.remove('filled');
                }
            }
        }
    }

    reset() {
        this.currentRow = 0;
        this.currentCol = 0;
        
        // Reset output matrix
        for (let i = 0; i < this.outputSize; i++) {
            for (let j = 0; j < this.outputSize; j++) {
                this.outputMatrix[i][j] = '-';
            }
        }
        
        // Clear calculation display
        document.getElementById('calculation-display').textContent = 'Move the pooling window to see the calculation';
        
        this.performMaxPooling(); // Perform initial calculation
        this.updateDisplay();
    }

    randomizeData() {
        this.generateRandomData();
        this.createMatrices();
        this.currentRow = 0;
        this.currentCol = 0;
        
        // Clear calculation display
        document.getElementById('calculation-display').textContent = 'Move the pooling window to see the calculation';
        
        this.performMaxPooling(); // Perform initial calculation
        this.updateDisplay();
    }
}

// Initialize the demo when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MaxPoolingDemo();
});
