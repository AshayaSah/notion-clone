"use client";

import { useMyPresence, useOthers } from "@liveblocks/react";
import FollowPointer from "./FollowPointer";

function LiveCursorProvider({ children }: { children: React.ReactNode }) {
  const [myPresence, updateMyPresence] = useMyPresence();
  const others = useOthers();

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const cursor = {
      x: Math.floor(e.clientX),
      y: Math.floor(e.clientY),
    };
    updateMyPresence({ cursor });
  }

  function handlePointerLeave() {
    updateMyPresence({ cursor: null });
  }

  return (
    <div onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      {/* Render Cursors  */}
      {others
        .filter((other) => other.presence.cursor)
        .map(({ connectionId, presence, info }) => {
          return (
            <FollowPointer
              key={connectionId}
              info={info}
              x={presence.cursor!.x}
              y={presence.cursor!.y}
            ></FollowPointer>
          );
        })}
    </div>
  );
}
export default LiveCursorProvider;
