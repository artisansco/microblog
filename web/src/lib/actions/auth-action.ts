import type { ActionFunctionArgs } from "react-router";

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const form = Object.fromEntries(await request.formData());
  // TODO: do a simple zod validation

  console.log({ form });
  // TODO: [env variable] export into a config file for easy reuse.
  const res = await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/api/v1/auth/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    },
  );
  const { error, data } = await res.json();
  if (!res.ok) {
    // TODO: show a toast notification for error
    console.log(error);
    return null;
  }

  return data;
};
