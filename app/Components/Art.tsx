"use client";
import { useRef, useEffect, useState } from "react";
import ColourPalette from "./ColourPalette";
import Status from "./Status";

let airResistance = 0.01;
let angularFrequency = 0.5;

const Art = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [ready, setReady] = useState<boolean>(false);
    const [pause, setPause] = useState<boolean>(true);
    const [reset, setReset] = useState<boolean>(false);

    const [lineWidth, setLineWidth] = useState<number>(2);
    const [origin, setOrigin] = useState<Array<number>>([]);
    const [end, setEnd] = useState<Array<number>>([]);
    const [amplitude, setAmplitude] = useState<Array<number>>([]);

    const [colorChange, setColorChange] = useState<boolean>(false);
    const [color, setColor] = useState<string>("#aabbcc");

    const [context, setContext] = useState<CanvasRenderingContext2D>();
    const rafIDRef = useRef<number>();
    const tRef = useRef<number>(0);

    const [displayStatus, setDisplayStatus] = useState<number>(0);

    let t = 0;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        setContext(ctx);
        setReady(true);
    }, []);

    useEffect(() => {
        if (displayStatus) {
            const timeoutId = setTimeout(() => {
                setDisplayStatus(0);
            }, 3000);
            return () => clearTimeout(timeoutId);
        }
    }, [displayStatus]);

    const handleKeyDown = (e: any) => {
        if (e.code === "Space") {
            setPause((prevState) => !prevState);
            setDisplayStatus((prev) => prev + 1);
        }

        if (e.code === "KeyP") {
            setColorChange((prevState) => !prevState);
        }

        if (e.code === "KeyR") {
            setReset((prevState) => !prevState);
        }

        if (e.code === "ArrowUp") {
            setLineWidth((prevState) => {
                if (prevState < 10) return prevState + 1;
                return prevState;
            });
        }

        if (e.code === "ArrowDown") {
            setLineWidth((prevState) => {
                if (prevState > 1) return prevState - 1;
                return prevState;
            });
        }
    };

    const handleMouseDown = (e: any) => {
        if (ready) {
            setOrigin([e.clientX, e.clientY]);
        }
    };

    const handleMouseUp = (e: any) => {
        if (ready) {
            setEnd([e.clientX, e.clientY]);
        }
    };

    useEffect(() => {
        // set amplitude
        if (origin.length > 1 && end.length === 2) {
            setReady(false);
            setAmplitude([
                Math.abs(end[0] - origin[0]),
                Math.abs(end[1] - origin[1]),
            ]);
            tRef.current = 0;
            setPause(false);
        }
    }, [end]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [ready]);

    useEffect(() => {
        // pause

        if (!pause && !colorChange) {
            draw();
        } else {
            if (rafIDRef.current) {
                cancelAnimationFrame(rafIDRef.current);
            }
            if (!colorChange) setReady(true);
            else setReady(true);
        }
    }, [pause, colorChange]);

    useEffect(() => {
        // line Width
        if (rafIDRef.current) {
            cancelAnimationFrame(rafIDRef.current);
            draw();
        }
    }, [lineWidth]);

    useEffect(() => {
        // reset
        if (reset) {
            setReset((prevState) => !prevState);
            if (context)
                context.clearRect(0, 0, window.innerWidth, window.innerHeight); // Clear canvas
            tRef.current = 0;
            setAmplitude([]);
            setOrigin([]);
            setEnd([]);
            setReady(true);
            setPause(true);
        }
    }, [reset]);

    const draw = () => {
        console.log(pause, origin, amplitude);

        if (pause || origin.length < 2) return;

        if (!context) return;
        t = tRef.current - 0.1;

        let X =
            amplitude[0] *
                Math.exp(-airResistance * t) *
                Math.sin(angularFrequency * t) +
            origin[0];
        let Y =
            amplitude[1] *
                Math.exp(-airResistance * t) *
                Math.cos(angularFrequency * t) +
            origin[1];

        const animate = () => {
            const newX =
                amplitude[0] *
                    Math.exp(-airResistance * t) *
                    Math.sin(angularFrequency * t) +
                origin[0];
            const newY =
                amplitude[1] *
                    Math.exp(-airResistance * t) *
                    Math.cos(angularFrequency * t) +
                origin[1];

            // airResistance = Math.random() * 0.0005 + 0.005;

            context.beginPath();
            context.moveTo(X, Y);
            context.lineTo(newX, newY);

            X = newX;
            Y = newY;

            context.strokeStyle = color;
            context.lineWidth = lineWidth;
            context.stroke();

            t += 0.1;
            tRef.current = t;
            rafIDRef.current = requestAnimationFrame(animate);
        };

        animate();
    };

    return (
        <div className="canvas">
            {colorChange && (
                <div className="colourPalette">
                    <ColourPalette color={color} setColor={setColor} />
                </div>
            )}

            {displayStatus !== 0 && <Status paused={pause} />}
            <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            />
        </div>
    );
};

export default Art;
