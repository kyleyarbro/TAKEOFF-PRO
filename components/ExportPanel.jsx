import React from "react";

export const ExportPanel = ({ devices, project }) => {
  const exportCSV = () => {
    if (!project) return;
    let csv = "Type,Quantity,Unit Cost,Labor Hours\n";
    devices.forEach((device) => {
      const quantity = project.markers?.filter(m => m.type === device.name).length || 0;
      const cost = device.cost || 0;
      const labor = device.labor || 0;
      csv += `${device.name},${quantity},${cost},${labor}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.name}_takeoff.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    if (!project) return;
    const data = {
      project: project.name,
      devices: devices,
      markers: project.markers,
      lines: project.lines
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.name}_takeoff.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-4">
      <button
        onClick={exportCSV}
        className="bg-yellow-500 text-white px-2 py-1 rounded w-full mb-2"
      >
        Export CSV
      </button>
      <button
        onClick={exportJSON}
        className="bg-gray-700 text-white px-2 py-1 rounded w-full"
      >
        Export JSON
      </button>
    </div>
  );
};
