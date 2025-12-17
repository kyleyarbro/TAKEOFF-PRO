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
