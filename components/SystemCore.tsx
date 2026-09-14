"use client";

import type { PointerEvent } from "react";

export function SystemCore({ label, live }: { label: string; live: string }) {
  function move(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--core-x", `${x * 18}px`);
    event.currentTarget.style.setProperty("--core-y", `${y * 18}px`);
  }

  function reset(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--core-x", "0px");
    event.currentTarget.style.setProperty("--core-y", "0px");
  }

  return (
    <div className="core-panel" onPointerMove={move} onPointerLeave={reset} aria-hidden="true">
      <div className="core-corner core-corner-a" />
      <div className="core-corner core-corner-b" />
      <div className="core-label">{label}</div>
      <div className="core-status"><i />{live}</div>
      <div className="core-stage">
        <div className="core-aura" />
        <div className="core-orbit orbit-one"><i /><i /><i /></div>
        <div className="core-orbit orbit-two"><i /><i /></div>
        <div className="core-orbit orbit-three"><i /></div>
        <div className="core-ring ring-outer" />
        <div className="core-ring ring-mid" />
        <div className="core-ring ring-inner" />
        <div className="core-sphere"><span /></div>
        <div className="core-horizon" />
      </div>
      <div className="core-axis axis-x" />
      <div className="core-axis axis-y" />
      <div className="core-code">01 / 04<br />SYS.2022<br />51.13°N</div>
    </div>
  );
}
