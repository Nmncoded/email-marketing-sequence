import { LeadSourceModal } from "../modals/lead-source-modal";
import useStore from "@/store";
import ReactFlowContent from "./reactFlowContent";
import { CircleX } from "lucide-react";
import { OutreachMainModal } from "../modals/outreach-main-modal";
import { OutreachBlockModal } from "../modals/outreach-block-modal";
import { OutreachConditionsModal } from "../modals/outreach-conditions-modal";
import { useReactFlow } from "@xyflow/react";
import { SaveScheduleModal } from "../modals/save-modal";

export default function Content() {
  const {
    isOpen,
    onClose,
    selectedLeads,
    updateLead,
    removeLead,
    outreachMainModalOpen,
    onOutreachMainModalClose,
    outreachBlockModalOpen,
    onOutreachBlockModalClose,
    outreachConditionModalOpen,
    onOutreachConditionModalClose,
    saveScheduleModalOpen,
    onSaveScheduleModalClose,
  } = useStore();
  const {getNodes} = useReactFlow();
  const nodes = getNodes();
  // console.log(selectedLeads,nodes);

  return (
    <div className="w-screen h-screen flex flex-col">
      {
        Boolean(saveScheduleModalOpen) &&
        <SaveScheduleModal title={"Save & Schedule"} isOpen={Boolean(saveScheduleModalOpen)} onClose={onSaveScheduleModalClose} />
      }
      {
        Boolean(isOpen) &&
        <LeadSourceModal
          title="Leads from List(s)"
          description="Connect multiple lists as source for this sequence."
          isOpen={Boolean(isOpen)}
          onClose={onClose}
        />
      }
      {
        Boolean(outreachMainModalOpen) &&
      <OutreachMainModal
        title={"Cold Email"}
        description={"Send an email to a lead."}
        isOpen={Boolean(outreachMainModalOpen)}
        onClose={onOutreachMainModalClose}
        initialData={typeof outreachMainModalOpen === 'object' ? outreachMainModalOpen : null}
      />
      }
      {
        Boolean(outreachBlockModalOpen) &&
      <OutreachBlockModal
        nodes={null}
        isOpen={Boolean(outreachBlockModalOpen)}
        onClose={onOutreachBlockModalClose}
        title={"Add Blocks"}
        nodesData={nodes}
        description={
          "Pick a block & configure,  any new leads that match rules will be added to sequence automatically."
        }
      />
      }
      {
        Boolean(outreachConditionModalOpen) &&
      <OutreachConditionsModal
        title={"Wait"}
        description={"Add a delay between blocks."}
        isOpen={Boolean(outreachConditionModalOpen)}
        onClose={onOutreachConditionModalClose}
        initialData={ typeof outreachConditionModalOpen === 'object' ? outreachConditionModalOpen : null}
      />
      }

      {selectedLeads.length === 0 && (
        <div className="flex flex-col items-center justify-center flex-grow">
          <h1 className="text-2xl font-bold mb-4">No leads selected</h1>
          <p className="text-lg text-muted-foreground">
            Select leads to add them to the sequence.
          </p>
        </div>
      )}

      {selectedLeads.length > 0 && (
        <div
          className={`grid ${
            selectedLeads.length === 1 ? "grid-cols-1" : "grid-cols-2"
          } gap-4 p-4 overflow-auto flex-grow`}
        >
          {selectedLeads.map((lead) => (
            <div
              key={lead.id}
              className="border rounded-lg overflow-hidden shadow-md"
            >
              <div className="flex justify-between items-center p-2 bg-gray-100 border-b">
                <h2 className="text-sm font-semibold">
                  {lead.name || "Untitled Lead"}
                </h2>
                <span
                  onClick={() => removeLead(lead.id)}
                  className="cursor-pointer w-6 h-6 border rounded-sm bg-blue-100 flex justify-center items-center border-blue-300"
                >
                  <CircleX className="text-blue-500" />
                </span>
              </div>
              <div className="h-full w-full">
                <ReactFlowContent
                  lead={lead}
                  selectedLeads={selectedLeads}
                  updateLead={updateLead}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
