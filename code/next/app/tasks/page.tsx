"use client";
import { useCallback, useEffect, useRef } from "react";
import {
  ICellRendererParams,
  ColDef,
  IGetRowsParams,
} from "@ag-grid-community/core";
import axios from "axios";
import { H1 } from "@/components/h1";
import { Button } from "@/components/button";
import { Grid } from "@/components/grid";
import { Task } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useOverlay } from "@/components/overlays/overlays-provider";
import { AgGridReact } from "@ag-grid-community/react";
import { getSession } from "@/lib/session";

const displayDateFormater = (params: any) => {
  return (new Date(params.value)).toLocaleDateString();
}

export default function Tasks() {
  const grid = useRef<AgGridReact>(null);
  const router = useRouter();
  const { confirm, notify } = useOverlay();

  useEffect(() => {
    const session = getSession();
    if (!session) {
      return router.push("/");
    }
  }, []);


  const deleteTask = async (id: string, text: string) => {
    const didConfirm = await confirm(
      <>
        Are you sure you want to delete
        <br />
        <span className="text-orange">{text}</span>?
      </>
    );

    if (didConfirm) {
      try {
        await axios.delete(`/api/tasks/${id}`);
        grid.current?.api?.refreshInfiniteCache();
        notify("Task removed", `Successfully deleted ${text}`);
      } catch(err) {
        notify("Unable to remove task");
      }
    }
  };

  const getRows = useCallback(async (params: IGetRowsParams) => {
    const { startRow, endRow, sortModel, context } = params;

    let orderCol = "id";
    let orderDir = "asc";

    if (sortModel && sortModel.length) {
      orderCol = sortModel[0].colId;
      orderDir = sortModel[0].sort.toLowerCase();
    }

    try {
      const response = await axios.get(`/api/tasks?sort=${orderCol}&direction=${orderDir}`);

      params.successCallback(response.data?.tasks || [], response.data?.tasks?.length || 0);
    } catch (error) {
      params.successCallback([], 0);
    }
  }, []);

  const colDefs: ColDef<Task>[] = [
    {
      headerName: "ID",
      field: "id",
      width: 25,
      cellClass: "font-medium",
      sortable: true,
    },
    {
      headerName: "Status",
      field: "status",
      width: 25,
      sortable: true,
    },
    {
      headerName: "Due Date",
      field: "due_date",
      headerClass: "justify-end",
      cellClass: "justify-end",
      width: 25,
      valueFormatter: displayDateFormater,
      sortable: true,
    },
    {
      headerName: "Title",
      field: "title",
      headerClass: "justify-center",
      cellClass: "justify-center",
      width: 40,
      sortable: true,
    },    
    {
      headerName: "Description",
      field: "description",
      headerClass: "justify-center",
      cellClass: "justify-center",
      width: 125,
      sortable: true,
    },        
    {
      headerName: "Updated",
      field: "updated_at",
      headerClass: "justify-end",
      cellClass: "justify-end",
      width: 25,
      valueFormatter: displayDateFormater,
      sortable: true,
    },        
    {
      headerName: "Created",
      field: "created_at",
      headerClass: "justify-end",
      cellClass: "justify-end",
      width: 25,
      valueFormatter: displayDateFormater,
      sortable: true,
    },                
    {
      headerName: "Manage",
      cellRenderer: ({ data }: ICellRendererParams<Task>) =>
        data && (
          <div className="flex justify-between flex-1">
            <Button
              iconLeft="trash"
              onClick={() =>
                deleteTask(data.id, data.title)
              }
            >
              Delete
            </Button>
            <Button
              iconLeft="info-circle"
              href={`/tasks/${data.id}`}
            >
              Edit
            </Button>
          </div>
        ),
      sortable: false,
      width: 80,
    },
  ];

  return (
    <div className="ag-theme-alpine ag-style">
      <div className="flex w-full justify-between p-4">
        <div><H1>Tasks</H1></div>
        <div className="w-1/4">
          <Button priority="primary" size="large" onClick={() => router.push("/tasks/new")}>Add Task</Button>
        </div>        
      </div>
      <Grid ref={grid} getRows={getRows} columnDefs={colDefs} />      
    </div>
  );
}
