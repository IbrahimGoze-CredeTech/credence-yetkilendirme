import React, { useCallback, useEffect, useState } from 'react';
import Button from 'devextreme-react/button';
import DataGrid, {
  Column, Editing, Paging, Lookup,
} from 'devextreme-react/data-grid';

import { states } from './TestData'; // states'i sabit olarak tutabiliriz.

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
}

interface Yetki {
  rolId: number;
  rolAdi: string;
  yetkiId: number;
  yetkiAdi: string;
  eylemlerTuruId: number;
}

interface ApiData {
  kisiAdi: string;
  kisiSoyadi: string;
  roller: Rol[];
  departman: string;
  yetkiler: Yetki[];
  ekstraYetkiler: any[];
}

const App = () => {
  const [events, setEvents] = useState<string[]>([]);
  const [employees, setEmployees] = useState<Rol[]>([]); // API'den gelecek roller için state

  useEffect(() => {
    // API'den verileri fetch ile alma
    fetch('https://localhost:7210/api/Kisi/butun-bilgiler/1') // API URL'nizi buraya ekleyin
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: ApiData) => {
        console.log("data: ", data);
        setEmployees(data.roller); // Gelen roller verilerini employees state'ine set ediyoruz
      })
      .catch(error => console.error('There was a problem with your fetch operation:', error));
  }, []);

  const logEvent = useCallback((eventName: string) => {
    setEvents((previousEvents) => [eventName, ...previousEvents]);
  }, []);

  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  return (
    <React.Fragment>
      <DataGrid
        id="gridContainer"
        dataSource={employees} // Burada roller verisini kullanıyoruz
        keyExpr="rolId" // 'rolId' ile her satırı tanımlıyoruz
        allowColumnReordering={true}
        showBorders={true}
        onEditingStart={() => logEvent('EditingStart')}
        onInitNewRow={() => logEvent('InitNewRow')}
        onRowInserting={() => logEvent('RowInserting')}
        onRowInserted={() => logEvent('RowInserted')}
        onRowUpdating={() => logEvent('RowUpdating')}
        onRowUpdated={() => logEvent('RowUpdated')}
        onRowRemoving={() => logEvent('RowRemoving')}
        onRowRemoved={() => logEvent('RowRemoved')}
        onSaving={() => logEvent('Saving')}
        onSaved={() => logEvent('Saved')}
        onEditCanceling={() => logEvent('EditCanceling')}
        onEditCanceled={() => logEvent('EditCanceled')}
      >
        <Paging enabled={true} />
        <Editing
          mode="row"
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true}
          useIcons={true} // Bu satır ikonları etkinleştirir
        />

        <Column dataField="kisiAdi" caption="Ad" />
        <Column dataField="kisiSoyadi" caption="Soyad" />
        <Column dataField="rolAdi" caption="Rol" />
        <Column dataField="baslangicTarihi" caption="Start Date" dataType="date" />
        <Column dataField="bitisTarihi" caption="End Date" dataType="date" />
        <Column dataField="talepEden" caption="Requester" />
        <Column dataField="onaylayan" caption="Approver" />
        <Column dataField="onaylanmaTarihi" caption="Approval Date" dataType="date" />
      </DataGrid>

      <div id="events">
        <div>
          <div className="caption">Fired events</div>
          <Button id="clear" text="Clear" onClick={clearEvents} />
        </div>
        <ul>
          {events.map((event, index) => <li key={index}>{event}</li>)}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default App;
