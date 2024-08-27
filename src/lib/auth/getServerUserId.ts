import { createReadOnlyServerClient } from "../../../supabase/clients/server";
import "server-only";

export async function getServerUserId() {
  const supabase = createReadOnlyServerClient();
  const { data } = await supabase.auth.getUser();
  return data?.user?.id;
}
