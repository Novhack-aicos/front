<script>
    import { auth, googleProvider } from './firebase';
    import { authState } from 'rxfire/auth';
    import {fade} from 'svelte-transitions';
    import Zayavka from './Zayavka.svelte';
    import Map from './Map.svelte';

    let user;
    let state='home';

    const unsubscribe = authState(auth).subscribe(u => user = u);

    function login() {
        auth.signInWithPopup(googleProvider);

    }
    function logout() {
        auth.signOut();
        state='home';
    }
</script>


<nav>
    <div class="nav-wrapper">
        <img class="c-pointer" style="height: 100%;" src="logo.png" alt="user avatar" on:click={ () => state = 'home' }>
        <ul class="right hide-on-med-and-down">
        {#if user}
            <li class="{state.indexOf('zayavka') >=0  ? 'active' : '' }" ><a on:click={ () => state = 'zayavka' } href="#1">Заявки</a></li>
            <li><img class="btn-floating waves-effect waves-light red " style="margin: 0 10px" src={ user.photoURL } width="100" alt="user avatar"></li>
            <li><button class="btn" on:click={ logout }>Выйти</button></li>
        {:else}
	        <li><button class="btn" on:click={ login }>Войти</button></li>
        {/if}
        </ul>
    </div>
</nav>

{#if state.indexOf('zayavka')>=0 }
    <div transition:fade>
        <Zayavka uid={user.uid} {user} bind:state></Zayavka>
     </div>
{:else}

    <Map></Map>
{/if}



<style>
    .nav-wrapper{
        padding: 0 10px;
    }
</style>