// react imports
import { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

// context imports
import { useAuthContext } from "../../../context/authContext";
import { useRouterContext } from "../../../context/routerContext";

// import components
// user
import Login from "../../User/LoginUser";
// import Register from "../../User/RegisterUser";
// import EditUser from "../../User/EditUser";

import Production from "../../Production/Production";
// import ProductionMenu from "../../Production/ProductionMenu";
// import Vetiver from "../../Vetiver/Vetiver";
import Dashboard from "../../Dashboard/Dashboard";

// import Elemi from "../../Elemi/Elemi";
import ElemiMenu from "../../Elemi/ElemiMenu";
// import ElemiMaterial from "../../Elemi/Material/ElemiMaterial";
import ElemiLaboratory from "../../Elemi/Laboratory/ElemiLaboratory";
import ExtractedElemi from "../../Elemi/Extracted/ExtractedElemi";
import ElemiInventory from "../../Elemi/Inventory/ElemiInventory";

import VetiverMenu from "../../Vetiver/VetiverMenu";

import YlangMenu from "../../Ylang/YlangMenu";

import FormMenu from "../../Elemi/Forms/FormMenu";
import FormElemiProcess from "../../Elemi/Forms/Process/FormElemiProcess";
import MaterialRequestForm from "../../Elemi/Forms/MRF/MaterialRequestForm";
import TransmittalForLaboratory from "../../Elemi/Forms/TFL/TransmittalForLaboratory";
import TransmittalForProduction from "../../Elemi/Forms/TFP/TransmittalForProduction";
import QCP from "../../Elemi/Forms/QCP/QCP";
// import SOPForm from "../../Elemi/Forms/SOPForm";

import ElemiOilMenu from "../../Elemi/Oil/ElemiOilMenu";
import ReceiveElemiOil from "../../Elemi/Oil/Receive/ReceiveOil";
import ProcessElemiOil from "../../Elemi/Oil/Process/ProcessOil";
import FinalElemiOil from "../../Elemi/Oil/Final/FinalOil";

import GeneralInventory from "../../Inventory/GeneralInventory";
import InventoryMenu from "../../Inventory/InventoryMenu";
import MainIndex from "../../Globals/MainIndex";

// import Consumable from "../../Inventory/Consumable/Consumable";
import ConsumableMenu from "../../Inventory/Consumable/ConsumableMenu";
import Consumable from "../../Inventory/Consumable/Consumable";
import LaboratoryConsumable from "../../Inventory/Consumable/Laboratory/laboratory";
import MaintenanceConsumable from "../../Inventory/Consumable/Maintenance/Maintenance";
import OfficeConsumable from "../../Inventory/Consumable/Office/Office";
import OtherConsumable from "../../Inventory/Consumable/Other/Other";

import FuelMenu from "../../Inventory/Fuel/FuelMenu";
import MainFuelTank from "../../Inventory/Fuel/MainFuelTank/Fuel";
import ElemiFuelTank from "../../Inventory/Fuel/ElemiFuelTank/ElemiFuel";

import PurchaseItem from "../../Inventory/PurchaseItem/PurchaseItem";
import RawMaterial from "../../Inventory/RawMaterial/RawMaterial";

import ReportMenu from "../../Reports/ReportMenu";
// import ProcessMenu from "../../Reports/Elemi/Process/ProcessMenu";
// import ElemiProcessReport from "../../Reports/Elemi/Process/ElemiProcessReport";
import ElemiReportMenu from "../../Reports/Elemi/ElemiReportMenu";
import ElemiOverview from "../../Reports/Elemi/ElemiOverview";

// import Profiles from "../../Profile/Profiles";
import ProfileMenu from "../../Profile/ProfileMenu";
import UserMain from "../../User/UserMain";
// import StaffMain from "../../Staff/StaffMain";
import ContactMain from "../../Contact/ContactMain";

// import ProductionHarvest from "../../Production/ProductionHarvest";

import SupportMenu from "../../Support/SupportMenu";
import Ticket from "../../Support/Ticket/Ticket";

const ModuleRouter = () => {
  const auth = useAuthContext();
  const theLocation = useLocation();
  const navigate = useNavigate();
  const theRouterContext = useRouterContext();
  useEffect(() => {
    theRouterContext.setCurrentRoute(theLocation.pathname);
  }, [theLocation.pathname]);

  useEffect(() => {
    const storageAddress = JSON.parse(
      localStorage.getItem("BreadCrumbsAddress")
    );
    if (storageAddress) {
      const arrUrl = storageAddress[storageAddress.length - 1].href;
      navigate(arrUrl);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          exact
          element={
            !auth.user ? (
              <Login />
            ) : (
              <ProtectedRoute>
                {/* <Dashboard /> */}
                <h1>Dashboard</h1>
              </ProtectedRoute>
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {/* <Dashboard /> */}
              <h1>Dashboard</h1>
            </ProtectedRoute>
          }
        />

        <Route
          path="/production"
          element={
            <ProtectedRoute>
              <MainIndex showBreadCrumbs="true" />
            </ProtectedRoute>
          }
        >
          {/* <Route index element={<ProductionMenu />} /> */}
          <Route index element={<h1>Production</h1>} />
          <Route path="main" element={<Production />} />
        </Route>

        <Route
          path="/elemi"
          element={
            <ProtectedRoute>
              <MainIndex showBreadCrumbs="true" />
            </ProtectedRoute>
          }
        >
          <Route index element={<ElemiMenu />} />
          {/* <Route path="main" element={<Elemi />} /> */}
          {/* <Route path="material" element={<ElemiMaterial />} /> */}
          <Route path="laboratory" element={<ElemiLaboratory />} />
          <Route path="extracted" element={<ExtractedElemi />} />
          <Route path="inventory" element={<ElemiInventory />} />
          <Route
            path="forms"
            element={
              <ProtectedRoute>
                <MainIndex />
              </ProtectedRoute>
            }
          >
            <Route index element={<FormMenu />} />
            <Route path="process" element={<FormElemiProcess />} />
            <Route
              path="material-request-form"
              element={<MaterialRequestForm />}
            />
            <Route
              path="transmittal-laboratory"
              element={<TransmittalForLaboratory />}
            />
            <Route
              path="transmittal-production"
              element={<TransmittalForProduction />}
            />
            <Route path="quality-control-parameters" element={<QCP />} />
          </Route>
          <Route
            path="oil"
            element={
              <ProtectedRoute>
                <MainIndex />
              </ProtectedRoute>
            }
          >
            <Route index element={<ElemiOilMenu />} />
            <Route path="receive" element={<ReceiveElemiOil />} />
            <Route path="process" element={<ProcessElemiOil />} />
            <Route path="final" element={<FinalElemiOil />} />
          </Route>
        </Route>

        <Route
          path="/vetiver"
          element={
            <ProtectedRoute>
              <MainIndex showBreadCrumbs="true" />
            </ProtectedRoute>
          }
        >
          <Route index element={<VetiverMenu />} />
          <Route
            path="forms"
            element={
              <ProtectedRoute>
                <MainIndex />
              </ProtectedRoute>
            }
          >
            <Route index element={<h1>Ylang Forms Coming Soon...</h1>} />
          </Route>
          <Route
            path="oil"
            element={
              <ProtectedRoute>
                <MainIndex />
              </ProtectedRoute>
            }
          >
            <Route index element={<h1>Ylang Oil Coming Soon...</h1>} />
          </Route>
        </Route>

        <Route
          path="/ylang"
          element={
            <ProtectedRoute>
              <MainIndex showBreadCrumbs="true" />
            </ProtectedRoute>
          }
        >
          <Route index element={<YlangMenu />} />
          <Route
            path="forms"
            element={
              <ProtectedRoute>
                <MainIndex />
              </ProtectedRoute>
            }
          >
            <Route index element={<h1>Ylang Forms Coming Soon...</h1>} />
          </Route>
          <Route
            path="oil"
            element={
              <ProtectedRoute>
                <MainIndex />
              </ProtectedRoute>
            }
          >
            <Route index element={<h1>Ylang Oil Coming Soon...</h1>} />
          </Route>
        </Route>

        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <MainIndex showBreadCrumbs="true" />
            </ProtectedRoute>
          }
        >
          <Route index element={<InventoryMenu />} />
          {/* <Route path="main" element={<Elemi />} /> */}
          <Route
            path="consumable"
            element={
              <ProtectedRoute>
                <MainIndex />
              </ProtectedRoute>
            }
          >
            <Route index element={<ConsumableMenu />} />
            <Route path="general-inventory" element={<Consumable />} />
            <Route path="maintenance" element={<MaintenanceConsumable />} />
            <Route path="laboratory" element={<LaboratoryConsumable />} />
            <Route path="office" element={<OfficeConsumable />} />
            <Route path="other" element={<OtherConsumable />} />
          </Route>
          <Route
            path="fuel"
            element={
              <ProtectedRoute>
                <MainIndex />
              </ProtectedRoute>
            }
          >
            <Route index element={<FuelMenu />} />
            <Route path="main-tank" element={<MainFuelTank />} />
            <Route path="elemi" element={<ElemiFuelTank />} />
          </Route>
          <Route path="general" element={<GeneralInventory />} />
          <Route path="purchase-item" element={<PurchaseItem />} />
          <Route path="raw-material" element={<RawMaterial />} />
        </Route>
        <Route
          path="/vetiver/"
          element={
            <ProtectedRoute>
              <h1>Vetiver</h1>
            </ProtectedRoute>
          }
        />

        <Route
          path="/ylang"
          element={
            <ProtectedRoute>
              <h1>Ylang</h1>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <MainIndex showBreadCrumbs="true" />
            </ProtectedRoute>
          }
        >
          <Route index element={<ReportMenu />} />
          <Route
            path="elemi"
            element={
              <ProtectedRoute>
                <MainIndex />
              </ProtectedRoute>
            }
          >
            <Route index element={<ElemiReportMenu />} />
            <Route path="overview" element={<ElemiOverview />} />
          </Route>
        </Route>

        <Route
          path="/profiles"
          element={
            <ProtectedRoute>
              <MainIndex showBreadCrumbs="true" />
            </ProtectedRoute>
          }
        >
          <Route index element={<ProfileMenu />} />
          <Route path="users" element={<UserMain />} />
          {/* <Route path="staffs" element={<StaffMain />} /> */}
          <Route path="contacts" element={<ContactMain />} />
        </Route>

        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <MainIndex showBreadCrumbs="true" />
            </ProtectedRoute>
          }
        >
          <Route index element={<SupportMenu />} />
          <Route path="ticket" element={<Ticket />} />
        </Route>

        {/* <Route path="/contact" element={<CreateContact open={true} />} /> */}
        {/* <Route path="/user/:id" element={<EditUser open={true} />} /> */}
        {/* <Route path="/register" element={<Register open={true} />} /> */}
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </>
  );
};

const ProtectedRoute = ({ children }) => {
  const auth = useAuthContext();
  let location = useLocation();
  if (!auth.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default ModuleRouter;
