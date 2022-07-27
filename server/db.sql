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

create TABLE files (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    type VARCHAR(255),
    access_link VARCHAR(255),
    size NUMERIC,
    path VARCHAR(255),
    person_id INTEGER,
    FOREIGN KEY (person_id) REFERENCES person(id)
);

create table comment (
    id SERIAL PRIMARY KEY,
    content VARCHAR(255),
    response_to INTEGER,
    FOREIGN KEY (response_to) REFERENCES person(id),
    post_id INTEGER,
    FOREIGN KEY (post_id) REFERENCES post(id),
    writer INTEGER,
    FOREIGN KEY (writer) REFERENCES person(id)
);