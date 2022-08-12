import { useEffect, createContext, useContext, useState } from "react";
import RouterApi from "../../helper/index";
import { useSnackContext } from "../snackAlertContext";

const ElemiOverviewContext = createContext();
export const useElemiOverviewContext = () => useContext(ElemiOverviewContext);

const ElemiOverviewProvider = ({ children }) => {
  const theSnackContext = useSnackContext();

  const [overviewList, setOverviewList] = useState([]);
  const [oneOverview, setOneOverview] = useState({});
  const [selected, setSelected] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storageItem = localStorage.getItem("elemiOverviewList");
    if (storageItem) {
      if (JSON.parse(storageItem)) {
        setOverviewList(JSON.parse(storageItem));
      }
    }
  }, []);

  const setStorageData = (data) => {
    if (data) {
      localStorage.setItem(`elemiOverviewList`, JSON.stringify(data));
    }
  };

  return (
    <ElemiOverviewContext.Provider
      value={{
        oneOverview,
        overviewList,
        activeModal,
        setActiveModal,
        loading,
        selected,
        setSelected,
      }}
    >
      {children}
    </ElemiOverviewContext.Provider>
  );
};

export default ElemiOverviewProvider;
