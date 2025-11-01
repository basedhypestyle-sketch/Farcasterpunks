"use client";
import React from "react";
import { useFarcaster } from "@/lib/useFarcaster";

export default function Page() {
  const { inWarpcast } = useFarcaster();

  const onMintClick = () => {
    if (!inWarpcast) {
      alert("Untuk mint tanpa keluar aplikasi, buka halaman ini di dalam Warpcast (Farcaster app).");
      return;
    }

    alert("Kamu di dalam Warpcast — tekan 'Mint Now' di frame (manifest) untuk melakukan mint. Cek logs di server untuk response.");
  };

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(180deg,#050214,#0b0720)",
      color: "#fff",
      padding: 20
    }}>
      <div style={{ width: 820, maxWidth: "95%", display: "flex", gap: 24 }}>
        <div style={{
          flex: 1, padding: 28, borderRadius: 14,
          background: "rgba(255,255,255,0.02)", boxShadow: "0 10px 30px rgba(0,0,0,0.6)"
        }}>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <img src="/assets/logo.png" alt="logo" style={{width:84,height:84,borderRadius:12,objectFit:"cover"}}/>
            <div>
              <h1 style={{margin:0,fontSize:20}}>Farcaster Punks</h1>
              <p style={{margin:"6px 0 0",color:"#b9b6cb"}}>Mint on Base — directly in Warpcast</p>
            </div>
          </div>

          <div style={{marginTop:18,display:"flex",gap:12,alignItems:"center"}}>
            <button style={{
              padding:"10px 16px", borderRadius:10, border:0, background:"#7c3aed", color:"#fff", fontWeight:700
            }} onClick={onMintClick}>
              Mint Now
            </button>

            <a href="https://opensea.io/collection/farcaster-punks-59466883/overview" target="_blank" rel="noreferrer" style={{
              padding:"10px 14px", borderRadius:10, background:"transparent", border:"1px solid rgba(255,255,255,0.06)", color:"#fff", textDecoration:"none"
            }}>OpenSea</a>
          </div>

          <p style={{color:"#9b98ad",marginTop:14,fontSize:13}}>
            {inWarpcast
              ? "Berada di within Warpcast — tekan Mint Now di frame untuk memicu server relayer (postUrl)."
              : "Buka halaman ini di aplikasi Farcaster (Warpcast) supaya bisa mint tanpa meninggalkan aplikasi."}
          </p>
        </div>

        <div style={{width:260,display:"flex",flexDirection:"column",gap:12,alignItems:"center"}}>
          <img src="/assets/logo.png" alt="preview" style={{width:220,height:220,borderRadius:12,objectFit:"cover"}}/>
          <div style={{color:"#b9b6cb",fontSize:13}}>Limited • Base</div>
        </div>
      </div>
    </main>
  );
}
