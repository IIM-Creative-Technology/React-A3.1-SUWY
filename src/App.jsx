import { Link } from 'react-router-dom/';

function App() {
  return (
    <div className="App relative mx-auto container flex flex-col items-center justify-center pt-20 mt-1 " >
      <h1 className='font-bold mb-4 text-5xl'>Home</h1>
      <Link to="/quizz">
        <button>Start the quizz
        </button>
      </Link>
      
    </div>
  );
}

export default App;
