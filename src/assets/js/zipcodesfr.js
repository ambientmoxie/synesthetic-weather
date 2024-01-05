

export default async function fetchZipcodes(e) {
  const response = await fetch(
    "https://raw.githubusercontent.com/Rudloff/french-postal-codes-api/master/insee.csv"
  );
  const data = await response.text();
  const rows = data.split("\n").slice(1); // Exclude header
  e = rows.map((row) => {
    const columns = row.split(";");
    return columns[1]; // Zipcode is the second column
  });
}
