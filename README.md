# WinnerApp
==================
> Proyecto realizado para el NCD de NEAR Hispano.
## WinnerApp es un servicio que, a través de la blockchain de NEAR, facilita a las organizaciones en sus procesos de votacion de una manera simple y agil.

Está solucion dirigido a organizaciones con campañas de marketing abiertas al público, comunidades abiertas en redes, investigaciones de campo abiertas y anónimas, permite recoger la mayor cantidad posible de votos, los contabiliza y emite el resultado de la votacion.

## WinnerApp permite:

A los Patrocinadores:

    1. Crear Votaciones.
    2. Crear Organizaciones.
    3. Aprovar el acceso a miembros de la organizacion.
    4. Aprovar el acceso a miembros de la votacion.
    5. Iniciar la votacion.
    6. Cerrar la votacion.
    7. Generar reporte de resultados.
    8. Auditar la votacion en el explorador de transacciones.

A los Usuarios:

    1. Buscar votaciones activas. 
    2. Inscribirse en una votacion.
    3. Participar en una votacion.
    4. Inscribirse en una Organizacion
    5. Acceder a los resultados de la votacion.
    6. Auditar la votacion en el explorador de transacciones.

## Diagrama de la Solucion:

<p float="left">
  <img src="/Documents/Diagramas/UseCase/Patrocinador.png" width="450" />
  <img src="/Documents/Diagramas/UseCase/Usuario.png" width="450" />
</p>

## Wireframes

<p float="left">
  <img src="/Documents/Wireframes/Inicio.png" width="250" />
  <img src="/Documents/Wireframes/Busqueda_Votacion.png" width="250" />
  <img src="/Documents/Wireframes/Dashboard.png" width="250" />
</p>

<p float="left">
  <img src="/Documents/Wireframes/Crear_Votacion.png" width="250" />
  <img src="/Documents/Wireframes/Participar_en_Votacion.png" width="250" />
  <img src="/Documents/Wireframes/Reportes.png" width="250" />
</p>


## Pre-requisitos

1. node.js >=12 instalado (https://nodejs.org)  
2. near-cli instalado
    ```bash
    npm install -g near-cli
    ```
3. Crear una cuenta de NEAR en [testnet](https://docs.near.org/docs/develop/basics/create-account#creating-a-testnet-account)   
   
4. Autorizar app para dar acceso a la cuenta de NEAR
    ```bash
    near login
    ```

## Despliege y Ejecucion del contrato

### Instalar y compilar el contrato
```bash
    npm install
    npm run build:contract
```

### Ejecutar tests del contrato
```bash
    npm run test
```
## Deployar el contrato en una cuenta developer

Borrar la carpeta **WinnerApp/neardev**

Compilar y desplegar el contrato con el siguiente comando:
```bash
    npm run nearDevDeploy
```
El comando dara como resultado el despliegue del contrato u rewtornara el accountID que hizo el despliegue.

## Deployar el contrato en una cuenta propia
### Create una Sub-Cuenta (reemplazar `YOUR_ACCOUNT_ID` con tu actual nombre de cuenta en minusculas):
```bash
    near create-account winnerapp-as-contract.YOUR_ACCOUNT_ID.testnet --masterAccount YOUR_ACCOUNT_ID.testnet
```

### Deployar el contrato
```bash
    near deploy $CONTRACT_ACCOUNT_ID --wasmFile <ruta/archivo>
```
Donde CONTRACT_ACCOUNT_ID es igual al valor de  winnerapp-as-contract.YOUR_ACCOUNT_ID.testnet del paso anterior.

## Crear Variables de entorno

Para ejecutar las funciones del contrato crearemos 2 variables de entorno

```bash
export CONTRACT_ACCOUNT_ID=<contract-deployed-account-id>
export USER_ACCOUNT_ID=<your-testnet-account>
```

Para validar las variables de entorno ejecutar el siguiente comando:
```bash
echo $CONTRACT_ACCOUNT_ID
echo $USER_ACCOUNT_ID
```

### Correr comandos
Una vez deployado el contrato, usaremos el Account Id devuelto para ejecucion de los comandos. Luego del despliegue del contratos NEAR retornara el Id del contrato (será utilizado como CONTRACT_ACCOUNT_ID en los ejemplos de comandos).

Utilizaremos USER_ACCOUNT_ID para identificar el account Id de la cuenta de quien utiliza las funciones del contrato.

## Organizaciones
### Add Organization
```bash
    near call  $CONTRACT_ACCOUNT_ID addOrganization '{"accountId": "my-account.testnet","name": "Demo Org","description": "NCD Demo Org"}' --accountId $USER_ACCOUNT_ID
```
### Delete Organization
```bash
    near call  $CONTRACT_ACCOUNT_ID deleteOrganization '{"organizationId": "86451810"}'  --accountId $USER_ACCOUNT_ID
```

### Get Organization List
```bash
    near call  $CONTRACT_ACCOUNT_ID getOrganizationList  --accountId $USER_ACCOUNT_ID
```

## Usuarios
### Add User
```bash
    near call  $CONTRACT_ACCOUNT_ID addUser '{"accountId": "my-account.testnet", "name": "Nombre", "email": "email@email.com"}'  --accountId $USER_ACCOUNT_ID
```
### Delete User
```bash
    near call  $CONTRACT_ACCOUNT_ID deleteUser '{"accountId": "my-account.testnet"}'  --accountId $USER_ACCOUNT_ID
```
### User List
```bash
    near call  $CONTRACT_ACCOUNT_ID getUserList  --accountId $USER_ACCOUNT_ID
```

## Proposals (Votos)
### Add Proposal
```bash
    near call  $CONTRACT_ACCOUNT_ID addProposal  '{"proposerId": "my-account.testnet", "title": "Desea llevar el NCD nuevamente?","description": "April fools question","options": [{"title":"Si", "description": "Esta es la opcion para NCD lovers"}, {"title":"No", "description": "Esta es la opcion si estas listo para el Next level"}, {"title":"No se", "description": "Esta es la opcion si no deseas opinar"}] }' --accountId $USER_ACCOUNT_ID
```
### Delete Proposal
```bash
    near call  $CONTRACT_ACCOUNT_ID deleteProposal '{"proposalId": "86484281"}'  --accountId $USER_ACCOUNT_ID
```
### Get Proposal List
```bash
    near call  $CONTRACT_ACCOUNT_ID getProposalList --accountId $USER_ACCOUNT_ID
```
### Get Proposal
```bash
    near call  $CONTRACT_ACCOUNT_ID getProposal '{"proposalId": "86488146"}' --accountId $USER_ACCOUNT_ID
```
### Proposal Option
```bash
    near call  $CONTRACT_ACCOUNT_ID getProposalOptions '{"proposalId": "86488146"}' --accountId $USER_ACCOUNT_ID
```

### Estructura de la Solucion 
```
  .
  |-- package.json      -- 
  |-- README.md         -- 
  |-- asconfig.json     -- 
  |-- as-pect.config.js --
  `-- assembly           
      |-- as_types.d.ts -- 
      |-- common.ts      -- 
      |-- enums.ts      -- 
      |-- index.ts      -- 
      |-- models.ts      -- 
      |-- tsconfig.json -- 
      `-- __tests__     
          |-- as-pect.d.ts  -- 
          `-- index.spec.ts -- 

  2 directories, 9 files
```
## Colaboradores
- [Alessandra Caraballo - @Aless30](https://github.com/Aless30)
- [Julio M Cruz - @JulioMCruz](https://github.com/JulioMCruz)