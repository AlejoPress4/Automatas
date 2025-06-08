# 🤖 Manual Técnico
## Autómatas Finitos Deterministas - Validadores IPv4 y Placas Vehiculares
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://semver.org)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-compatible-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-modern-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 📋 Índice

- [Descripción General](#-descripción-general)
- [Características Principales](#-características-principales)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Teoría de Autómatas](#-teoría-de-autómatas)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Uso del Sistema](#-uso-del-sistema)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Documentación Técnica](#-documentación-técnica)
- [Pruebas y Validación](#-pruebas-y-validación)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

## 🚀 Descripción General

Este proyecto implementa **dos Autómatas Finitos Deterministas (AFD)** especializados en la validación de estructuras de cadenas complejas:

1. **Validador IPv4**: Valida direcciones IP en formato `d.d.d.d` donde cada `d` es un número entre 0-255
2. **Validador de Placas Vehiculares**: Valida placas en formato `ABC-1234-Q` (3 letras, guion, 4 dígitos, guion, 1 letra)

### 🎯 Objetivos Académicos

- Demostrar la implementación práctica de **Teoría de Autómatas** y **Lenguajes Formales**
- Aplicar conceptos de **Máquinas de Estado Finito** en problemas reales
- Desarrollar un sistema de validación sin uso de expresiones regulares
- Implementar **análisis léxico** con reporte detallado de errores

## ✨ Características Principales

### 🔍 Validación Rigurosa
- **Sin memoria adicional**: Implementación pura de AFD sin pilas o gramáticas contextuales
- **Validación determinista**: Cada entrada tiene exactamente una transición válida
- **Reporte de errores preciso**: Posición exacta del carácter problemático y causa del error

### 📊 Análisis Detallado
- **Procesamiento línea por línea** de archivos `.txt`
- **Estadísticas completas**: Total de líneas, válidas, inválidas
- **Información contextual**: Número de línea, posición del error, descripción del problema

### 🎨 Interfaz Moderna
- **Diseño responsivo** con tema oscuro moderno
- **Interfaz de pestañas** para ambos validadores
- **Carga de archivos** mediante drag & drop o selección
- **Resultados en tiempo real** con colores diferenciados

### 🔧 Compatibilidad Técnica
- **100% JavaScript vanilla** - Sin dependencias externas
- **Compatible con Live Server** - Ejecución directa en navegador
- **Estándares web modernos** - HTML5, CSS3, ES6+

## 🏗️ Arquitectura del Sistema

### Componentes Principales

```
┌─────────────────────────────────────────────────────────────┐
│                    INTERFAZ WEB (HTML5)                    │
├─────────────────────────┬───────────────────────────────────┤
│     Tab IPv4            │         Tab Placas               │
├─────────────────────────┼───────────────────────────────────┤
│                    WebValidator (app.js)                    │
├─────────────────────────┼───────────────────────────────────┤
│  IPv4Automaton          │      PlacaAutomaton              │
│  (ipv4.js)              │      (placas.js)                 │
├─────────────────────────┼───────────────────────────────────┤
│          FileReader API & Procesamiento de Texto           │
└─────────────────────────────────────────────────────────────┘
```

### Flujo de Datos

1. **Carga de Archivo**: Usuario selecciona archivo `.txt`
2. **Lectura**: `FileReader` API procesa el contenido
3. **Análisis**: Cada línea se envía al autómata correspondiente
4. **Validación**: AFD procesa carácter por carácter
5. **Reporte**: Resultados se muestran con detalles de errores

## 🧮 Teoría de Autómatas

### Definición Formal IPv4

**AFD_IPv4 = (Σ, Q, q₀, F, δ)**

- **Σ** = {0,1,2,3,4,5,6,7,8,9,.} (Alfabeto)
- **Q** = {q₀, q₁, ..., q₁₅, qᵣ} (18 estados)
- **q₀** = START (Estado inicial)
- **F** = {q₁₃, q₁₄, q₁₅} (Estados finales)
- **δ** = Función de transición determinista

### Estados IPv4

| Estado | Descripción | Tipo |
|--------|-------------|------|
| q₀ | Inicio | Inicial |
| q₁-q₃ | Primer octeto (1-3 dígitos) | Transición |
| q₄ | Primer punto | Transición |
| q₅-q₇ | Segundo octeto | Transición |
| q₈ | Segundo punto | Transición |
| q₉-q₁₁ | Tercer octeto | Transición |
| q₁₂ | Tercer punto | Transición |
| q₁₃-q₁₅ | Cuarto octeto | **Final** |
| qᵣ | Rechazo | Error |

### Definición Formal Placas

**AFD_Placas = (Σ, Q, q₀, F, δ)**

- **Σ** = {A-Z, 0-9, -} (Alfabeto)
- **Q** = {q₀, q₁, ..., q₁₀, qᵣ} (12 estados)
- **q₀** = START (Estado inicial)
- **F** = {q₁₀} (Estado final)
- **δ** = Función de transición determinista

### Estados Placas

| Estado | Descripción | Patrón |
|--------|-------------|--------|
| q₀ | Inicio | - |
| q₁-q₃ | Letras 1-3 | A-Z |
| q₄ | Primer guion | - |
| q₅-q₈ | Dígitos 1-4 | 0-9 |
| q₉ | Segundo guion | - |
| q₁₀ | Tipo vehículo | A-Z (Final) |
| qᵣ | Rechazo | Error |

## 🛠️ Instalación y Configuración

### Requisitos del Sistema

- **Navegador moderno** con soporte ES6+ (Chrome 60+, Firefox 55+, Safari 12+)
- **Live Server** o servidor web local
- **VS Code** (recomendado) con extensión Live Server

### Instalación Rápida

1. **Clonar el repositorio**:
   ```bash
   git clone <repository-url>
   cd Automatas
   ```

2. **Abrir en VS Code**:
   ```bash
   code .
   ```

3. **Iniciar Live Server**:
   - Clic derecho en `index.html`
   - Seleccionar "Open with Live Server"
   - O usar `Alt+L Alt+O`

4. **Acceder a la aplicación**:
   - Se abre automáticamente en `http://127.0.0.1:5500`

### Verificación de Instalación

1. **Cargar archivo de prueba** (`test_ipv4.txt` o `test_placas.txt`)
2. **Procesar archivo** y verificar resultados
3. **Comprobar estadísticas** y reportes de error

## 🎮 Uso del Sistema

### Interfaz Principal

La aplicación presenta dos pestañas principales:

#### 🌐 Validador IPv4
- **Formato esperado**: `192.168.1.1`
- **Reglas**: Cada octeto entre 0-255, sin ceros a la izquierda
- **Ejemplos válidos**: `0.0.0.0`, `255.255.255.255`, `192.168.1.1`
- **Ejemplos inválidos**: `256.1.1.1`, `192.168.01.1`, `192.168.1`

#### 🚗 Validador Placas
- **Formato esperado**: `ABC-1234-Q`
- **Reglas**: 3 letras mayúsculas + guion + 4 dígitos + guion + 1 letra
- **Ejemplos válidos**: `ABC-1234-Q`, `XYZ-9876-A`
- **Ejemplos inválidos**: `abc-1234-Q`, `AB-1234-Q`, `ABC-123-Q`

### Proceso de Validación

1. **Seleccionar pestaña** correspondiente
2. **Cargar archivo .txt** con las cadenas a validar (una por línea)
3. **Hacer clic en "Procesar Archivo"**
4. **Revisar resultados**:
   - ✅ **Válidas**: Fondo verde
   - ❌ **Inválidas**: Fondo rojo con detalles del error
   - 📊 **Estadísticas**: Total, válidas, inválidas

### Interpretación de Errores

Los errores incluyen:
- **Posición exacta** del problema
- **Carácter problemático**
- **Descripción específica** del error
- **Estado del autómata** al fallar

## 📁 Estructura del Proyecto

```
Automatas/
├── 📄 index.html              # Estructura HTML principal
├── 🎨 styles.css              # Estilos y diseño moderno
├── ⚙️ app.js                  # Controlador de interfaz web
├── 🤖 ipv4.js                 # AFD para validación IPv4
├── 🚗 placas.js               # AFD para validación placas
├── 📊 test_ipv4.txt           # Casos de prueba IPv4
├── 📊 test_placas.txt         # Casos de prueba placas
├── 📚 README.md               # Documentación técnica (este archivo)
├── 👤 ManualUsuario.md        # Manual de usuario
├── 🔢 Matrices_Transiciones_AFD.txt  # Especificación formal
└── 🧪 test_functionality.html # Página de pruebas funcionales
```

### Descripción de Archivos

#### Archivos Principales

- **`index.html`**: Estructura HTML con pestañas y controles de interfaz
- **`styles.css`**: Diseño moderno con tema oscuro y animaciones
- **`app.js`**: Lógica de interfaz, manejo de archivos y eventos

#### Autómatas

- **`ipv4.js`**: Implementación del AFD para IPv4
  - 18 estados deterministas
  - Validación de octetos 0-255
  - Control de ceros a la izquierda
  
- **`placas.js`**: Implementación del AFD para placas
  - 12 estados deterministas
  - Validación de formato ABC-1234-Q
  - Control de caracteres válidos

#### Documentación

- **`README.md`**: Documentación técnica completa
- **`ManualUsuario.md`**: Guía paso a paso para usuarios
- **`Matrices_Transiciones_AFD.txt`**: Especificación matemática formal

#### Pruebas

- **`test_*.txt`**: Archivos con casos de prueba
- **`test_functionality.html`**: Página para pruebas programáticas

## 📖 Documentación Técnica

### Algoritmo de Validación

```javascript
// Pseudocódigo del proceso de validación
function validateString(input, automaton) {
    automaton.reset();
    
    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        const result = automaton.processCharacter(char);
        
        if (result.error) {
            return {
                valid: false,
                position: i,
                character: char,
                error: result.error,
                state: automaton.currentState
            };
        }
    }
    
    return {
        valid: automaton.isInFinalState(),
        finalState: automaton.currentState
    };
}
```

### Manejo de Estados

Cada autómata mantiene:
- **Estado actual**: Posición en la máquina de estados
- **Posición**: Carácter actual siendo procesado
- **Contexto**: Información específica (número actual para IPv4)

### Transiciones Deterministas

- **Una transición por entrada**: Sin ambigüedad
- **Estado de rechazo**: Para entradas inválidas
- **Estados finales**: Indican cadenas válidas completas

## 🧪 Pruebas y Validación

### Casos de Prueba IPv4

```
# Válidos
192.168.1.1      ✅
0.0.0.0          ✅
255.255.255.255  ✅
10.0.0.1         ✅

# Inválidos
256.1.1.1        ❌ (octeto > 255)
192.168.01.1     ❌ (cero a la izquierda)
192.168.1        ❌ (incompleto)
192.168.1.1.1    ❌ (demasiados octetos)
```

### Casos de Prueba Placas

```
# Válidos
ABC-1234-Q       ✅
XYZ-9876-A       ✅
DEF-0000-Z       ✅

# Inválidos
abc-1234-Q       ❌ (minúsculas)
AB-1234-Q        ❌ (solo 2 letras)
ABC-123-Q        ❌ (solo 3 dígitos)
ABC-1234-q       ❌ (minúscula final)
```

### Métricas de Rendimiento

- **Complejidad temporal**: O(n) donde n es la longitud de la cadena
- **Complejidad espacial**: O(1) - sin memoria adicional
- **Determinismo**: 100% - una sola transición por entrada

## 🔧 Personalización y Extensión

### Agregar Nuevos Patrones

Para crear un nuevo validador:

1. **Definir el AFD**:
   ```javascript
   class NewAutomaton {
       constructor() {
           this.states = { /* definir estados */ };
           this.currentState = this.states.START;
       }
   }
   ```

2. **Implementar transiciones**:
   ```javascript
   processCharacter(char) {
       switch (this.currentState) {
           case this.states.START:
               // lógica de transición
               break;
       }
   }
   ```

3. **Integrar en la interfaz**:
   - Agregar pestaña en `index.html`
   - Conectar eventos en `app.js`

### Modificar Reglas de Validación

- **IPv4**: Ajustar rangos de octetos en `isValidNumber()`
- **Placas**: Modificar patrones en `isValidVehicleType()`

## 🤝 Contribución

### Guías de Contribución

1. **Fork** el repositorio
2. **Crear rama** para nuevas características: `git checkout -b feature/nueva-caracteristica`
3. **Commit** cambios: `git commit -am 'Agregar nueva característica'`
4. **Push** a la rama: `git push origin feature/nueva-caracteristica`
5. **Crear Pull Request**

### Estándares de Código

- **JavaScript ES6+** con sintaxis moderna
- **Comentarios JSDoc** para funciones públicas
- **Nombres descriptivos** para variables y funciones
- **Indentación consistente** (4 espacios)

### Reportar Problemas

Usar GitHub Issues con:
- **Descripción clara** del problema
- **Pasos para reproducir**
- **Comportamiento esperado vs actual**
- **Información del navegador**


## 🎓 Información Académica

**Proyecto**: Teoría de Autómatas y Lenguajes Formales  
**Implementación**: JavaScript + HTML5 + CSS3  
**Paradigma**: Autómatas Finitos Deterministas  
**Fecha**: Junio 2025  

### 👥 Desarrolladores

**Mariana García** & **Alejandro Preciado**  
*Estudiantes de Ingeniería de Sistemas y Computación*  
**Universidad de Caldas** - Manizales, Colombia 🇨🇴

### Referencias Teóricas

- Hopcroft, J. E., Motwani, R., & Ullman, J. D. (2001). *Introduction to Automata Theory, Languages, and Computation*
- Sipser, M. (2012). *Introduction to the Theory of Computation*
- Linz, P. (2016). *An Introduction to Formal Languages and Automata*

---

<div align="center">

**🚀 ¡Explora la potencia de los Autómatas Finitos Deterministas en acción!**

[![Abrir en Live Server](https://img.shields.io/badge/Abrir%20en-Live%20Server-brightgreen?style=for-the-badge)](index.html)

</div>