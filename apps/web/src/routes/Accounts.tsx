import { useEffect, useState } from "react";
import {
  getAccounts,
  disconnectAccount,
} from "../lib/api";

type Account = {
  _id: string;
  platform: string;
  connected: boolean;
  accountName?: string;
  avatar?: string;
};

export default function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    loadAccounts();
  }, []);

  async function loadAccounts() {
    const data = await getAccounts();
    setAccounts(data);
  }

  async function handleDisconnect(id: string) {
    await disconnectAccount(id);

    setAccounts(
      accounts.map((account) =>
        account._id === id
          ? { ...account, connected: false }
          : account
      )
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1
        style={{
          fontSize: "36px",
          marginBottom: "30px",
          color: "white",
        }}
      >
        Connected Accounts
      </h1>

      {accounts.map((account) => (
        <div
          key={account._id}
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <img
              src={
                account.avatar ||
                "https://via.placeholder.com/50"
              }
              alt="avatar"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
            />

            <div>
              <h2>
                {account.accountName || account.platform}
              </h2>

              <p>{account.platform}</p>

              <p>
                {account.connected
                  ? "✅ Connected"
                  : "❌ Not Connected"}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (account.connected) {
                handleDisconnect(account._id);
              } else if (
                account.platform === "YouTube"
              ) {
                window.location.href =
                  "http://localhost:4000/api/oauth/google";
              }
            }}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              background: account.connected
                ? "#dc2626"
                : "#16a34a",
              color: "white",
            }}
          >
            {account.connected
              ? "Disconnect"
              : "Connect"}
          </button>
        </div>
      ))}
    </div>
  );
}