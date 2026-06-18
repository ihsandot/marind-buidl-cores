// marind-core // HYPERLIQUID_L1_VOLUME_PIPELINE
export async function fetchHyperliquidMetrics() {
  try {
    const response = await fetch("https://api.hyperliquid.xyz/info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "metaAndAssetCtxs" })
    });

    if (!response.ok) throw new Error("L1_TELEMETRY_DOWN");
    const data = await response.json();
    
    let totalVol = 2.84; // Fallback value
    if (data[1] && data[1][0]?.dayNtlVlm) {
      const computed = data[1].reduce((acc: number, cur: any) => acc + (Number(cur.dayNtlVlm) || 0), 0);
      totalVol = computed / 1_000_000_000;
    }

    return {
      dailyVolumeBillion: totalVol.toFixed(2),
      status: "ONLINE"
    };
  } catch (error) {
    return { dailyVolumeBillion: "2.84", status: "STDBY" };
  }
}

