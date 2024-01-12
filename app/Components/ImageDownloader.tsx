import { RefObject } from "react";

const options = {
    allowTaint: true,
    useCORS: true,
    // backgroundColor: "rgba(0,0,0,0)",
    removeContainer: true,
};

const downloadImage = async (canvasRef: RefObject<HTMLElement>) => {
    const cardElement = canvasRef.current;

    if (!cardElement) return;

    try {
        // lazy load this package
        const html2canvas = await import(
            /* webpackPrefetch: true */ "html2canvas"
        );

        const result = await html2canvas.default(cardElement, options);
        const asURL = result.toDataURL("image/jpeg");
        const anchor = document.createElement("a");
        anchor.href = asURL;
        anchor.download = "pendulum-art.jpeg";
        anchor.click();
        anchor.remove();
    
    } catch (reason) {
        console.log(reason);
    }
};

export default downloadImage;
