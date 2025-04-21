export const prerender = false;
export async function POST({ request }) { // Use POST if you need to send data like lat/lon
    const { lat, lon } = await request.json(); // Get data from client request body
  
    const apiUrl = `https://jizdnirady.pmdp.cz/odjezdy/vyhledat`;
    const requestBody = {
      "Stop": { "StopId": null, "Latitude": lat, "Longitude": lon },
      "DateAndTime": null,
      "MaxResults": 5,
      "FullResults": false
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        // Log error on the server
        console.error(`PMDP API Error: ${response.status} ${response.statusText}`);
        return new Response(JSON.stringify({ error: 'Failed to fetch departures' }), { status: response.status });
      }
  
      const apiData = await response.json();
      return new Response(JSON.stringify(apiData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
  
    } catch (error) {
      console.error("Error fetching PMDP data:", error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}