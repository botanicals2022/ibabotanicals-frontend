import { useEffect, createContext, useContext, useState } from "react";
import RouterApi from "../../helper/index";
import { useSnackContext } from "../snackAlertContext";

const MaterialContext = createContext();
export const useElemiMaterialContext = () => useContext(MaterialContext);

const ElemiMaterialProvider = ({ children }) => {
  const theSnackContext = useSnackContext();

  const [materialList, setMaterialList] = useState([]);
  const [oneMaterial, setOneMaterial] = useState({});
  const [selected, setSelected] = useState({});
  const [objForUpdate, setObjForUpdate] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storageItem = localStorage.getItem("elemiMaterialList");
    if (storageItem) {
      if (JSON.parse(storageItem)) {
        setMaterialList(JSON.parse(storageItem));
      }
    }
  }, []);

  const setStorageData = (data) => {
    if (data) {
      localStorage.setItem(`elemiMaterialList`, JSON.stringify(data));
    }
  };

  const createMaterial = (data) => {
    setLoading(true);
    RouterApi.createElemiMaterial(data)
      .then((res) => {
        const resData = res.data;
        setLoading(false);
        setActiveModal("");

        // console.log("material here", resData);
        setMaterialList([...materialList, resData.material]);
        setStorageData([...materialList, resData.material]);
        theSnackContext.setopen(true);
        theSnackContext.settitle("Success");
        theSnackContext.setmessage(resData.message);
        theSnackContext.setseverity("success");
      })
      .catch((err) => {
        setLoading(false);
        setActiveModal("");
        theSnackContext.setopen(true);
        theSnackContext.settitle("Error");
        theSnackContext.setmessage(err.message);
        theSnackContext.setseverity("error");
      });
  };

  const getAllMaterial = () => {
    setLoading(true);
    RouterApi.getAllElemiMaterial()
      .then((res) => {
        const resData = res;

        setMaterialList(resData.materials);
        setStorageData(resData.materials);
        setLoading(false);
        theSnackContext.setopen(true);
        theSnackContext.settitle("Success");
        theSnackContext.setmessage(resData.message);
        theSnackContext.setseverity("success");
      })
      .catch((err) => {
        setLoading(false);
        theSnackContext.setopen(true);
        theSnackContext.settitle("Error");
        theSnackContext.setmessage(err.message);
        theSnackContext.setseverity("error");
      });
  };

  const getSingleMaterial = (id) => {
    setLoading(true);
    RouterApi.getSingleMaterial(id)
      .then((res) => {
        const resData = res;
        console.log(resData);

        setOneMaterial(resData);
        setLoading(false);
        theSnackContext.setopen(true);
        theSnackContext.settitle("Success");
        theSnackContext.setmessage(resData.message);
        theSnackContext.setseverity("success");
      })
      .catch((err) => {
        setLoading(false);
        theSnackContext.setopen(true);
        theSnackContext.settitle("Error");
        theSnackContext.setmessage(err.message);
        theSnackContext.setseverity("error");
      });
  };

  // for update
  const onChange = (target) => {
    const { name, value } = target;
    console.log(target);
    setSelected((prev) => ({ ...prev, [name]: value }));
    setObjForUpdate((prev) => ({ ...prev, [name]: value }));
  };

  const updateList = (list, data) => {
    var tmplist = list;
    Object.assign(
      tmplist.find((item) => item.id === data.id),
      { ...data }
    );
    return tmplist;
  };

  const updateMaterial = () => {
    setLoading(true);
    const id = selected.id;
    RouterApi.updateElemiMaterial(objForUpdate, id)
      .then((res) => {
        const resData = res;
        setLoading(false);
        setActiveModal("");

        const tmpUps = updateList(materialList, resData.material);
        setMaterialList([...tmpUps]);
        setStorageData([...tmpUps]);
        setObjForUpdate({});
        theSnackContext.setopen(true);
        theSnackContext.settitle("Success");
        theSnackContext.setmessage(resData.message);
        theSnackContext.setseverity("success");
      })
      .catch((err) => {
        setLoading(false);
        setActiveModal("");
        theSnackContext.setopen(true);
        theSnackContext.settitle("Error");
        theSnackContext.setmessage(err.message);
        theSnackContext.setseverity("error");
      });
  };

  const removeFromList = (list, id) => {
    return list.filter((item) => {
      return item.id !== id;
    });
  };

  const deleteMaterial = (id) => {
    setLoading(true);
    RouterApi.deleteElemiMaterial(id)
      .then((res) => {
        const resData = res;

        const deleted = removeFromList(materialList, id);
        setMaterialList([...deleted]);
        setStorageData([...deleted]);
        setLoading(false);
        theSnackContext.setopen(true);
        theSnackContext.settitle("Success");
        theSnackContext.setmessage(resData.message);
        theSnackContext.setseverity("success");
      })
      .catch((err) => {
        setLoading(false);
        theSnackContext.setopen(true);
        theSnackContext.settitle("Error");
        theSnackContext.setmessage(err.message);
        theSnackContext.setseverity("error");
      });
  };

  return (
    <MaterialContext.Provider
      value={{
        oneMaterial,
        materialList,
        activeModal,
        setActiveModal,
        loading,
        selected,
        setSelected,

        createMaterial,
        getAllMaterial,
        getSingleMaterial,
        updateMaterial,
        deleteMaterial,
        onChange,
      }}
    >
      {children}
    </MaterialContext.Provider>
  );
};

export default ElemiMaterialProvider;
