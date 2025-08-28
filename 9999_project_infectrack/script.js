// Use a CORS proxy to bypass CORS issues
const COVID_API_URL =
  "https://api.allorigins.win/get?url=https://disease.sh/v3/covid-19/countries";

// Load the world map and virus data
Promise.all([
  d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"),
  fetch(COVID_API_URL)
    .then((response) => response.json())
    .then((data) => JSON.parse(data.contents)), // Extract the actual API response
]).then(([world, virusData]) => {
  const countries = topojson.feature(world, world.objects.countries).features;

  // Log the map data for debugging
  console.log("Map Data:", countries);

  // Log the API data for debugging
  console.log("Virus Data:", virusData);

  // Create a map of country ISO codes to virus data
  const virusDataMap = {};
  virusData.forEach((d) => {
    // Log the mapping of country and iso3 code
    console.log(`Mapping country: ${d.country}, ISO3: ${d.countryInfo.iso3}`);
    virusDataMap[d.countryInfo.iso3] = d;
  });

  // Log the virus data map for debugging
  console.log("Virus Data Map:", virusDataMap);

  // Set up SVG container
  const width = 960;
  const height = 600;
  const svg = d3
    .select("#map")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Tooltip element
  const tooltip = d3.select("#tooltip");

  // Info panel element
  const infoPanel = d3.select("#info-panel");

  // Draw the map
  svg
    .selectAll("path")
    .data(countries)
    .enter()
    .append("path")
    .attr(
      "d",
      d3
        .geoPath()
        .projection(
          d3
            .geoMercator()
            .fitSize([width, height], {
              type: "FeatureCollection",
              features: countries,
            })
        )
    )
    .attr("fill", "#d1d1d1") // Lighter color for better contrast
    .attr("stroke", "#fff") // Add a white stroke to make countries stand out
    .attr("stroke-width", 0.5)
    .on("mouseover", (event, d) => {
      // Highlight country on hover with light green
      d3.select(event.target).attr("fill", "#90EE90"); // Light green

      const countryData = virusDataMap[d.properties.iso_a3]; // Use iso_a3 instead of d.id
      console.log("Hovered Country Data:", countryData); // Log hovered country data
      if (countryData) {
        // Update the tooltip
        tooltip
          .style("display", "block")
          .html(
            `
            <strong>${countryData.country}</strong><br>
            Cases: ${countryData.cases.toLocaleString()}<br>
            Deaths: ${countryData.deaths.toLocaleString()}<br>
            Recovered: ${countryData.recovered.toLocaleString()}
          `
          )
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`);

        // Update the info panel
        infoPanel.html(`
          <h2>${countryData.country}</h2>
          <p>Cases: ${countryData.cases.toLocaleString()}</p>
          <p>Deaths: ${countryData.deaths.toLocaleString()}</p>
          <p>Recovered: ${countryData.recovered.toLocaleString()}</p>
        `);
      } else {
        // If no data is found for the country
        infoPanel.html(`
          <h2>${d.properties.name}</h2>
          <p>No data available</p>
        `);
      }
    })
    .on("mouseout", (event, d) => {
      // Reset the country color on mouse out
      d3.select(event.target).attr("fill", "#d1d1d1"); // Reset to original color

      tooltip.style("display", "none");
    })
    .on("click", (event, d) => {
      const countryData = virusDataMap[d.properties.iso_a3];
      if (countryData) {
        // Update the info panel on click (for touch devices)
        infoPanel.html(`
          <h2>${countryData.country}</h2>
          <p>Cases: ${countryData.cases.toLocaleString()}</p>
          <p>Deaths: ${countryData.deaths.toLocaleString()}</p>
          <p>Recovered: ${countryData.recovered.toLocaleString()}</p>
        `);
      } else {
        // If no data is found for the country
        infoPanel.html(`
          <h2>${d.properties.name}</h2>
          <p>No data available</p>
        `);
      }
    });
});
