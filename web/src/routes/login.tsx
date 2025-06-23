import { Form } from "react-router";

export default function LoginPage() {
	return (
		<>
			<section className="mx-auto max-w-5xl">
				<Form method="POST">
					<legend className="mb-5 font-bold text-3xl">Sign In</legend>

					<fieldset className="space-y-5">
						<label htmlFor="username" className="flex flex-col gap-1">
							<span className="label w-fit">Username</span>
							<input type="text" name="username" id="username" className="input" />
						</label>

						<label htmlFor="password" className="flex flex-col gap-1">
							<span className="label w-fit">Password</span>
							<input type="password" name="password" id="password" className="input" />
						</label>

						<label htmlFor="remember" className="flex items-center gap-1">
							<input type="checkbox" name="remember" id="remember" className="input" />
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
