---
author: "Jim Lynn"
title: Adding the employees table to Supabase 
date: 2025-11-22
description: Steps required add the employees table to Supabase
image: /static/img/undraw_blog_post.svg  
tags: ['Supabase', 'fastAPI']
---
Use the following instructions add the employees table to supabase and create a trigger to automatically
add the user-id of the user adding the row.
<br>

## The following steps are required to create the employees table.


<br>

### Create A Supabase Role 
Create the employees table
```SQL 
create table public.employees (
  id serial not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  salary numeric not null,
  image_url text null,
  is_active boolean null default true,
  user_id uuid null,
  constraint employees_pkey primary key (id),
  constraint employees_email_key unique (email),
  constraint employees_user_id_fkey foreign KEY (user_id) references auth.users (id)
) TABLESPACE pg_default;
```
<br>

## Create a function to set user_id to the auth.uid().  
The "set_authenticated_user_id" is the function that will add the user_id of the logged in user to the
employee table.

```SQL
    CREATE OR REPLACE FUNCTION "set_authenticated_user_id"()
    RETURNS trigger AS $$
    BEGIN
      NEW.user_id = auth.uid();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
```
<br>


### Create the trigger
Create the trigger that triggers the function above. 
```SQL
   CREATE TRIGGER "set_user_id_on_insert"
    BEFORE INSERT ON public.employees
    FOR EACH ROW
    EXECUTE PROCEDURE "set_authenticated_user_id"();
```
