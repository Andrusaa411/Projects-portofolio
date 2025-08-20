async function testWEATHERApi() {
  const apiObject = await fetch(
    "https://api.weatherapi.com/v1/current.json?key=b7ce83334ef745438a792753251507&q=Br%C4%83ila&lang=ro"
  );
  const apiObjectJson = await apiObject.json();
  console.log(apiObjectJson);
}
// testAPI();
async function testUNSPLASHapi() {
  const apiObject = await fetch(
    `https://api.unsplash.com/search/photos?query=romania danube&client_id=dt_J78pTsZc5RYd_lYfGt6H3kwBRt9fopE2FYO_t1X0`
  );
  const apiObjectJson = await apiObject.json();
  console.log(apiObjectJson);
  console.log(apiObjectJson.results[0].urls.full);
}
// testUNSPLASHapi();

async function testGOOGLEapi(query, apiKey, cx) {
  const data = await fetch(
    `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${cx}&searchType=image`
  );
  const response = await data.json();
  console.log(response);
}

// testGOOGLEapi(
//   "Braila",
//   process.env.VITE_GOOGLE_API_KEY,
//   process.env.VITE_GOOGLE_CX_ID
// );
