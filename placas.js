/**
 * Autómata Finito Determinista para validación de placas vehiculares
 * Formato: ABC-1234-Q (3 letras mayúsculas, guion, 4 dígitos, guion, 1 letra mayúscula)
 */
class PlacaAutomaton {
    constructor() {
        // Estados del autómata
        this.states = {
            START: 'START',
            LETTER1: 'LETTER1',
            LETTER2: 'LETTER2',
            LETTER3: 'LETTER3',
            DASH1: 'DASH1',
            DIGIT1: 'DIGIT1',
            DIGIT2: 'DIGIT2',
            DIGIT3: 'DIGIT3',
            DIGIT4: 'DIGIT4',
            DASH2: 'DASH2',
            VEHICLE_TYPE: 'VEHICLE_TYPE',
            ACCEPT: 'ACCEPT',
            REJECT: 'REJECT'
        };
        
        this.currentState = this.states.START;
        this.position = 0;
    }

    reset() {
        this.currentState = this.states.START;
        this.position = 0;
    }

    isUpperCaseLetter(char) {
        return char >= 'A' && char <= 'Z';
    }

    isDigit(char) {
        return char >= '0' && char <= '9';
    }

    isValidVehicleType(char) {
        // Letras válidas para tipo de vehículo (puedes ajustar según necesidades)
        const validTypes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
                           'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        return validTypes.includes(char);
    }

    processCharacter(char) {
        this.position++;
        
        switch (this.currentState) {
            case this.states.START:
                if (this.isUpperCaseLetter(char)) {
                    this.currentState = this.states.LETTER1;
                } else {
                    this.currentState = this.states.REJECT;
                }
                break;

            case this.states.LETTER1:
                if (this.isUpperCaseLetter(char)) {
                    this.currentState = this.states.LETTER2;
                } else {
                    this.currentState = this.states.REJECT;
                }
                break;

            case this.states.LETTER2:
                if (this.isUpperCaseLetter(char)) {
                    this.currentState = this.states.LETTER3;
                } else {
                    this.currentState = this.states.REJECT;
                }
                break;

            case this.states.LETTER3:
                if (char === '-') {
                    this.currentState = this.states.DASH1;
                } else {
                    this.currentState = this.states.REJECT;
                }
                break;

            case this.states.DASH1:
                if (this.isDigit(char)) {
                    this.currentState = this.states.DIGIT1;
                } else {
                    this.currentState = this.states.REJECT;
                }
                break;

            case this.states.DIGIT1:
                if (this.isDigit(char)) {
                    this.currentState = this.states.DIGIT2;
                } else {
                    this.currentState = this.states.REJECT;
                }
                break;

            case this.states.DIGIT2:
                if (this.isDigit(char)) {
                    this.currentState = this.states.DIGIT3;
                } else {
                    this.currentState = this.states.REJECT;
                }
                break;

            case this.states.DIGIT3:
                if (this.isDigit(char)) {
                    this.currentState = this.states.DIGIT4;
                } else {
                    this.currentState = this.states.REJECT;
                }
                break;

            case this.states.DIGIT4:
                if (char === '-') {
                    this.currentState = this.states.DASH2;
                } else {
                    this.currentState = this.states.REJECT;
                }
                break;

            case this.states.DASH2:
                if (this.isValidVehicleType(char)) {
                    this.currentState = this.states.VEHICLE_TYPE;
                } else {
                    this.currentState = this.states.REJECT;
                }
                break;

            case this.states.VEHICLE_TYPE:
                // No debería haber más caracteres después del tipo de vehículo
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
                let errorMessage = '';
                
                // Proporcionar mensajes de error más específicos según la posición
                if (this.position <= 3) {
                    errorMessage = `Se esperaba una letra mayúscula en posición ${this.position}`;
                } else if (this.position === 4) {
                    errorMessage = `Se esperaba un guion (-) en posición ${this.position}`;
                } else if (this.position >= 5 && this.position <= 8) {
                    errorMessage = `Se esperaba un dígito en posición ${this.position}`;
                } else if (this.position === 9) {
                    errorMessage = `Se esperaba un guion (-) en posición ${this.position}`;
                } else if (this.position === 10) {
                    errorMessage = `Se esperaba una letra mayúscula para tipo de vehículo en posición ${this.position}`;
                } else {
                    errorMessage = `Carácter extra no permitido en posición ${this.position}`;
                }
                
                return {
                    valid: false,
                    errorPosition: this.position,
                    errorChar: input[i],
                    errorMessage: errorMessage
                };
            }
        }

        // Verificar estado final
        if (this.currentState === this.states.VEHICLE_TYPE) {
            return { valid: true };
        } else {
            let errorMessage = '';
            
            if (input.length < 9) {
                errorMessage = 'Placa incompleta. Formato esperado: ABC-1234-X';            } else {
                errorMessage = 'Placa incompleta o formato inválido';
            }
            
            return {
                valid: false,
                errorPosition: input.length,
                errorMessage: errorMessage
            };
        }
    }

    getExpectedFormat() {
        return 'ABC-1234-X (3 letras mayúsculas, guion, 4 dígitos, guion, 1 letra mayúscula)';
    }
}