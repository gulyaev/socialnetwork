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


ALTER TABLE person 
add column personImage VARCHAR(255);

ALTER TABLE person 
DROP COLUMN personImage;

ALTER TABLE person 
add column avatar VARCHAR(255);






create table post (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content VARCHAR(255),
    person_id INTEGER,
    FOREIGN KEY (person_id) REFERENCES person(id)
);

ALTER TABLE post 
add column likes INTEGER;

ALTER TABLE post 
add column dislikes INTEGER;

ALTER TABLE post 
add column comments INTEGER;

ALTER TABLE post 
DROP COLUMN comments;

ALTER TABLE post 
add column comments INTEGER[];

update post 
set comments  = ARRAY[]::integer[];


ALTER TABLE post 
add column views INTEGER;

ALTER TABLE post 
add column postDate DATE NOT NULL DEFAULT CURRENT_DATE;

ALTER TABLE post 
add column photo VARCHAR(255);

ALTER TABLE post
DROP CONSTRAINT post_person_id_fkey,
ADD CONSTRAINT post_person_id_fkey
  FOREIGN KEY (person_id)
  REFERENCES person(id)
  ON DELETE CASCADE;

ALTER TABLE post 
add column categories VARCHAR[];

update post 
set categories  = ARRAY[]::text[];

/*установка в 0 массива комментов нового поста еще без комментов*/
insert into post(comments) values(array[0]);
/*установка в 0 массива комментов нового поста (инициализация сразу после создания поста)*/
update post set comments = array_cat(comments, array[0]) where id=85;
/*добавление в массив комментов нового элемента*/
update post set comments = array_append(comments, 1) where id=71;


/*установка в 0 комментов нового поста (инициализация сразу после создания поста)*/
update post set comments = 0 where id=71;
/*обновление количества комментов в таблице поста при добавлении нового коммента*/
update post set comments = comments + 1 where id=71;
/*обновление количества комментов в таблице поста при удалении коммента*/
update post set comments = comments - 1 where id=71;

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

ALTER TABLE files 
add column parent INTEGER;

ALTER TABLE files 
add column childs INTEGER[];

update files 
set childs  = ARRAY[]::integer[];

ALTER TABLE files
DROP CONSTRAINT files_person_id_fkey,
ADD CONSTRAINT files_person_id_fkey
  FOREIGN KEY (person_id)
  REFERENCES person(id)
  ON DELETE CASCADE;






create table comment (
    id SERIAL PRIMARY KEY,
    content VARCHAR(255),
    response_to INTEGER,
    FOREIGN KEY (response_to) REFERENCES comment(id),
    post_id INTEGER,
    FOREIGN KEY (post_id) REFERENCES post(id),
    writer INTEGER,
    FOREIGN KEY (writer) REFERENCES person(id)
);

ALTER TABLE comment 
DROP COLUMN response_to;

ALTER TABLE comment
DROP CONSTRAINT comment_writer_fkey,
ADD CONSTRAINT comment_writer_fkey
  FOREIGN KEY (writer)
  REFERENCES person(id)
  ON DELETE CASCADE;

ALTER TABLE comment
DROP CONSTRAINT comment_response_to_fkey,
ADD CONSTRAINT comment_response_to_fkey
  FOREIGN KEY (response_to)
  REFERENCES comment(id)
  ON DELETE CASCADE;

ALTER TABLE comment
DROP CONSTRAINT comment_post_id_fkey,
ADD CONSTRAINT comment_post_id_fkey
  FOREIGN KEY (post_id)
  REFERENCES post(id)
  ON DELETE CASCADE;




create table category (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255)
);

/*удаление дубликатов*/
DELETE FROM category a
WHERE a.ctid <> (SELECT min(b.ctid)
                 FROM   category b
                 WHERE  a.title = b.title);

/*добавление значений в массив*/
insert into category(title) values(array['ресторан'])

/*добавление категорий к посту*/
update post set categories = array_cat(categories, array['ресторан']) where id=67;
update post set categories = array_cat(categories, array['ресторан', 'кафе']) where id=68;
