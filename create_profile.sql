begin
  insert into public.profile(
    user_id, 
    email, 
    name, 
    stripe_customer_id,
    subscription_status,
    price
  )
  values(
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'stripe_customer_id',
    new.raw_user_meta_data->>'subscription_status',
    new.raw_user_meta_data->>'price'
  );
  return new;
end;