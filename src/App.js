import React, { useState, useEffect, useRef} from 'react';

const App = () => {
  const canvasRef = useRef(null);
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    circles.forEach((circle) => {
      context.beginPath();
      context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
      context.fillStyle = circle.color;
      context.fill();
      context.closePath();
    });
  }, [circles]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const checkOverlap = (circle1, circle2) => {
    const dx = circle1.x - circle2.x;
    const dy = circle1.y - circle2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < circle1.radius + circle2.radius;
  };

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const radius = Math.floor(Math.random() * 41) + 10;
    let color = getRandomColor();

    const newCircle = { x, y, radius, color };

    const updatedCircles = circles.map((circle) => {
      if (checkOverlap(circle, newCircle)) {
        circle.color = 'red';
        newCircle.color = 'red';
      }
      return circle;
    });

    setCircles([...updatedCircles, newCircle]);
  };

  return (
    <div className="App">
      <h1>Circle Drawer</h1>
      <p>Click on the canvas to draw circles. Overlapping circles will turn red.</p>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid black' }}
        onClick={handleCanvasClick}
      />
    </div>
  );
};

export default App;
