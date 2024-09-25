import React, { useCallback, useEffect, useState } from "react";
import Button from "devextreme-react/button";
import DataGrid, {
  Column,
  Editing,
  Paging,
  SearchPanel,
  Popup,
  Form,
} from "devextreme-react/data-grid";

// Roller ve Yetkiler tipleri
interface Rol {
  kisiId: number;
  kisiAdi: string;
  kisiSoyadi: string;
  rolId: number;
  rolAdi: string;
  baslangicTarihi: string;
  bitisTarihi: string;
  talepEden: string;
  onaylayan: string;
  onaylanmaTarihi: string;
  yetkiAdi?: string; // İkinci griddeki alanlar
  departman?: string;
  siniflandirmaSeviyesi?: string;
}

interface ApiData {
  kisiAdi: string;
  kisiSoyadi: string;
  roller: Rol[];
  departman: string;
}

const App = () => {
  const [events, setEvents] = useState<string[]>([]);
  const [employees, setEmployees] = useState<Rol[]>([]); // API'den gelecek roller için state
  const [showMoreData, setShowMoreData] = useState(false); // Yeni grid'in görünürlüğü için state

  useEffect(() => {
    // API'den verileri fetch ile alma
    fetch("https://localhost:7210/api/Kisi/butun-bilgiler/1") // API URL'nizi buraya ekleyin
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: ApiData) => {
        console.log("data: ", data);
        setEmployees(data.roller); // Gelen roller verilerini employees state'ine set ediyoruz
      })
      .catch((error) =>
        console.error("There was a problem with your fetch operation:", error)
      );
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
    <React.Fragment>
      <DataGrid
        id="gridContainer"
        dataSource={employees} // Burada roller verisini kullanıyoruz
        keyExpr="rolId" // 'rolId' ile her satırı tanımlıyoruz
        allowColumnReordering={true}
        showBorders={true}
        onEditingStart={() => logEvent("EditingStart")}
        onInitNewRow={() => logEvent("InitNewRow")}
        onRowInserting={() => logEvent("RowInserting")}
        onRowInserted={() => logEvent("RowInserted")}
        onRowUpdating={() => logEvent("RowUpdating")}
        onRowUpdated={() => logEvent("RowUpdated")}
        onRowRemoving={() => logEvent("RowRemoving")}
        onRowRemoved={() => logEvent("RowRemoved")}
        onSaving={() => logEvent("Saving")}
        onSaved={() => logEvent("Saved")}
        onEditCanceling={() => logEvent("EditCanceling")}
        onEditCanceled={() => logEvent("EditCanceled")}
      >
        {/* Arama panelini ekliyoruz */}
        <SearchPanel visible={true} width={240} placeholder="Ara..." />

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
          {/* Düzenleme formunun nasıl görüneceğini yapılandırıyoruz */}
          <Form>
            {/* İlk griddeki sütunlar */}
            <Column dataField="kisiAdi" />
            <Column dataField="kisiSoyadi" />
            <Column dataField="rolAdi" />
            <Column dataField="baslangicTarihi" dataType="date" />
            <Column dataField="bitisTarihi" dataType="date" />
            <Column dataField="talepEden" />
            <Column dataField="onaylayan" />
            <Column dataField="onaylanmaTarihi" dataType="date" />

            {/* İkinci griddeki yeni sütunlar */}
            <Column dataField="yetkiAdi" caption="Yetki" />
            <Column dataField="departman" />
            <Column
              dataField="siniflandirmaSeviyesi"
              caption="Sınıflandırma Seviyesi"
            />
          </Form>
        </Editing>

        <Column dataField="kisiAdi" caption="Ad" />
        <Column dataField="kisiSoyadi" caption="Soyad" />
        <Column dataField="rolAdi" caption="Rol" />
        <Column
          dataField="baslangicTarihi"
          caption="Başlangıç Tarihi"
          dataType="date"
        />
        <Column
          dataField="bitisTarihi"
          caption="Bitiş Tarihi"
          dataType="date"
        />
        <Column dataField="talepEden" caption="Talep Eden" />
        <Column dataField="onaylayan" caption="Onaylayan" />
        <Column
          dataField="onaylanmaTarihi"
          caption="Onaylanma Tarihi"
          dataType="date"
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
    </React.Fragment>
  );
};

export default App;
