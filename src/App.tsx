// import BottomSide from "./Bottom_Side/BottomSide";
import SummaryDataGrid from "./components/summary-data-grid";
import NavBar from "./NavBar";
import "devextreme/dist/css/dx.light.css";

export default function App() {

  const userName = "Alper";
  const userSurname = "Özpınar";
  const userRole = "Admin";

  return (
    <>
      <div className="h-screen w-full">
        <div style={{ height: "10%" }} className="w-full">
          {/* Kullanıcı bilgilerini NavBar bileşenine geçiyoruz */}
          <NavBar userName={userName} userSurname={userSurname} userRole={userRole} />
        </div>

        <div style={{ height: "90%" }} className="flex flex-col p-4">
          {/* <BottomSide /> */}
          <SummaryDataGrid />
        </div>
      </div>
    </>
  );
}
