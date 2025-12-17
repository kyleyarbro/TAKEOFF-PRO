// File: src/App.jsx
import React, { useState } from "react";
import { PDFViewer } from "./components/PDFViewer";
import { CanvasArea } from "./components/CanvasArea";
import { ProjectManager } from "./components/ProjectManager";
import { DeviceToolbar } from "./components/DeviceToolbar";
import { ExportPanel } from "./components/ExportPanel";

function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [devices, setDevices] = useState([]);
  const [tool, setTool] = useState("point"); // point | line

  return (
    <div className="flex h-screen">
      <div className="w-64 border-r bg-gray-100 p-4 overflow-y-auto">
        <ProjectManager
          activeProject={activeProject}
          setActiveProject={setActiveProject}
        />
        <DeviceToolbar
          devices={devices}
          setDevices={setDevices}
          tool={tool}
          setTool={setTool}
        />
        <ExportPanel
          devices={devices}
          project={activeProject}
        />
      </div>
      <div className="flex-1 relative">
        <PDFViewer pdfFile={activeProject?.pdf} />
        <CanvasArea
          tool={tool}
          devices={devices}
          activeProject={activeProject}
        />
      </div>
    </div>
  );
}

export default App;
