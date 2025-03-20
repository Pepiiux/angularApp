# ✅ Checklist de Funcionalidades - Google Books Explorer

## 🟢 STEP 1: Implementación del Formulario de Búsqueda con Filtros

- [ ] Formulario de búsqueda funcional con título, autor y palabra clave.
- [ ] Implementación de filtros avanzados (Idioma, Tipo de Impresión, Orden).
- [ ] Consumo correcto de la API de Google Books con RxJS y HttpClient.
- [ ] Renderizado correcto de los libros con título, autor, imagen y calificación.
- [ ] Botón funcional para ver más detalles de un libro.

## 🟢 STEP 2: Implementación de la Página de Detalles del Libro con Conversión de Moneda

- [ ] Navegación correcta a la página de detalles usando Angular Router.
- [ ] Visualización completa de los detalles del libro (título, autor, descripción, etc.).
- [ ] Implementación de conversión de moneda USD → MXN con actualización dinámica.
- [ ] Indicación de disponibilidad y precio del libro en MXN si está a la venta.

## 🟢 STEP 3: Implementación del Módulo de Conversión de Moneda

- [ ] Creación de un módulo independiente para la conversión de moneda.
- [ ] Uso de LocalStorage para almacenar la tasa de conversión de USD a MXN.
- [ ] Permite que el usuario actualice la tasa de conversión manualmente.
- [ ] Actualización dinámica de los precios al modificar la tasa de conversión.
- [ ] Visualización de la tasa de conversión en la interfaz de usuario.

## 🟢 STEP 4: Implementación de la Lista de Lectura

- [ ] Permite agregar libros a la lista de lectura desde la búsqueda o detalles.
- [ ] Implementación de un servicio con BehaviorSubject para gestionar la lista.
- [ ] Persistencia de la lista de lectura en LocalStorage.
- [ ] Creación de una nueva ruta `/reading-list` para visualizar la lista guardada.
- [ ] Posibilidad de eliminar libros de la lista de lectura con notificación visual.

## 🟢 STEP 5: Implementación de Lazy Loading y Route Guards

- [ ] Implementación de lazy loading para la lista de lectura.
- [ ] Protección de la ruta `/reading-list` con un Route Guard.
- [ ] Redirección automática a la búsqueda si el usuario intenta acceder sin libros guardados.
- [ ] Visualización de un mensaje de notificación en caso de redirección.
