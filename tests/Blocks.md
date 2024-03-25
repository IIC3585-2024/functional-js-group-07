# Frases famosas de Star Wars

> “Que la fuerza te acompañe.” – *Obi-Wan Kenobi*

> “Yo soy tu padre.” – *Darth Vader*

> “Ayúdame, Obi-Wan Kenobi. Eres mi única esperanza.” – *Princesa Leia*

> “Hazlo o no lo hagas, pero no lo intentes.” – *Yoda*

> “Este es el camino.” – *El mandaloriano*

> “La guerra no lo hace todo.
> La paz y la libertad también son importantes.” – *Padmé Amidala*

___

# Recordatorio IIC1103

## Instrucciones básicas

Existen dos instrucciones en Python que nos permiten interactuar con información. Estas son las _funciones_ `input` y `print` (más adelante volveremos a hablar sobre _funciones_ 👀). A continuación tienes una explicación de ambas, pero te recomendamos probarlas en tu consola para que veas cómo funcionan.

### Input

*   `input('mensaje')`: Permite recibir información que entregue el usuario para poder trabajar con ella. En Clearn, esta información la podrás encontrar en la sección de "input" de cada *testcase* de una pregunta. También es posible mostrar un "mensaje" antes de pedir información, **pero en Clearn lo omitiremos, usando simplemente** `input()`.
```python
# Esto es válido
input() # Puedes no ingresar un mensaje!

input('Este mensaje es opcional')
```
Notar que `input()` (sin ningún texto dentro de los paréntesis) es completamente válido dado que un mensaje no es necesario. **En Clearn, su uso sin mensaje dentro de los paréntesis es obligatorio**, puesto que la plataforma no interpreta correctamente los mensajes, sin embargo, en aplicaciones de la vida real se suelen utilizar para indicarle al usuario lo que se espera que ingrese :)

### Print

*   `print('mensaje')`: Permite imprimir mensajes en la consola.

```python
print('Hola mundo!')
# Esto mostraría: Hola mundo!
```
