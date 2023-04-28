document.addEventListener('DOMContentLoaded', () => {
  // your JavaScript code goes here


  let search_text = document.querySelector("#findtext");
  let result_data = document.querySelector("#result");
  let search_btn = document.querySelector("#btn");
  let reset_btn = document.querySelector("#resetbtn");

  search_btn.addEventListener("click", async () => {
    let value = document.getElementById("findtext").value;
    document.querySelector('.result').style.display = "block"

    //if given value is zero or empty then it will display the alert
    if (value.length == 0 || value.includes(" ")) {
      alert("Please enter the valid name without any spaces");

    }
    else {

      //it fetches data from the "https://api.nationalize.io/" API using the provided name as a query parameter, sorts the response by probability
      try {
        let data = await fetch(`https://api.nationalize.io/?name=${value}`);
        let result = await data.json();
        console.log(result, "result data");
        result_data.innerHTML = "";

        result.country.sort((a, b) => b.probability - a.probability);
        for (let i = 0; i < 2; i++) {
          result_data.innerHTML += `
        <div class="row">
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${result.country[i].country_id}</h5>
                        <p class="card-text">Probability: ${result.country[i].probability}</p>
                    </div>
                </div>`
        }

      }
      catch {
        console.log(error);
      }

    }
  });

  var container_data = document.querySelector('.card');
  //The reset button clears the search input and hides the result cards.
  reset_btn.addEventListener("click", () => {
    document.querySelector('.result').style.display = "none";
    //If the search input is empty or contains spaces, an alert is displayed. 
    search_text.value = "";
    result_data.innerHTML = " ";

  });

});