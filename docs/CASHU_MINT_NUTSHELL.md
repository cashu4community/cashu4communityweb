# 🥜 Mint de Cashu (Nutshell).

**Autores:** forte11  
**Versión:** 1.0

El Mint de cashu es el componente principal de la infraestructura de cashu, es quien custodia los bitcoins de los usuarios, a cambio emite tokens ("cupones digitales") que representan ese valor. Conociendo esto explicaremos el proceso de configuración.

## ⚙️ Configuración del Mint de Cashu 

EL proceso de configuración es muy sencillo, en el paso de configuración de la infraestructura mediante el script `config_env.sh` se generó la clave `MINT_PRIVATE_KEY` necesaria en el proceso de generación de claves del mint. 

### 1. Configuramos el backend lightning (LNbits)

En LNbits podemos crear una cuenta nueva para que guarde los fondos de los usuarios del mint. O usamos la cuenta admin creada en la configuración de LNbits.

Por defecto la billeteras se llaman `LNbits wallet` la renombramos a `Cashu Mint`

![](img/lnbits-wallet-rename.png)
 

### 2. Obtenemos la clave API de la billetera.

![](img/lnbits-wallet-api-key.png)

>💡 Podemos usar la clave `Admin key` o `Invoice read key`

### 3. Modificamos el archivo .env con los datos de LNbits

Editamos el archivo `.env` localizado en la ruta `/cashu4cs-deploy/app-data/cashu/.env` y buscamos las lineas siguientes:

```bash
# Use with LNbitsWallet
MINT_LNBITS_ENDPOINT=https://yourlnbits.com
MINT_LNBITS_KEY=gds87dskdsjhds71dsdsdsds2e
```

Quedando así:

```bash
# Use with LNbitsWallet
MINT_LNBITS_ENDPOINT=https://lnbits.cashu4community.xyz
MINT_LNBITS_KEY=8e54079dc12b46a2b216153222c29a8a
```

>💡 Es importante verificar que el backend lightning del mint sea `LNbitsWallet`, lo hacemos buscando en el archivo .env el siguiente parámetro `MINT_BACKEND_BOLT11_SAT` si tiene otra cosa cambiar al de LNbits

## ⬆️ Actualizando el mint de Cashu.

Como usamos Docker de soporte de la infraestructura el proceso de actualización se hace relativamente fácil. Aqui te explico como hacerlo.

### 1. Respaldamos la base de datos del mint

Realizamos una copia de la base de datos ubicada en `/cashu4cs-deploy/app-data/cashu/data/mint/mint.sqlite3

```bash
cd cashu4cs-deploy/
cp app-data/cashu/data/mint/mint.sqlite3 app-data/cashu/backup
```

### 2. Actualizamos el número de versión en el docker-compose.yml

Editamos el archivo docker-compose.yml ubicado en la raíz del proyecto.

Localizamos el servicio cashu específicamente la siguiente linea:

```yml
  cashu:
    image: cashubtc/nutshell:0.19.2
```

Como se observa es la version de nutshell 0.19.2 y en el momento en que se redacta este tutorial esta en su versión 0.20.0. Actualizamos el archivo con la versión mas reciente.

```yml
  cashu:
    image: cashubtc/nutshell:0.20.2
```

### 3. Hacemos efectivo los cambios

```bash
./recreate.sh cashu
```

Este proceso eliminará el contenedor con la versión vieja descargará la nueva versión y realizará las actualizaciones a la base de datos en caso de ser necesario.

>💡 Es importante no violar el paso 1 porque de ocurrir un error podremos volver a la versión anterior restaurando la base de datos y revirtiendo los cambios del paso 2. También es recomendable revisar la notas de la nueva versión para conocer si se necesitan hacer cambios puntuales antes de actualizar.

## Creando un nuevo Keysets desde la CLI

Usaremos mint-cli para rotar los keyset y definir la comisión. Esto lo haremos para cada una de las unidades que tengamos en el mint ya sea sats, usd.

Para conocer que unidades tenemos activas en el mint, consultamos el endpoint /v1/keysets.

```json
curl https://mint.cashu4community.xyz/v1/keysets
{
  "keysets": [
    {
      "id": "0145ee812683eaf8ce3859f2601c160d0c8f0d4139447848d0d6745350f3c4fb44",
      "unit": "sat",
      "active": true,
      "input_fee_ppk": 100,
      "final_expiry": null
    }
  ]
}
```


Ej: si quisiéramos cambiar el fee de 100 ppk (per-proof-of-knowledge) por sat (Bitcoin) a 50 ppk, ejecutariamos lo siguiente dentro del contenedor de cashu:

```bash
poetry run mint-cli -h cashu next-keyset sat 50
final_expiry = None
New keyset successfully created:
keyset.id = '01e5bac64190f22f2959558b15cbab9f06798958f253a59fbe4687a9d875e3c720'
keyset.unit = 'sat'
keyset.max_order = 64
keyset.input_fee_ppk = 50
0
```

>💡 El argumento -h que acompaña al comando mint-cli es necesario porque en un entornos docker no se puede acceder directamente a 127.0.0.1, es por eso que usamos cashu ya que es el nombre del servicio declarado en el docker compose.

Comprobamos que se creo el nuevo keyset `curl https://mint.cashu4community.xyz/v1/keysets`

```json
curl https://mint.cashu4community.xyz/v1/keysets
{
  "keysets": [
    {
      "id": "0145ee812683eaf8ce3859f2601c160d0c8f0d4139447848d0d6745350f3c4fb44",
      "unit": "sat",
      "active": false,
      "input_fee_ppk": 100,
      "final_expiry": null
    },
    {
      "id": "01e5bac64190f22f2959558b15cbab9f06798958f253a59fbe4687a9d875e3c720",
      "unit": "sat",
      "active": true,
      "input_fee_ppk": 50,
      "final_expiry": null
    }
  ]
}
```

