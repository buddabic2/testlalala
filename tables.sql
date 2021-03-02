create table users (
  user_uuid uuid primary key,
  username text,
  password text
);

create table menu (
  item_uuid uuid primary key,
  course text,
  item text,
  item_type text,
  price decimal,
  stock int
)

INSERT INTO users (user_uuid, username, password) VALUES ('ab9b37e6-7a88-11eb-9439-0242ac130002', 'dawid', 'dawid');

create table orders (
  order_uuid uuid primary key,
  user_uuid uuid,
  order_total decimal
)

create table ordered_items (
  ordered_item_uuid uuid,
  order_uuid uuid,
  item_uuid uuid 
)