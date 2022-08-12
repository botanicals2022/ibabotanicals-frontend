import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import theme from "./theme/botanical-theme";

// provider
import AuthProvider from "./context/authContext";
// import RouterProvider from "./context/routerContext";
import SnackProvider from "./context/snackAlertContext";

import UserProvider from "./context/userContext";

import AppLayout from "./components/AppLayout";
// import StaffProvider from "./context/staffContext";
import ContactProvider from "./context/contactContext";

// import ElemiProvider from "./context/elemi/elemiContext";
// import ElemiMaterialProvider from "./context/elemi/elemiMaterialContext";
import ElemiOverviewProvider from "./context/elemi/elemiOverviewContext";
import ElemiLaboratoryProvider from "./context/elemi/elemiLaboratoryContext";
import ExtractedElemiContext from "./context/elemi/extractedElemiContext";
import ElemiInventoryProvider from "./context/elemi/elemiInventoryContext";
// forms
import ElemiProcessProvider from "./context/elemi/forms/elemiProcessContext";
import ElemiQCPProvider from "./context/elemi/forms/elemiQCPContext";
import ElemiMRFProvider from "./context/elemi/forms/elemiMRFContext";
import ElemiTFLProvider from "./context/elemi/forms/elemiTFLContext";
import ElemiTFPContext from "./context/elemi/forms/elemiTFPContext";
// oil
import ElemiReceiveOilProvider from "./context/elemi/oils/elemiReceiveOilContext";
import ElemiProcessOilProvider from "./context/elemi/oils/elemiProcessOilContext";
import ElemiFinalOilProvider from "./context/elemi/oils/elemiFinalOilContext";

import GeneralConsumableProvider from "./context/inventory/generalConsumableContext";
import OfficeProvider from "./context/inventory/consumable/officeContext";
import MaintenanceProvider from "./context/inventory/consumable/maintenanceContext";
import LaboratoryProvider from "./context/inventory/consumable/laboratoryContext";
import OtherProvider from "./context/inventory/consumable/otherContext";
import FuelProvider from "./context/inventory/fuel/fuelContext";
import ElemiFuelProvider from "./context/inventory/fuel/elemiFuelContext";
import GeneralInventoryProvider from "./context/inventory/generalInventoryContext";
import PurchaseItemProvider from "./context/inventory/purchaseItemContext";
import RawMaterialProvider from "./context/inventory/rawMaterialContext";
import TicketProvider from "./context/ticketContext";

const ProfileProvider = ({ children }) => {
  return (
    <UserProvider>
      {/* <StaffProvider> */}
      <ContactProvider>{children}</ContactProvider>
      {/* </StaffProvider> */}
    </UserProvider>
  );
};

const ElemiOilsProvider = ({ children }) => {
  return (
    <ElemiReceiveOilProvider>
      <ElemiProcessOilProvider>
        <ElemiFinalOilProvider>{children}</ElemiFinalOilProvider>
      </ElemiProcessOilProvider>
    </ElemiReceiveOilProvider>
  );
};

const ElemiFormsProvider = ({ children }) => {
  return (
    <ElemiProcessProvider>
      <ElemiQCPProvider>
        <ElemiMRFProvider>
          <ElemiTFLProvider>
            <ElemiTFPContext>{children}</ElemiTFPContext>
          </ElemiTFLProvider>
        </ElemiMRFProvider>
      </ElemiQCPProvider>
    </ElemiProcessProvider>
  );
};

const ElemisProvider = ({ children }) => {
  // <ElemiProvider>
  // <ElemiMaterialProvider>
  // </ElemiMaterialProvider>
  // </ElemiProvider>

  return (
    <ElemiOverviewProvider>
      <ElemiLaboratoryProvider>
        <ExtractedElemiContext>
          <ElemiInventoryProvider>
            <ElemiFormsProvider>
              <ElemiOilsProvider>{children}</ElemiOilsProvider>
            </ElemiFormsProvider>
          </ElemiInventoryProvider>
        </ExtractedElemiContext>
      </ElemiLaboratoryProvider>
    </ElemiOverviewProvider>
  );
};

const InventoriesProvider = ({ children }) => {
  return (
    <GeneralInventoryProvider>
      <FuelProvider>
        <ElemiFuelProvider>
          <PurchaseItemProvider>
            <RawMaterialProvider>
              <GeneralConsumableProvider>
                <OfficeProvider>
                  <MaintenanceProvider>
                    <LaboratoryProvider>
                      <OtherProvider>{children}</OtherProvider>
                    </LaboratoryProvider>
                  </MaintenanceProvider>
                </OfficeProvider>
              </GeneralConsumableProvider>
            </RawMaterialProvider>
          </PurchaseItemProvider>
        </ElemiFuelProvider>
      </FuelProvider>
    </GeneralInventoryProvider>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackProvider>
        <AuthProvider>
          <ProfileProvider>
            <ElemisProvider>
              <InventoriesProvider>
                <TicketProvider>
                  <AppLayout />
                </TicketProvider>
              </InventoriesProvider>
            </ElemisProvider>
          </ProfileProvider>
        </AuthProvider>
      </SnackProvider>
    </ThemeProvider>
  );
}

export default App;
