Sistema Hospitalario HIS

Sistema de Información Hospitalaria (HIS) desarrollado como Trabajo Practico Integrador para la asignatura Programación Web II. Este sistema gestiona procesos clave de un hospital, incluyendo admisión de pacientes, asignación de camas, evaluación inicial por enfermería, atención médica y alta hospitalaria.

Funcionalidades Principales

Admisión y Recepción:
Registro y Preparación Previa:
Soporte para diferentes vías de ingreso: citas programadas (ej. pacientes quirúrgicos), derivaciones médicas (por médicos de atención primaria o especialistas) y emergencias.
Registro inicial de pacientes nuevos o actualización de datos para pacientes existentes.

Recepción y Registro de Datos:
Captura de información personal, demográfica y de seguros médicos en el área de admisión.
Validación de identificación y documentación relevante (ej. DNI, carnet de seguro).
Para pacientes derivados por guardia, se registra únicamente la información relacionada con la internación, considerando la atención previa como registrada.

Asignación de Habitación:
Asignación automática de camas libres e higienizadas en la unidad adecuada (ej. medicina interna, cirugía, cuidados intensivos).
Gestión de infraestructura hospitalaria organizada en alas y habitaciones (de 1 o 2 camas).
Validación de compatibilidad de sexo en habitaciones compartidas: no se asigna una cama si la otra está ocupada por un paciente de sexo diferente.
Cancelación de admisiones por error o decisión del paciente, liberando la cama asignada.

Tecnologías Utilizadas

Node.js
Express
Pug
MySQL
Sequelize
Bootstrap

Instalación en Entorno Local

Clonar el repositorio:
https://github.com/SantiMGodoy/Proyecto-Integrador.git

Instalar dependencias:
node install

Configurar la base de datos:

Importar el archivo integrador.sql ubicado en public/integrador.sql

Base de Datos
La base de datos está diseñada en MySQL con las siguientes características:

Entidades principales: 
Pacientes: Informacion personal.
Camas: Estado (libre/ocupada/higienizada) y relacion con habitaciones.
Habitaciones: Capacidad (1 o 2 camas) y relacion con alas.
Alas: Divisiones del hospital.
Internaciones: Registro de admisiones y altas.

Servidor
El sistema esta desplegado en un servidor accesible publicamente:

URL: https://proyecto-integrador-production-ebf5.up.railway.app/
Plataforma: Railway

Este proyecto desarrollado como parte del TPI de Programacion Web II.
