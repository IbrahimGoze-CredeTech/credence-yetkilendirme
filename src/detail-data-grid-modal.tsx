import React, { useEffect, useState } from 'react'
import { useModalContext } from './context';
import { EkstraYetki, Kisi } from './types';
import DataGrid, {
  Column,
  Editing,
  Paging,
  Popup,
  FilterRow,
  MasterDetail,
} from "devextreme-react/data-grid";
import { SavedEvent } from "devextreme/ui/data_grid";

import { rolDataGridConfig } from './configs/rol-data-grid-config';
import { yetkiDataGridConfig } from './configs/yetki-data-grid-config';
import { ekstraYetkilerDataGridConfig } from './configs/ekstra-yetkiler-data-grid-config';

export default function DetailDataGridModal() {
  const modalContext = useModalContext();

  // const [events, setEvents] = useState<string[]>([]);
  const [employees, setEmployees] = useState<Kisi[]>([]); // API'den gelecek roller için state
  // const [showMoreData, setShowMoreData] = useState(false); // Yeni grid'in görünürlüğü için state


  useEffect(() => {
    if (!modalContext?.isOpen) return;
    const fetchData = async () => {

      // API'den verileri fetch ile alma
      // const yetkilerFetch = fetch('https://localhost:7210/api/Yetki').then((response) => {
      //   if (!response.ok) throw new Error('Network response was not ok');
      //   return response.json();
      // });
      const bilgilerFetch = fetch("https://localhost:7210/api/Kisi/butun-bilgiler/2") // API URL'nizi buraya ekleyin
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })

      try {
        const [bilgilerData] = await Promise.all([bilgilerFetch]);
        if (bilgilerData) {
          setEmployees(bilgilerData);
          console.log('bilgilerData: ', bilgilerData);

        }
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    }
    fetchData();
  }, [modalContext?.isOpen]);

  useEffect(() => {
    if (modalContext?.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = ''; // Ensure scroll is unlocked on cleanup
    };
  }, [modalContext?.isOpen]);

  return (
    <div style={{ position: 'fixed', zIndex: 9997 }} className={`top-0 flex items-start justify-center w-full bg-gray-400/15 backdrop-blur-sm  min-h-[100vh] h-full overflow-auto ${modalContext?.isOpen ? "visible" : "hidden"}`} onPointerDown={(e) => {
      e.stopPropagation();
      modalContext.toggle();
    }}>
      <div style={{ position: 'relative', pointerEvents: "auto", userSelect: "none", zIndex: 9998, top: "20%" }}
        className="w-[80vw] min-h-[65vh] bg-white p-4 rounded-md" onPointerDown={(e) => e.stopPropagation()}>
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
            mode="row" // Düzenleme işlemi popup içinde yapılacak
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
                    mode="row" // Düzenleme işlemi popup içinde yapılacak
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
                    mode="row"
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
                    mode="row"
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
      </div>
    </div>
  )
}
