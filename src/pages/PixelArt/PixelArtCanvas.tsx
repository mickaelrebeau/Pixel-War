import { useRef, useEffect, useState } from 'react';

const colors = ['red', 'black', 'white', 'yellow', 'blue', 'orange'];
const PIXEL_SIZE = 15; // Taille d'un pixel en pixels CSS

const PixelArtCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
    let isDrawing = false;

    const handleMouseDown = () => {
        isDrawing = true;
    };

    const handleMouseUp = () => {
        isDrawing = false;
    };

    const drawGrid = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Dessiner une grille de pixels noire
        ctx.strokeStyle = 'black';
        for (let x = 0; x < canvas.width; x += PIXEL_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += PIXEL_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
        }
    }

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { offsetX, offsetY } = event.nativeEvent;
        const x = Math.floor(offsetX / PIXEL_SIZE) * PIXEL_SIZE;
        const y = Math.floor(offsetY / PIXEL_SIZE) * PIXEL_SIZE;

        // Change the color here based on user selection
        ctx.fillStyle = colors[selectedColorIndex];
        ctx.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Définir la taille de la toile en fonction du nombre de pixels
        const canvasWidth = PIXEL_SIZE * 200;
        const canvasHeight = PIXEL_SIZE * 200;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // Dessiner la toile blanche
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight); 

        drawGrid();
    }, []);
    

    return (
        <div>
            <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            />
            <div>
                {colors.map((color, index) => (
                <button
                    key={index}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColorIndex(index)}
                />
                ))}
            </div>
        </div>
    );
};

export default PixelArtCanvas;