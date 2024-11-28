/* eslint-disable no-unused-vars */
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
import { waitTypesData } from "../../data";
import { Input } from "../ui/input";
import axios from "axios";
import { useState } from "react";
// import useStore from "@/store";
// import { useReactFlow } from "@xyflow/react";
import toast from "react-hot-toast";

const formSchema = z.object({
  wait: z.string().min(1, {
    message: "Field is required",
  }),
  waitTypeId: z.string().min(1, {
    message: "Field is required",
  }),
  email: z.string().min(1, {
    message: "Field is required",
  }),
  body: z.string().min(1, {
    message: "Field is required",
  }),
  subject: z.string().min(1, {
    message: "Field is required",
  }),
});

export const SaveScheduleModal = ({
  title,
  description,
  isOpen,
  onClose,
  initialData = null,
}) => {
  // const { setNodes } = useReactFlow();
  const action = "Schedule";
  const [isLoading, setIsLoading] = useState(false);  
  // const { updateLead, selectedLeads } = useStore();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wait: "",
      waitTypeId: "",
      email: "",
      subject: "",
      body: "",
    },
  });

  const onSubmit = async (data) => {
    // console.log(data, `${import.meta.env.VITE_BASE_URL}/schedule-email`);
    // const waitType = waitTypesData.find((item) => item.id === data.waitTypeId);
    setIsLoading(true);
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/schedule-email`, {
      email: data.email,
      subject: data.subject,
      body: data.body,
      scheduledTime: `${data.wait}`
    });
    // console.log(res);
    setIsLoading(false);
    toast.success("Email scheduled successfully");

    onClose();
  };

  return (
    <Modal
      title={title}
      description={description || ""}
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        // disabled={loading}
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        // disabled={loading}
                        placeholder="Subject"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="wait"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Schedule Time</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        // disabled={loading}
                        placeholder="schedule"
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
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email body</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        // disabled={loading}
                        placeholder="Enter email message"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading}
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
