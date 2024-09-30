import React, { useCallback, useEffect, useState } from "react";
import Button from "devextreme-react/button";
import DataGrid, {
  Column,
  Editing,
  Paging,
  SearchPanel,
  Popup,
  Form,
  FilterRow,
  MasterDetail,
} from "devextreme-react/data-grid";
import authorityDataGridConfig from "../authority-data-grid-config";
import { Kisi, Yetki } from "../types";
import { isYetkiArray } from "../utils";

// Roller ve Yetkiler tipleri
// interface Rol {
//   kisiId: number;
//   kisiAdi: string;
//   kisiSoyadi: string;
//   rolId: number;
//   rolAdi: string;
//   baslangicTarihi: string;
//   bitisTarihi: string;
//   talepEden: string;
//   onaylayan: string;
//   onaylanmaTarihi: string;
//   yetkiler: Yetki[];
//   yetkiAdi: string; // İkinci griddeki alanlar
//   departman?: string;
//   siniflandirmaSeviyesi?: string;
// }

// interface ApiData {
//   kisiAdi: string;
//   kisiSoyadi: string;
//   roller: Rol[];
//   departman: string;
// }

// Define a map of enums for Yetki
// const YetkiEnum: { [key: number]: string } = {};

const App = () => {
  const [events, setEvents] = useState<string[]>([]);
  const [employees, setEmployees] = useState<Kisi[]>([]); // API'den gelecek roller için state
  const [showMoreData, setShowMoreData] = useState(false); // Yeni grid'in görünürlüğü için state
  const [yetkiler, setYetkiler] = useState<Yetki[]>([]);


  useEffect(() => {
    const fetchData = async () => {

      // API'den verileri fetch ile alma
      const yetkilerFetch = fetch('https://localhost:7210/api/Yetki').then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      });
      const bilgilerFetch = fetch("https://localhost:7210/api/Kisi/butun-bilgiler/1") // API URL'nizi buraya ekleyin
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
      // .then((data: ApiData) => {
      //   console.log("data: ", data);
      //   setEmployees(data.roller); // Gelen roller verilerini employees state'ine set ediyoruz
      // })
      // .catch((error) =>
      //   console.error("There was a problem with your fetch operation:", error)
      // );
      try {
        const [bilgilerData, yetkilerData] = await Promise.all([bilgilerFetch, yetkilerFetch]);
        if (bilgilerData && yetkilerData) {
          setEmployees(bilgilerData);
          console.log('bilgilerData: ', bilgilerData);

          // console.log('yetkilerData: ', yetkilerData);

          if (isYetkiArray(yetkilerData)) setYetkiler(yetkilerData);
          else console.error("Data is not a valid Yetki array");

        }
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    }
    fetchData();
  }, []);

  const logEvent = useCallback((eventName: string) => {
    setEvents((previousEvents) => [eventName, ...previousEvents]);
  }, []);

  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  // Daha fazla/daha az butonuna basıldığında çağrılan fonksiyon
  const toggleMoreData = () => {
    setShowMoreData((prevState) => !prevState); // Grid'in görünürlüğünü değiştiriyoruz
  };

  return (
    <>
      {/* <h2>Roller</h2>
      <ul>
      {yetkiler.map((yetki) => (
        <li key={yetki.yetkiId}>
            {yetki.yetkiId}: {yetki.yetkiAdi}
          </li>
          ))}
          </ul> */}
      {/* İlk grid */}
      <DataGrid
        id="gridContainer"
        dataSource={[employees]} // Burada roller verisini kullanıyoruz
        keyExpr="kisiAdi" // 'rolId' ile her satırı tanımlıyoruz
        allowColumnReordering={true}
        showBorders={true}
      // {...authorityDataGridConfig}
      >
        <FilterRow visible={true} />

        <Paging enabled={true} />
        <Editing
          mode="popup" // Düzenleme işlemi popup içinde yapılacak
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true}
          useIcons={true}
        >
          {/* Popup özelliklerini yapılandırıyoruz */}
          <Popup
            title="Rol Düzenle"
            showTitle={true}
            width={700}
            height={600}
          />
        </Editing>

        {/* Main Columns */}
        <Column dataField="kisiAdi" caption="Ad" />
        <Column dataField="kisiSoyadi" caption="Soyad" />
        <Column dataField="departman" caption="Departman" />
        {/* Master-Detail Configuration */}
        <MasterDetail
          enabled={true}
          component={({ data }) => (
            <>
              {/* Roller Sub-grid */}
              <h4>Roller</h4>
              <DataGrid
                dataSource={data.data.roller} // Nested data from roller
                showBorders={true}

              >
                <Editing
                  mode="popup" // Düzenleme işlemi popup içinde yapılacak
                  allowUpdating={true}
                  allowDeleting={true}
                  allowAdding={true}
                  useIcons={true}
                >
                  {/* Popup özelliklerini yapılandırıyoruz */}
                  <Popup
                    title="Rol Düzenle"
                    showTitle={true}
                    width={700}
                    height={600}
                  />
                </Editing>
                <Column dataField="rolAdi" caption="Rol Adı" />
                <Column dataField="baslangicTarihi" caption="Başlangıç Tarihi" dataType="date" />
                <Column dataField="bitisTarihi" caption="Bitiş Tarihi" dataType="date" />
                <Column dataField="talepEden" caption="Talep Eden" />
                <Column dataField="onaylayan" caption="Onaylayan" />
                <Column dataField="onaylanmaTarihi" caption="Onaylanma Tarihi" dataType="date" />
              </DataGrid>

              {/* Yetkiler Sub-grid */}
              <h4>Yetkiler</h4>
              <DataGrid
                dataSource={data.data.yetkiler} // Nested data from yetkiler
                showBorders={true}
              >
                <Editing
                  mode="popup" // Düzenleme işlemi popup içinde yapılacak
                  allowUpdating={true}
                  allowDeleting={true}
                  allowAdding={true}
                  useIcons={true}
                >
                  {/* Popup özelliklerini yapılandırıyoruz */}
                  <Popup
                    title="Rol Düzenle"
                    showTitle={true}
                    width={700}
                    height={600}
                  />
                </Editing>
                <Column dataField="yetkiAdi" caption="Yetki Adı" />
                <Column dataField="rolAdi" caption="Rol Adı" />
              </DataGrid>

              {/* EkstraYetkiler Sub-grid */}
              <h4>Ekstra Yetkiler</h4>
              <DataGrid
                dataSource={data.data.ekstraYetkiler} // Nested data from ekstraYetkiler
                showBorders={true}
              >
                <Editing
                  mode="popup" // Düzenleme işlemi popup içinde yapılacak
                  allowUpdating={true}
                  allowDeleting={true}
                  allowAdding={true}
                  useIcons={true}
                >
                  {/* Popup özelliklerini yapılandırıyoruz */}
                  <Popup
                    title="Rol Düzenle"
                    showTitle={true}
                    width={700}
                    height={600}
                  />
                </Editing>
                <Column dataField="yetkiAdi" caption="Yetki Adı" />
                <Column dataField="ekstraYetkiBaslangicTarihi" caption="Başlangıç Tarihi" dataType="date" />
                <Column dataField="ekstraYetkiBitisTarihi" caption="Bitiş Tarihi" dataType="date" />
                <Column dataField="ekstraYetkiTalepEden" caption="Talep Eden" />
                <Column dataField="ekstraYetkiOnaylayan" caption="Onaylayan" />
              </DataGrid>
            </>
          )}
        />

      </DataGrid>

      {/* Daha Fazla / Daha Az butonu */}
      <Button
        text={showMoreData ? "Daha Az" : "Daha Fazla"} // Text state'e bağlı olarak değişiyor
        onClick={toggleMoreData}
        style={{ marginTop: "10px", marginBottom: "20px" }}
      />

      {/* Yeni grid, görünürlük showMoreData state'ine bağlı */}
      {showMoreData && (
        <DataGrid
          id="moreDataGrid"
          dataSource={employees} // Bu veri kaynağını istediğiniz gibi değiştirebilirsiniz
          keyExpr="rolId"
          allowColumnReordering={true}
          showBorders={true}
          onEditingStart={() => logEvent("MoreDataGridEditingStart")}
          onRowInserting={() => logEvent("MoreDataGridRowInserting")}
          onRowInserted={() => logEvent("MoreDataGridRowInserted")}
          onRowUpdating={() => logEvent("MoreDataGridRowUpdating")}
          onRowUpdated={() => logEvent("MoreDataGridRowUpdated")}
          onRowRemoving={() => logEvent("MoreDataGridRowRemoving")}
          onRowRemoved={() => logEvent("MoreDataGridRowRemoved")}
        >
          <FilterRow visible={true} />
          <Paging enabled={true} />
          <Editing
            mode="popup" // Burada da popup modunu etkinleştiriyoruz
            allowUpdating={true}
            allowDeleting={true}
            allowAdding={true}
            useIcons={true}
          >
            <Popup
              title="Yetki Düzenle"
              showTitle={true}
              width={700}
              height={600}
            />
            <Form>
              <Column dataField="kisiAdi" />
              <Column dataField="kisiSoyadi" />
              <Column dataField="yetkiAdi" caption="Yetki" />
              <Column dataField="departman" />
              <Column
                dataField="siniflandirmaSeviyesi"
                caption="Sınıflandırma Seviyesi"
              />
            </Form>
          </Editing>
          <SearchPanel visible={true} width={240} placeholder="Ara..." />

          {/* İlk griddeki gibi Ad ve Soyad sütunları ekliyoruz */}
          <Column dataField="kisiAdi" caption="Ad" />
          <Column dataField="kisiSoyadi" caption="Soyad" />

          {/* Yeni sütunlar */}
          <Column dataField="yetkiAdi" caption="Yetkiler" />
          <Column dataField="departman" caption="Departman" />
          <Column
            dataField="siniflandirmaSeviyesi"
            caption="Sınıflandırma Seviyesi"
          />
        </DataGrid>
      )}

      <div id="events">
        <div>
          <div className="caption">Fired events</div>
          <Button id="clear" text="Clear" onClick={clearEvents} />
        </div>
        <ul>
          {events.map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
