## Preparación del Entorno

Para garantizar un despliegue estable, se requieren los siguientes elementos:

* **Sistema Operativo:** Servidor VPS con una distribución Linux (preferiblemente Debian o Ubuntu).
* **Software Base:** Docker y Docker Compose instalados.
* **Red:** Un nombre de dominio apuntando a la IP del servidor para la gestión de certificados y acceso externo.
* **Conocimientos Requeridos:** Manejo básico de terminal Linux y administración de contenedores.

### Instalación de los requisitos
Ejecute los siguientes comandos para instalar las dependencias necesarias y clonar el repositorio del proyecto:

```bash
# Instalación de Docker y Docker Compose desde los repositorios oficiales
sudo apt update && sudo apt upgrade
sudo apt install -y docker.io docker-compose

# Configuración de permisos (No es necesario para la cuenta root)
sudo usermod -aG docker $(whoami)

# Clonación del repositorio de despliegue
git clone https://github.com/cashu4community/cashu4cs-deploy.git
cd cashu4cs-deploy
```

## Configuración de la Infraestructura

Para el despliegue de la infraestructura debemos obtener la ip pública del VPS y crear varias claves. 

### Servicio Lightning Network Daemon.

Necesitamos la IP pública del VPS la podemos obtener con el script get_public_ip.sh de la siguiente manera:

```bash
./get_public_ip.sh
72.61.27.142
```

Con este dato podemos actualizar el archivo `lnd.conf` parámetro `externalip`, además podemos definir el parámetro `alias` útil para buscar el nodo en servicios de búsqueda72.61.27.142 como mempool.space.

Debemos crear además una contraseña que usaremos para cifrar la billetera del nodo debe tener al menos 12 caracteres que combine mayúculas, minúscula, números y caracteres especiales como `+ - *`
Ej. +6Mn31qVwLC-

Esta debe ser guardada en el archivo `app-data/lnd/walletunlock`. 

### Servicio Lightning Terminal (LIT)

Solo necesitamos crear una contraseña similar en fortaleza a la de la billetera LND para el parámetro `uipassword` del archivo `lit.conf`

### Servicio LNbits

En LNbits solo tenemos que crear la clave de configuración `AUTH_SECRET_KEY` del archivo `.env` en la raiz del directorio `app-data/lnbits/` la podemos generar con el siguiente comando  `openssl rand -hex 32` 

LNbits también necesita la clave de PostgresSQL la crearemos igual que la de LND y LIT y la cambiamos en el archivo `.env` específicamente en la línea `LNBITS_DATABASE_URL="postgres://lnbits_user:dbpassword_@db:5432/lnbits_db"` sustituyendo dbpassword_ por la clave generada. También debemos actualizar la contraseña de postgres en el archivo `docker-compose.yml` en el servicio db 

```yml
environment:
      POSTGRES_USER: 'lnbits_user'
      POSTGRES_PASSWORD: 'dbpassword_'
      POSTGRES_DB: 'lnbits_db'
```

### Servicio Mint de Cashu

Para el servicio cashu solo necesitamos generar la clave `MINT_PRIVATE_KEY` del archivo `.env` en la raiz del directorio `app-data/cashu/` lo hacemos ejecutando el comando `openssl rand -hex 32` 

### Servicio Orchard

En Orchard solo necesitamos generar la clave `SETUP_KEY` en el archivo `.env` ubicado en la raíz del directorio `app-data/orchard`  lo hacemos de igual manera con el comando `openssl rand -hex 32` 

## Gestión de los Servicios

Los siguientes comando permiten administrar la pila tecnológica:

| Comando | Acción |
| :--- | :--- |
| `docker-compose up -d` | Inicia la infraestructura completa; descarga las imágenes en la primera ejecución. |
| `docker-compose down` | Detiene todos los servicios de forma controlada. |
| `docker-compose up --force-recreate [servicio] -d` | Reconstruye un contenedor específico tras realizar cambios en su configuración. |

### Servicios Desplegados
La infraestructura se compone de los siguientes servicios interconectados:

* **Financieros:** `lnd`, `cashu` (Mint), `lnbits`.
* **Gestión y Red:** `lit` (Lightning Terminal), `npm` (Proxy Manager), `tor`, `orchard`.
* **Persistencia:** `db` (PostgreSQL), `redis`.