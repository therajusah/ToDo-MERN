import Navbar from "./components/navbar/Navbar";
import About from "./components/about/About";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";

const App = () => {
  return (
    <div>
      <Router>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/signin" element={<Signin />}/>

        </Routes>
      </Router>
     
     

      <Footer />
    </div>
  );
};

export default App;
