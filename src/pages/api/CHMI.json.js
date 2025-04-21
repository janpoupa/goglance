export const prerender = false;
export async function GET() {
  
    const apiUrl = `https://lovecka.info/ChmiWarnings1/chmi/vystrahy/3209?kratke=1`;

    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        // Log error on the server
        console.error(`CHMI API Error: ${response.status} ${response.statusText}`);
        return new Response(JSON.stringify({ error: 'Failed to fetch departures' }), { status: response.status });
      }
  
      const apiData = await response.json();
      return new Response(JSON.stringify(apiData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
  
    } catch (error) {
      console.error("Error fetching CHMI data:", error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}