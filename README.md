## fili_apps_script

- **Desciption:** This repository tracks AppsScript used with Sheets for generating invoices.
- **Good Pracices:** You can check our good practice comments [here](https://github.com/martinanus/fili_apps_script/blob/main/doc/good_practices.md)


### Implementation Guide

#### Git basic use
- Git repository can be found in https://github.com/martinanus/fili_apps_script
- Clone git repository using the following command:
```
git clone https://github.com/martinanus/fili_apps_script.git
```
- If you don't have access, please contact: anusmartin1@gmail.com
- **ALWAYS** deploy the latest available code in [main branch ](https://github.com/martinanus/fili_apps_script/tree/main)


#### Env Variables
- Once code has been deployed into App Script for specific client sheet, the following environment variables should be set in the `env_variables.gs` file :
  - **Client name:** set the name to internally refer to client
  - **Client email:** set the client email to send generated invoices
  - **Upload folder id:** set the drive folder ID where the invoices will be uploaded after generated
   - **DBT Run URL:** set the URL of the specific client DBT Run service to update BigQuery.


#### Attach to buttons sheet
- Once code and environment variables have been set, you should attach sheet buttons to run the scipt accordingly.
    - **Client invoice generation**:  in the client invoice upload page, create a button and assign it the command sequence `generate_invoice`
     - **Internal data validation**:  in the internal invoice upload page, create a button and assign it the command sequence `check_internal_data`
      - **Synchronization with BigQuery**:  in the internal invoice upload page, create a button and assign it the command sequence `load_internal_data`. This will first validate the data, and then synchonize with BigQuery.