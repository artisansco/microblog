import { Form } from "react-router";

export default function LoginPage() {
  return (
    <>
      <section className="mx-auto max-w-5xl">
        <Form action="/login" method="post">
          <legend className="mb-5 font-bold text-3xl">Sign In</legend>

          <fieldset className="space-y-5">
            <label className="flex flex-col gap-1">
              <span className="label w-fit">Username</span>
              <input type="text" name="username" className="input" />
            </label>

            <label className="flex flex-col gap-1">
              <span className="label w-fit">Password</span>
              <input type="password" name="password" className="input" />
            </label>

            <label className="flex items-center gap-1">
              <input type="checkbox" name="remember" className="input" />
              <span className="label w-fit">Remember Me</span>
            </label>

            <button type="submit" className="btn">
              Login
            </button>
          </fieldset>
        </Form>
      </section>
    </>
  );
}
