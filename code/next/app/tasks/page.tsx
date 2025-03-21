"use client";
import { useCallback, useRef } from "react";
import {
  ICellRendererParams,
  ColDef,
  IGetRowsParams,
} from "@ag-grid-community/core";
import axios from "axios";

import { Button } from "@/components/button";
import { Grid } from "@/components/grid";
// import { Employer } from "@/lib/types";
import { useRouter } from "next/navigation";
// import { useOverlay } from "@/components/overlays-provider";
// import { useEmployer } from "@/lib/api-hooks/employer";
import { AgGridReact } from "@ag-grid-community/react";

function Tasks() {
  const grid = useRef<AgGridReact>(null);
  const router = useRouter();
  const { destroy } = useEmployer();
  const { confirm, notify } = useOverlay();

  const deleteEmployer = async (id: number, text: string) => {
    const didConfirm = await confirm(
      <>
        Are you sure you want to delete
        <br />
        <span className="text-orange">{text}</span>?
      </>
    );

    if (didConfirm) {
      destroy(id, {
        onSuccess: () => {
          grid.current?.api?.refreshInfiniteCache();
          notify("Employer removed", `Successfully deleted ${text}`);
        },
      });
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
      const response = await axios.get("/api/admin/employers", {
        params: {
          take: endRow - startRow,
          skip: startRow,
          orderCol,
          orderDir,
          search: context.search || undefined,
        },
      });
      const { employers, count } = response.data.data;

      params.successCallback(employers, count);
    } catch (error) {
      params.successCallback([], 0);
    }
  }, []);

  const colDefs: ColDef<Employer>[] = [
    {
      headerName: "Employer ID",
      field: "hostBusinessId",
      width: 100,
      cellClass: "underline font-medium cursor-pointer",
      onCellClicked: ({ data }) =>
        data && router.push(`/admin/employers/${data.hostBusinessId}`),
    },
    {
      headerName: "Host Business",
      field: "businessName",
      cellClass: "cursor-pointer",
      cellClassRules: { underline: ({ value }) => value },
      valueFormatter: ({ value }) => value || "—",
      onCellClicked: ({ data }) =>
        data && router.push(`/admin/employers/${data.hostBusinessId}`),
    },
    {
      headerName: "Point of Contact",
      valueFormatter: ({ data }) => {
        return data && data.pocLastName
          ? `${data.pocLastName}, ${data.pocFirstName}`
          : "—";
      },
      field: "pocLastName",
      flex: 1,
    },
    {
      headerName: "Active",
      valueGetter: ({ data }) => data?.jobListings.length,
      sortable: false,
      cellClass: "underline justify-center cursor-pointer",
      headerClass: "justify-center",
      width: 80,
      onCellClicked: ({ data }) =>
        data &&
        router.push(
          `/admin/employers/${data.hostBusinessId}/internship-postings`
        ),
    },
    {
      headerName: "Manage",
      cellRenderer: ({ data }: ICellRendererParams<Employer>) =>
        data && (
          <div className="flex justify-between flex-1">
            <Button
              priority="underline"
              iconLeft="trash"
              onClick={() =>
                deleteEmployer(data.hostBusinessId, data.businessName)
              }
            >
              Delete
            </Button>
            <Button
              priority="underline"
              iconLeft="pen"
              href={`/admin/employers/${data.hostBusinessId}`}
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

export { EmployerList };
export default EmployerList;
