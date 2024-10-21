import ProjectComponent from "@/app/components/admin/projects/page";
import { Metadata } from "next";

import React from "react";

const Projects = () => {
  return (
    <>
      <ProjectComponent />
    </>
  );
};

export default Projects;

export const metadata: Metadata = {
  title: "Projects",
};
