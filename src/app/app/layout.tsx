import { layout } from "@d-exclaimation/next";
import CameraProvider from "./(camera)/provider";
import Navmenu from "./(navigation)/navmenu";

export default layout(({ children }) => {
  return (
    <CameraProvider>
      <div className="flex h-max min-h-[100dvh] w-full max-w-3xl flex-col items-center justify-center gap-4 px-5 py-2">
        {children}
        <Navmenu />
      </div>
    </CameraProvider>
  );
});
