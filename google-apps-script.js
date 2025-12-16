/**
 * GOOGLE APPS SCRIPT - Baby Shower RSVP
 * 
 * INSTRUCCIONES DE CONFIGURACIÓN:
 * 
 * 1. Crea una nueva hoja de cálculo en Google Sheets
 *    - Ve a https://sheets.google.com
 *    - Crea una nueva hoja
 *    - En la primera fila, agrega estos encabezados:
 *      A1: Fecha | B1: Nombre | C1: DNI | D1: Teléfono
 * 
 * 2. Ve a Extensiones > Apps Script
 * 
 * 3. Borra el código existente y pega TODO este archivo
 * 
 * 4. Guarda el proyecto (Ctrl+S) con un nombre como "RSVP Baby Shower"
 * 
 * 5. Implementa como aplicación web:
 *    - Haz clic en "Implementar" > "Nueva implementación"
 *    - Selecciona tipo: "Aplicación web"
 *    - Ejecutar como: "Yo (tu email)"
 *    - Quién tiene acceso: "Cualquier persona"
 *    - Haz clic en "Implementar"
 * 
 * 6. Copia la URL de la aplicación web
 * 
 * 7. Pega esa URL en script.js reemplazando 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'
 * 
 * ¡Listo! Las confirmaciones se guardarán automáticamente en tu hoja de cálculo.
 */

// Función principal que maneja las solicitudes POST
function doPost(e) {
    try {
        // Obtener la hoja de cálculo activa
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

        // Parsear los datos recibidos
        const data = JSON.parse(e.postData.contents);

        // Verificar si es un array de guests
        if (data.guests && Array.isArray(data.guests)) {
            // Agregar una fila por cada invitado
            data.guests.forEach(function (guest) {
                sheet.appendRow([
                    guest.fecha || new Date().toLocaleString('es-PE'),
                    guest.nombre,
                    guest.dni,
                    guest.telefono
                ]);
            });
        } else {
            // Formato legacy - un solo registro
            sheet.appendRow([
                data.fecha || new Date().toLocaleString('es-PE'),
                data.nombre,
                data.dni,
                data.telefono
            ]);
        }

        // Retornar respuesta exitosa
        return ContentService
            .createTextOutput(JSON.stringify({
                success: true,
                message: 'RSVP registrado exitosamente'
            }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        // Retornar error
        return ContentService
            .createTextOutput(JSON.stringify({
                success: false,
                error: error.toString()
            }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// Función para manejar solicitudes GET (opcional, para pruebas)
function doGet(e) {
    return ContentService
        .createTextOutput(JSON.stringify({
            status: 'OK',
            message: 'RSVP API está funcionando correctamente ⭐🌙',
            instructions: 'Envía una solicitud POST con los datos del invitado'
        }))
        .setMimeType(ContentService.MimeType.JSON);
}

// Función de prueba para verificar que todo funciona
function testRSVP() {
    const testData = {
        postData: {
            contents: JSON.stringify({
                guests: [
                    {
                        nombre: 'Invitado de Prueba 1',
                        dni: '12345678',
                        telefono: '999999999',
                        fecha: new Date().toLocaleString('es-PE')
                    },
                    {
                        nombre: 'Invitado de Prueba 2',
                        dni: '87654321',
                        telefono: '888888888',
                        fecha: new Date().toLocaleString('es-PE')
                    }
                ]
            })
        }
    };

    const result = doPost(testData);
    Logger.log(result.getContent());
}
