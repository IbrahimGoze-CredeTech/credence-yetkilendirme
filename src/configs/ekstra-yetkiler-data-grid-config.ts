import { IDataGridOptions } from "devextreme-react/data-grid";

export const ekstraYetkilerDataGridConfig: IDataGridOptions = {
  id: "ekstraYetkilerdatagrid",
  allowColumnReordering: true,
  allowColumnResizing: true,
  showBorders: false,
  columnAutoWidth: true,
  showRowLines: true,
  columns: [
    { dataField: "yetkiAdi", caption: "Yetki" },
    {
      dataField: "ekstraYetkiBaslangicTarihi",
      caption: "Başlangıç Tarihi",
      dataType: "date",
    },
    {
      dataField: "ekstraYetkiBitisTarihi",
      caption: "Bitiş Tarihi",
      dataType: "date",
    },
    { dataField: "ekstraYetkiTalepEden", caption: "Talep Eden" },
    { dataField: "ekstraYetkiOnaylayan", caption: "Onaylayan" },
  ],
};
