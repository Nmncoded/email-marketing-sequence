import { Button } from "@/components/ui/button";
import useStore from "@/store";
import { Handle, Position } from "@xyflow/react";
import { Plus } from "lucide-react";

const AddListBtn = () => {
  const {onOutreachBlockModalOpen} = useStore();

  const clickHandler = () => {
    onOutreachBlockModalOpen();
  };

  return (
    <>
      <Button
        onClick={clickHandler}
        className="cursor-pointer flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800font-xs rounded-sm text-sm"
      >
        <span>
          <Plus />
        </span>
        <Handle type="target" position={Position.Top} />
      </Button>
    </>
  );
};

export default AddListBtn;
