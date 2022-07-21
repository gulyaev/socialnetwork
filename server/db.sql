create table person (
    id SERIAL PRIMARY KEY,
    nikname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

ALTER TABLE person 
add column followers INTEGER[];

update person 
  set followers  = ARRAY[]::integer[];




create table post (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content VARCHAR(255),
    person_id INTEGER,
    FOREIGN KEY (person_id) REFERENCES person(id)
);