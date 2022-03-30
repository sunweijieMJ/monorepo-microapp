import React, { useState } from 'react';

const HomePage: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="HomePage">
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

export default HomePage;
