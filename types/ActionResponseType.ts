export type ActionResponse =
  | { success: true }
  | { success: false; error: string };
