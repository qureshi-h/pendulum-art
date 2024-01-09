"use client";
import { useRef, useEffect, useState } from "react";
import { setTimeout } from "timers";

const airResistance = 0.01;
let xAmplitude = 500;
let yAmplitude = 300;
let angularFrequency = 0.5;

const Art = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [pause, setPause] = useState<boolean>(true);
    const [clear, setClear] = useState<boolean>(false);
    const [reset, setReset] = useState<boolean>(false);
    const [lineWidth, setLineWidth] = useState<number>(2);
    const [context, setContext] = useState<CanvasRenderingContext2D>();
    const rafIDRef = useRef<number>();
    const tRef = useRef<number>(0);

    let t = 0;

    const handleKeyDown = (e: any) => {
        console.log(e);

        if (e.code === "Space") {
            setPause((prevState) => !prevState);
        }

        if (e.code === "KeyN") {
            setClear((prevState) => !prevState);
        }

        if (e.code === "KeyR") {
            setReset((prevState) => !prevState);
        }

        if (e.code === "ArrowUp") {
            if (lineWidth < 10) setLineWidth((prevState) => prevState + 1);
        }

        if (e.code === "ArrowDown") {
            if (lineWidth > 1) setLineWidth((prevState) => prevState - 1);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        //pause
        if (context && !pause) {
            draw();
        } else {
            if (rafIDRef.current) {
                cancelAnimationFrame(rafIDRef.current);
            }
        }
    }, [pause]);

    useEffect(() => {
        // clear
        if (clear) {
            setClear((prevState) => !prevState);

            if (context)
                context.clearRect(0, 0, window.innerWidth, window.innerHeight); // Clear canvas
        }
    }, [clear]);

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
        }
    }, [reset ]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        setContext(ctx);
    }, []);

    const draw = () => {
        if (!context) return;
        t = tRef.current - 0.1;

        let X =
            xAmplitude *
                Math.exp(-airResistance * t) *
                Math.sin(angularFrequency * t) +
            window.innerWidth / 2;
        let Y =
            yAmplitude *
                Math.exp(-airResistance * t) *
                Math.cos(angularFrequency * t) +
            window.innerHeight / 2;

        const animate = () => {
            const newX =
                xAmplitude *
                    Math.exp(-airResistance * t) *
                    Math.sin(angularFrequency * t) +
                window.innerWidth / 2;
            const newY =
                yAmplitude *
                    Math.exp(-airResistance * t) *
                    Math.cos(angularFrequency * t) +
                window.innerHeight / 2;

            context.beginPath();
            context.moveTo(X, Y);
            context.lineTo(newX, newY);

            X = newX;
            Y = newY;

            context.strokeStyle = "#000";
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
            <canvas ref={canvasRef} />
        </div>
    );
};

export default Art;
