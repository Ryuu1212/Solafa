// const isPhantomInstalled = window.solana && window.solana.isPhantom;
// console.log(isPhantomInstalled);
let conn_btn = document.querySelector("#conn-btn");
let button_space = document.querySelector("#button_space");

let disconn_btn_template = `<button id="disconn-btn" class="btn btn-secondary conn-btn">Disconnect</button>`;

conn_btn.addEventListener("click", (e) => {
  const getProvider = () => {
    if ("solana" in window) {
      const provider = window.solana;
      if (provider.isPhantom) {
        return provider;
      }
    }
    window.open("https://phantom.app/", "_blank");
  };

  let provider_data = getProvider();
  console.log(provider_data);
  window.solana.connect();
  window.solana.on("connect", () => {
    e.target.innerHTML = "Connected!";
    // conn_btn = document.querySelector("#conn-btn");
    console.log("connected!");
    console.log(window.solana.publicKey.toString());
    button_space.innerHTML += disconn_btn_template;
    button_space = document.querySelector("#button_space");

    let disconn_btn = document.querySelector("#disconn-btn");
    disconn_btn.addEventListener("click", (e) => {
      window.solana.disconnect();
      window.solana.on("disconnect", () => {
        console.log("disconnected!");
        // console.log(e.target.parentElement.children[0].innerHTML);
        e.target.parentElement.children[0].innerHTML = 'Connect Wallet';
        disconn_btn.remove();
        window.location.reload();
      });
    });
  });
});
