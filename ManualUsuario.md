# 🤖 Manual de Usuario - Validador de Autómatas Finitos

¡Bienvenido al **Validador de Autómatas Finitos Deterministas**! 🎉

Esta aplicación te permite validar automáticamente direcciones IPv4 y placas vehiculares usando algoritmos de autómatas finitos. Es tan fácil como cargar un archivo y obtener resultados instantáneos con análisis detallado de errores.

## 🚀 ¿Qué hace esta aplicación?

La aplicación puede validar dos tipos de datos:

### 🌐 **Direcciones IPv4**
- **¿Qué es?** Direcciones de red como las que usa tu computadora para conectarse a internet
- **Formato válido:** `192.168.1.1` (4 números separados por puntos)
- **Reglas:** Cada número debe estar entre 0 y 255
- **❌ Ejemplos inválidos:** `192.168.1.256` (256 es mayor que 255), `192.168.01.1` (no se permite 01)

### 🚗 **Placas Vehiculares**
- **¿Qué es?** Placas de automóviles con formato específico
- **Formato válido:** `ABC-1234-M` (3 letras, guion, 4 números, guion, 1 letra)
- **Reglas:** Solo letras MAYÚSCULAS, números del 0-9, guiones en posiciones exactas
- **❌ Ejemplos inválidos:** `abc-1234-M` (letras minúsculas), `ABC-12345-M` (5 números)

## 📁 ¿Qué necesitas para empezar?

### Archivos incluidos en tu proyecto:
```
📁 Tu carpeta del proyecto/
├── 🌐 index.html           # Página principal (haz doble clic para abrir)
├── 🎨 styles.css           # Estilos (no tocar)
├── 🧠 ipv4.js              # Lógica para IPv4 (no tocar)
├── 🧠 placas.js            # Lógica para placas (no tocar)
├── ⚙️ app.js               # Funcionalidad web (no tocar)
├── 📄 test_ipv4.txt        # Ejemplos de IPv4 para probar
├── 📄 test_placas.txt      # Ejemplos de placas para probar
└── 📖 ManualUsuario.md     # Este manual
```

### Requisitos mínimos:
- ✅ **Navegador web moderno** (Chrome, Firefox, Edge, Safari)
- ✅ **Archivos .txt** con tus datos (uno por línea)
- ✅ **¡Eso es todo!** No necesitas instalar nada más

## 🎯 ¿Cómo usar la aplicación? (Paso a paso)

### **Paso 1: Abrir la aplicación** 🌐
1. Ve a tu carpeta del proyecto
2. Haz **doble clic** en `index.html`
3. Se abrirá en tu navegador automáticamente
4. ¡Verás una interfaz moderna con dos pestañas!

### **Paso 2: Elegir qué validar** 🎛️
- **Pestaña "🌐 Validador IPv4"**: Para direcciones de red
- **Pestaña "🚗 Validador Placas"**: Para placas de vehículos

### **Paso 3: Preparar tu archivo de datos** 📝
Crea un archivo `.txt` con tus datos, **una línea por elemento**:

**Para IPv4 (ejemplo):**
```
192.168.1.1
10.0.0.1
255.255.255.255
192.168.1.256
```

**Para Placas (ejemplo):**
```
ABC-1234-M
PQR-1298-X
abc-1234-M
XYZ-99999-A
```

### **Paso 4: Cargar y procesar** 🚀
1. Haz clic en **"📄 Seleccionar archivo .txt"**
2. Elige tu archivo desde tu computadora
3. Verás el nombre del archivo seleccionado
4. Haz clic en **"Procesar Archivo"**
5. ¡Los resultados aparecen inmediatamente!

### **Paso 5: Interpretar los resultados** 📊
La aplicación te mostrará:
- ✅ **Estadísticas generales**: Total procesado, válidos, inválidos
- 🚨 **Errores detallados**: Línea exacta, posición del error, qué falló
- 📋 **Lista completa**: Cada elemento con su estado

## 🧪 Prueba la aplicación con ejemplos incluidos

¡No tienes que crear archivos desde cero! Ya incluimos ejemplos perfectos para probar:

### 📄 **test_ipv4.txt** - Ejemplos de direcciones IPv4
```
✅ Direcciones VÁLIDAS:
192.168.1.1       → Dirección local típica
10.0.0.1          → Red privada
255.255.255.255   → Dirección máxima permitida
0.0.0.0           → Dirección mínima

❌ Direcciones INVÁLIDAS (y por qué fallan):
192.168.1.256     → El número 256 es mayor que 255
300.168.1.1       → El número 300 es mayor que 255  
192.168.01.1      → No se permite "01" (cero a la izquierda)
192.168.1         → Incompleta (faltan octetos)
192.168.1.1.1     → Demasiados octetos
abc.def.ghi.jkl   → Contiene letras en lugar de números
```

### 📄 **test_placas.txt** - Ejemplos de placas vehiculares
```
✅ Placas VÁLIDAS:
ABC-1234-M        → Formato perfecto
PQR-1298-X        → Ejemplo del enunciado
XYZ-9876-A        → Tipo de vehículo A
DEF-0000-Z        → Con ceros es válido

❌ Placas INVÁLIDAS (y por qué fallan):
abc-1234-M        → Letras minúsculas no permitidas
ABC-12345-M       → Tiene 5 números (solo se permiten 4)
AB-1234-M         → Solo 2 letras iniciales (se requieren 3)
ABC1234M          → Sin guiones
ABC-1234-m        → Letra final minúscula
ABC-1234-MM       → Dos letras finales (solo se permite 1)
```

## 💡 Entendiendo los resultados de la aplicación

### 📊 **Panel de Estadísticas**
Cuando proceses un archivo, verás algo como esto:
```
📊 Resultados de Validación
✅ 5 elementos válidos de 10 total
⚠️ 5 elementos inválidos encontrados
```

### 🚨 **Panel de Errores Detallados**
Para cada error, la aplicación te dice exactamente:
```
🚨 Detalles de Errores
📍 Número de línea: 7
🔤 Carácter de falla: '6' 
❌ Causa del error: Número inválido en octeto (256 > 255)
```

### 📋 **Lista Completa de Resultados**
Puedes ver cada línea procesada:
```
Línea 1: "192.168.1.1" ✅ VÁLIDA
Línea 2: "192.168.1.256" ❌ INVÁLIDA - Error en posición 11
Línea 3: "10.0.0.1" ✅ VÁLIDA
```

## 🛠️ Solución de problemas comunes

### ❓ **"No puedo cargar mi archivo"**
- ✅ Asegúrate de que sea un archivo `.txt`
- ✅ Verifica que cada dato esté en una línea separada
- ✅ No uses espacios extra al inicio o final de las líneas

### ❓ **"Mi IPv4 válida aparece como inválida"**
- ✅ Revisa que no haya números mayores a 255
- ✅ Verifica que no haya ceros a la izquierda como "01", "02", etc.
- ✅ Confirma que tengas exactamente 4 números separados por puntos

### ❓ **"Mi placa válida aparece como inválida"**
- ✅ Todas las letras deben ser MAYÚSCULAS
- ✅ Debe tener exactamente 3 letras, guion, 4 números, guion, 1 letra
- ✅ No uses espacios entre los caracteres

### ❓ **"La aplicación no se abre"**
- ✅ Verifica que tengas todos los archivos en la misma carpeta
- ✅ Prueba con un navegador diferente
- ✅ Haz clic derecho en `index.html` → "Abrir con" → tu navegador

## 🎯 Consejos para mejores resultados

1. **📝 Prepara bien tus datos**: Una línea por elemento, sin espacios extra
2. **🧪 Usa los ejemplos primero**: Prueba con `test_ipv4.txt` y `test_placas.txt`
3. **🔍 Lee los errores**: Te dicen exactamente qué y dónde está el problema
4. **📁 Mantén los archivos juntos**: No muevas los archivos .js o .css
5. **💾 Guarda tus datos**: La aplicación no modifica tus archivos originales

## 🎓 ¿Qué tecnología usa la aplicación?

Esta aplicación implementa **Autómatas Finitos Deterministas (AFD)**, una técnica de ciencias de la computación que permite validar patrones complejos de manera muy eficiente:

### 🧠 **Características técnicas**:
- ✅ **Sin memoria adicional**: No usa pilas ni estructuras complejas
- ✅ **Determinista**: Cada entrada tiene una única respuesta posible
- ✅ **Eficiente**: Procesa cada carácter una sola vez
- ✅ **Preciso**: Detecta errores en la posición exacta

### 🔢 **Estados implementados**:
- **IPv4**: 17 estados deterministas diferentes
- **Placas**: 12 estados deterministas diferentes

## 🏆 ¿Para qué sirve este proyecto?

Este validador es perfecto para:
- 📚 **Estudiantes**: Aprender sobre autómatas finitos
- 🏢 **Empresas**: Validar formatos de datos específicos
- 🧪 **Investigación**: Base para proyectos más complejos
- 💻 **Desarrollo**: Integrar validación rigurosa en aplicaciones

---

## 📞 ¿Necesitas ayuda?

Si tienes problemas o preguntas:
1. 📖 **Revisa este manual** - Cubre los casos más comunes
2. 🧪 **Prueba los ejemplos** - Usa `test_ipv4.txt` y `test_placas.txt`
3. 🔍 **Lee los mensajes de error** - Te dicen exactamente qué está mal
4. 🎓 **Consulta a tu profesor** - Para aspectos técnicos avanzados

---

## 👥 Créditos

**Desarrollado por:**
- **Mariana García** 👩‍💻
- **Alejandro Preciado** 👨‍💻

*Estudiantes de Ingeniería de Sistemas y Computación*  
**Universidad de Caldas** - Manizales, Colombia 🇨🇴

---

**🎓 Proyecto Académico - Autómatas y Lenguajes Formales**  
*Universidad de Caldas - Validador AFD con interfaz web moderna*

¡Disfruta explorando el mundo de los autómatas finitos! 🚀
