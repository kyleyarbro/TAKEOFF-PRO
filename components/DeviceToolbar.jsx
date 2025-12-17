import React, { useState } from "react";

export const DeviceToolbar = ({ devices, setDevices, tool, setTool }) => {
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [labor, setLabor] = useState(0);

  const addDevice = () => {
    if (!name) return;
    const newDevice = {
      id: Date.now(),
      name,
      cost: parseFloat(cost),
      labor: parseFloat(labor)
    };
    setDevices([...devices, newDevice]);
    setName("");
    setCost(0);
    setLabor(0);
  };

  const removeDevice = (id) => {
    setDevices(devices.filter(d => d.id !== id));
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2">Devices/Assemblies</h2>
      <input
        className="w-full p-1 mb-1 border"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-full p-1 mb-1 border"
        placeholder="Unit Cost"
        type="number"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
      />
      <input
        className="w-full p-1 mb-2 border"
        placeholder="Labor Hrs"
        type="number"
        value={labor}
        onChange={(e) => setLabor(e.target.value)}
      />
      <button
        onClick={addDevice}
        className="bg-green-500 text-white px-2 py-1 rounded w-full mb-2"
      >
        Add Device
      </button>
      <div className="mb-2">
        <label className="block font-semibold mb-1">Select Tool</label>
        <div className="flex gap-2">
          <button
            onClick={() => setTool("point")}
            className={`flex-1 px-2 py-1 rounded ${tool === "point" ? "bg-blue-500 text-white" : "bg-white border"}`}
          >
            Point
          </button>
          <button
            onClick={() => setTool("line")}
            className={`flex-1 px-2 py-1 rounded ${tool === "line" ? "bg-blue-500 text-white" : "bg-white border"}`}
          >
            Line
          </button>
        </div>
      </div>
      <ul className="text-sm">
        {devices.map((d) => (
          <li key={d.id} className="flex justify-between items-center mb-1">
            <span>{d.name}</span>
            <button
              onClick={() => removeDevice(d.id)}
              className="text-red-500 text-xs"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
