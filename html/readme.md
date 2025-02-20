# HTML
HTML, es un lenguaje de marcado de hipertexto, no es
un lenguaje de programación, fue creado para poder 
estructurar y desplegar una pagina web.

Originalmente fue creado para compartir documentos
relacionándolos entre si, con el paso de el tiempo y 
la afiliación de distintas tecnologías, su uso fue
pasando a ser mas estructural, pero aun no pierde su 
propósito.

## Anatomía de HTML
HTML se basa en elementos y esta es su anatomía:
```html
<p>Los perros son traviesos</p>
```
Es bastante sencillo, pero te lo explico. `<p>` es
la apertura de una etiqueta, `Los perros son traviesos`
el contenido de el elemento y `</p>` el cierre de 
la etiqueta.


**Repasemos conceptos:**
- **HTML:** lenguaje de marcado de hipertexto
- **Etiqueta:** Elemento de HTML
- **Elemento:** El uso de la Etiqueta en html

Es un poco confuso, pero te voy a enseñar un concepto
fundamental

## DOM
DOM (Document Object Model), es un concepto sobre el cual
se organiza HTML como si fuera un árbol.

El DOM facilita la organización, estructura y facilita el
manejo del documento desde JavaScript.

## Estructura de una pagina web
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Mi Página</title>
  </head>
  <body>
    <h1>Bienvenidos a mi página</h1>
    <p>Este es un párrafo de ejemplo.</p>
  </body>
</html>
```
Esta es la estructura base de cualquier pagina web,
a que tener en cuenta que si existe un error de sintaxis,
el navegador que lo interprete va a intentar arreglarlo o
llevarlo a un estado ideal
> [!NOTE]  
> Muchas veces esto hace que nuestra pagina no se vea bien.

`<!DOCTYPE html>` es la version de html que estamos usando,
la ultima version es la 5, leva años en esa version.

> [!NOTE]  
> Vas a notar que entre mas se use el software, mas va a
> tardar en tener nuevos cambios.

Anteriores versiones:
```html
4.01
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
4
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0//EN" "http://www.w3.org/TR/REC-html40.dtd">
3
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.0//EN" "http://www.w3.org/TR/REC-html30.dtd">
```

`<html></html>` es el elemento raíz de un documento HTML.

`<head></head>` es la cabeza de el documento HTML, guarda
la información acerca de la interpretación de la pagina.
El contenido del elemento no se ve.

Puede contener:
- titulo de la pagina
- pre-carga de elementos multimedia
- pre-conexión a dominos o enlaces de recursos
- iconos de la pagina
- configuración de la pagina para distintos navegadores

`<body></body>` es el contenido visible de el documento HTML,
aquí es donde vamos a programar y plasmar nuestras ideas.
