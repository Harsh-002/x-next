-- Custom SQL migration file, put you code below! --
ALTER TABLE profiles
ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE;

CREATE OR REPLACE FUNCTION public.validate_username_before_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN

  -- CHECK IF IT'S AN INSERT OPERATION
  IF TG_OP = 'INSERT' THEN
    -- ENSURE USERNAME IS PRESENT
    IF NEW.raw_user_meta_data ->> 'username' IS NULL OR NEW.raw_user_meta_data ->> 'username' = '' THEN
      RAISE EXCEPTION 'Username must be provided when creating a new user!';
    END IF;
  END IF;

  -- CHECK FOR USERNAME UNIQUENESS (FOR BOTH INSERT AND UPDATE)
  IF EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE username = NEW.raw_user_meta_data ->> 'username'
      AND id != NEW.id -- EXCLUDE CURRENT USER WHEN UPDATING
  )THEN 
   RAISE EXCEPTION 'User with username % already exists!', NEW.raw_user_meta_data ->> 'username';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER check_username_before_update_auth_users
  BEFORE UPDATE ON auth.users
  FOR EACH ROW
  WHEN(OLD.raw_user_meta_data ->> 'username' IS DISTINCT FROM NEW.raw_user_meta_data ->> 'username')
  EXECUTE FUNCTION public.validate_username_before_change();

CREATE TRIGGER check_username_before_insert_auth_users
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_username_before_change();


CREATE OR REPLACE FUNCTION public.update_profile_username()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  UPDATE public.profiles
  SET username = NEW.raw_user_meta_data ->> 'username'
  WHERE id = NEW.id;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN(OLD.raw_user_meta_data ->> 'username' IS DISTINCT FROM NEW.raw_user_meta_data ->> 'username')
  EXECUTE FUNCTION public.update_profile_username();


CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id,username)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'username');

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
