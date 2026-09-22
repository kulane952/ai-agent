
"use client";

import { useState } from "react";

export default function InngestTestPage() {
  const [requestId, setRequestId] = useState("");
  const [action, setAction] = useState("");

  const [items, setItems] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const startApprovalWorkflow = async () => {
    const response = await fetch("/api/inngest/approval", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestId,
        action,
      }),
    });

    const data = await response.json();

    setMessage(data.message);
  };

  const startBatchProcessor = async () => {
    const response = await fetch("/api/inngest/batch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: items.split(",").map((item) => item.trim()),
      }),
    });

    const data = await response.json();

    setMessage(data.message);
  };

  const createUser = async () => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });

    const data = await response.json();

    setMessage(data.message || "User created successfully");
  };

  return (
    <main>
      <h1>Inngest Test</h1>

      {/* Approval Workflow */}
      <section>
        <h2>Approval Workflow</h2>

        <input
          type="text"
          placeholder="Request ID"
          value={requestId}
          onChange={(e) => setRequestId(e.target.value)}
        />

        <input
          type="text"
          placeholder="Action"
          value={action}
          onChange={(e) => setAction(e.target.value)}
        />

        <button onClick={startApprovalWorkflow}>
          Start Approval
        </button>
      </section>

      {/* Batch Processor */}
      <section>
        <h2>Batch Processor</h2>

        <input
          type="text"
          placeholder="Apple, Banana, Orange"
          value={items}
          onChange={(e) => setItems(e.target.value)}
        />

        <button onClick={startBatchProcessor}>
          Process Items
        </button>
      </section>

      {/* Create User */}
      <section>
        <h2>Create User</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={createUser}>
          Create User
        </button>
      </section>

      {message && <p>{message}</p>}
    </main>
  );
}

