<script lang="ts">
  import { navigate } from "svelte-routing";
  import { authHandlers, authStore } from "../../composables/authStore";
  import SubTextButton from "./SubTextButton.svelte";

  let register = false;
  let email: string = "";
  let password: string = "";
  let confirmation: string = "";

  let error: string = "";

  authStore.subscribe(x => {
    if (x.currentUser) {
      navigate("/home", { replace: true });
    }
  })

  async function handleSubmit() {
    if (!email || !password || (register && !confirmation)) {
      error = "Please fill in the input fields."
      return;
    }

    if (register) {
      if (password === confirmation) 
      {
        try {
          await authHandlers.signup(email, password);
        } 
        catch (err) {
          console.log(err);
        }
      }
      else 
      {
        error = "Password does not match";
        confirmation = "";
      }
    }
    else {
      try {
        await authHandlers.login(email, password);
      }
      catch (err) {
        console.log(err);
        error = "Invalid email or password. Try again.";
      }
    }
  }
</script>

<div class="auth">
  <div class="auth-cover">
    <h1>{register ? "Sign Up" : "Sign In"}</h1>

    <form>
      <label>
        <input bind:value={email} type="text" placeholder="Email"/>
      </label>
      <label>
        <input bind:value={password} type="password" placeholder="Password"/>
      </label>
      {#if register}
      <label>
        <input bind:value={confirmation} type="password" placeholder="Confirm Password"/>
      </label>
      {/if}
      <button on:click|preventDefault={handleSubmit}>{register ? "Sign Up" : "Continue"}</button>
    </form>

    <span class="error">{error}</span>
    {#if register}
    <SubTextButton text="Sign in" on:click={() => {
      register = false;
      error = "";
    }}>
      Already have an account?
    </SubTextButton>
    {:else}
    <SubTextButton text="Sign up" on:click={() => {
      register = true;
      error = "";
    }}>
      Don't have an account yet?
    </SubTextButton>
    {/if}
  </div>
</div>


<style>
.error {
  color: rgb(255, 94, 94);
}

.auth {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.auth-cover {
  display: flex;
  flex-direction: column;
  width: 450px;
  background-color: rgb(19, 18, 18);
  text-align: center;
  border-radius: 8px;
  box-shadow: 2px 4px 3px rgb(19, 18, 18);
  padding-top: 20px;
  padding-bottom: 20px;
}

.auth form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth form button {
  border-radius: 2px;
  margin-top: 25px;
  width: 200px;
  font-weight: 700;
  transition: 300ms;
  background-color: rgb(231, 231, 231);
  cursor: pointer;
}

.auth form button:hover {
  background-color: rgb(255, 255, 255);
}

.auth form label input {
  margin-bottom: 3px;
  border-radius: 2px;
  background-color: transparent;
  color: white;
  border: none;
  border-bottom: 2px solid white;
  outline: none;
  box-shadow: none;
}

</style>