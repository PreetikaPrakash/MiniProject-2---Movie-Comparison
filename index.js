const fetchData = async () => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "3aebb3c8",
      s: "avengers",
    },
  });
  console.log(response.data);
};

fetchData();
