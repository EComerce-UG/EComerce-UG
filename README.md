# EComerce Proyecto Final
>[!WARNING]
>Proyecto en progreso

## Frontend

Primero tienes que asegurarte que tengas instalados los paquetes de npm. Para esto es primero usar el siguiente comando en la carpeta de frontend:

```bash
npm install .
```

Ya instalados todos los paquetes de node, ahí mismo en la carpeta de frotend ejecutar el siguiente comando para poder inicializarlo en localhost:

```bash
npm run start:dev
```

Esto empezara la ejecución del proyecto en el puerto `4200` y puedes empezar con la edición del proyecto en el editor de tu preferencia.

### Paquetes

## Angular

[Angular](https://angular.dev/) es la base del proyecto para el frontend, es un framework basado en componentes y con tipado estático.

#### Taiga UI

[Taiga](https://taiga-ui.dev/) es un toolkit para Angular UI creado de varias librerias base. La libreria tiene alrededor de 130 componentes y varias herramientas para su uso.

### Tailwindcss

[Tailwindcss](https://tailwindcss.com/) nos permite crear estilos personalizados y responsivos de manera rápida y eficiente.

## Backend

>[!WARNING]
>Documentacion en progreso

## Inicar el backend

Para inicar el backend, usar el siguiente comando:

```bash
npm run start
```

Como se puede apreciar es igual al comando del `frontend`, esto para no confundirnos. El comando abrira el puerto 8080 para el backend y el frontend ya cuenta con variables de entorno que leen dependiendo si estamos en `production` o `development`. Si se corre localemente, estas variables estaran para `development`, si hacemos deploy al servidor, seran `production`.

## Credo

Al empezar cualquier cambio, creas tu rama y debes de seguir el siguiente credo:

### Ramas

Ejemplo al crear una rama:

>"oscar/ecom-#"

- "#" Significa el numero de ticket creado.

### Commits

Ejemplo para crear un commit:

>"[ECOM-#]: Crear base del proyecto"

- "#" Significa el numero de ticket creado.
