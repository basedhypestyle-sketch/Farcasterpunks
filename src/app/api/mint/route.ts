import { NextResponse } from "next/server";

/**
 * Dummy mint endpoint — for testing Farcaster frame in Warpcast
 * This version does NOT use blockchain or env vars.
 * It simply returns a fake tx hash.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const minter = body?.minter || "0x0000000000000000000000000000000000000000";
    const qty = Number(body?.quantity || 1);

    // Fake response to simulate success
    const fakeTxHash = "0x" + Math.random().toString(16).substring(2).padEnd(64, "0");

    return NextResponse.json({
      status: "ok",
      simulated: true,
      mintedTo: minter,
      quantity: qty,
      txHash: fakeTxHash,
      message: "✅ Simulated mint success (no blockchain tx sent)"
    });
  } catch (err) {
    console.error("mint route error:", err);
    return NextResponse.json({ error: "Simulation failed", details: String(err) }, { status: 500 });
  }
}
