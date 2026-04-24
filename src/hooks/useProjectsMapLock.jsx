import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import UnlockProjectsMapModal from "@/components/UnlockProjectsMapModal";
import { submitProjectsMapInquiry } from "@/utils/inquiryApi";

const STORAGE_KEY = "hmcProjectsMapUnlocked";
const STORAGE_CONTACT_KEY = "hmcProjectsMapContact";

const ProjectsMapLockContext = createContext(null);

function readStoredFlag() {
  if (typeof window === "undefined") return false;

  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function readStoredContact() {
  if (typeof window === "undefined") return null;

  try {
    const rawValue = window.localStorage.getItem(STORAGE_CONTACT_KEY);
    return rawValue ? JSON.parse(rawValue) : null;
  } catch {
    return null;
  }
}

export function ProjectsMapLockProvider({ children }) {
  const [isUnlocked, setIsUnlocked] = useState(readStoredFlag);
  const [contact, setContact] = useState(readStoredContact);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const successRef = useRef(null);

  const persistUnlock = useCallback((payload) => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(STORAGE_KEY, "true");

      if (payload) {
        window.localStorage.setItem(STORAGE_CONTACT_KEY, JSON.stringify(payload));
      }
    } catch {
      // Keep the unlock flow resilient even if storage is unavailable.
    }
  }, []);

  const openUnlockModal = useCallback((onSuccess) => {
    successRef.current = onSuccess || null;
    setIsModalOpen(true);
  }, []);

  const closeUnlockModal = useCallback(() => {
    setIsModalOpen(false);
    successRef.current = null;
  }, []);

  const unlock = useCallback(
    async (payload) => {
      const pageUrl =
        typeof window !== "undefined" ? window.location.href : payload.pageUrl;
      const pagePath =
        typeof window !== "undefined" ? window.location.pathname : payload.pagePath;

      const requestPayload = {
        ...payload,
        pageUrl,
        pagePath,
      };

      await submitProjectsMapInquiry(requestPayload);

      setIsUnlocked(true);
      setContact(requestPayload);
      persistUnlock(requestPayload);
      setIsModalOpen(false);

      const callback = successRef.current;
      successRef.current = null;

      if (typeof callback === "function") {
        callback();
      }
    },
    [persistUnlock],
  );

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === STORAGE_KEY) {
        setIsUnlocked(event.newValue === "true");
      }

      if (event.key === STORAGE_CONTACT_KEY) {
        if (!event.newValue) {
          setContact(null);
          return;
        }

        try {
          setContact(JSON.parse(event.newValue));
        } catch {
          setContact(null);
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const value = {
    isUnlocked,
    contact,
    isModalOpen,
    openUnlockModal,
    closeUnlockModal,
    unlock,
  };

  return (
    <ProjectsMapLockContext.Provider value={value}>
      {children}
      <UnlockProjectsMapModal
        open={isModalOpen}
        onClose={closeUnlockModal}
        onSubmit={unlock}
        initialData={contact}
      />
    </ProjectsMapLockContext.Provider>
  );
}

export function useProjectsMapLock() {
  const context = useContext(ProjectsMapLockContext);

  if (!context) {
    throw new Error(
      "useProjectsMapLock must be used within ProjectsMapLockProvider",
    );
  }

  return context;
}
