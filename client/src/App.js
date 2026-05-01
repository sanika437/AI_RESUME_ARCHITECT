import { useState } from "react";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import LoginPage from "./loginPage";
import MethodSelection from "./Methodselection";
import ResumeUploadPage from "./Resumeuploadpage";
import JobDescriptionForm from "./JobDescription";
import TemplateSelectionPage from "./Templateselectionpage";
import ResumeBuilder from "./Resumebuilder";
import OptimizedResumeView from "./OptimizedResumeView";
import ATSScoreView from "./ATSScoreView";

/*
  APP FLOW:
  1. landing
  2. auth (login/signup)
  3. dashboard (history & payment)
  4. method-select
     - "upload" → resume-upload → job-description-upload → optimized-resume → ats-score
     - "scratch" → template-select → resume-builder → job-description-scratch → optimized-resume → ats-score
*/

export default function App() {
  const [page, setPage] = useState("landing");
  const [appData, setAppData] = useState({
    tab: "login",         // "login" | "signup"
    method: null,         // "upload" | "scratch"
    uploadedFile: null,   // File object from upload page
    templateId: null,     // selected template id
    resumeData: null,     // filled form data from ResumeBuilder
    jobDescription: null, // { role, experience, jobDesc }
    optimizedResume: null,// generated resume content
  });

  const go = (nextPage, updates = {}) => {
    setAppData((prev) => ({ ...prev, ...updates }));
    setPage(nextPage);
  };

  if (page === "landing") {
    return <LandingPage onNavigate={(p, data) => go(p, data)} />;
  }

  if (page === "auth") {
    return <LoginPage tab={appData.tab} onLogin={() => go("dashboard")} />;
  }

  if (page === "dashboard") {
    return <Dashboard onNavigate={(p, data) => go(p, data)} appData={appData} />;
  }

  if (page === "method-select") {
    return (
      <MethodSelection
        onContinue={(method) => {
          if (method === "upload") {
            go("resume-upload", { method });
          } else {
            go("template-select", { method });
          }
        }}
      />
    );
  }

  // ── UPLOAD FLOW ──────────────────────────────────────────
  if (page === "resume-upload") {
    return (
      <ResumeUploadPage
        onContinue={(file) => go("job-description", { uploadedFile: file })}
        onBack={() => go("method-select")}
      />
    );
  }

  if (page === "job-description") {
    return (
      <JobDescriptionForm
        mode={appData.method}                // "upload" | "scratch"
        onContinue={(jdData) => go("optimized-resume", { jobDescription: jdData })}
        onBack={() =>
          appData.method === "upload"
            ? go("resume-upload")
            : go("resume-builder")
        }
      />
    );
  }

  if (page === "optimized-resume") {
    return (
      <OptimizedResumeView
        appData={appData}
        onShowATS={() => go("ats-score")}
        onBack={() => go("job-description")}
      />
    );
  }

  if (page === "ats-score") {
    return (
      <ATSScoreView
        appData={appData}
        onBack={() => go("optimized-resume")}
        onHome={() => go("method-select")}
      />
    );
  }

  // ── SCRATCH FLOW ─────────────────────────────────────────
  if (page === "template-select") {
    return (
      <TemplateSelectionPage
        onContinue={(templateId) => go("resume-builder", { templateId })}
        onBack={() => go("method-select")}
      />
    );
  }

  if (page === "resume-builder") {
    return (
      <ResumeBuilder
        templateId={appData.templateId}
        onContinue={(resumeData) => go("job-description", { resumeData })}
        onBack={() => go("template-select")}
        onDownload={(resumeData) => {
          // download without optimizing
          setAppData((prev) => ({ ...prev, resumeData }));
          // trigger download — handled inside ResumeBuilder
        }}
      />
    );
  }

  return null;
}
