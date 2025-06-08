# 🤖 Definición Formal de Autómatas Finitos Deterministas (AFD)

**📅 Fecha**: 8 de Junio, 2025  
**🎓 Proyecto**: Validadores IPv4 y Placas Vehiculares  
**👩‍💻 Desarrolladores**: Mariana García & Alejandro Preciado  
**🏫 Universidad**: Universidad de Caldas - Manizales, Colombia  
**💻 Implementación**: JavaScript para Live Server

---

## 🌐 AFD para Validación de Direcciones IPv4

### 📋 Definición Formal del AFD IPv4

**AFD_IPv4 = (Σ, Q, q₀, F, δ)**

Donde:

- **Σ** = {`'0'`, `'1'`, `'2'`, `'3'`, `'4'`, `'5'`, `'6'`, `'7'`, `'8'`, `'9'`, `'.'`} _(Alfabeto de entrada)_
- **Q** = {q₀, q₁, q₂, q₃, q₄, q₅, q₆, q₇, q₈, q₉, q₁₀, q₁₁, q₁₂, q₁₃, q₁₄, q₁₅, qᵣ} _(Estados)_
- **q₀** = START _(Estado inicial)_
- **F** = {q₁₃, q₁₄, q₁₅} _(Estados finales válidos)_
- **δ** = Función de transición _(ver matriz abajo)_

### 🏷️ Mapeo de Estados

| Estado | Nombre   | Descripción                                   |
| ------ | -------- | --------------------------------------------- |
| q₀     | START    | Estado inicial                                |
| q₁     | DIGIT1_1 | Primer dígito del primer octeto               |
| q₂     | DIGIT1_2 | Segundo dígito del primer octeto              |
| q₃     | DIGIT1_3 | Tercer dígito del primer octeto               |
| q₄     | DOT1     | Primer punto procesado                        |
| q₅     | DIGIT2_1 | Primer dígito del segundo octeto              |
| q₆     | DIGIT2_2 | Segundo dígito del segundo octeto             |
| q₇     | DIGIT2_3 | Tercer dígito del segundo octeto              |
| q₈     | DOT2     | Segundo punto procesado                       |
| q₉     | DIGIT3_1 | Primer dígito del tercer octeto               |
| q₁₀    | DIGIT3_2 | Segundo dígito del tercer octeto              |
| q₁₁    | DIGIT3_3 | Tercer dígito del tercer octeto               |
| q₁₂    | DOT3     | Tercer punto procesado                        |
| q₁₃    | DIGIT4_1 | Primer dígito del cuarto octeto ⭐ **FINAL**  |
| q₁₄    | DIGIT4_2 | Segundo dígito del cuarto octeto ⭐ **FINAL** |
| q₁₅    | DIGIT4_3 | Tercer dígito del cuarto octeto ⭐ **FINAL**  |
| qᵣ     | REJECT   | Estado de rechazo                             |

### 📊 Matriz de Transiciones δ(estado, símbolo)

| Estado\Entrada     | 0     | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | .     | otro |
| ------------------ | ----- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ----- | ---- |
| **q₀** (START)     | q₁    | q₁  | q₁  | q₁  | q₁  | q₁  | q₁  | q₁  | q₁  | q₁  | qᵣ    | qᵣ   |
| **q₁** (DIGIT1_1)  | q₂\*  | q₂  | q₂  | q₂  | q₂  | q₂  | q₂  | q₂  | q₂  | q₂  | q₄\*  | qᵣ   |
| **q₂** (DIGIT1_2)  | q₃    | q₃  | q₃  | q₃  | q₃  | q₃  | q₃  | q₃  | q₃  | q₃  | q₄\*  | qᵣ   |
| **q₃** (DIGIT1_3)  | qᵣ    | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ  | q₄\*  | qᵣ   |
| **q₄** (DOT1)      | q₅    | q₅  | q₅  | q₅  | q₅  | q₅  | q₅  | q₅  | q₅  | q₅  | qᵣ    | qᵣ   |
| **q₅** (DIGIT2_1)  | q₆\*  | q₆  | q₆  | q₆  | q₆  | q₆  | q₆  | q₆  | q₆  | q₆  | q₈\*  | qᵣ   |
| **q₆** (DIGIT2_2)  | q₇    | q₇  | q₇  | q₇  | q₇  | q₇  | q₇  | q₇  | q₇  | q₇  | q₈\*  | qᵣ   |
| **q₇** (DIGIT2_3)  | qᵣ    | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ  | q₈\*  | qᵣ   |
| **q₈** (DOT2)      | q₉    | q₉  | q₉  | q₉  | q₉  | q₉  | q₉  | q₉  | q₉  | q₉  | qᵣ    | qᵣ   |
| **q₉** (DIGIT3_1)  | q₁₀\* | q₁₀ | q₁₀ | q₁₀ | q₁₀ | q₁₀ | q₁₀ | q₁₀ | q₁₀ | q₁₀ | q₁₂\* | qᵣ   |
| **q₁₀** (DIGIT3_2) | q₁₁   | q₁₁ | q₁₁ | q₁₁ | q₁₁ | q₁₁ | q₁₁ | q₁₁ | q₁₁ | q₁₁ | q₁₂\* | qᵣ   |
| **q₁₁** (DIGIT3_3) | qᵣ    | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ  | q₁₂\* | qᵣ   |
| **q₁₂** (DOT3)     | q₁₃   | q₁₃ | q₁₃ | q₁₃ | q₁₃ | q₁₃ | q₁₃ | q₁₃ | q₁₃ | q₁₃ | qᵣ    | qᵣ   |
| **q₁₃** (DIGIT4_1) | q₁₄\* | q₁₄ | q₁₄ | q₁₄ | q₁₄ | q₁₄ | q₁₄ | q₁₄ | q₁₄ | q₁₄ | qᵣ    | qᵣ   |
| **q₁₄** (DIGIT4_2) | q₁₅   | q₁₅ | q₁₅ | q₁₅ | q₁₅ | q₁₅ | q₁₅ | q₁₅ | q₁₅ | q₁₅ | qᵣ    | qᵣ   |
| **q₁₅** (DIGIT4_3) | qᵣ    | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ    | qᵣ   |
| **qᵣ** (REJECT)    | qᵣ    | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ  | qᵣ    | qᵣ   |

### 📝 Notas Importantes

- **`*`** = Transición condicionada a validación de rango (0-255) y sin ceros a la izquierda
- **⭐** = Estados de aceptación (F)

### 🔍 Validaciones Especiales

- Las transiciones marcadas con **`*`** requieren validación adicional del número formado
- No se acepta `"01"`, `"02"`, etc. (ceros a la izquierda), excepto `"0"` solo
- Cada octeto debe estar en rango **[0, 255]**
- Los estados q₁₃, q₁₄, q₁₅ son finales solo si el último número es válido

---

## 🚗 AFD para Validación de Placas Vehiculares

### 📋 Definición Formal del AFD Placas

**AFD_Placas = (Σ, Q, q₀, F, δ)**

Donde:

- **Σ** = {`'A'`, `'B'`, `'C'`, ..., `'Z'`, `'0'`, `'1'`, `'2'`, ..., `'9'`, `'-'`} _(Alfabeto de entrada)_
- **Q** = {q₀, q₁, q₂, q₃, q₄, q₅, q₆, q₇, q₈, q₉, q₁₀, qᵣ} _(Estados)_
- **q₀** = START _(Estado inicial)_
- **F** = {q₁₀} _(Estados finales válidos)_
- **δ** = Función de transición _(ver matriz abajo)_

### 🏷️ Mapeo de Estados

| Estado | Nombre       | Descripción                         |
| ------ | ------------ | ----------------------------------- |
| q₀     | START        | Estado inicial                      |
| q₁     | LETTER1      | Primera letra mayúscula             |
| q₂     | LETTER2      | Segunda letra mayúscula             |
| q₃     | LETTER3      | Tercera letra mayúscula             |
| q₄     | DASH1        | Primer guion procesado              |
| q₅     | DIGIT1       | Primer dígito                       |
| q₆     | DIGIT2       | Segundo dígito                      |
| q₇     | DIGIT3       | Tercer dígito                       |
| q₈     | DIGIT4       | Cuarto dígito                       |
| q₉     | DASH2        | Segundo guion procesado             |
| q₁₀    | VEHICLE_TYPE | Letra tipo de vehículo ⭐ **FINAL** |
| qᵣ     | REJECT       | Estado de rechazo                   |

### 📊 Matriz de Transiciones δ(estado, símbolo)

| Estado\Entrada         | A-Z | 0-9 | -   | otro |
| ---------------------- | --- | --- | --- | ---- |
| **q₀** (START)         | q₁  | qᵣ  | qᵣ  | qᵣ   |
| **q₁** (LETTER1)       | q₂  | qᵣ  | qᵣ  | qᵣ   |
| **q₂** (LETTER2)       | q₃  | qᵣ  | qᵣ  | qᵣ   |
| **q₃** (LETTER3)       | qᵣ  | qᵣ  | q₄  | qᵣ   |
| **q₄** (DASH1)         | qᵣ  | q₅  | qᵣ  | qᵣ   |
| **q₅** (DIGIT1)        | qᵣ  | q₆  | qᵣ  | qᵣ   |
| **q₆** (DIGIT2)        | qᵣ  | q₇  | qᵣ  | qᵣ   |
| **q₇** (DIGIT3)        | qᵣ  | q₈  | qᵣ  | qᵣ   |
| **q₈** (DIGIT4)        | qᵣ  | qᵣ  | q₉  | qᵣ   |
| **q₉** (DASH2)         | q₁₀ | qᵣ  | qᵣ  | qᵣ   |
| **q₁₀** (VEHICLE_TYPE) | qᵣ  | qᵣ  | qᵣ  | qᵣ   |
| **qᵣ** (REJECT)        | qᵣ  | qᵣ  | qᵣ  | qᵣ   |

### 📝 Notas Importantes

- **⭐** = Estado de aceptación (F)
- **A-Z** = Cualquier letra mayúscula del alfabeto inglés
- **0-9** = Cualquier dígito decimal
- **otro** = Cualquier carácter no definido en el alfabeto

### 🔍 Validaciones Especiales

- Solo se aceptan letras **MAYÚSCULAS** (A-Z)
- Los guiones deben estar exactamente en las **posiciones 4 y 9**
- Secuencia exacta: **3 letras + guion + 4 dígitos + guion + 1 letra**
- No se permiten espacios ni caracteres especiales adicionales

---

## 🎓 Propiedades Teóricas

### 🔍 Propiedades de los AFD Implementados

#### 1. **DETERMINISMO**

- Cada par (estado, símbolo) tiene exactamente una transición
- No hay ε-transiciones (transiciones vacías)
- Comportamiento completamente predecible

#### 2. **COMPLETITUD**

- Función de transición definida para todos los casos
- Estado de rechazo maneja entradas no válidas
- No hay estados indefinidos

#### 3. **MINIMALIDAD**

- Cada estado tiene un propósito específico
- No hay estados redundantes o inalcanzables
- Optimizados para la validación específica

#### 4. **CORRECTITUD**

- Acepta exactamente el lenguaje deseado
- Rechaza todas las cadenas no válidas
- Detección precisa de errores


## 👥 Información del Proyecto

**🎓 Proyecto Académico**: Autómatas y Lenguajes Formales  
**📅 Fecha de creación**: Junio 2025  
**💻 Tecnología**: JavaScript, HTML5, CSS3  
**🌐 Plataforma**: Live Server / Navegador Web  
**📖 Documentación**: ManualUsuario.md

### 👩‍💻👨‍💻 Desarrolladores

**Mariana García** & **Alejandro Preciado**  
_Estudiantes de Ingeniería de Sistemas y Computación_  
**Universidad de Caldas** - Manizales, Colombia 🇨🇴


