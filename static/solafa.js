// console.log(solanaWeb3.Connection);

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
  // console.log(provider_data);
  window.solana.connect();

  window.solana.on("connect", () => {
    let id = window.solana.publicKey.toString();
    let id_arr = Array.from(id);
    let op_id_arr = id_arr.slice(0, 5);
    let ed_id_arr = id_arr.slice(39, 43);
    let display_id = op_id_arr.join("") + "..." + ed_id_arr.join("");

    e.target.innerHTML = display_id;
    conn_btn = document.querySelector("#conn-btn");

    function createConnection(url = solanaWeb3.clusterApiUrl("mainnet-beta")) {
      return new solanaWeb3.Connection(url);
    }
    const connection = createConnection();

    function getBalance(connection, publicKey) {
      return connection._rpcRequest("getBalance", [publicKey]);
    }

    async function getTheFreakinBalance() {
      const balance = getBalance(connection, id);
      return balance;
    }

    getTheFreakinBalance().then((balance) => {
      // let display_balance = `<button id="conn-btn" class="btn btn-success conn-btn">${freakinBalance} SOL</button>`;
      // button_space.innerHTML += display_balance;
      // button_space = document.querySelector("#button_space");

      let mint = '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R'

      function getToken(connection, id) {
        return connection._rpcRequest("getTokenAccountBalance", [id]);
      }

      async function getTheFreakinToken() {
        const token = getToken(connection,'4yG6Pm8HsxcH7niCGqtcvr2z8zmwqo7Ct4qB8QNMvsee');
        return token;
      }

      getTheFreakinToken().then(token => {
        console.log(token)
      })

    });

    button_space.innerHTML += disconn_btn_template;
    button_space = document.querySelector("#button_space");

    let disconn_btn = document.querySelector("#disconn-btn");
    disconn_btn.addEventListener("click", (e) => {
      window.solana.disconnect();
      window.solana.on("disconnect", () => {
        console.log("disconnected!");
        // console.log(e.target.parentElement.children[0].innerHTML);
        e.target.parentElement.children[0].innerHTML = "Connect Wallet";
        disconn_btn.remove();
        window.location.reload();
      });
    });
  });
});
