//// Get Folder ID from "Facturas" Folder URL
PropertiesService.getScriptProperties().setProperty('folderId', '1gYNhl_1QetW_9v6B9j3s3awIV7LbTcn8');

//// Client Email for invoice reception
PropertiesService.getScriptProperties().setProperty('clientEmail', 'soporte@somosfili.com');

//// Cloud Run Service for client's dbt run

PropertiesService.getScriptProperties().setProperty('CLOUD_RUN_URL', 'https://dbt-fili-7txkfbm3yq-uc.a.run.app');