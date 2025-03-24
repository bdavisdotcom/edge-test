
"use client";
import { H1 } from "@/components/h1";
import { Button } from "@/components/button";
import { TextAreaGroup } from "@/components/text-area-group";
import { TextInputGroup } from "@/components/text-input-group";
import { DateInputGroup } from "@/components/date-input-group";
import { SelectGroup } from "@/components/select-group";
import { useOverlay } from "@/components/overlays/overlays-provider";
import { Task } from "@/lib/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { getSession } from "@/lib/session";
import axios from "axios";
import { isDate, isValid } from "date-fns";

const schema = yup.object({
  status: yup.string().required().label("Status"),
  due_date: yup.number().transform((value, orig, ctx) => {
      return (new Date(orig)).getTime();
    }).required().label("Due Date"),
  title: yup.string().required().label("Title"),
  description: yup.string().required().label("Description"),
});

type TaskParams = {
  status: string;
  due_date: number;
  title: string;
  description: string;
}

export default function ManageTask({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = params.id === "new" ? undefined : params.id;
  const isEditing = !!id;
  const { notify } = useOverlay();
  const form = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: TaskParams) => {
    try {
      const url = isEditing ? `/api/tasks/${id}` : '/api/tasks';
      await axios.post(url, data);
      notify(
        `Successfully ${isEditing ? "updated" : "added"} ${data.title}`
      );
      router.push(`/tasks`);
    } catch (error) {
      form.setError("root", {
        type: "custom",
        message: `Unable to ${isEditing ? "update" : "add"} "${
          data.title
        }". Please try again.`,
      });
    }
  };

  useEffect(() => {
    const session = getSession();
    if (!session) {
      return router.push("/");
    }

    if (isEditing) {
      axios.get(`/api/tasks/${id}`).then((result) => {
        form.reset(result.data.task);
      }, (err) => {
        form.setError("root", err.message);
      });
    }
  }, []);

  return (
    <div>
      <form className="p-4" onSubmit={form.handleSubmit(onSubmit)}>

        <div className="flex flex-col gap-4">

        <div className="p-4">
          <H1>Tasks</H1>
        </div>

          <TextInputGroup
              type="text"
              label="Title"
              name="title"
              form={form}
              placeholder=""
            />

          <div className="flex flex-row">
            <SelectGroup
              className="w-48"
              label="Status"
              name="status"
              form={form}
              required
              placeholder="Status"
              options={[{ label: "Open", value: "OPEN" }, { label: "Closed", value: "CLOSED" }]}
            />
          </div>

          <TextAreaGroup
            label="Description"
            name="description"
            form={form}
            placeholder="Add task notes here"
            style={{ minHeight: 130 }}
          />

          <div className="flex flex-row">
            <DateInputGroup
              label="Due Date"
              placeholder="MM/DD/YYYY"
              name="due_date"
              form={form}            
            />
          </div>

          {form.formState.errors.root && (
            <p className="text-orange text-sm font-medium mb-4">
              {form.formState.errors.root.message}
            </p>
          )}

        </div>

        <Button
          loading={form.formState.isSubmitting}
          className="w-1/3"
          priority="primary"
          size="large"           
        >
          { isEditing ? "Update Task" : "Add Task" }
        </Button>

      </form>

      <a className="m-4 underline" href="/tasks">Back</a>

    </div>
  );
}
