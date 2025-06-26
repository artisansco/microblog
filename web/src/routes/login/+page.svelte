<script>
	import { enhance } from '$app/forms';
</script>

<section class="mx-auto max-w-5xl">
	<form action="" method="post" use:enhance>
		<legend class="mb-5 text-3xl font-bold">Sign In</legend>

		<fieldset class="space-y-5">
			<label class="flex flex-col gap-1">
				<span class="label w-fit">Username</span>
				<input type="text" name="username" class="input" />
			</label>

			<label class="flex flex-col gap-1">
				<span class="label w-fit">Password</span>
				<input type="password" name="password" class="input" />
			</label>

			<label class="flex items-center gap-1">
				<input type="checkbox" name="remember" class="input" />
				<span class="label w-fit">Remember Me</span>
			</label>

			<button type="submit" class="btn"> Login </button>
		</fieldset>
	</form>
</section>
