/* eslint-disable no-unsafe-optional-chaining */
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
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { coldEmailsData, coldEmailTypesData } from "../../data";
import useStore from "@/store";
import { useReactFlow } from "@xyflow/react";
// import toast from "react-hot-toast";

const formSchema = z.object({
  emailTemplateId: z.string().min(1, {
    message: "Field is required",
  }),
  typeId: z.string().min(1, {
    message: "Field is required",
  }),
});

export const OutreachMainModal = ({
  title,
  description,
  isOpen,
  onClose,
  initialData = null,
}) => {
  const { setNodes } = useReactFlow();
  const action =
    initialData && typeof initialData === "object" ? "Update" : "Insert";
  const { updateLead, selectedLeads } = useStore();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          typeId: initialData?.type?.id,
          emailTemplateId: initialData?.template?.id,
        }
      : {
          emailTemplateId: "",
          typeId: "",
        },
  });

  const onSubmit = async (data) => {
    // console.log(data);
    const emailTemplate = coldEmailsData.find(
      (item) => item.id === data.emailTemplateId
    );
    const emailType = coldEmailTypesData.find(
      (item) => item.id === data.typeId
    );
    const currentLead = selectedLeads[0];
    const nodes = [...currentLead?.nodes];
    const edges = [...currentLead?.edges];
    const nodeId = Math.random().toString(36).substring(2, 9);
    const edgeId = Math.random().toString(36).substring(2, 9);

    const node = {
      id: nodeId,
      type: "email-node",
      position: {
        x: nodes[nodes.length - 2]?.position?.x + 100 || 0,
        y: nodes[nodes.length - 2]?.position?.y + 50 || 0,
      },
      data: { template: emailTemplate, type: emailType, nodeId },
    };
    const edge = {
      id: edgeId,
      source: nodeId,
      target: currentLead?.nodes[currentLead?.nodes.length - 1]?.id,
      animated: true,
      type: "default",
    };

    edges.splice(edges.length - 1, 1, {
      ...edges[edges.length - 1],
      target: nodeId,
    });
    const newEdges = [...edges, edge];

    nodes.splice(-1, 0, node);
    const leads = [
      {
        ...currentLead,
        nodes,
        edges: newEdges,
      },
    ];

    updateLead(leads);
    onClose();
    window.location.reload();
  };

  const onUpdate = async (data) => {
    // console.log(data);
    const emailTemplate = coldEmailsData.find(
      (item) => item.id === data.emailTemplateId
    );
    const emailType = coldEmailTypesData.find(
      (item) => item.id === data.typeId
    );
    let newNodes = [...selectedLeads[0]?.nodes]?.map((node) =>
      node.id == initialData.nodeId
        ? {
            ...node,
            data: { ...node?.data, template: emailTemplate, type: emailType },
          }
        : node
    );
    // console.log( newNodes );
    setNodes([...newNodes]);
    updateLead([{ ...selectedLeads[0], nodes: [...newNodes] }]);
    onClose();
  };

  // console.log(action,initialData);

  return (
    <Modal
      title={title || "Cold Email"}
      description={description || "Send an email to a lead."}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <hr />
        <div className="py-6">
          <div className="flex gap-2 justify-between items-center">
            <h1 className="text-lg">Email Template</h1>
            <Button
              // onClick={addLeadHandler}
              className="cursor-pointer flex justify-center items-center text-blue-500 bg-blue-100 hover:bg-blue-200 font-medium rounded-sm text-sm px-5 py-2.5 mb-2 border border-blue-300"
            >
              New Template
              <span>
                <CirclePlus />
              </span>
            </Button>
          </div>
          <Form {...form}>
            <form
              onSubmit={
                initialData && typeof initialData === "object"
                  ? form.handleSubmit(onUpdate)
                  : form.handleSubmit(onSubmit)
              }
              className="w-full flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="emailTemplateId"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Category</FormLabel> */}
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
                            placeholder="Select a email template"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {coldEmailsData?.map((item) => (
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

              <FormField
                control={form.control}
                name="typeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Send Email As</FormLabel>
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
                            placeholder="Send email as"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {coldEmailTypesData?.map((item) => (
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
                // disabled={form.getValues("emailTemplateId") === ""}
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
