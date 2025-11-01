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
export function useFarcaster() {
  const [inWarpcast, setInWarpcast] = useState(false);
  const [context, setContext] = useState<any>(null);

  useEffect(() => {
    (async () => {
      // 1) try SDK import/init (best-effort)
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const sdk = require("@farcaster/frame-sdk");
        if (sdk?.init) {
          try {
            // init may be sync or async
            const ctx = await sdk.init();
            setContext(ctx || null);
            setInWarpcast(true);
            return;
          } catch (e) {
            console.warn("Farcaster SDK init failed:", e);
          }
        }
      } catch (e) {
        // package not present or require failed — ignore
      }

      // 2) check runtime injection from Warpcast (common patterns)
      try {
        // @ts-ignore
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
    })();
  }, []);

  return { inWarpcast, context };
}
