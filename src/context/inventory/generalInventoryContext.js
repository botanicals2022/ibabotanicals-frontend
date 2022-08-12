import { createContext, useContext, useState } from "react";
import { useSnackContext } from "../snackAlertContext";

const GeneralInventoryContext = createContext();
export const useGeneralInventoryContext = () =>
  useContext(GeneralInventoryContext);

const GeneralInventoryProvider = ({ children }) => {
  const theSnackContext = useSnackContext();

  const [generalInventoryList, setGeneralInventoryList] = useState([]);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(false);

  const getAllGeneralInventory = () => {
    setLoading(true);

    const getTotal = (arr) => {
      let res = arr.reduce(
        (a, b) =>
          a.set(b.itemId, (a.get(b.itemId) || 0) + parseFloat(b.quantity)),
        new Map()
      );
      console.log(res);
      return arr;
    };

    const getUnique = (arr) => {
      let res = Array.from(new Set(arr.map((a) => a.itemId))).map((itemId) => {
        return arr.find((a) => a.itemId === itemId);
      });
      return res;
    };

    let rM = [
      {
        itemId: "rmVR_000003",
        name: "vetiver roots",
        price: "999",
        quantity: 80,
      },
      {
        itemId: "rmYF_000004",
        name: "ylang flower",
        price: "20",
        quantity: 80,
      },
    ];
    let fuel = [
      { itemId: "fR_000002", name: "Regular", price: "83", quantity: 7000 },
      { itemId: "fD_000001", name: "Diesel", price: "80", quantity: 12000 },
      { itemId: "fD_000001", name: "Diesel", price: "90", quantity: 15000.1 },
    ];
    let consumable = [
      { itemId: "cM_000001", name: "Marker", price: "56", quantity: 80 },
      { itemId: "cS_000002", name: "Sugar", price: "80", quantity: 80 },
      {
        itemId: "cWG_000005",
        name: "Water Gallon",
        price: "150",
        quantity: 23,
      },
      { itemId: "cC_000003", name: "Coffee", price: "40", quantity: 30 },
    ];

    let tmpGenInvList = [];
    getUnique(rM).forEach((item) => {
      let recordType = "raw material";
      tmpGenInvList.push({
        itemId: item.itemId,
        name: item.name,
        type: recordType,
        quantity: item.quantity,
      });
    });

    getUnique(fuel).forEach((item) => {
      let recordType = "fuel";
      tmpGenInvList.push({
        itemId: item.itemId,
        name: item.name,
        type: recordType,
        quantity: item.quantity,
      });
    });

    getUnique(consumable).forEach((item) => {
      let recordType = "consumable";
      tmpGenInvList.push({
        itemId: item.itemId,
        name: item.name,
        type: recordType,
        quantity: item.quantity,
      });
    });

    setGeneralInventoryList(tmpGenInvList);
    setLoading(false);
    theSnackContext.setopen(true);
    theSnackContext.settitle("Success");
    theSnackContext.setmessage("Successfully processed all records");
    theSnackContext.setseverity("success");

    // setLoading(false);
    // theSnackContext.setopen(true);
    // theSnackContext.settitle("Error");
    // theSnackContext.setmessage("Unable to process all records");
    // theSnackContext.setseverity("error");
  };

  const getRecord = (id) => {
    setLoading(true);

    // setOneGeneralInventory(resData);
    setLoading(false);
    theSnackContext.setopen(true);
    theSnackContext.settitle("Success");
    theSnackContext.setmessage("Successfully retrieved record for: ");
    theSnackContext.setseverity("success");

    // setLoading(false);
    // theSnackContext.setopen(true);
    // theSnackContext.settitle("Error");
    // theSnackContext.setmessage("Unable to retrieve record");
    // theSnackContext.setseverity("error");
  };

  return (
    <GeneralInventoryContext.Provider
      value={{
        generalInventoryList,
        setGeneralInventoryList,
        loading,
        selected,
        setSelected,

        // getAllGeneralInventory,
        getRecord,
      }}
    >
      {children}
    </GeneralInventoryContext.Provider>
  );
};

export default GeneralInventoryProvider;
