export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const jmaResponse = await fetch('https://www.jma.go.jp/bosai/forecast/data/forecast/140000.json');
    
    if (!jmaResponse.ok) {
      throw new Error(`気象庁API Error: ${jmaResponse.status}`);
    }

    const jmaData = await jmaResponse.json();

    res.status(200).json({
      success: true,
      source: '気象庁',
      data: jmaData
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
