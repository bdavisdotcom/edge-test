import { AgGridReact, AgGridReactProps } from "@ag-grid-community/react";
import {
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
} from "@ag-grid-community/core";
import { ModuleRegistry } from "@ag-grid-community/core";
import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
} from "react";

declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactNode | null
  ): (props: P & React.RefAttributes<T>) => React.ReactNode | null;
}

ModuleRegistry.registerModules([
  InfiniteRowModelModule,
  ClientSideRowModelModule,
]);
ModuleRegistry.registerModules([]);

const Grid = forwardRef(function GridWithoutRef<TData>(
  {
    getRows,
    context,
    ...props
  }: {
    getRows?: (params: IGetRowsParams) => Promise<void>;
    context?: { search: string; [key: string]: string };
  } & Omit<AgGridReactProps<TData>, "onGridReady" | "context">,
  ref: ForwardedRef<AgGridReact<TData>>
) {
  const grid = useRef<AgGridReact | null>(null);

  useEffect(() => {
    if (context) {
      grid.current?.api?.setGridOption("context", context);
      grid.current?.api?.sizeColumnsToFit();

      if (getRows) {
        grid.current?.api?.refreshInfiniteCache();
      }
    } else {
      grid.current?.api?.setGridOption("context", { search: "" });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  useEffect(() => {
    grid.current?.api?.sizeColumnsToFit();
  });

  const onGridReady = useCallback(
    ({ api }: GridReadyEvent<TData>) => {
      const dataSource: IDatasource = {
        rowCount: undefined,
        getRows: async (params) => {
          await getRows?.(params);
          api.sizeColumnsToFit();
        },
      };

      api.setGridOption("datasource", dataSource);
    },
    [getRows]
  );

  return (
    <AgGridReact
      ref={(node) => {
        grid.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      context={context ?? { search: "" }}
      autoSizeStrategy={{
        type: "fitGridWidth",
        defaultMinWidth: 25,
      }}
      defaultColDef={{ resizable: false }}
      headerHeight={48}
      rowHeight={58}
      domLayout="autoHeight"
      pagination={!!getRows}
      rowModelType={getRows ? "infinite" : "clientSide"}
      paginationPageSize={10}
      paginationPageSizeSelector={[5, 10, 25, 50]}
      onGridReady={getRows && onGridReady}
      {...props}
    />
  );
});

export { Grid };
export default Grid;
