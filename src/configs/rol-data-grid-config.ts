import { IDataGridOptions } from "devextreme-react/data-grid";

export const rolDataGridConfig: IDataGridOptions = {
  id: "roldatagrid",
  allowColumnReordering: true,
  allowColumnResizing: true,
  showBorders: false,
  columnAutoWidth: true,
  showRowLines: true,
  columns: [
    { dataField: "rolAdi", caption: "Rol" },
    { dataField: "baslangicTarihi", caption: "Başlangıç Tarihi" },
    { dataField: "bitisTarihi", caption: "Bitiş Tarihi" },
    { dataField: "talepEden", caption: "Talep Eden" },
    { dataField: "onaylayan", caption: "Onaylayan" },
    { dataField: "onaylanmaTarihi", caption: "Onaylanma Tarihi" },
  ],
};
