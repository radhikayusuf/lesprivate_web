
CREATE DATABASE db_lesprivate;

USE db_lesprivate;

CREATE TABLE users(
    id_user INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL, 
    username VARCHAR(20) NOT NULL UNIQUE, 
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    fullname VARCHAR(50),
    phone_number VARCHAR(15) UNIQUE,
    level VARCHAR(20),
    is_admin INT(1) NOT NULL DEFAULT 0
);

CREATE TABLE detail_schedule(
    id_detail_schedule INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    schedule_time TIMESTAMP NOT NULL,
    location VARCHAR(50) NOT NULL,
    lat DOUBLE NOT NULL,
    lang DOUBLE NOT NULL
);

CREATE TABLE curriculum(
    id_curriculum INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    curriculum VARCHAR(30) NOT NULL,
    cost INT(10) NOT NULL,
    description TEXT
);

CREATE TABLE schedules(
    id_schedule INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_teacher INT(11),
    id_user INT(11),
    id_detail_schedule INT(11),
    id_curriculum INT(11),
    is_approved INT(1) DEFAULT 0 NOT NULL
);

-- SEED USERS
INSERT INTO users(username, email, password, is_admin) VALUES('radhikayusuf', 'radhika.yusuf1@gmail.com', md5('qwe123qwe123'), 1);

-- SEED CURRICULUM
INSERT INTO curriculum(curriculum, cost, description) VALUES('TOEFL', 500000, '5 kali pertemuan waktu bebas');
INSERT INTO curriculum(curriculum, cost, description) VALUES('TOIEC', 500000, '5 kali pertemuan waktu bebas');
INSERT INTO curriculum(curriculum, cost, description) VALUES('UN SD', 200000, '5 kali pertemuan waktu bebas');
INSERT INTO curriculum(curriculum, cost, description) VALUES('UN SMP', 200000, '5 kali pertemuan waktu bebas');
INSERT INTO curriculum(curriculum, cost, description) VALUES('UN SMA/SMK', 300000, '5 kali pertemuan waktu bebas');