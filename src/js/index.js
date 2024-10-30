/*---------------------------- Load Troansaction Button ---------------------------- */
const btnLoadTransaction = document.getElementById("loadTransaction");

/*---------------------------- Data in Table ---------------------------- */
const transactionData = document.getElementById("transactionData");

/*---------------------------- div contains table ---------------------------- */
const transactionLists = document.getElementById("transactionLists");

/*---------------------------- search bar ---------------------------- */
const search = document.getElementById("search");

/*---------------------------- Date & Price Arrow ---------------------------- */
const dateTitle = document.getElementById("btnDate").lastElementChild;
const priceTitle = document.getElementById("btnPrice").lastElementChild;

/*---------------------------- Convert En Date To Fa Date ---------------------------- */
function getFaTime(time) {
  const dateEn = new Date(time);
  const option = {
    dateStyle: "short",
    timeStyle: "short",
  };
  const dateFa = dateEn.toLocaleString("fa-IR", option);
  return dateFa.replace(",", " ساعت");
}

/*---------------------------- Load All Transaction ---------------------------- */
function loadAllTransaction() {
  /* --------- show table and search bar and hidden load Transaction Button --------- */
  transactionLists.classList.remove("hidden");
  search.classList.remove("hidden");
  btnLoadTransaction.classList.add("hidden");
  getTransaction();
}

/*---------------------------- Sort By Price ---------------------------- */
let order = "asc";
function sortByPrice() {
  getTransaction("price", order);
  dateTitle.className = "arrow left";
  if (order === "asc") {
    order = "desc";
    priceTitle.className = "arrow down";
  } else {
    order = "asc";
    priceTitle.className = "arrow up";
  }
}

/*---------------------------- Sort By Date ---------------------------- */
function sortByDate() {
  getTransaction("date", order);
  priceTitle.className = "arrow left";
  if (order === "asc") {
    order = "desc";
    dateTitle.className = "arrow down";
  } else {
    order = "asc";
    dateTitle.className = "arrow up";
  }
}

/*---------------------------- get Transaction With Search & Sort Or Without Them ---------------------------- */
function getTransaction(type, order) {
  let tempTrasnaction = "";
  axios
    .get(
      `http://localhost:3000/transactions?refId_like=${search.value}&_sort=${type}&_order=${order}`
    )
    .then((AllData) => {
      AllData.data.forEach((element) => {
        tempTrasnaction += `<tr>
            <td>${element.id}</td>
            <td class=${
              element.type === "افزایش اعتبار" ? "color-success" : "color-error"
            }>${element.type}</td>
            <td>${element.price}</td>
            <td>${element.refId}</td>
            <td>${getFaTime(element.date)}</td>
          </tr>`;
      });
      transactionData.innerHTML = tempTrasnaction;
    })
    .catch((err) => console.log(err));
}
