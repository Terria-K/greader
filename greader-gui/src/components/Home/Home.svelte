<div class="home">
  <div class="documents">
    <div class="documents-holder">
      <p class="documents-title">Previously opened</p>
    </div>

    <div class="documents-list">
      <button>Computer Programming</button>
      <button>Platform Technology</button>
      <button>Computer Programming</button>
      <button>Computer Programming</button>
      <button>Platform Technology</button>
      <button>Platform Technology</button>
    </div>
  </div>
</div>

<style>
.home {
  display: flex;
  padding: 60px 16px;
}

.documents {
  background-color: rgb(66, 66, 66);
  border-radius: 4px;
  box-shadow: 3px 4px 0 rgba(0, 0, 0, 0.2);
  width: 350px;
  height: 350px;
}

.documents-title {
  font-size: 24px;
  font-weight: bold;
}

.documents-holder {
  display: flex;
  justify-content: center;
}

.documents-list {
  overflow-y: scroll;
  scroll-behavior: smooth;
  height: 240px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: rgb(46, 46, 46);
  margin-left: 40px;
  margin-right: 40px;
  border-radius: 10px;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.documents-list::-webkit-scrollbar {
  display: none;
}

.documents-list button {
  margin-top: 10px;
  font-weight: bold;
  text-align: left;
  background-color: rgb(87, 87, 87);
  box-shadow: none;
  color: white;
  border-radius: 1;
  width: 100%;
  transition: 300ms;
}

.documents-list button:hover {
  cursor: pointer;
  background-color: rgba(105, 105, 105, 0.788);
}
</style>