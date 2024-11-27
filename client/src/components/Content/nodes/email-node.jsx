/* eslint-disable react/prop-types */
// import useStore from "@/store";
import { Handle, NodeToolbar, Position } from "@xyflow/react";
import {  FilePenLine, Mail, Trash } from "lucide-react";

const EmailNodeCard = ({ data }) => {
  // const {onOutreachBlockModalOpen} = useStore();

  const editHandler = () => {
    // onOutreachBlockModalOpen();
  };

  const deleteHandler = () => {
    // onOutreachBlockModalOpen();
  };

  return (
    <div
      onClick={() => {}}
      className="flex gap-2 border px-3 py-5 bg-white hover:bg-gray-100 cursor-pointer rounded-sm"
    >
      <NodeToolbar isVisible={true} position={Position.Top} offset={-22} align="end" className="flex gap-2 flex-row-reverse" >
        <span onClick={deleteHandler}  className="cursor-pointer w-6 h-6 border rounded-sm bg-blue-100 flex justify-center items-center border-blue-300" >
          <Trash className="text-blue-500" />
        </span>
        <span onClick={editHandler}  className="cursor-pointer w-6 h-6 border rounded-sm bg-blue-100 flex justify-center items-center border-blue-300" >
          <FilePenLine className="text-blue-500" />
        </span>
      </NodeToolbar>
      <div className="flex justify-center items-center">
        <span className="w-10 h-10 border rounded-sm bg-blue-100 flex justify-center items-center border-blue-300">
          <Mail className="text-blue-500 text-sm" />
        </span>
      </div>
      <div className="flex flex-col">
        <h1 className="text-xs font-bold">{"Email"}</h1>
        <p className="text-muted-foreground text-xs">
          <span className="font-bold" >Template:</span> {data.template.name}
        </p>
        <p className="text-muted-foreground text-xs">
          <span className="font-bold" >Type:</span> {data.type.name}
        </p>
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default EmailNodeCard;
