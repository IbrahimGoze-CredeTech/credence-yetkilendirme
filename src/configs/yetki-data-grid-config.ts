import { IDataGridOptions } from "devextreme-react/data-grid";

export const yetkiler = [
  {
    yetkiId: 1,
    yetkiAdi: "Hesap Bilgileri",
    siniflandirma: null,
  },
  {
    yetkiId: 2,
    yetkiAdi: "Hesap Bilgileri Ozeti",
    siniflandirma: null,
  },
  {
    yetkiId: 3,
    yetkiAdi: "Borc Bilgileri",
    siniflandirma: null,
  },
  {
    yetkiId: 4,
    yetkiAdi: "Borc Bilgileri Ozeti",
    siniflandirma: null,
  },
  {
    yetkiId: 5,
    yetkiAdi: "Aktif Telefonlar",
    siniflandirma: null,
  },
  {
    yetkiId: 6,
    yetkiAdi: "Hizli Odeme Plani",
    siniflandirma: null,
  },
  {
    yetkiId: 7,
    yetkiAdi: "Hesap Bilgileri Detayi",
    siniflandirma: null,
  },
  {
    yetkiId: 8,
    yetkiAdi: "Gorusmeler",
    siniflandirma: null,
  },
  {
    yetkiId: 9,
    yetkiAdi: "Arama Tarihcesi",
    siniflandirma: null,
  },
  {
    yetkiId: 10,
    yetkiAdi: "SMS",
    siniflandirma: null,
  },
  {
    yetkiId: 11,
    yetkiAdi: "Odeme Planlari",
    siniflandirma: null,
  },
  {
    yetkiId: 12,
    yetkiAdi: "Tahsilatlar",
    siniflandirma: null,
  },
  {
    yetkiId: 13,
    yetkiAdi: "Icra/Dava Takip",
    siniflandirma: null,
  },
  {
    yetkiId: 14,
    yetkiAdi: "Istihbarat",
    // siniflandirma: null,
  },
  {
    yetkiId: 15,
    yetkiAdi: "R-DOC",
    // siniflandirma: null,
  },
];

export const yetkiDataGridConfig: IDataGridOptions = {
  id: "yekidatagrid",
  allowColumnReordering: true,
  allowColumnResizing: true,
  showBorders: false,
  columnAutoWidth: true,
  showRowLines: true,
  columns: [
    // { dataField: "yetkiId", caption: "Yetki ID", visible: false },
    {
      dataField: "yetkiAdi",
      caption: "Yetki",
      lookup: {
        dataSource: yetkiler,
        valueExpr: "yetkiAdi",
        displayExpr: "yetkiAdi",
      },
    },
    { dataField: "rolAdi", caption: "Rol" },
  ],
};
