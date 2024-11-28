import { useState } from "react";
import { Button } from "../ui/button";
import { Plus, Rocket } from "lucide-react";
import { AddSourceBlockModal } from "../modals/add-source-block-modal";
import useStore from "@/store";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {selectedLeads, onSaveScheduleModalOpen} = useStore();
  const isDisabled = !selectedLeads[0]?.nodes?.some((node) => node.type === "email-node") ;

  const addLeadHandler = () => {
    if(selectedLeads?.length > 0) return;
    setIsOpen(true);
  };

  const clickHandler = () => {
    if(isDisabled) return;
    onSaveScheduleModalOpen();
  };

  return (
    <div className="flex items-center justify-between p-8 border-b">
      <AddSourceBlockModal isOpen={isOpen} onClose={() => setIsOpen(false)} title={"Add a Source Block"} description={"Pick a block & configure,  any new leads that match rules will be added to sequence automatically."} />
      <div>
        <div className="font-bold text-lg">Task for MERN stack</div>
        <p className="text-sm text-muted-foreground">
          Click on a block to configure and add it in sequence.
        </p>
      </div>
      <div className="flex gap-2">
        <Button 
        disabled={selectedLeads?.length > 0}
          onClick={addLeadHandler}
          className="cursor-pointer flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        >
          <span>
            <Plus />
          </span>
          Add lead source
        </Button>
        <Button
          onClick={clickHandler}
          disabled={isDisabled}
          className="cursor-pointer flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        >
          <span>
            <Rocket />
          </span>
          Save & Schedule
        </Button>
      </div>
    </div>
  );
};

export default Header;
