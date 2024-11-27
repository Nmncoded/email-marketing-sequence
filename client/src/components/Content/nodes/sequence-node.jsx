/* eslint-disable react/prop-types */
import { Handle, Position } from "@xyflow/react";

const SequenceNode = ({data}) => {
  return (
    <div
      onClick={() => {}}
      className="flex gap-2 border px-1 py-2 bg-white hover:bg-gray-100 cursor-pointer rounded-sm"

    >
        <h1 className="text-muted-foreground text-xs">{data.label}</h1>
        
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
};

export default SequenceNode;
