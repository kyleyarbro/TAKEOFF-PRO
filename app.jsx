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

// File: src/components/ProjectManager.jsx
import React, { useRef } from "react";

export const ProjectManager = ({ activeProject, setActiveProject }) => {
  const fileInputRef = useRef();

  const createNewProject = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newProject = {
          id: Date.now(),
          name: file.name,
          pdf: reader.result,
          markers: [],
          lines: [],
        };
        localStorage.setItem(`project-${newProject.id}`, JSON.stringify(newProject));
        setActiveProject(newProject);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteProject = () => {
    if (activeProject) {
      localStorage.removeItem(`project-${activeProject.id}`);
      setActiveProject(null);
    }
  };

  return (
    <div className="mb-4">
      <button
        onClick={() => fileInputRef.current.click()}
        className="bg-blue-500 text-white px-2 py-1 mb-2 rounded w-full"
      >
        Upload PDF Plan
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={createNewProject}
        className="hidden"
      />
      <button
        onClick={deleteProject}
        className="bg-red-500 text-white px-2 py-1 mt-2 rounded w-full"
      >
        Delete Project
      </button>
    </div>
  );
};
