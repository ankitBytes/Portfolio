import HeroSection from "../components/hero";
import About from "../components/aboutMe";
import Projects from "../components/projects";
import Jobs, {Education} from "../components/jobs";
import Skills from "../components/skills";


const Home = () => {
    return(
        <div className="body">
            <HeroSection />
            <About />
            <Skills />
            <Projects />
            <Education />
            <Jobs />
        </div>
    )
}

export default Home;