/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { CircleCheck, Hourglass, Mail, Martini } from "lucide-react";
import Modal from "../ui/modal";
import useStore from "@/store";

const outreachData = [
  {
    id: "1",
    name: "Cold Email",
    description: "Send an email to a lead.",
    icon: Mail,
  },
  {
    id: "2",
    name: "Task",
    description: "Schedule a manual task.",
    icon: CircleCheck,
  },
];

const conditionsData = [
  {
    id: "1",
    name: "wait",
    description: "Add a delay between blocks.",
    icon: Hourglass,
  },
  {
    id: "2",
    name: "If/Else (Rules)",
    description: "Route leads through the sequence based on events.",
    icon: Martini,
  },
];

export const OutreachBlockModal = ({ title, description, isOpen, onClose, nodes = null }) => {
  const {  selectedLeads, onOutreachMainModalOpen, onOutreachConditionModalOpen } = useStore();

  const onClick = (item,type) => {
    onClose();
    if(type === "Outreach"){
      console.log('insidde-11');
      onOutreachMainModalOpen();
    }else{
      console.log('insidde-22');
      onOutreachConditionModalOpen();
    }
  };

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pb-2">
        <h1 className="text-xl">Outreach</h1>
        <div className="py-3">
          {/* Source Card */}

          {outreachData.map((item) => (
            <div
              key={item.id}
              onClick={() => onClick(item,"Outreach")}
              className="flex gap-2 border p-4 my-3 bg-white hover:bg-gray-100 cursor-pointer rounded-sm"
            >
              <div className="flex justify-center items-center">
                <span className="w-14 h-14 border rounded-sm bg-blue-100 flex justify-center items-center border-blue-300">
                  <item.icon className="text-blue-500" />
                </span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg">{item.name}</h1>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* {nodes?.some((node) => node.type === "email-node") && ( */}
        <div>
          <h1 className="text-xl">Conditions</h1>
          <div className="py-3">
            {/* Source Card */}

            {conditionsData.map((item) => (
              <div
                key={item.id}
                onClick={() => onClick(item,"Conditions")}
                className="flex gap-2 border p-4 my-3 bg-white hover:bg-gray-100 cursor-pointer rounded-sm"
              >
                <div className="flex justify-center items-center">
                  <span className="w-14 h-14 border rounded-sm bg-blue-100 flex justify-center items-center border-blue-300">
                    <item.icon className="text-blue-500" />
                  </span>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-lg">{item.name}</h1>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      {/* )} */}
    </Modal>
  );
};
