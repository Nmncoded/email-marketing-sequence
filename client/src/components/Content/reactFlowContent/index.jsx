/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useCallback, useEffect } from "react";
import {
  Background,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { nodeTypes } from "../nodes";
import { edgeTypes } from "../edges/types";

const ReactFlowContent = ({ lead, selectedLeads, updateLead }) => {

  const initialNodes = Array.isArray(lead?.nodes) ? lead.nodes : [];
  const initialEdges = Array.isArray(lead?.edges) ? lead.edges : [];
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (connection) => {
      // Add a validation check to ensure handle IDs are not null
      if (connection.source && connection.target) {
        setEdges((edges) => addEdge(connection, edges));
      } else {
        console.error(
          "Invalid connection: source or target handle is null",
          connection
        );
      }
    },
    [setEdges]
  );

  useEffect(() => {
    const newNodeData = nodes.map(({ id, type, data, position }) => ({
      id,
      type,
      position,
      data,
    }));

    const newLeads = selectedLeads.map((l) => {
      if (lead.id === l.id) {
        return {
          ...l,
          nodes: newNodeData,
        };
      }
      return l;
    });

    // Only update if there are changes
    updateLead(newLeads);
  }, [nodes]);

  // console.log(lead,nodes,edges)

  return (
    <>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="top-right"
      >
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </>
  );
};

export default ReactFlowContent;
