<button>
  <slot/>
</button>

<style>
button {
  font-weight: bold;
  text-align: left;
  background-color: transparent;
  box-shadow: none;
  color: white;
  border-radius: 0;
  width: 100%;
  text-align: center;
  transition: 300ms;
}

button:hover {
  cursor: pointer;
  background-color: rgba(105, 105, 105, 0.788);
}
</style>