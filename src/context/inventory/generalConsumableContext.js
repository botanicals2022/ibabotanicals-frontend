import { createContext, useContext, useState } from "react";
import { useSnackContext } from "../snackAlertContext";

const GeneralConsumableContext = createContext();
export const useGeneralConsumableContext = () =>
  useContext(GeneralConsumableContext);

const ConsumableProvider = ({ children }) => {
  const theSnackContext = useSnackContext();

  const [generalConsumableList, setGeneralConsumableList] = useState([]);
  const [selected, setSelected] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);
  // const [completed, setCompleted] = useState(false);

  const getAllConsumable = () => {};

  return (
    <GeneralConsumableContext.Provider
      value={{
        generalConsumableList,
        setGeneralConsumableList,
        activeModal,
        setActiveModal,
        loading,
        selected,
        setSelected,
        // completed,

        getAllConsumable,
      }}
    >
      {children}
    </GeneralConsumableContext.Provider>
  );
};

export default ConsumableProvider;
