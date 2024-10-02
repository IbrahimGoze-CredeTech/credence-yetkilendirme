import { useCallback, useEffect, useState } from "react";
import Button from "devextreme-react/button";
import DataGrid, {
  Column,
  Editing,
  Paging,
  Popup,
  FilterRow,
  MasterDetail,
} from "devextreme-react/data-grid";
import { EkstraYetki, Kisi } from "../types";
import { yetkiDataGridConfig } from "../configs/yetki-data-grid-config";
import { rolDataGridConfig } from "../configs/rol-data-grid-config";
import { ekstraYetkilerDataGridConfig } from "../configs/ekstra-yetkiler-data-grid-config";
import { SavedEvent } from "devextreme/ui/data_grid";

const App = () => {
  const [events, setEvents] = useState<string[]>([]);
  const [employees, setEmployees] = useState<Kisi[]>([]); // API'den gelecek roller için state
  // const [showMoreData, setShowMoreData] = useState(false); // Yeni grid'in görünürlüğü için state


  useEffect(() => {
    const fetchData = async () => {

      // API'den verileri fetch ile alma
      const yetkilerFetch = fetch('https://localhost:7210/api/Yetki').then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      });
      const bilgilerFetch = fetch("https://localhost:7210/api/Kisi/butun-bilgiler/2") // API URL'nizi buraya ekleyin
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })

      try {
        const [bilgilerData, yetkilerData] = await Promise.all([bilgilerFetch, yetkilerFetch]);
        if (bilgilerData && yetkilerData) {
          setEmployees(bilgilerData);
          console.log('bilgilerData: ', bilgilerData);

        }
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    }
    fetchData();
  }, []);

  // const logEvent = useCallback((eventName: string) => {
  //   setEvents((previousEvents) => [eventName, ...previousEvents]);
  // }, []);

  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  // Daha fazla/daha az butonuna basıldığında çağrılan fonksiyon
  // const toggleMoreData = () => {
  //   setShowMoreData((prevState) => !prevState); // Grid'in görünürlüğünü değiştiriyoruz
  // };

  return (
    <>
      <DataGrid
        id="gridContainer"
        dataSource={[employees]} // Burada roller verisini kullanıyoruz
        keyExpr="kisiAdi" // 'rolId' ile her satırı tanımlıyoruz
        allowColumnReordering={true}
        showBorders={true}
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
              <h4 className="text-3xl font-semibold">Roller</h4>
              <DataGrid
                dataSource={data.data.roller} // Nested data from roller
                showBorders={true}
                {...rolDataGridConfig}
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
              </DataGrid>

              {/* Yetkiler Sub-grid */}
              <h4 className="text-3xl font-semibold mt-12">Yetkiler</h4>
              <DataGrid
                dataSource={data.data.yetkiler} // Nested data from yetkiler
                showBorders={true}
                {...yetkiDataGridConfig}
              >
                <Editing
                  mode="popup"
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
                </Editing>
              </DataGrid>

              {/* EkstraYetkiler Sub-grid */}
              <h4 className="text-3xl font-semibold mt-12">Ekstra Yetkiler</h4>
              <DataGrid
                dataSource={data.data.ekstraYetkiler} // Nested data from ekstraYetkiler
                showBorders={true}
                {...ekstraYetkilerDataGridConfig}
                onSaved={(e: SavedEvent<EkstraYetki>) => { console.log('Saved! ', e.changes[0].data.ekstraYetkiBaslangicTarihi) }}
              >
                <Editing
                  mode="popup"
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
                </Editing>
              </DataGrid>
            </>
          )}
        />

      </DataGrid>

      {/* Daha Fazla / Daha Az butonu */}

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
