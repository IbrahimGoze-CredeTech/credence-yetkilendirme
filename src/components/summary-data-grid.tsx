import DataGrid, { Column, FilterRow, HeaderFilter } from "devextreme-react/data-grid";
import { useEffect, useState } from "react";
import { KisiOzet } from "../types";
import { roles } from "../modals/roller";
import { yetkilerAdi } from "../modals/yetkiler";
import { useModalContext } from "../context";

export default function SummaryDataGrid() {
  const [kisiOzet, setKisiOzet] = useState<KisiOzet[]>([])
  const modalContext = useModalContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://localhost:7210/api/Kisi/ozet-bilgi").then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      // const data = response;
      // console.log('kisiOzet: ', response);
      setKisiOzet(response)
    }
    fetchData();
  }, [])

  ///-----

  const rolesFilterOperations = ["contains", "endswith", "=", "startswith"];
  function rolesToFilterItem(item) {
    return {
      text: item,
      value: item
    };
  }
  const rolesHeaderFilter = {
    dataSource: {
      store: {
        type: "array",
        data: roles
      },
      map: rolesToFilterItem
    }
  };
  const yetkilerHeaderFilter = {
    dataSource: {
      store: {
        type: "array",
        data: yetkilerAdi
      },
      map: rolesToFilterItem
    }
  };
  function calculateFilterExpression(filterValue, selectedFilterOperation, target) {
    const column = this;
    if (filterValue) {
      const selector = (data) => {
        const applyOperation = (arg1, arg2, op) => {
          if (op === "=") return arg1 === arg2;
          if (op === "contains") return arg1.includes(arg2);
          if (op === "startswith") return arg1.startsWith(arg2);
          if (op === "endswith") return arg1.endsWith(arg2);
        };

        const values = column.calculateCellValue(data);
        return (
          values &&
          !!values.find((v) =>
            applyOperation(v, filterValue, selectedFilterOperation)
          )
        );
      };
      return [selector, "=", true];
    }
    return column.defaultCalculateFilterExpression.apply(this, arguments);
  }


  return (
    <>
      <DataGrid
        id="kisiOzet"
        keyExpr="id"
        dataSource={kisiOzet}
        showRowLines={true}
        showBorders={true}
        onRowClick={(e) => { modalContext.toggle() }}
      >
        <FilterRow visible={true} />
        <HeaderFilter visible={true} />


        {/* <Paging enabled={true} /> */}
        {/* <Editing
        mode="popup" // Düzenleme işlemi popup içinde yapılacak
        allowUpdating={true}
        allowDeleting={true}
        allowAdding={true}
        useIcons={true}
        >
        <Popup
        title="Rol Düzenle"
        showTitle={true}
        width={700}
        height={600}
        />
        </Editing> */}
        <Column
          dataField="ad"
          caption="Ad"
          allowHeaderFiltering={false} />
        <Column
          dataField="soyad"
          caption="Soyad"
          allowHeaderFiltering={false} />
        <Column
          dataField="departman"
          caption="Departman"
          allowHeaderFiltering={false}
        />
        <Column
          dataField="roller"
          caption="Rol"
          dataType="string"
          headerFilter={rolesHeaderFilter}
          calculateFilterExpression={calculateFilterExpression}
          filterOperations={rolesFilterOperations}
        >
          <HeaderFilter dataSource={roles} />
        </Column>

        <Column
          dataField="yetkiler"
          caption="Yetki"
          dataType="string"
          calculateFilterExpression={calculateFilterExpression}
          filterOperations={rolesFilterOperations}
          headerFilter={yetkilerHeaderFilter}
        ><HeaderFilter dataSource={yetkilerAdi} /></Column>

      </DataGrid>
    </>
  )
}
