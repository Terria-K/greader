<script lang="ts">
  import { authHandlers, authStore } from "../../composables/stores";

  let register = false;
  let email: string = "";
  let password: string = "";
  let confirmation: string = "";

  authStore.subscribe(x => {
    if (x.currentUser) {
      window.location.href = "/home";
    }
  })

  async function handleSubmit() {
    if (!email || !password || (register && !confirmation)) {
      return;
    }

    if (register && password === confirmation) {
      try {
        await authHandlers.signup(email, password);
      } 
      catch (err) {
        console.log(err);
      }
    }
    else {
      try {
        await authHandlers.login(email, password);
      }
      catch (err) {
        console.log(err);
      }
    }
  }
</script>

<div class="auth">
  <h1>{register ? "Sign Up" : "Sign In"}</h1>
  <form>
    <label>
      <input bind:value={email} type="text" placeholder="Email"/>
    </label>
    <label>
      <input bind:value={password} type="text" placeholder="Password"/>
    </label>
    {#if register}
    <label>
      <input bind:value={confirmation} type="text" placeholder="Confirm Password"/>
    </label>
    {/if}
    <button on:click|preventDefault={handleSubmit}>{register ? "Sign Up" : "Sign In"}</button>
  </form>
  {#if register}
  <div>
    <p>
      Already have an account?
      <button class="text-button" on:click={() => register = false}>Sign in</button>
    </p>
  </div>
  {:else}
  <div>
    <p>
      Don't have an account yet?
      <button class="text-button" on:click={() => register = true}>Sign up</button>
    </p>
  </div>
  {/if}
</div>


<style>
.auth {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.auth form {
  display: flex;
  flex-direction: column;
}

.text-button {
  color: rgb(103, 103, 255);
  background-color: transparent;
  box-shadow: none;
  cursor: pointer;
  padding: 0.1em;
}

.text-button:hover {
  color: rgb(155, 169, 253);
}
</style>