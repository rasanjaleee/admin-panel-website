import "./widgets.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Groups2Icon from "@mui/icons-material/Groups2";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PeopleIcon from "@mui/icons-material/People";
import { onValue, ref } from "firebase/database";
import { useState, useEffect } from "react";
import { db } from "../../firebase";

const Widgets = () => {
  const [dataLengths, setDataLengths] = useState({
    users: 0,
    Adrivers: 0,
    rideRequests: 0,
    drivers: 0,
  });

  const dbRef = {
    users: ref(db, "users"),
    Adrivers: ref(db, "activeDrivers"),
    drivers: ref(db, "drivers"),
    rideRequests: ref(db, "All Ride Requests"),
  };

  useEffect(() => {
    const unsubscribe = onValue(dbRef.users, (snapshot) => {
      if (snapshot.exists()) {
        setDataLengths((prevDataLengths) => ({
          ...prevDataLengths,
          users: Object.keys(snapshot.val()).length,
        }));
      }
    });

    const unsubscribe2 = onValue(dbRef.drivers, (snapshot) => {
      if (snapshot.exists()) {
        setDataLengths((prevDataLengths) => ({
          ...prevDataLengths,
          drivers: Object.keys(snapshot.val()).length,
        }));
      }
    });

    const unsubscribe3 = onValue(dbRef.rideRequests, (snapshot) => {
      if (snapshot.exists()) {
        setDataLengths((prevDataLengths) => ({
          ...prevDataLengths,
          rideRequests: Object.keys(snapshot.val()).length,
        }));
      }
    });

    const unsubscribe4 = onValue(dbRef.Adrivers, (snapshot) => {
      if (snapshot.exists()) {
        setDataLengths((prevDataLengths) => ({
          ...prevDataLengths,
          Adrivers: Object.keys(snapshot.val()).length,
        }));
      }
    });

    return () => {
      unsubscribe();
      unsubscribe2();
      unsubscribe3();
      unsubscribe4();
    };
  }, []);

  const diff1 = 20;
  const diff2 = 7;
  const diff3 = 18;
  const diff4 = 35;

  const widgetsData = [
    {
      title: "Total Passengers",
      count: dataLengths.users,
      diff: diff1,
      isPositive: true,
      icon: <Groups2Icon />,
      color: "#1e40af",
      bgColor: "rgba(30, 64, 175, 0.1)",
    },
    {
      title: "Active Drivers",
      count: dataLengths.Adrivers,
      diff: diff2,
      isPositive: true,
      icon: <DirectionsCarIcon />,
      color: "#06b6d4",
      bgColor: "rgba(6, 182, 212, 0.1)",
    },
    {
      title: "Total Drivers",
      count: dataLengths.drivers,
      diff: diff3,
      isPositive: true,
      icon: <PeopleIcon />,
      color: "#1bb5bb",
      bgColor: "rgba(27, 181, 187, 0.1)",
    },
    {
      title: "Total Rides",
      count: dataLengths.rideRequests,
      diff: diff4,
      isPositive: true,
      icon: <LocalShippingIcon />,
      color: "#4f9d72",
      bgColor: "rgba(79, 157, 114, 0.1)",
    },
  ];

  return (
    <>
      {widgetsData.map((widget, index) => (
        <div className="widget" key={index}>
          <div className="widgetContent">
            <div className="widgetIcon" style={{ background: widget.bgColor }}>
              <div style={{ color: widget.color }}>{widget.icon}</div>
            </div>
            <div className="widgetInfo">
              <span className="title">{widget.title}</span>
              <span className="counter">{widget.count}</span>
              <div className="percentage">
                {widget.isPositive ? (
                  <KeyboardArrowUpIcon className="trendIcon positive" />
                ) : (
                  <KeyboardArrowDownIcon className="trendIcon negative" />
                )}
                <span className={widget.isPositive ? "positive" : "negative"}>
                  {widget.diff}% from last month
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Widgets;