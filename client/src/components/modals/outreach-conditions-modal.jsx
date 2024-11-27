/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
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
import {  waitTypesData } from "../../data";
import { Input } from "../ui/input";
import useStore from "@/store";
// import toast from "react-hot-toast";

const formSchema = z.object({
  wait: z.string().min(1, {
    message: "Field is required",
  }),
  waitTypeId: z.string().min(1, {
    message: "Field is required",
  }),
});

export const OutreachConditionsModal = ({
  title,
  description,
  isOpen,
  onClose,
  action = "Insert",
  initialData = null,
}) => {
  const { updateLead, selectedLeads } = useStore();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? { ...initialData }
      : {
          wait: "",
          waitTypeId: "",
        },
  });

  const onSubmit = async (data) => {
    // console.log(data);
    const waitType = waitTypesData.find(
      (item) => item.id === data.waitTypeId
    );
    const currentLead = selectedLeads[0];
    const nodes = [...currentLead?.nodes];
    const edges = [...currentLead?.edges];
    const nodeId = Math.random().toString(36).substring(2, 9);
    const edgeId = Math.random().toString(36).substring(2, 9);

    const node = {
      id: nodeId,
      type: "delay-node",
      position: {
        x: nodes[nodes.length - 1]?.position?.x + 100 || 0,
        y: nodes[nodes.length - 1]?.position?.y || 0,
      },
      data: { wait: data?.wait, type: waitType, nodeId },
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

  return (
    <Modal
      title={title || "Wait"}
      description={description || "Add a delay between blocks."}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <hr />
        <div className="py-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="wait"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wait For</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        // disabled={loading}
                        placeholder="Wait"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="waitTypeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wait Type</FormLabel>
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
                            placeholder="Select wait type"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {waitTypesData?.map((item) => (
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
                // disabled={form.getValues("wait") === ""}
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
