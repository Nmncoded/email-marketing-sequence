/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Handle, Position } from "@xyflow/react";
import React from "react";

export function PositionNode({
  data,
}) {

  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <div className="react-flow__node-default">
      {data.label && <div>{data.label}</div>}
      <div>namannana</div>


      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
