/* eslint-disable react/prop-types */
import { CirclePlus } from "lucide-react";
import { Button } from "../ui/button";
import Modal from "../ui/modal";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { leadsListData } from "../../data";
import useStore from "@/store";
import toast from "react-hot-toast";

const formSchema = z.object({
  leadId: z.string().min(1, {
    message: "Field is required",
  }),
});

export const LeadSourceModal = ({
  title,
  description,
  isOpen,
  onClose,
  action = "Insert",
  initialData = null,
}) => {
  const { addLead, selectedLeads } = useStore();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? { ...initialData }
      : {
          leadId: "",
        },
  });

  const onSubmit = async (data) => {
    // console.log(data);
    if (selectedLeads?.find((item) => item.id === data.leadId)) {
      toast.error("Lead already exists");
      return;
    }
    const findLead = leadsListData.find((item) => item.id === data.leadId);
    const nodeId = Math.random().toString(36).substring(2, 9);
    const nodeId2 = Math.random().toString(36).substring(2, 9);

    const leadId = Math.random().toString(36).substring(2, 9);
    const edgeId = Math.random().toString(36).substring(2, 9);
    const edgeId2 = Math.random().toString(36).substring(2, 9);
    const ID = Math.random().toString(36).substring(2, 9);
    const nodes = [
      {
        id: nodeId,
        type: "node-card",
        position: { x: 100, y: 100 },
        data: { description: findLead.name, label: "Leads from" },
      },
      {
        id: nodeId2,
        type: "sequence-node",
        position: { x: 100, y: 200 },
        data: { label: "Sequence start point" },
      },
      {
        id: ID,
        type: "last-add-node-btn",
        position: {x: 100, y : 300},
      }
    ];

    const edges = [
      { id: edgeId, source: nodeId, target: nodeId2, animated: true, type: "default"},
      { id: edgeId2, source: nodeId2, target: ID, animated: true, type: "default"},
    ];

    addLead({
      ...findLead,
      nodes,
      edges,
      id: leadId,
    });
    onClose();
  };

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <hr />
        <div className="py-6">
          <div className="flex gap-2 justify-between items-center">
            <h1 className="text-lg">Select from list (s)</h1>
            <Button
              // onClick={addLeadHandler}
              className="cursor-pointer flex justify-center items-center text-blue-500 bg-blue-100 hover:bg-blue-200 font-medium rounded-sm text-sm px-5 py-2.5 mb-2 border border-blue-300"
            >
              New List
              <span>
                <CirclePlus />
              </span>
            </Button>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="leadId"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Select from list (s)</FormLabel> */}
                    <Select
                      // disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a list"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {leadsListData?.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                // disabled={form.getValues("leadId") === ""}
                type="submit"
                className="ml-auto cursor-pointer text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-sm text-sm py-2.5"
              >
                {action}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
