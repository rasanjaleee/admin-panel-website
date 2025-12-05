import "./datatable.scss";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { onValue, ref } from "firebase/database";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "../../Pages/list/list.scss";

const Earnings = () => {
  const [data, setData] = useState([]);
  const usersRef = ref(db, "Earnings");
  const [fareSum, setFareSum] = useState({});

  useEffect(() => {
    const unsubscribe = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val(); // Get the data from the snapshot
        setData({ ...data });
        getSum(data); // Call getSum with the data
      } else {
        setData({});
      }
    });

    return () => {
      unsubscribe(); // Unsubscribe when the component unmounts
    };
  }, []);

  const getSum = (data) => {
    // Pass data as an argument
    let fareSumByDriver = {};
    for (const key in data) {
      const entry = data[key];
      const driverName = entry.driverName;
      const fareAmount = parseFloat(entry.fareAmount); // Parse the fare amount to a float

      if (!isNaN(fareAmount)) {
        // If fareAmount is a valid number, add it to the sum for the driverName
        if (fareSumByDriver[driverName] === undefined) {
          fareSumByDriver[driverName] = fareAmount;
        } else {
          fareSumByDriver[driverName] += fareAmount;
        }
      }
    }

    // Now, you have the sum of fare amounts for each driverName
    console.log(fareSumByDriver);
    setFareSum(fareSumByDriver);
  };

  return (
    <>
      <div className="list">
        <Sidebar />

        <div className="listContainer">
          <Navbar />
          <div className="datatable-container">
            <table className="datatable">
              <thead className="datatableTitle">
                <tr>
                  <th>ID</th>
                  <th>Driver Name</th>
                  <th>Fare Amount</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(fareSum).map((driverName, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{driverName}</td>
                      <td>{fareSum[driverName]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default Earnings;
