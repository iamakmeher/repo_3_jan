"use client";

import { useState } from "react";

export default function Home() {
  const [account, setAccount] = useState<string>("");
  const [result, setResult] = useState<string>("");

  // 🔹 Connect Wallet
  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      alert("MetaMask not found");
      return;
    }

    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });

    setAccount(accounts[0]);
    setResult("Wallet connected successfully");
  };

  // 🔹 Register user
  const registerUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userAddress: account }),
      });

      const data = await res.json();
      setResult(data.message || "User registered");
    } catch {
      setResult("Error registering user");
    }
  };

  // 🔹 Authenticate user
  const authenticateUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userAddress: account }),
      });

      const data = await res.json();
      setResult(`Authenticated: ${data.authenticated}`);
    } catch {
      setResult("Authentication failed");
    }
  };

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Decentralized Paging Authentication</h1>

      <button onClick={connectWallet}>Connect Wallet</button>

      {account && (
        <p>
          <b>Wallet:</b> {account}
        </p>
      )}

      <br />
      <br />

      <button onClick={registerUser}>Register</button>
      <button
        onClick={authenticateUser}
        style={{ marginLeft: "10px" }}
      >
        Authenticate
      </button>

      <p>
        <b>Result:</b> {result}
      </p>
    </main>
  );
}
