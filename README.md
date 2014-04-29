## Fluid WinJS

Hace poco decidí volver a utilizar WinJS en su totalidad, por probar, y me acabó gustando mucho el resultado, las cosas que antes se me hacían complicadas_ (cosas típicas en las apps de Windows 8)_ ahora el propio control ya las tenía. No me encanta la estructura que se da por hecho para este tipo de apps, pero la he podido ir moldeando hasta tener algo que me convence bastante

Lo he juntado todo en una plantilla gratuita a la que he llamado [Fluid WinJS Template ](http://visualstudiogallery.msdn.microsoft.com/88008001-cb17-4245-9486-2d210546c94e "fluis winjs") que os podéis descargar y que seguramente iré modificando a medida que se me ocurra y que he puesto en [GitHub ](https://github.com/CKGrafico/WinJS-Fluid-Template "github winjs fluid")por si alguien tiene sugerencias y/o ideas

**Estructura de archivos en debug**
```
    |-- scss // Opcional cualquier preprocesador
        |-- default.scss
        |-- file2.scss
        |-- ...
        |-- pages
            |-- home.scss
            |-- page.scss
    |-- css
        |-- styles.css.bundle
        |-- default.css
        |-- file2.css
        |-- ...
        |-- pages
            |-- home.css
            |-- page.css
    |-- images
    |-- js
        |-- code.js.bundle
        |-- default.js
        |-- Data.js
        |-- Lists.js
        |-- navigator.js
        |-- pages
            |-- home.js
            |-- page.js
    |-- pages
        |-- home.html
        |-- page.html
    |-- default.html
```
**Estructura de archivos en production**
```
    |-- css
        |-- styles.min.css
    |-- images
    |-- js
        |-- code.min.js
    |-- pages
        |-- home.html
        |-- page.html
    |-- default_production.html
```
Después de probar y probar me decidí por esta estructura bastante básica y sencilla, que no es exactamente cómo cuando programo para webs, pero que se parece lo justo y necesario a la estructura recomendada para las apps de Windows 8 en HTML5 y me deja seguir trabajando de manera cómoda

## Archivo por archivo

**scss **básicamente es la carpeta con todos los scss (o cualquier preprocesador que uses) esto no lo he incluido en la plantilla para no forzar a usar ningún preprocesador.

**css** es la carpeta con los archivos css de la app, dentro tiene una subcarpeta con los css de cada página.

**css/styles.css.bundle** una de las herramientas de _Web essentials for visual Studio_

**js** la carpeta con todos los archivos js propios que tengo en mi app.

**js/code.js.bundle** lo mismo que hemos visto para css pero con nuestros archivos de JavaScript

**js/default.js **inicializo mi aplicación, junto a Data.js y Lists.js

**js/Data.js** en este archivo recojo toda la info necesaria que necesita mi app para empezar, por ejemplo una llamada ajax para el contenido necesario que mostraré en la home.

**js/Lists.js** la mayoría de apps en Windows 8 se basan en crear listas con la info (en este caso la info de Data.js)

**js/navigator.js **la librería de navegación que nos incluye por defecto la plantilla de navegación.

**js/pages** los js correspondientes a cada página.

## Conclusiones

Gracias a lo que han mejorado WinJS en Windows 8.1 he podido, por fin, hacerme una plantilla con la que me sienta a gusto, sobretodo con el Hub, desde luego no se si es la manera más acertada, pero es la que me está funcionando mejor y espero que a vosotros también.

Puedes ver un ejemplo de app creado con esta plantilla.
[Descarga el template ](http://visualstudiogallery.msdn.microsoft.com/88008001-cb17-4245-9486-2d210546c94e "winjs fluid download")y empieza a usarlo ya mismo.
Échale un vistazo en [GitHub](https://github.com/CKGrafico/WinJS-Fluid-Template "github winjs template").