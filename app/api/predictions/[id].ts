import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const handler = async (req: NextRequest): Promise<Response> => {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  const res = await fetch(
    "https://api.replicate.com/v1/predictions/" + id,
    {
      headers: {
        Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      }, 
    }
  );

  if (res.status !== 200) {
      const error = await res.json();
      console.log(error.detail);
      return new Response(JSON.stringify({ detail: error.detail }), { status: 500 });
  }

  const prediction = await res.json();
  console.log("##### BP1: Image data from Replicate API:", prediction);
  return new Response(JSON.stringify(prediction));
};

export default handler;