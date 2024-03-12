<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebase'
	import { onAuthStateChanged, type User } from 'firebase/auth';
	import { authStore, loginWithGoogle, logout } from '$stores/authGoogleStore';

    let user: User | null;
    const nonAuthRoutes = ["/"];

	onMount(async () => {
		onAuthStateChanged(auth, async(newUser) => {
			user = newUser;
			authStore.set({
				isLoggedIn: user != null,
				user: newUser,
				firebaseControlled: true,
			})

            const currentPath = window.location.pathname;

            if (!user && !nonAuthRoutes.includes(currentPath)) {
                window.location.href = "/";
                return;
            }
		});
	});
</script>

{#if user}
    <p>Vous êtes connecté en tant que {user.displayName} - {user.email}</p>
    <button on:click={logout}>Logout</button>		
    <hr>
    <main>
        <slot />
    </main>
{:else}
    <p>Vous n'êtes pas connecté.</p>
    <button on:click={loginWithGoogle}>Login with Google</button>
{/if}