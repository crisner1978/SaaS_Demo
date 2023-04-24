-- Add Table First
create table public.profile (
  id primary key default int8,
  user_id uuid references auth.users not null,
  email text not null,
  name text not null,
  stripe_customer_id text,
  subscription_status text,
  price numeric(10,2)
);

-- Now add Function with below SQL
begin
  insert into public.profile (
    user_id,
    email,
    name,
    stripe_customer_id,
    subscription_status,
    price
  )
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'stripe_customer_id',
    new.raw_user_meta_data->>'subscription_status',
    new.raw_user_meta_data->>'price'
  );
  return new;
end;