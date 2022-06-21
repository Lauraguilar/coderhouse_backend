drop database prueba;
create database prueba;
create table prueba.items (nombre varchar(30) not null, categoria varchar(30) not null, stock int unsigned, id int not null auto_increment primary key);
insert into prueba.items set nombre="Fideos", categoria="Harina", stock=20;
insert into prueba.items set nombre="Leche", categoria="Lacteos", stock=30;
insert into prueba.items set nombre="Crema", categoria="Lacteos", stock=15;
select * from prueba.items;
delete from prueba.items where id=1;
update prueba.items set stock=45 where id=2;
SELECT 
    *
FROM
    prueba.items;