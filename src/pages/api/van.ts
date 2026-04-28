import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  try {
    // Astro talks directly to your Express server running on port 3000
    const response = await fetch('http://localhost:3000/api/vehicles/locations', {
      headers: {
        // We pull the secret key safely from your .env file
        'x-api-key': import.meta.env.BACKEND_SECRET_KEY || '' 
      }
    });
    
    if (!response.ok) {
      throw new Error(`Backend returned status: ${response.status}`);
    }

    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Middleman error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch from backend" }), { status: 500 });
  }
};