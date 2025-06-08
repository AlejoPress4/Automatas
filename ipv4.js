/**
 * Autómata Finito Determinista para validación de direcciones IPv4
 * Formato: d.d.d.d donde cada d es un número entre 0-255
 */
class IPv4Automaton {
    constructor() {
        // Estados del autómata
        this.states = {
            START: 'START',
            DIGIT1_1: 'DIGIT1_1',
            DIGIT1_2: 'DIGIT1_2', 
            DIGIT1_3: 'DIGIT1_3',
            DOT1: 'DOT1',
            DIGIT2_1: 'DIGIT2_1',
            DIGIT2_2: 'DIGIT2_2',
            DIGIT2_3: 'DIGIT2_3',
            DOT2: 'DOT2',
            DIGIT3_1: 'DIGIT3_1',
            DIGIT3_2: 'DIGIT3_2',
            DIGIT3_3: 'DIGIT3_3',
            DOT3: 'DOT3',
            DIGIT4_1: 'DIGIT4_1',
            DIGIT4_2: 'DIGIT4_2',
            DIGIT4_3: 'DIGIT4_3',
            ACCEPT: 'ACCEPT',
            REJECT: 'REJECT'
        };
        
        this.currentState = this.states.START;
        this.currentNumber = '';
        this.position = 0;
    }

    reset() {
        this.currentState = this.states.START;
        this.currentNumber = '';
        this.position = 0;
    }

    isDigit(char) {
        return char >= '0' && char <= '9';
    }

    isValidNumber(numStr) {
        const num = parseInt(numStr);
        return num >= 0 && num <= 255 && (numStr === '0' || !numStr.startsWith('0'));
    }

    processCharacter(char) {
        this.position++;
        
        switch (this.currentState) {
            case this.states.START:
                if (this.isDigit(char)) {
                    this.currentNumber = char;
                    this.currentState = this.states.DIGIT1_1;
                } else {
                    this.currentState = this.states.REJECT;
                }
                break;

            case this.states.DIGIT1_1:
                if (this.isDigit(char)) {
                    this.currentNumber += char;
                    this.currentState = this.states.DIGIT1_2;
                } else if (char === '.') {
                    if (this.isValidNumber(this.currentNumber)) {
                        this.currentNumber = '';
                        this.currentState = this.states.DOT1;
                    } else {
                        this.currentState = this.states.REJECT;
                    }
                } else {
                    this.currentState = this.states.REJECT;
                }
                break;

            case this.states.DIGIT1_2:
                if (this.isDigit(char)) {
                    this.currentNumber += char;
                    this.currentState = this.states.DIGIT1_3;
                } else if (char === '.') {
                    if (this.isValidNumber(this.currentNumber)) {
                        this.currentNumber = '';
                        this.currentState = this.states.DOT1;
                    } else {
                        this.currentState = this.states.REJECT;
                    }
                } else {
                    this.currentState = this.states.REJECT;
                }
                break;

            case this.states.DIGIT1_3:
                if (char === '.') {
                    if (this.isValidNumber(this.currentNumber)) {
                        this.currentNumber = '';
                        this.currentState = this.states.DOT1;
                    } else {
                        this.currentState = this.states.REJECT;
                    }
                } else {
                    this.currentState = this.states.REJECT;
                }
                break;

            case this.states.DOT1:
                if (this.isDigit(char)) {
                    this.currentNumber = char;
                    this.currentState = this.states.DIGIT2_1;
                } else {
                    this.currentState = this.states.REJECT;
                }
                break;

            case this.states.DIGIT2_1:
                if (this.isDigit(char)) {
                    this.currentNumber += char;
                    this.currentState = this.states.DIGIT2_2;
                } else if (char === '.') {
                    if (this.isValidNumber(this.currentNumber)) {
                        this.currentNumber = '';
                        this.currentState = this.states.DOT2;
                    } else {
                        this.currentState = this.states.REJECT;
                    }
                } else {
                    this.currentState = this.states.REJECT;
                }
                break;

            case this.states.DIGIT2_2:
                if (this.isDigit(char)) {
                    this.currentNumber += char;
                    this.currentState = this.states.DIGIT2_3;
                } else if (char === '.') {
                    if (this.isValidNumber(this.currentNumber)) {
                        this.currentNumber = '';
                        this.currentState = this.states.DOT2;
                    } else {
                        this.currentState = this.states.REJECT;
                    }
                } else {
                    this.currentState = this.states.REJECT;
                }
                break;

            case this.states.DIGIT2_3:
                if (char === '.') {
                    if (this.isValidNumber(this.currentNumber)) {
                        this.currentNumber = '';
                        this.currentState = this.states.DOT2;
                    } else {
                        this.currentState = this.states.REJECT;
                    }
                } else {
                    this.currentState = this.states.REJECT;
                }
                break;

            case this.states.DOT2:
                if (this.isDigit(char)) {
                    this.currentNumber = char;
                    this.currentState = this.states.DIGIT3_1;
                } else {
                    this.currentState = this.states.REJECT;
                }
                break;

            case this.states.DIGIT3_1:
                if (this.isDigit(char)) {
                    this.currentNumber += char;
                    this.currentState = this.states.DIGIT3_2;
                } else if (char === '.') {
                    if (this.isValidNumber(this.currentNumber)) {
                        this.currentNumber = '';
                        this.currentState = this.states.DOT3;
                    } else {
                        this.currentState = this.states.REJECT;
                    }
                } else {
                    this.currentState = this.states.REJECT;
                }
                break;

            case this.states.DIGIT3_2:
                if (this.isDigit(char)) {
                    this.currentNumber += char;
                    this.currentState = this.states.DIGIT3_3;
                } else if (char === '.') {
                    if (this.isValidNumber(this.currentNumber)) {
                        this.currentNumber = '';
                        this.currentState = this.states.DOT3;
                    } else {
                        this.currentState = this.states.REJECT;
                    }
                } else {
                    this.currentState = this.states.REJECT;
                }
                break;

            case this.states.DIGIT3_3:
                if (char === '.') {
                    if (this.isValidNumber(this.currentNumber)) {
                        this.currentNumber = '';
                        this.currentState = this.states.DOT3;
                    } else {
                        this.currentState = this.states.REJECT;
                    }
                } else {
                    this.currentState = this.states.REJECT;
                }
                break;

            case this.states.DOT3:
                if (this.isDigit(char)) {
                    this.currentNumber = char;
                    this.currentState = this.states.DIGIT4_1;
                } else {
                    this.currentState = this.states.REJECT;
                }
                break;

            case this.states.DIGIT4_1:
                if (this.isDigit(char)) {
                    this.currentNumber += char;
                    this.currentState = this.states.DIGIT4_2;
                } else {
                    this.currentState = this.states.REJECT;
                }
                break;

            case this.states.DIGIT4_2:
                if (this.isDigit(char)) {
                    this.currentNumber += char;
                    this.currentState = this.states.DIGIT4_3;
                } else {
                    this.currentState = this.states.REJECT;
                }
                break;

            case this.states.DIGIT4_3:
                this.currentState = this.states.REJECT;
                break;

            default:
                this.currentState = this.states.REJECT;
        }
    }

    validate(input) {
        this.reset();
        
        for (let i = 0; i < input.length; i++) {
            this.processCharacter(input[i]);
            if (this.currentState === this.states.REJECT) {
                return {
                    valid: false,
                    errorPosition: this.position,
                    errorChar: input[i],
                    errorMessage: `Carácter inválido '${input[i]}' en posición ${this.position}`
                };
            }
        }        // Verificar estado final
        const validFinalStates = [
            this.states.DIGIT4_1,
            this.states.DIGIT4_2,
            this.states.DIGIT4_3
        ];

        if (validFinalStates.includes(this.currentState) && this.isValidNumber(this.currentNumber)) {
            return { valid: true };
        } else {
            return {
                valid: false,
                errorPosition: input.length,
                errorMessage: 'IPv4 incompleta o número inválido en el último octeto'
            };
        }
    }
}