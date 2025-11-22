---
author: "Jim Lynn"
title: Setup RLS on a Table
date: 2025-11-22
description: Steps to add RLS to the employee table.
image: /static/img/undraw_ideas-flow_lwpa.svg  
tags: ['Supabase']
---
Use the following instructions required to setup RLS on the employees table.  It
allows a user to select, add, update and delete rows added by them or for an "admin" user.
<br>

## The following steps are required to add RLS to employees table


Add RLS to employees table
```sql
ALTER TABLE public.employee ENABLE ROW LEVEL SECURITY;

```
Add RLS to select on employee table
```sql
CREATE POLICY "Authenticated users can view their own data"
        ON public.employees
        FOR SELECT
        TO authenticated
        USING (
                (auth.uid() = user_id)
                OR
                current_setting('request.jwt.claims', true)::jsonb ->> 'user_role' = 'admin'
        )jwt.claims', true)::jsonb ->> 'user_role' = 'admin'
```

Add RLS update to employee table
```sql
CREATE POLICY "Users can modify their own row or admins can modify any row"
ON public.employee
FOR UPDATE
USING (
  -- Condition for selecting rows
  auth.uid() = user_id
  OR
  current_setting('request.jwt.claims', true)::jsonb ->> 'user_role' = 'admin'
)
WITH CHECK (
  -- Condition for inserting/updating new data
  auth.uid() = user_id
  OR
  current_setting('request.jwt.claims', true)::jsonb ->> 'user_role' = 'admin'
);

```
Add RLS for adding a row to the employee table
```sql
CREATE POLICY "Users can insert their own row or admins can insert any row"
ON public.employees
FOR INSERT
WITH CHECK (
  auth.uid() = user_id
  OR
  current_setting('request.jwt.claims', true)::jsonb ->> 'user_role' = 'admin'
);
 
```

Add RLS for deleting a row from the employee table
```sql
CREATE POLICY "Users can delete their own row or admins can delete any row"
ON your_table
FOR DELETE
USING (
  auth.uid() = user_id
  OR
  current_setting('request.jwt.claims', true)::jsonb ->> 'user_role' = 'admin'
);
```
 