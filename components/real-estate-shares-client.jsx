"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../lib/realEstateContract";

export default function RealEstateSharesClient() {
  const [account, setAccount] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [totalShares, setTotalShares] = useState("0");
  const [sharesSold, setSharesSold] = useState("0");
  const [remainingShares, setRemainingShares] = useState("0");
  const [pricePerShare, setPricePerShare] = useState("0");
  const [userShares, setUserShares] = useState("0");
  const [shareAmount, setShareAmount] = useState("1");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function getReadOnlyContract() {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  }

  async function loadContractData(walletAddress = "") {
    try {
      const contract = getReadOnlyContract();

      const [
        fetchedPropertyName,
        fetchedTotalShares,
        fetchedSharesSold,
        fetchedRemainingShares,
        fetchedPricePerShare,
      ] = await Promise.all([
        contract.propertyName(),
        contract.totalShares(),
        contract.sharesSold(),
        contract.getRemainingShares(),
        contract.pricePerShare(),
      ]);

      setPropertyName(fetchedPropertyName);
      setTotalShares(fetchedTotalShares.toString());
      setSharesSold(fetchedSharesSold.toString());
      setRemainingShares(fetchedRemainingShares.toString());
      setPricePerShare(ethers.formatEther(fetchedPricePerShare));

      if (walletAddress) {
        const fetchedUserShares = await contract.sharesOwned(walletAddress);
        setUserShares(fetchedUserShares.toString());
      } else {
        setUserShares("0");
      }
    } catch (error) {
      console.error("loadContractData error:", error);
      setMessage("Error al leer datos del contrato.");
    }
  }

  async function switchToHardhat() {
    try {
      // Intentar cambiar a la red Hardhat si ya existe en MetaMask
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x7A69" }], // 31337 en hex
      });
    } catch (error) {
      if (error.code === 4902) {
        // La red no existe en MetaMask, agregarla automáticamente
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x7A69",
                chainName: "Hardhat Local",
                rpcUrls: ["http://127.0.0.1:8545"],
                nativeCurrency: {
                  name: "ETH",
                  symbol: "ETH",
                  decimals: 18,
                },
              },
            ],
          });
        } catch (addError) {
          console.error("Error al agregar la red Hardhat:", addError);
          throw new Error("No se pudo agregar la red Hardhat a MetaMask.");
        }
      } else if (error.code === 4001) {
        throw new Error("Cambio de red rechazado por el usuario.");
      } else {
        console.error("Error al cambiar de red:", error);
        throw new Error("No se pudo cambiar a la red Hardhat.");
      }
    }
  }

  async function connectWallet() {
    try {
      if (typeof window === "undefined" || !window.ethereum) {
        setMessage("MetaMask no está instalado.");
        return;
      }

      setMessage("Cambiando a red Hardhat Local...");

      // Primero asegurarse de estar en la red correcta
      await switchToHardhat();

      // Luego solicitar acceso a las cuentas
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      const signer = await browserProvider.getSigner();
      const address = await signer.getAddress();
      const network = await browserProvider.getNetwork();

      console.log("chainId conectado:", network.chainId.toString());

      if (network.chainId.toString() !== "31337") {
        setMessage(
          `Red incorrecta (chainId: ${network.chainId.toString()}). Conecta MetaMask a Hardhat Local (chainId 31337).`
        );
        return;
      }

      setAccount(address);
      await loadContractData(address);
      setMessage("Wallet conectada correctamente.");
    } catch (error) {
      console.error("connectWallet error:", error);
      if (error?.code === 4001) {
        setMessage("Conexión rechazada por el usuario.");
      } else {
        setMessage(error?.message || "Error al conectar la wallet.");
      }
    }
  }

  async function buyShares() {
    try {
      if (typeof window === "undefined" || !window.ethereum) {
        setMessage("MetaMask no está instalado.");
        return;
      }

      if (!account) {
        setMessage("Primero conecta la wallet.");
        return;
      }

      const amount = Number(shareAmount);
      if (!amount || amount <= 0) {
        setMessage("Ingresa una cantidad válida de shares.");
        return;
      }

      setLoading(true);
      setMessage("Enviando transacción...");

      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      const network = await browserProvider.getNetwork();

      if (network.chainId.toString() !== "31337") {
        setMessage("Red incorrecta. Reconectá la wallet para volver a Hardhat Local.");
        setLoading(false);
        return;
      }

      const signer = await browserProvider.getSigner();
      const contractWithSigner = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const price = await contractWithSigner.pricePerShare();
      const totalValue = price * BigInt(amount);

      console.log("Comprando shares:", amount, "| Total ETH:", ethers.formatEther(totalValue));

      const tx = await contractWithSigner.buyShares(amount, {
        value: totalValue,
      });

      setMessage("Esperando confirmación del bloque...");
      await tx.wait();

      await loadContractData(account);
      setMessage("¡Compra realizada con éxito!");
    } catch (error) {
      console.error("buyShares error:", error);
      if (error?.code === 4001) {
        setMessage("Transacción rechazada por el usuario.");
      } else {
        setMessage(
          error?.shortMessage || error?.reason || error?.message || "Error al comprar shares."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      console.log("Cuentas cambiadas:", accounts);
      if (accounts.length === 0) {
        setAccount("");
        setUserShares("0");
        setMessage("Wallet desconectada.");
      } else {
        setAccount(accounts[0]);
        loadContractData(accounts[0]);
        setMessage("Cuenta cambiada.");
      }
    };

    const handleChainChanged = (chainId) => {
      console.log("Red cambiada a chainId:", parseInt(chainId, 16));
      setMessage("Red cambiada. Recargando...");
      window.location.reload();
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    loadContractData();

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-xl shadow bg-white">
      <h2 className="text-2xl font-bold mb-4">Real Estate Shares Demo</h2>

      {!account ? (
        <button
          onClick={connectWallet}
          className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800 transition"
        >
          Conectar MetaMask
        </button>
      ) : (
        <p className="mb-4 text-sm break-all">
          <strong>Wallet:</strong> {account}
        </p>
      )}

      <div className="space-y-2 my-6">
        <p><strong>Property:</strong> {propertyName || "-"}</p>
        <p><strong>Total Shares:</strong> {totalShares}</p>
        <p><strong>Shares Sold:</strong> {sharesSold}</p>
        <p><strong>Remaining Shares:</strong> {remainingShares}</p>
        <p><strong>Price Per Share:</strong> {pricePerShare} ETH</p>
        <p><strong>Your Shares:</strong> {userShares}</p>
      </div>

      <div className="space-y-3">
        <input
          type="number"
          min="1"
          value={shareAmount}
          onChange={(e) => setShareAmount(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="Cantidad de shares"
        />
        <button
          onClick={buyShares}
          disabled={loading || !account}
          className="w-full px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50 hover:bg-blue-700 transition"
        >
          {loading ? "Procesando..." : "Buy Shares"}
        </button>
      </div>

      {message && (
        <p className="mt-4 text-sm text-gray-700 bg-gray-100 rounded p-3">
          {message}
        </p>
      )}
    </div>
  );
}