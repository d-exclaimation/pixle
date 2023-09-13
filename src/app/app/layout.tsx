import { layout } from "@d-exclaimation/next";
import CameraProvider from "./(camera)/provider";
import PhotoDetection from "./(modal)/photo-detection";
import Navmenu from "./(navigation)/navmenu";
import ExperimentalAlert from "./experimental";

export default layout(({ children }) => {
  return (
    <CameraProvider>
      <div className="flex min-h-[100dvh] w-full max-w-md flex-col items-center justify-center gap-4 px-5 pb-6">
        {children}
        <Navmenu />
        <PhotoDetection />
      </div>
      <ExperimentalAlert />
    </CameraProvider>
  );
});
