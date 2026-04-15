import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function getSupabaseAdmin() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Supabase admin configuration is incomplete. Add VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function getWorkspaceContextFromRequestAuthHeader(authorizationHeader?: string) {
  const token = authorizationHeader?.replace(/^Bearer\s+/i, "").trim();
  if (!token) {
    return null;
  }

  const supabase = getSupabaseAdmin();
  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userData.user) {
    throw new Error("Supabase user verification failed for Meta persistence.");
  }

  // Lookup the workspace membership in Neon via Prisma instead of Supabase client
  const { prisma } = await import("./prisma");
  const user = await prisma.user.findUnique({
    where: { id: userData.user.id },
    select: { workspaceId: true },
  });

  if (!user?.workspaceId) {
    throw new Error("No workspace membership found for this user in the application database.");
  }

  return {
    userId: userData.user.id,
    workspaceId: user.workspaceId,
  };
}
