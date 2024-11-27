/* eslint-disable react/prop-types */
import { UserCheckIcon, UserRoundPlus } from "lucide-react";
import Modal from "../ui/modal";
import useStore from "@/store";

const data = [
  {
    id: "1",
    name: "Leads from list(s)",
    description: "Connect multiple list as source for this sequence.",
    icon: UserRoundPlus,
  },
  {
    id: "2",
    name: "Segment by Events",
    description: "Create a segment of leads who have engaged with emails previously.",
    icon: UserCheckIcon,

  },
];

export const AddSourceBlockModal = ({
  title,
  description,
  isOpen,
  onClose,
}) => {
  const { onOpen } = useStore();

  const onClick = () => {
    onClose();
    onOpen();
  };

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <h1 className="text-xl">Sources</h1>
        <div className="py-3">
          {/* Source Card */}

          {data.map((item) => (
            <div
              key={item.id}
              onClick={() => onClick(item.id)}
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
    </Modal>
  );
};
