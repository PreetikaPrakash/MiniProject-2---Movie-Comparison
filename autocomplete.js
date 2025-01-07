const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  //Autocomplete #2
  root.innerHTML = `
    <label><b>Search for a movie</b></label>
    <input class="input"/>
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultwrapper = root.querySelector(".results");

  // Below code is written to reduce the number of call requests to OMDB API
  // Providing 1 sec time to each letter

  const onInput = async (event) => {
    const movies = await fetchData(event.target.value);
    // if nothing is present inside the dropdown
    if (!movies.length) {
      dropdown.classList.remove("is-active");
      return; // just returning from the function directly
    }

    resultwrapper.innerHTML = "";
    dropdown.classList.add("is-active");
    for (let item of items) {
      // creating a div element for every movie that we fetch
      const option = document.createElement("a");

      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);
      // clicking & displaying the selected movie title
      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = inputValue(item);
        onOptionSelect(item);
      });
      resultwrapper.appendChild(option);
    }
  };
  input.addEventListener("input", debounce(onInput, 500));

  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
