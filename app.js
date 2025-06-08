/**
 * Controlador de la interfaz web para los autómatas de validación
 * Maneja la carga de archivos .txt y la visualización de resultados
 */
class WebValidator {
    constructor() {
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Listeners para archivos IPv4
        const fileIpv4 = document.getElementById('file-ipv4');
        const processIpv4 = document.getElementById('process-ipv4');
        
        if (fileIpv4) {
            fileIpv4.addEventListener('change', (e) => this.handleFileSelect(e, 'ipv4'));
        }
        
        if (processIpv4) {
            processIpv4.addEventListener('click', () => this.processFile('ipv4'));
        }

        // Listeners para archivos de placas
        const filePlaca = document.getElementById('file-placa');
        const processPlaca = document.getElementById('process-placa');
        
        if (filePlaca) {
            filePlaca.addEventListener('change', (e) => this.handleFileSelect(e, 'placa'));
        }
        
        if (processPlaca) {
            processPlaca.addEventListener('click', () => this.processFile('placa'));
        }
    }

    handleFileSelect(event, type) {
        const file = event.target.files[0];
        const filenameElement = document.getElementById(`filename-${type}`);
        const processButton = document.getElementById(`process-${type}`);
        
        if (file && file.type === 'text/plain') {
            filenameElement.textContent = file.name;
            filenameElement.style.color = 'var(--text-primary)';
            filenameElement.style.fontWeight = '500';
            processButton.disabled = false;
            
            // Guardar el archivo para procesamiento posterior
            this.currentFiles = this.currentFiles || {};
            this.currentFiles[type] = file;
            
            this.updateStatus(type, '📄 Archivo cargado, listo para procesar');
        } else {
            filenameElement.textContent = 'Por favor selecciona un archivo .txt válido';
            filenameElement.style.color = 'var(--error)';
            processButton.disabled = true;
            
            this.updateStatus(type, '❌ Archivo inválido');
        }
    }

    async processFile(type) {
        const file = this.currentFiles?.[type];
        if (!file) {
            this.updateStatus(type, '❌ No hay archivo para procesar');
            return;
        }

        try {
            this.updateStatus(type, '⏳ Procesando archivo...');
            
            const text = await this.readFileContent(file);
            const lines = text.split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0);

            let results;
            if (type === 'ipv4') {
                results = this.validateIPv4Lines(lines);
            } else if (type === 'placa') {
                results = this.validatePlacaLines(lines);
            }

            this.displayResults(type, results, lines);
            
        } catch (error) {
            console.error('Error procesando archivo:', error);
            this.updateStatus(type, '❌ Error al procesar el archivo');
        }
    }

    readFileContent(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    validateIPv4Lines(lines) {
        if (typeof IPv4Automaton === 'undefined') {
            throw new Error('IPv4Automaton no está disponible');
        }

        const automaton = new IPv4Automaton();
        const results = [];
        let validCount = 0;
        let invalidCount = 0;

        lines.forEach((line, index) => {
            const result = automaton.validate(line);
            const lineNumber = index + 1;
            
            results.push({
                lineNumber,
                content: line,
                valid: result.valid,
                error: result.valid ? null : {
                    position: result.errorPosition,
                    char: result.errorChar,
                    message: result.errorMessage
                }
            });

            if (result.valid) {
                validCount++;
            } else {
                invalidCount++;
            }
        });

        return {
            results,
            summary: {
                total: lines.length,
                valid: validCount,
                invalid: invalidCount
            }
        };
    }

    validatePlacaLines(lines) {
        if (typeof PlacaAutomaton === 'undefined') {
            throw new Error('PlacaAutomaton no está disponible');
        }

        const automaton = new PlacaAutomaton();
        const results = [];
        let validCount = 0;
        let invalidCount = 0;

        lines.forEach((line, index) => {
            const result = automaton.validate(line);
            const lineNumber = index + 1;
            
            results.push({
                lineNumber,
                content: line,
                valid: result.valid,
                error: result.valid ? null : {
                    position: result.errorPosition,
                    char: result.errorChar,
                    message: result.errorMessage
                }
            });

            if (result.valid) {
                validCount++;
            } else {
                invalidCount++;
            }
        });

        return {
            results,
            summary: {
                total: lines.length,
                valid: validCount,
                invalid: invalidCount
            }
        };
    }

    displayResults(type, data, originalLines) {
        // Actualizar estadísticas de resumen
        const summaryElement = document.getElementById(`summary-${type}`);
        const totalElement = document.getElementById(`total-${type}`);
        const validElement = document.getElementById(`valid-${type}`);
        const invalidElement = document.getElementById(`invalid-${type}`);

        if (summaryElement && totalElement && validElement && invalidElement) {
            summaryElement.style.display = 'block';
            totalElement.textContent = data.summary.total;
            validElement.textContent = data.summary.valid;
            invalidElement.textContent = data.summary.invalid;
        }

        // Actualizar estado general
        const statusText = data.summary.invalid === 0 
            ? `✅ Todos los elementos son válidos (${data.summary.total}/${data.summary.total})`
            : `⚠️ ${data.summary.invalid} elementos inválidos de ${data.summary.total}`;
        
        this.updateStatus(type, statusText);

        // Mostrar primer error si existe
        const firstError = data.results.find(r => !r.valid);
        this.updateErrorDisplay(type, firstError);

        // Mostrar resultados detallados
        this.displayDetailedResults(type, data.results);
    }

    updateStatus(type, message) {
        const statusElement = document.getElementById(`status-${type}`);
        if (statusElement) {
            const statusText = statusElement.querySelector('.status-text');
            if (statusText) {
                statusText.textContent = message;
            }
        }
    }

    updateErrorDisplay(type, errorResult) {
        const errorsElement = document.getElementById(`errors-${type}`);
        if (!errorsElement) return;

        if (errorResult && errorResult.error) {
            const error = errorResult.error;
            errorsElement.innerHTML = `
                <div class="error-details">
                    <p>📍 <strong>Número de línea:</strong> ${errorResult.lineNumber}</p>
                    <p>🔤 <strong>Contenido:</strong> "${errorResult.content}"</p>
                    <p>🎯 <strong>Posición del error:</strong> ${error.position || 'N/A'}</p>
                    <p>❌ <strong>Carácter problemático:</strong> ${error.char ? `'${error.char}'` : 'N/A'}</p>
                    <p>💬 <strong>Causa:</strong> ${error.message}</p>
                </div>
            `;
            errorsElement.classList.add('error-active');
        } else {
            errorsElement.innerHTML = `
                <div class="error-placeholder">
                    <p>✅ <strong>Sin errores detectados</strong></p>
                    <p>Todas las líneas del archivo son válidas</p>
                </div>
            `;
            errorsElement.classList.remove('error-active');
        }
    }

    displayDetailedResults(type, results) {
        const detailedElement = document.getElementById(`detailed-${type}`);
        if (!detailedElement) return;

        const resultsList = detailedElement.querySelector('.results-list');
        if (!resultsList) return;

        resultsList.innerHTML = '';
        
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = `result-item ${result.valid ? 'valid' : 'invalid'}`;
            
            let errorInfo = '';
            if (!result.valid && result.error) {
                errorInfo = `
                    <div class="result-error">
                        Pos: ${result.error.position || 'N/A'} | 
                        Char: ${result.error.char ? `'${result.error.char}'` : 'N/A'} | 
                        ${result.error.message}
                    </div>
                `;
            }

            resultItem.innerHTML = `
                <div class="result-line">Línea ${result.lineNumber}:</div>
                <div class="result-content">"${result.content}"</div>
                <div class="result-status ${result.valid ? 'valid' : 'invalid'}">
                    ${result.valid ? '✓ VÁLIDA' : '✗ INVÁLIDA'}
                </div>
                ${errorInfo}
            `;

            resultsList.appendChild(resultItem);
        });

        detailedElement.style.display = 'block';
    }
}

// Inicializar cuando el DOM esté listo
// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new WebValidator();
});
