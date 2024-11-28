/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useMemo, useRef } from "react";
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

const HORIZONTAL_SPACING = 200; // Horizontal space between nodes
const VERTICAL_SPACING = 100;   // Vertical space between nodes

const autoLayoutNodes = (nodes) => {
  // If no nodes, return empty array
  if (nodes.length === 0) return [];

  // Sort nodes by their original order to maintain sequence
  const sortedNodes = [...nodes].sort((a, b) => {
    // If nodes have a creation timestamp or index, use that
    const indexA = a.data?.index || 0;
    const indexB = b.data?.index || 0;
    return indexA - indexB;
  });

  return sortedNodes.map((node, index) => ({
    ...node,
    position: {
      x: index * HORIZONTAL_SPACING, // Spread nodes horizontally
      y: index * VERTICAL_SPACING,   // Spread nodes vertically
    },
  }));
};

const ReactFlowContent = ({ lead, selectedLeads, updateLead }) => {
  const initialNodes = Array.isArray(lead?.nodes) ? lead.nodes : [];
  const initialEdges = Array.isArray(lead?.edges) ? lead.edges : [];

  const autoLayoutInitialNodes = useMemo(() => {
    return autoLayoutNodes(initialNodes);
  }, [initialNodes]);

  const [nodes, setNodes, onNodesChange] = useNodesState(autoLayoutInitialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const updateLeadTimeout = useRef(null);

  const debouncedUpdateLead = useCallback((newLeads) => {
    if (updateLeadTimeout.current) {
      clearTimeout(updateLeadTimeout.current);
    }

    updateLeadTimeout.current = setTimeout(() => {
      updateLead(newLeads);
      updateLeadTimeout.current = null;
    }, 300); // 300ms debounce time
  }, [updateLead]);

  const onConnect = useCallback(
    (connection) => {
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

    debouncedUpdateLead(newLeads);

    return () => {
      if (updateLeadTimeout.current) {
        clearTimeout(updateLeadTimeout.current);
      }
    };
  }, [nodes, lead, selectedLeads, debouncedUpdateLead]);


  const onNodeDrag = useCallback((event, node) => {
    // console.log('Node dragged', node);
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={edges}
      edgeTypes={edgeTypes}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeDrag={onNodeDrag}
      fitView
      attributionPosition="top-right"
    >
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default ReactFlowContent;