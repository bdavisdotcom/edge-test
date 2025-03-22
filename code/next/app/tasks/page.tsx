"use client";
import { useCallback, useEffect, useRef } from "react";
import {
  ICellRendererParams,
  ColDef,
  IGetRowsParams,
} from "@ag-grid-community/core";
import axios from "axios";

import { Button } from "@/components/button";
import { Grid } from "@/components/grid";
import { Task } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useOverlay } from "@/components/overlays/overlays-provider";
import { AgGridReact } from "@ag-grid-community/react";
import { useUserContext } from "@/components/user-context";
import { getSession } from "@/lib/session";

const displayDateFormater = (params: any) => {
  return (new Date(params.value)).toLocaleString();
}

export default function Tasks() {
  const { currentUser } = useUserContext();
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
      console.log("DESTROY TASK");
      // destroy(id, {
      //   onSuccess: () => {
      //     grid.current?.api?.refreshInfiniteCache();
      //     notify("Employer removed", `Successfully deleted ${text}`);
      //   },
      // });
    }
  };

  const getRows = useCallback(async (params: IGetRowsParams) => {
    const { startRow, endRow, sortModel, context } = params;

    let orderCol = "hostBusinessId";
    let orderDir = "ASC";

    if (sortModel && sortModel.length) {
      orderCol = sortModel[0].colId;
      orderDir = sortModel[0].sort.toUpperCase();
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
      width: 100,
      cellClass: "underline font-medium cursor-pointer",
    },
    {
      headerName: "Priority",
      field: "priority",
      cellClass: "cursor-pointer",
      cellClassRules: { underline: ({ value }) => value },
      width: 80,
    },
    {
      headerName: "Status",
      field: "status",
      width: 80,
    },
    {
      headerName: "Due Date",
      field: "due_date",
      cellClass: "underline justify-center cursor-pointer",
      headerClass: "justify-center",
      width: 80,
      valueFormatter: displayDateFormater,
    },
    {
      headerName: "Title",
      field: "title",
      cellClass: "justify-center",
      headerClass: "justify-center",
      width: 80,
    },    
    {
      headerName: "Description",
      field: "description",
      cellClass: "justify-center",
      headerClass: "justify-center",
      width: 80,
    },        
    {
      headerName: "Updated",
      field: "updated_at",
      cellClass: "justify-center",
      headerClass: "justify-center",
      width: 80,
      valueFormatter: displayDateFormater,
    },        
    {
      headerName: "Created",
      field: "created_at",
      cellClass: "justify-center",
      headerClass: "justify-center",
      width: 80,
      valueFormatter: displayDateFormater,
    },                
    {
      headerName: "Manage",
      cellRenderer: ({ data }: ICellRendererParams<Task>) =>
        data && (
          <div className="flex justify-between flex-1">
            <Button
              onClick={() =>
                deleteTask(data.id, data.title)
              }
            >
              Delete
            </Button>
            <Button
              href={`/tasks/${data.id}`}
            >
              Edit
            </Button>
          </div>
        ),
      sortable: false,
      width: 120,
    },
  ];

  return (
    <div className="ag-theme-alpine ag-style">
      <Grid ref={grid} getRows={getRows} columnDefs={colDefs} />
    </div>
  );
}
