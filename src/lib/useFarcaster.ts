"use client";

import { useEffect, useState } from "react";

/**
 * useFarcaster
 * - returns { inWarpcast, context }
 * - tries three checks, in order:
 *   1) import + init @farcaster/frame-sdk if available
 *   2) check a common global injection (window.__FARCASTER__ or window.farcaster)
 *   3) fallback false
 */

interface FarcasterContext {
  // Define properties based on the SDK context
}

export function useFarcaster() {
  const [inWarpcast, setInWarpcast] = useState(false);
  const [context, setContext] = useState<FarcasterContext | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      // 1) try SDK import/init (best-effort)
      try {
        const sdk = await import("@farcaster/frame-sdk");
        if (sdk?.init) {
          try {
            const ctx = await sdk.init();
            setContext(ctx || null);
            setInWarpcast(true);
            return;
          } catch (e) {
            console.warn("Farcaster SDK init failed:", e);
          }
        }
      } catch (e) {
        // package not present or import failed — ignore
      }

      // 2) check runtime injection from Warpcast (common patterns)
      try {
        const w: any = window;
        const injected = w.__FARCASTER__ || w.farcaster || w.Frame || w.Warpcast;
        if (injected) {
          setContext(injected);
          setInWarpcast(true);
          return;
        }
      } catch (e) {
        // ignore
      }

      // 3) fallback: not inside warpcast/frame
      setInWarpcast(false);
      setContext(null);
      setLoading(false);
    })();
  }, []);

  return { inWarpcast, context, loading };
}
