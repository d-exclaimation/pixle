import { layout } from "@d-exclaimation/next";
import CameraProvider from "./(camera)/provider";
import PhotoDetection from "./(modal)/photo-detection";
import Navmenu from "./(navigation)/navmenu";

export default layout(({ children }) => {
  return (
    <CameraProvider>
      <div className="flex min-h-[100dvh] w-full max-w-2xl flex-col items-center justify-center gap-4 px-5 py-2">
        {children}
        <Navmenu />
        <PhotoDetection
          difficulty={"hardest"}
          items={[
            {
              name: "person",
              icon: "👤",
              category: "House Entity",
              difficulty: 1,
            },
            {
              name: "person",
              icon: "👤",
              category: "House Entity",
              difficulty: 1,
            },
            {
              name: "bird",
              icon: "🕊️",
              category: "House Entity",
              difficulty: 2,
            },
            {
              name: "cat",
              icon: "🐱",
              category: "House Entity",
              difficulty: 1,
            },
          ]}
        />
      </div>
    </CameraProvider>
  );
});
